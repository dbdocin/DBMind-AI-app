import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/LegalPage';
import { CookiePreferencesButton } from '@/components/CookiePreferencesButton';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How DBMind AI uses essential, analytics, and marketing cookies, and how to change your preferences at any time.',
  alternates: { canonical: '/cookies' },
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie policy"
      updated="Version 1.0 — last updated September 2026"
      sections={[
        {
          id: 'overview',
          title: 'Overview',
          body: (
            <p>
              We use a small number of cookies to run this site and, only with your consent, to understand traffic
              and measure campaign performance. Your choice is stored and applied consistently — nothing outside the
              &quot;Essential&quot; category runs before you&apos;ve made a choice, and rejecting a category takes
              effect immediately.
            </p>
          ),
        },
        {
          id: 'essential',
          title: 'Essential cookies',
          body: (
            <p>
              Required for the site to function — for example, remembering your cookie preference itself. These
              cannot be disabled and do not require consent.
            </p>
          ),
        },
        {
          id: 'analytics',
          title: 'Analytics cookies',
          body: (
            <p>
              Help us understand aggregate site usage (pages visited, general engagement) so we can improve the site.
              Off by default; only initialize after you opt in.
            </p>
          ),
        },
        {
          id: 'marketing',
          title: 'Marketing cookies',
          body: <p>Used to measure campaign performance. Off by default; only initialize after you opt in.</p>,
        },
        {
          id: 'manage',
          title: 'Managing your preferences',
          body: (
            <div className="flex flex-col gap-4">
              <p>You can change your cookie choice at any time, from here or from the &quot;Cookie Preferences&quot; link in the footer of every page.</p>
              <CookiePreferencesButton />
            </div>
          ),
        },
      ]}
    />
  );
}
