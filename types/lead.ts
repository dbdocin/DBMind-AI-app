export interface LeadApiRequest {
  contact: {
    name: string;
    email: string;
    company?: string;
    role?: string;
    country?: string;
    phone?: string;
  };
  services: string[];
  database: {
    technologies: string[];
    environment: string;
    size?: string;
    databaseCount?: number;
  };
  migration?: {
    type?: string;
    source?: string;
    target?: string;
    currentVersion?: string;
    targetVersion?: string;
    reason?: string;
    downtime?: string;
    targetDate?: string;
  };
  performance?: {
    symptoms?: string;
    started?: string;
    businessImpact?: string;
  };
  security?: {
    description?: string;
  };
  haDr?: {
    currentArchitecture?: string;
    rpo?: string;
    rto?: string;
    availabilityRequirements?: string;
  };
  project?: {
    description?: string;
    timeline?: string;
    estimatedSize?: string;
  };
  consent: {
    privacy: boolean;
    privacyPolicyVersion: string;
    privacyTimestamp: string;
    terms: boolean;
    termsVersion?: string;
    marketing: boolean;
  };
  attribution?: {
    landingPage?: string;
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
  };
  idempotencyKey: string;
  /** Honeypot spam trap — should always be empty for a genuine submission. */
  honeypot?: string;
}

export interface LeadApiSuccessResponse {
  success: true;
  referenceId: string;
}

export interface LeadApiErrorResponse {
  success: false;
  message: string;
  fieldErrors?: Record<string, string>;
}

export type LeadApiResponse = LeadApiSuccessResponse | LeadApiErrorResponse;

/** Internal representation — never sent to the client as-is. */
export interface StoredLead {
  id: string;
  referenceId: string;
  idempotencyKey: string;
  createdAt: string;
  priorityScore: number;
  payload: LeadApiRequest;
}
