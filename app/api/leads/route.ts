import { NextRequest, NextResponse } from 'next/server';
import { validateLeadRequest } from '@/lib/validation';
import { calculateLeadPriorityScore } from '@/lib/leadScoring';
import { getLeadRepository } from '@/lib/leadRepository';
import { checkRateLimit } from '@/lib/rateLimit';
import { sendInternalLeadNotification, sendCustomerConfirmation } from '@/lib/notifications';
import type { LeadApiResponse } from '@/types/lead';

export const runtime = 'nodejs';

function getClientKey(req: NextRequest): string {
  // Prefer the standard forwarded-for header (set by Vercel/most proxies);
  // fall back to a constant so local dev still exercises the rate limiter.
  const forwardedFor = req.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() || 'unknown';
}

/** Minimal same-origin check. Not a full CSRF-token implementation, but
 *  blocks the most common cross-site POST forgery vector for a JSON API
 *  that isn't meant to be called from other origins. Swap for a proper
 *  double-submit-cookie or synchronizer-token scheme if this API is ever
 *  exposed to non-browser callers or needs to support cross-origin embeds. */
function isSameOriginRequest(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true; // same-origin requests often omit Origin
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  try {
    const originHost = new URL(origin).host;
    const requestHost = req.headers.get('host');
    if (siteUrl) {
      const siteHost = new URL(siteUrl).host;
      if (originHost === siteHost) return true;
    }
    return originHost === requestHost;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<LeadApiResponse>> {
  if (!isSameOriginRequest(req)) {
    return NextResponse.json({ success: false, message: 'Unable to submit your request. Please try again.' }, { status: 403 });
  }

  const clientKey = getClientKey(req);
  const rateLimit = checkRateLimit(clientKey);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please wait a moment and try again.' },
      { status: 429 },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Unable to submit your request. Please try again.' }, { status: 400 });
  }

  // Enumerated values (services, database technologies, environment,
  // migration type, etc.) are re-checked here against the same allowlists
  // used by the client — a hidden field or a tampered payload cannot submit
  // a value the client-side wizard never actually offered.
  const validation = validateLeadRequest(raw);
  if (!validation.success || !validation.data) {
    return NextResponse.json(
      {
        success: false,
        message: 'Some information is missing or invalid. Please check the highlighted fields.',
        fieldErrors: validation.fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = validation.data;
  const repository = getLeadRepository();

  // Idempotency: a duplicate key (double-click, browser retry, refresh after
  // submit) returns the original reference instead of creating a second lead.
  const existing = await repository.checkDuplicate(data.idempotencyKey);
  if (existing) {
    return NextResponse.json({ success: true, referenceId: existing.referenceId });
  }

  const priorityScore = calculateLeadPriorityScore(data);

  let lead;
  try {
    lead = await repository.createLead(data, priorityScore);
  } catch (err) {
    console.error('[api/leads] failed to persist lead', err);
    return NextResponse.json({ success: false, message: 'Unable to submit your request. Please try again.' }, { status: 500 });
  }

  // Notifications are best-effort — a failure here must never surface to the
  // customer as a failed submission; the lead itself was already recorded.
  try {
    await Promise.all([sendInternalLeadNotification(lead), sendCustomerConfirmation(lead)]);
  } catch (err) {
    console.error('[api/leads] notification dispatch failed (lead was still created)', err);
  }

  return NextResponse.json({ success: true, referenceId: lead.referenceId });
}
