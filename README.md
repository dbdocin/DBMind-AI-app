# DBMind AI — production-oriented prototype

Next.js 14 (App Router) + TypeScript + Tailwind. This replaces the earlier
static HTML mockup with a real application: routing, a multi-step assessment
wizard with server-side validation, an API route, a swappable lead-storage
abstraction, and a centralized cookie-consent architecture.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm run start   # production build (verified clean — see below)
npm run typecheck                # tsc --noEmit
npm run lint                     # next lint
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage |
| `/migration` | Migration & Modernization — CTA pre-selects `service=migration` |
| `/performance` | Performance Optimization — pre-selects `service=performance` |
| `/health-assessment` | Health Assessment — pre-selects `service=health-assessment` |
| `/ai-consulting` | AI-Powered Optimization — pre-selects `service=ai-consulting` |
| `/contact` | The assessment wizard itself |
| `/privacy`, `/terms`, `/cookies` | Placeholder legal pages (explicitly labeled as such, not final legal text) |
| `/api/leads` | POST endpoint the wizard submits to |
| `/sitemap.xml`, `/robots.txt` | Generated via Next.js metadata routes |

A service page's CTA links to `/contact?service=migration` (etc.) — the
wizard reads that query param on mount and pre-selects the service, exactly
per spec #54.

## Where things live

```
app/                    routes (pages + the /api/leads route handler)
components/             Header, Footer, Hero, ServiceCard/Section, TrustBar,
                         AIShowcase, ConsentSection, CookieBanner,
                         CookiePreferences, SuccessState, SchedulingCard,
                         FormField, legal/LegalPage
components/assessment/  StepIndicator, ContactStep, DatabaseStep, ProjectStep,
                         ConditionalMigrationFields, ConditionalPerformanceFields,
                         ConditionalSecurityFields, ConditionalHaDrFields,
                         FormNavigation, MultiSelectChips, AssessmentWizard
hooks/useCookieConsent.tsx   the one centralized consent context — banner and
                             the footer's "Cookie Preferences" both drive this
lib/                     validation (Zod, authoritative), leadScoring,
                         leadRepository (swappable), notifications (stubbed),
                         rateLimit, cookieConsent, constants (allowlists)
types/                   AssessmentFormState, LeadApiRequest/Response, StoredLead
```

Business logic (validation, scoring, storage, consent) lives in `lib/` and
`hooks/`, not scattered through components — that separation is what makes
each piece swappable later without touching the form.

## What's real vs. stubbed

**Real and working:**
- Full 3-step wizard with conditional fields, client-side validation, and
  independent Back/Next state preservation
- Server-side validation (Zod) that re-checks every enumerated value against
  the same allowlist the client uses — a tampered/hidden field cannot submit
  a value the UI never actually offered (verified: see Testing below)
- Idempotency-key deduplication (verified: identical key returns the same
  `referenceId` instead of creating a second lead)
- Rate limiting (verified: 6th rapid request from the same IP gets a 429)
- A minimal same-origin check on the API route (verified: cross-origin
  `Origin` header gets a 403)
- Centralized, cookie-persisted consent state; analytics/marketing
  integrations are structurally gated behind it (there's no code path that
  can initialize either before consent is granted)
- Lead priority scoring per the spec's factor table

**Intentionally stubbed (per spec #81's prototype boundary):**
- `LeadRepository` is in-memory (see `lib/leadRepository.ts`). This is a
  clean interface — swapping in a real database/CRM means implementing that
  interface once, not touching the wizard or the route. **Important:** if
  this is deployed to Vercel as-is, each serverless invocation may get a
  fresh in-memory store, so leads and rate-limit counters will not reliably
  persist between requests in production. Replace with a real database
  (Postgres, etc.) and a shared rate-limit store (e.g. Upstash Redis) before
  relying on this for real leads.
- `lib/notifications.ts` logs what it *would* send (internal + customer
  confirmation) rather than actually emailing anyone — no email provider is
  configured. Fill in the marked spot once one is chosen.
- `SchedulingCard` shows a real "View available times" link only if
  `NEXT_PUBLIC_SCHEDULING_PROVIDER`/`_URL` are set; otherwise it visibly says
  scheduling isn't connected, rather than faking availability.
- Analytics/marketing scripts are never actually injected (providers default
  to `"none"` in `.env.example`) — the gating logic is real, the scripts
  themselves aren't wired to a provider.

None of this needs the assessment form or API contract to change later —
that's the point of the abstraction.

## Fonts

`next/font/google` needs network access to fonts.googleapis.com *at build
time*; that wasn't available in the sandbox this was built in, and pinning a
build to that dependency is arguably not what you want anyway (spec #77:
minimize third-party dependencies, avoid blocking assets). The Tailwind
config lists Inter / JetBrains Mono first in the font stack with solid
system-font fallbacks, so it still looks right if those are installed
locally, and degrades gracefully otherwise. Self-hosting the actual font
files via `next/font/local` is a reasonable follow-up if you want pixel-exact
typography without any external request.

## Environment variables

See `.env.example` — nothing is hardcoded. `NEXT_PUBLIC_*` variables are the
only ones exposed to the browser; everything else (CRM/email keys) stays
server-side.

## Verified before delivery

- `npm run build` — clean production build, all 9 routes + API route compile
  and prerender successfully
- `npm run typecheck` — no type errors
- `npx next lint` — no warnings or errors
- `npm run start` + live route checks — all pages return 200
- Live `/api/leads` checks — valid submission, duplicate idempotency key,
  invalid payload (bad email + missing consent), tampered enum value,
  rate-limit threshold, and cross-origin rejection all behave as specified

## Known gaps / good next steps

- No automated test suite (unit tests for `lib/validation.ts` and
  `lib/leadScoring.ts` would be the highest-value first addition)
- No real persistence layer yet (see `LeadRepository` note above)
- No CAPTCHA wired in, though the route is structured so one could gate
  submission before it reaches validation
- Legal pages are explicitly placeholder content, not reviewed by counsel
