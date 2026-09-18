import type { ValidatedLeadRequest } from './validation';

// Configurable rather than embedded throughout the UI (per spec #62) — the
// factor table is the only thing that needs editing to tune prioritization.
// Score is stored internally and never returned to the client.
export const LEAD_SCORE_FACTORS = {
  migrationProject: 30,
  productionPerformanceIssue: 25,
  largeDatabase: 20,
  multipleDatabases: 15,
  nearTermTimeline: 15,
  cloudModernization: 15,
  criticalBusinessImpact: 20,
} as const;

const LARGE_DB_SIZES = new Set(['5–10 TB', '10 TB+']);
const NEAR_TERM_TIMELINES = new Set(['Immediately', 'Within 1–3 months']);

export function calculateLeadPriorityScore(lead: ValidatedLeadRequest): number {
  let score = 0;

  if (lead.services.includes('migration')) {
    score += LEAD_SCORE_FACTORS.migrationProject;
    if (lead.migration?.reason?.toLowerCase().includes('cloud')) {
      score += LEAD_SCORE_FACTORS.cloudModernization;
    }
  }

  if (lead.services.includes('performance')) {
    score += LEAD_SCORE_FACTORS.productionPerformanceIssue;
  }

  if (lead.database.size && LARGE_DB_SIZES.has(lead.database.size)) {
    score += LEAD_SCORE_FACTORS.largeDatabase;
  }

  if ((lead.database.databaseCount ?? 0) > 1) {
    score += LEAD_SCORE_FACTORS.multipleDatabases;
  }

  if (lead.project?.timeline && NEAR_TERM_TIMELINES.has(lead.project.timeline)) {
    score += LEAD_SCORE_FACTORS.nearTermTimeline;
  }

  const impactText = `${lead.performance?.businessImpact ?? ''} ${lead.haDr?.availabilityRequirements ?? ''}`.toLowerCase();
  if (impactText.includes('critical') || impactText.includes('production down') || impactText.includes('outage')) {
    score += LEAD_SCORE_FACTORS.criticalBusinessImpact;
  }

  return score;
}
