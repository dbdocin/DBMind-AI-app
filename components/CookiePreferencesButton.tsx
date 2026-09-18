'use client';

import { useCookieConsent } from '@/hooks/useCookieConsent';

export function CookiePreferencesButton() {
  const { openPreferences } = useCookieConsent();
  return (
    <button
      type="button"
      onClick={openPreferences}
      className="rounded-s bg-indigo px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#3049C4]"
    >
      Manage cookie preferences
    </button>
  );
}
