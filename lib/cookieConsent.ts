import { COOKIE_POLICY_VERSION } from './constants';

export interface CookieConsentState {
  essential: true; // always on, not user-configurable
  analytics: boolean;
  marketing: boolean;
  version: string;
  timestamp: string;
}

export const COOKIE_CONSENT_COOKIE_NAME = 'dbmind_cookie_consent';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function getDefaultConsent(): CookieConsentState {
  // Per spec #69 — if no choice has been made, optional categories default
  // to OFF. This value is only ever used before the user has chosen; it is
  // never itself written to the cookie as an implicit "accept."
  return {
    essential: true,
    analytics: false,
    marketing: false,
    version: COOKIE_POLICY_VERSION,
    timestamp: new Date(0).toISOString(),
  };
}

export function readConsentCookie(): CookieConsentState | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_CONSENT_COOKIE_NAME}=([^;]*)`));
  if (!match || !match[1]) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1]));
    if (typeof parsed?.analytics === 'boolean' && typeof parsed?.marketing === 'boolean') {
      return { essential: true, analytics: parsed.analytics, marketing: parsed.marketing, version: parsed.version ?? COOKIE_POLICY_VERSION, timestamp: parsed.timestamp ?? new Date().toISOString() };
    }
    return null;
  } catch {
    return null;
  }
}

export function writeConsentCookie(state: CookieConsentState): void {
  if (typeof document === 'undefined') return;
  const value = encodeURIComponent(JSON.stringify(state));
  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=${value}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
}

// ---------------------------------------------------------------------------
// Consent-gated integration stubs. No real analytics/marketing provider is
// wired up in this prototype (see .env.example) — these functions exist so
// that whichever provider gets added later has one obvious place to
// initialize, and so it's structurally impossible to initialize it before
// consent: every call site must go through here, which checks the flag first.
// ---------------------------------------------------------------------------

let analyticsInitialized = false;
let marketingInitialized = false;

export function initAnalyticsIfConsented(consent: CookieConsentState): void {
  if (!consent.analytics || analyticsInitialized) return;
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? 'none';
  if (provider === 'none') return;
  analyticsInitialized = true;
  // e.g. inject the analytics provider's script tag here.
  console.info(`[cookieConsent] analytics initialized via "${provider}"`);
}

export function initMarketingIfConsented(consent: CookieConsentState): void {
  if (!consent.marketing || marketingInitialized) return;
  const provider = process.env.NEXT_PUBLIC_MARKETING_PROVIDER ?? 'none';
  if (provider === 'none') return;
  marketingInitialized = true;
  console.info(`[cookieConsent] marketing initialized via "${provider}"`);
}

/** Fires whichever consent-gated events analytics consent unlocks. Kept
 *  minimal and non-sensitive per spec #75 — never pass free-text fields,
 *  credentials, or full form payloads through this. */
export function trackEvent(consent: CookieConsentState, eventName: string, props?: Record<string, string>): void {
  if (!consent.analytics) return;
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? 'none';
  if (provider === 'none') return;
  console.info(`[analytics:${provider}] ${eventName}`, props ?? {});
}
