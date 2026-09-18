'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  type CookieConsentState,
  getDefaultConsent,
  readConsentCookie,
  writeConsentCookie,
  initAnalyticsIfConsented,
  initMarketingIfConsented,
} from '@/lib/cookieConsent';
import { COOKIE_POLICY_VERSION } from '@/lib/constants';

interface CookieConsentContextValue {
  /** null until we've checked the cookie on mount, to avoid a hydration flash */
  consent: CookieConsentState | null;
  /** true once the visitor has made an explicit choice (accept/reject/save) */
  hasChosen: boolean;
  /** true while the preference panel should be visible — either because no
   *  choice has been made yet, or because it was reopened from the footer */
  isPanelOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (choices: { analytics: boolean; marketing: boolean }) => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<CookieConsentState | null>(null);
  const [hasChosen, setHasChosen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const existing = readConsentCookie();
    if (existing) {
      setConsentState(existing);
      setHasChosen(true);
      initAnalyticsIfConsented(existing);
      initMarketingIfConsented(existing);
    } else {
      setConsentState(getDefaultConsent());
      setIsPanelOpen(true); // no choice made yet — show the banner
    }
  }, []);

  const persist = useCallback((next: CookieConsentState) => {
    setConsentState(next);
    setHasChosen(true);
    writeConsentCookie(next);
    initAnalyticsIfConsented(next);
    initMarketingIfConsented(next);
    setIsPanelOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    persist({ essential: true, analytics: true, marketing: true, version: COOKIE_POLICY_VERSION, timestamp: new Date().toISOString() });
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist({ essential: true, analytics: false, marketing: false, version: COOKIE_POLICY_VERSION, timestamp: new Date().toISOString() });
  }, [persist]);

  const savePreferences = useCallback(
    (choices: { analytics: boolean; marketing: boolean }) => {
      persist({ essential: true, analytics: choices.analytics, marketing: choices.marketing, version: COOKIE_POLICY_VERSION, timestamp: new Date().toISOString() });
    },
    [persist],
  );

  const openPreferences = useCallback(() => setIsPanelOpen(true), []);
  const closePreferences = useCallback(() => {
    // Only allow dismissing without a choice if one already exists — the
    // very first visit should not be dismissible into an implicit "reject."
    if (hasChosen) setIsPanelOpen(false);
  }, [hasChosen]);

  const value = useMemo<CookieConsentContextValue>(
    () => ({ consent, hasChosen, isPanelOpen, openPreferences, closePreferences, acceptAll, rejectNonEssential, savePreferences }),
    [consent, hasChosen, isPanelOpen, openPreferences, closePreferences, acceptAll, rejectNonEssential, savePreferences],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return ctx;
}
