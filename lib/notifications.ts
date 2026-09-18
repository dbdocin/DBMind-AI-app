import type { StoredLead } from '@/types/lead';

// Real sending is intentionally NOT wired up in this prototype — there is no
// email provider configured. Both functions are structured so that plugging
// in Resend/SendGrid/etc. later means filling in the `send()` call, not
// redesigning what data gets sent or when.

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

export async function sendInternalLeadNotification(lead: StoredLead): Promise<void> {
  const provider = process.env.EMAIL_PROVIDER ?? 'none';
  const payload = buildInternalPayload(lead);

  if (provider === 'none') {
    // Prototype mode — log only, never throw. A notification failure must
    // never fail the lead submission itself.
    console.info('[notifications] internal lead notification (not sent, no provider configured):', payload);
    return;
  }

  // e.g. await resend.emails.send({ ... }) — intentionally not implemented.
  console.info(`[notifications] would send internal notification via "${provider}":`, payload);
}

export async function sendCustomerConfirmation(lead: StoredLead): Promise<void> {
  const provider = process.env.EMAIL_PROVIDER ?? 'none';
  const payload: CustomerConfirmationPayload = {
    referenceId: lead.referenceId,
    contactName: lead.payload.contact.name,
    contactEmail: lead.payload.contact.email,
    requestedServices: lead.payload.services,
  };

  if (provider === 'none') {
    console.info('[notifications] customer confirmation email (not sent, no provider configured):', payload);
    return;
  }

  console.info(`[notifications] would send customer confirmation via "${provider}":`, payload);
}
