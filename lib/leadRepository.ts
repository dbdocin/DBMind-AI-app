import type { LeadApiRequest, StoredLead } from '@/types/lead';
import { randomUUID } from 'crypto';

/**
 * Clean abstraction over "wherever leads actually live." The prototype ships
 * an in-memory implementation so the flow works end-to-end without external
 * services, but the API route only ever talks to this interface — swapping
 * in a real CRM, database, or webhook integration later means implementing
 * this interface once, not rewriting the assessment form or the route.
 */
export interface LeadRepository {
  createLead(payload: LeadApiRequest, priorityScore: number): Promise<StoredLead>;
  getLead(referenceId: string): Promise<StoredLead | null>;
  /** Returns the existing lead if this idempotencyKey was already used, so
   *  retried/duplicate submissions never create a second record. */
  checkDuplicate(idempotencyKey: string): Promise<StoredLead | null>;
}

function generateReferenceId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `DBM-${num}`;
}

/**
 * In-memory repository for the prototype. Data does not survive a server
 * restart or serverless cold start — this is intentional; see README for the
 * production swap-out path (CRM / database / webhook).
 */
class InMemoryLeadRepository implements LeadRepository {
  private leadsByReferenceId = new Map<string, StoredLead>();
  private leadsByIdempotencyKey = new Map<string, StoredLead>();

  async createLead(payload: LeadApiRequest, priorityScore: number): Promise<StoredLead> {
    const existing = await this.checkDuplicate(payload.idempotencyKey);
    if (existing) return existing;

    let referenceId = generateReferenceId();
    while (this.leadsByReferenceId.has(referenceId)) {
      referenceId = generateReferenceId();
    }

    const lead: StoredLead = {
      id: randomUUID(),
      referenceId,
      idempotencyKey: payload.idempotencyKey,
      createdAt: new Date().toISOString(),
      priorityScore,
      payload,
    };

    this.leadsByReferenceId.set(referenceId, lead);
    this.leadsByIdempotencyKey.set(payload.idempotencyKey, lead);
    return lead;
  }

  async getLead(referenceId: string): Promise<StoredLead | null> {
    return this.leadsByReferenceId.get(referenceId) ?? null;
  }

  async checkDuplicate(idempotencyKey: string): Promise<StoredLead | null> {
    return this.leadsByIdempotencyKey.get(idempotencyKey) ?? null;
  }
}

// Module-level singleton so the in-memory store survives across requests
// within the same server process (but not across cold starts/restarts —
// swap in a real persistence layer before relying on this in production).
let repository: LeadRepository | null = null;

/**
 * Factory — this is the one place that would branch on CRM_PROVIDER /
 * DATABASE_URL / LEADS_API_URL to return a real implementation instead of
 * the in-memory one. Nothing else in the codebase needs to change.
 */
export function getLeadRepository(): LeadRepository {
  if (!repository) {
    repository = new InMemoryLeadRepository();
  }
  return repository;
}
