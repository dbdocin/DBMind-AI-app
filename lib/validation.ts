import { z } from 'zod';
import {
  SERVICE_VALUES,
  DATABASE_TECHNOLOGY_OPTIONS,
  ENVIRONMENT_OPTIONS,
  MIGRATION_TYPE_OPTIONS,
} from './constants';

// ---------------------------------------------------------------------------
// This file is imported by the API route (app/api/leads/route.ts) and is the
// single source of truth for what a valid lead payload looks like. Client-side
// step validation in the wizard is a UX convenience only — this schema is what
// actually decides whether a lead is accepted, and it re-checks every
// enumerated value against the same allowlists in lib/constants.ts rather than
// trusting whatever the client happened to send.
// ---------------------------------------------------------------------------

const MAX_SHORT = 200;
const MAX_LONG = 4000;

const emailSchema = z.string().trim().min(1, 'Work email is required').max(MAX_SHORT).email('Enter a valid email address');

const optionalShortText = z.string().trim().max(MAX_SHORT).optional().default('');
const optionalLongText = z.string().trim().max(MAX_LONG).optional().default('');

const phoneSchema = z
  .string()
  .trim()
  .max(30)
  .optional()
  .default('')
  .refine((v) => v === '' || /^[+()0-9\s-]{5,30}$/.test(v), {
    message: 'Enter a valid phone number',
  });

const isoDateSchema = z
  .string()
  .trim()
  .optional()
  .default('')
  .refine((v) => v === '' || /^\d{4}-\d{2}-\d{2}$/.test(v), {
    message: 'Use YYYY-MM-DD format',
  });

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(MAX_SHORT),
  email: emailSchema,
  company: optionalShortText,
  role: optionalShortText,
  country: optionalShortText,
  phone: phoneSchema,
});

const databaseSchema = z.object({
  technologies: z
    .array(z.enum(DATABASE_TECHNOLOGY_OPTIONS as unknown as [string, ...string[]]))
    .min(1, 'Select at least one database technology'),
  environment: z.enum(ENVIRONMENT_OPTIONS as unknown as [string, ...string[]], {
    errorMap: () => ({ message: 'Select a valid environment' }),
  }),
  size: optionalShortText,
  databaseCount: z.number().int().min(0).max(100000).optional(),
});

const migrationSchema = z
  .object({
    type: z.enum(MIGRATION_TYPE_OPTIONS as unknown as [string, ...string[]]).optional().default('not-sure'),
    source: optionalShortText,
    target: optionalShortText,
    currentVersion: optionalShortText,
    targetVersion: optionalShortText,
    reason: optionalLongText,
    downtime: optionalShortText,
    targetDate: isoDateSchema,
  })
  .optional();

const performanceSchema = z
  .object({
    symptoms: optionalLongText,
    started: optionalShortText,
    businessImpact: optionalLongText,
  })
  .optional();

const securitySchema = z
  .object({
    description: optionalLongText,
  })
  .optional();

const haDrSchema = z
  .object({
    currentArchitecture: optionalLongText,
    rpo: optionalShortText,
    rto: optionalShortText,
    availabilityRequirements: optionalLongText,
  })
  .optional();

const projectSchema = z
  .object({
    description: optionalLongText,
    timeline: optionalShortText,
    estimatedSize: optionalShortText,
  })
  .optional();

const consentSchema = z.object({
  privacy: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the privacy consent to submit this form' }),
  }),
  privacyPolicyVersion: z.string().min(1),
  privacyTimestamp: z.string().min(1),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the Terms of Service to submit this form' }),
  }),
  termsVersion: z.string().optional().default(''),
  marketing: z.boolean().default(false),
});

const attributionSchema = z
  .object({
    landingPage: optionalShortText,
    referrer: optionalShortText,
    utmSource: optionalShortText,
    utmMedium: optionalShortText,
    utmCampaign: optionalShortText,
    utmTerm: optionalShortText,
    utmContent: optionalShortText,
  })
  .optional();

export const leadApiRequestSchema = z
  .object({
    contact: contactSchema,
    services: z
      .array(z.enum(SERVICE_VALUES as unknown as [string, ...string[]]))
      .min(1, 'Select at least one service'),
    database: databaseSchema,
    migration: migrationSchema,
    performance: performanceSchema,
    security: securitySchema,
    haDr: haDrSchema,
    project: projectSchema,
    consent: consentSchema,
    attribution: attributionSchema,
    idempotencyKey: z.string().trim().min(8).max(128),
    // Honeypot spam trap — a real user never sees or fills this field (it's
    // rendered off-screen and unreachable by keyboard/screen reader). Kept
    // permissive here (any string, always optional) since the actual
    // spam-vs-not decision is made in the API route, not by rejecting the
    // request outright — see app/api/leads/route.ts.
    honeypot: z.string().optional().default(''),
  })
  .superRefine((data, ctx) => {
    // Conditional requirements — mirror the wizard's progressive disclosure,
    // but enforced here because the client-side step gating can't be trusted.
    if (data.services.includes('migration')) {
      if (!data.migration?.source) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['migration', 'source'], message: 'Source database is required for a migration request' });
      }
      if (!data.migration?.target) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['migration', 'target'], message: 'Target database is required for a migration request' });
      }
    }
    if (data.services.includes('performance')) {
      if (!data.performance?.symptoms) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['performance', 'symptoms'], message: 'Describe the primary symptoms you are seeing' });
      }
    }
    if (data.services.includes('ha-dr')) {
      if (!data.haDr?.currentArchitecture) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['haDr', 'currentArchitecture'], message: 'Describe your current HA/DR architecture' });
      }
    }
  });

export type ValidatedLeadRequest = z.infer<typeof leadApiRequestSchema>;

export interface ValidationResult {
  success: boolean;
  data?: ValidatedLeadRequest;
  fieldErrors?: Record<string, string>;
}

/** Flattens Zod's issue list into a `{ "path.to.field": "message" }` map that
 *  the client can map directly onto individual form fields. */
export function validateLeadRequest(raw: unknown): ValidationResult {
  const result = leadApiRequestSchema.safeParse(raw);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const fieldErrors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const path = issue.path.join('.') || '_form';
    if (!fieldErrors[path]) fieldErrors[path] = issue.message;
  }
  return { success: false, fieldErrors };
}
