import type { ServiceValue } from '@/lib/constants';

export interface ContactInfo {
  name: string;
  email: string;
  company: string;
  role: string;
  country: string;
  phone: string;
}

export interface ServiceInfo {
  requestedServices: ServiceValue[];
  databaseTechnologies: string[];
  environment: string;
  databaseSize: string;
  databaseCount: string; // kept as string in form state; coerced to number on submit
}

export interface MigrationInfo {
  migrationType: string;
  source: string;
  target: string;
  currentVersion: string;
  targetVersion: string;
  reason: string;
  downtime: string;
  targetDate: string;
}

export interface PerformanceInfo {
  symptoms: string;
  started: string;
  businessImpact: string;
}

export interface SecurityInfo {
  description: string;
}

export interface HaDrInfo {
  currentArchitecture: string;
  rpo: string;
  rto: string;
  availabilityRequirements: string;
}

export interface ProjectInfo {
  description: string;
  timeline: string;
  estimatedSize: string;
}

export interface ConsentInfo {
  privacy: boolean;
  terms: boolean;
  marketing: boolean;
}

export interface AttributionInfo {
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
}

/** The complete, in-memory shape of the assessment wizard's state. */
export interface AssessmentFormState {
  contact: ContactInfo;
  service: ServiceInfo;
  migration: MigrationInfo;
  performance: PerformanceInfo;
  security: SecurityInfo;
  haDr: HaDrInfo;
  project: ProjectInfo;
  consent: ConsentInfo;
  attribution: AttributionInfo;
  /** Generated once per form session; sent to the API so retried/duplicate
   *  submissions (double-click, network retry) collapse into one lead. */
  idempotencyKey: string;
}

export type WizardStatus =
  | 'editing'
  | 'validating'
  | 'submitting'
  | 'success'
  | 'error';

export interface FieldErrors {
  [fieldPath: string]: string;
}
