// Single source of truth for every enumerated value the assessment form can
// submit. The API route re-validates every one of these server-side — never
// trust that the client only ever sent an allowed value.

export const SERVICE_OPTIONS = [
  { value: 'migration', label: 'Database Migration & Modernization' },
  { value: 'performance', label: 'Performance Optimization' },
  { value: 'reliability', label: 'Database Reliability Engineering' },
  { value: 'ha-dr', label: 'High Availability & Disaster Recovery' },
  { value: 'security', label: 'Database Security' },
  { value: 'automation', label: 'Database Automation' },
  { value: 'ai-consulting', label: 'AI-Powered Database Optimization' },
  { value: 'health-assessment', label: 'Database Health Assessment' },
  { value: 'monitoring', label: 'Database Monitoring & Observability' },
] as const;

export type ServiceValue = (typeof SERVICE_OPTIONS)[number]['value'];
export const SERVICE_VALUES = SERVICE_OPTIONS.map((s) => s.value);

export const DATABASE_TECHNOLOGY_OPTIONS = [
  'SQL Server',
  'PostgreSQL',
  'MySQL',
  'Oracle',
  'MongoDB',
  'Azure SQL',
  'AWS RDS / Aurora',
  'Other',
] as const;
export type DatabaseTechnology = (typeof DATABASE_TECHNOLOGY_OPTIONS)[number];

export const ENVIRONMENT_OPTIONS = [
  'On-premises',
  'Azure',
  'AWS',
  'Hybrid Cloud',
  'Multi-cloud',
  'Not sure',
] as const;
export type EnvironmentValue = (typeof ENVIRONMENT_OPTIONS)[number];

export const DATABASE_SIZE_OPTIONS = [
  'Under 100 GB',
  '100 GB – 1 TB',
  '1–5 TB',
  '5–10 TB',
  '10 TB+',
] as const;
export type DatabaseSizeValue = (typeof DATABASE_SIZE_OPTIONS)[number];

export const MIGRATION_TYPE_OPTIONS = ['homogeneous', 'heterogeneous', 'not-sure'] as const;
export type MigrationTypeValue = (typeof MIGRATION_TYPE_OPTIONS)[number];

export const DOWNTIME_OPTIONS = [
  'Zero / near-zero downtime required',
  'A short maintenance window is acceptable',
  'Flexible — off-peak downtime is fine',
  'Not sure yet',
] as const;

export const TIMELINE_OPTIONS = [
  'Immediately',
  'Within 1–3 months',
  '3–6 months',
  'Just exploring options',
] as const;
export type TimelineValue = (typeof TIMELINE_OPTIONS)[number];

export const ESTIMATED_SIZE_OPTIONS = ['Small', 'Medium', 'Large', 'Not sure'] as const;

export const ROLE_OPTIONS = [
  'CTO / VP Engineering',
  'Database Administrator',
  'Platform / Infrastructure Engineer',
  'Software Engineer',
  'Founder',
  'Other',
] as const;

// Small, deliberately short list — a real build would use a full ISO country
// list or a country-picker component; kept short here for the prototype.
export const COUNTRY_OPTIONS = [
  'United States',
  'United Kingdom',
  'Canada',
  'India',
  'Germany',
  'Australia',
  'Other',
] as const;

export const PRIVACY_POLICY_VERSION = '1.0';
export const TERMS_VERSION = '1.0';
export const COOKIE_POLICY_VERSION = '1.0';
