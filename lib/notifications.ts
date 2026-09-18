import type { StoredLead } from '@/types/lead';

// Real sending is wired up for one provider — Resend — since it's the
// lowest-friction option for a small volume of consulting leads (no domain
// verification required to get started; see README for setup). Both
// functions still fall back to logging-only if EMAIL_PROVIDER isn't set to
// "resend", so nothing here can crash a submission if email isn't
// configured — a notification failure must never fail the lead itself.

interface InternalNotificationPayload {
  referenceId: string;
  contactName: string;
  contactEmail: string;
  company: string;
  requestedServices: string[];
  databaseTechnologies: string[];
  environment: string;
  projectSummary: string;
  timeline: string;
  priorityScore: number;
  landingPage: string;
  attribution: Record<string, string>;
}

interface CustomerConfirmationPayload {
  referenceId: string;
  contactName: string;
  contactEmail: string;
  requestedServices: string[];
}

function buildInternalPayload(lead: StoredLead): InternalNotificationPayload {
  const { payload } = lead;
  return {
    referenceId: lead.referenceId,
    contactName: payload.contact.name,
    contactEmail: payload.contact.email,
    company: payload.contact.company ?? '',
    requestedServices: payload.services,
    databaseTechnologies: payload.database.technologies,
    environment: payload.database.environment,
    // Deliberately excludes raw free-text fields beyond a short summary —
    // full project descriptions can carry sensitive detail (see spec #65,
    // #67) and don't need to round-trip through an email notification.
    projectSummary: (payload.project?.description ?? '').slice(0, 240),
    timeline: payload.project?.timeline ?? '',
    priorityScore: lead.priorityScore,
    landingPage: payload.attribution?.landingPage ?? '',
    attribution: {
      utmSource: payload.attribution?.utmSource ?? '',
      utmMedium: payload.attribution?.utmMedium ?? '',
      utmCampaign: payload.attribution?.utmCampaign ?? '',
    },
  };
}

// Resend client is created lazily so a missing API key never throws at
// import time — only when an actual send is attempted while "configured."
let resendClient: import('resend').Resend | null = null;

async function getResendClient(): Promise<import('resend').Resend | null> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resendClient) {
    const { Resend } = await import('resend');
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

function isResendConfigured(): boolean {
  return (
    (process.env.EMAIL_PROVIDER ?? 'none') === 'resend' &&
    Boolean(process.env.RESEND_API_KEY) &&
    Boolean(process.env.EMAIL_FROM_ADDRESS)
  );
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

export async function sendInternalLeadNotification(lead: StoredLead): Promise<void> {
  const payload = buildInternalPayload(lead);

  if (!isResendConfigured()) {
    console.info('[notifications] internal lead notification (not sent, no provider configured):', payload);
    // TEMPORARY DIAGNOSTIC — remove once email is confirmed working.
    // Prints only whether each variable is present, never the actual secret.
    console.info('[notifications] DEBUG config check:', {
      EMAIL_PROVIDER: process.env.EMAIL_PROVIDER ?? '(unset)',
      hasResendApiKey: Boolean(process.env.RESEND_API_KEY),
      hasEmailFromAddress: Boolean(process.env.EMAIL_FROM_ADDRESS),
      emailFromAddressValue: process.env.EMAIL_FROM_ADDRESS ?? '(unset)',
    });
    return;
  }

  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  if (!to) {
    console.warn('[notifications] EMAIL_PROVIDER=resend is set but LEAD_NOTIFICATION_EMAIL is missing — skipping send.', payload);
    return;
  }

  const client = await getResendClient();
  if (!client) return;

  const subject = `New assessment request — ${payload.requestedServices.join(', ')} (${payload.referenceId})`;
  const html = `
    <h2>New database assessment request</h2>
    <p><strong>Reference:</strong> ${escapeHtml(payload.referenceId)}</p>
    <p><strong>Priority score:</strong> ${payload.priorityScore}</p>
    <hr />
    <p><strong>Contact:</strong> ${escapeHtml(payload.contactName)} &lt;${escapeHtml(payload.contactEmail)}&gt;</p>
    <p><strong>Company:</strong> ${escapeHtml(payload.company || '—')}</p>
    <p><strong>Services requested:</strong> ${escapeHtml(payload.requestedServices.join(', '))}</p>
    <p><strong>Database technologies:</strong> ${escapeHtml(payload.databaseTechnologies.join(', '))}</p>
    <p><strong>Environment:</strong> ${escapeHtml(payload.environment)}</p>
    <p><strong>Timeline:</strong> ${escapeHtml(payload.timeline || '—')}</p>
    <p><strong>Landing page:</strong> ${escapeHtml(payload.landingPage || '—')}</p>
    ${payload.projectSummary ? `<p><strong>Summary:</strong> ${escapeHtml(payload.projectSummary)}</p>` : ''}
  `.trim();

  try {
    await client.emails.send({
      from: process.env.EMAIL_FROM_ADDRESS!,
      to,
      subject,
      html,
    });
  } catch (err) {
    // Never let a failed send take down the lead submission itself.
    console.error('[notifications] Resend internal notification failed', err);
  }
}

export async function sendCustomerConfirmation(lead: StoredLead): Promise<void> {
  const payload: CustomerConfirmationPayload = {
    referenceId: lead.referenceId,
    contactName: lead.payload.contact.name,
    contactEmail: lead.payload.contact.email,
    requestedServices: lead.payload.services,
  };

  if (!isResendConfigured()) {
    console.info('[notifications] customer confirmation email (not sent, no provider configured):', payload);
    return;
  }

  const client = await getResendClient();
  if (!client) return;

  const html = `
    <p>Hi ${escapeHtml(payload.contactName)},</p>
    <p>Thanks for reaching out to DBMind AI. We've received your request and a database engineer will review it and follow up with next steps.</p>
    <p><strong>Reference:</strong> ${escapeHtml(payload.referenceId)}</p>
    <p><strong>Requested:</strong> ${escapeHtml(payload.requestedServices.join(', '))}</p>
    <p>This reference number is for your records — it isn't an assessment result.</p>
    <p>— DBMind AI</p>
  `.trim();

  try {
    await client.emails.send({
      from: process.env.EMAIL_FROM_ADDRESS!,
      to: payload.contactEmail,
      subject: `We've received your request — ${payload.referenceId}`,
      html,
    });
  } catch (err) {
    console.error('[notifications] Resend customer confirmation failed', err);
  }
}
