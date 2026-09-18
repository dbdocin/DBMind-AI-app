import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { CookieConsentProvider } from '@/hooks/useCookieConsent';
import { getSiteUrl } from '@/lib/site';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AI-Powered Database Consulting & Migration — DBMind AI',
    template: '%s — DBMind AI',
  },
  description:
    'DBMind AI combines experienced database engineering with AI-assisted analysis and automation — migration, performance, reliability, and AI-powered database optimization.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <CookieConsentProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
