const FALLBACK_SITE_URL = 'https://dbmindai.com';

/**
 * Resolves the site's canonical base URL for metadata/sitemap/robots.
 *
 * Deliberately defensive: `NEXT_PUBLIC_SITE_URL` might be unset, set to an
 * empty string (Vercel does this if the env var exists with a blank value —
 * `??` would NOT catch that, only `||` or an explicit check does), or set to
 * a typo'd, unparseable value. Any of those previously crashed the build via
 * `new URL('')`. This function can never throw — worst case it silently
 * falls back to the placeholder default.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw || raw.trim() === '') return FALLBACK_SITE_URL;
  try {
    // Validates the value is actually a well-formed absolute URL before
    // trusting it anywhere `new URL(...)` gets called on it downstream.
    return new URL(raw).toString().replace(/\/$/, '');
  } catch {
    return FALLBACK_SITE_URL;
  }
}
