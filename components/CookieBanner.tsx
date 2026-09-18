'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { CookiePreferences } from './CookiePreferences';

export function CookieBanner() {
  const { consent, isPanelOpen, hasChosen, closePreferences, acceptAll, rejectNonEssential, savePreferences } =
    useCookieConsent();
  const [managing, setManaging] = useState(false);

  if (!isPanelOpen || !consent) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-4 bottom-4 z-[200] mx-auto max-w-[620px] rounded-m border border-line bg-white p-5 shadow-elevated sm:inset-x-5"
    >
      <p className="text-sm leading-relaxed text-ink-mute">
        We use essential cookies to run this site, and optional analytics/marketing cookies to understand traffic and
        improve our content. See our{' '}
        <Link href="/cookies" className="font-semibold text-indigo">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="mt-3.5 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={acceptAll}
          className="rounded-s bg-indigo px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3049C4]"
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={rejectNonEssential}
          className="rounded-s border border-line px-4 py-2 text-sm font-semibold text-navy transition hover:bg-bg-soft"
        >
          Reject non-essential
        </button>
        <button
          type="button"
          onClick={() => setManaging((v) => !v)}
          className="rounded-s border border-line px-4 py-2 text-sm font-semibold text-navy transition hover:bg-bg-soft"
        >
          Manage preferences
        </button>
        {hasChosen && (
          <button
            type="button"
            onClick={closePreferences}
            aria-label="Close"
            className="ml-auto rounded-s px-2 py-2 text-sm font-semibold text-ink-faint transition hover:text-navy"
          >
            Close
          </button>
        )}
      </div>
      {managing && (
        <div className="mt-4">
          <CookiePreferences
            initialAnalytics={consent.analytics}
            initialMarketing={consent.marketing}
            onSave={(choices) => {
              savePreferences(choices);
              setManaging(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
