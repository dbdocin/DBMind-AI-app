'use client';

import Link from 'next/link';
import { useCookieConsent } from '@/hooks/useCookieConsent';

export function Footer() {
  const { openPreferences } = useCookieConsent();

  return (
    <footer className="bg-navy px-5 pb-8 pt-16 text-[#A9B2CC] sm:px-8">
      <div className="mx-auto max-w-container">
        <div className="grid grid-cols-1 gap-8 border-b border-white/10 pb-11 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <Link href="/" className="flex items-center gap-2.5 text-[17px] font-bold text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-gradient-to-br from-indigo to-brandPurple">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M4 6c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2Z" stroke="white" strokeWidth="1.6" />
                  <path d="M4 6v12c0 1.1 3.6 2 8 2s8-.9 8-2V6" stroke="white" strokeWidth="1.6" />
                  <path d="M4 12c0 1.1 3.6 2 8 2s8-.9 8-2" stroke="white" strokeWidth="1.6" />
                </svg>
              </span>
              DBMind AI
            </Link>
            <p className="mt-3.5 max-w-[220px] text-[13.5px] leading-relaxed">Database engineering. Cloud. AI.</p>
          </div>

          <FooterColumn title="Services">
            <FooterLink href="/migration">Migration &amp; Modernization</FooterLink>
            <FooterLink href="/performance">Performance</FooterLink>
            <FooterLink href="/health-assessment">Health Assessment</FooterLink>
            <FooterLink href="/ai-consulting">AI Consulting</FooterLink>
          </FooterColumn>

          <FooterColumn title="Company">
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/cookies">Cookie Policy</FooterLink>
            <li>
              <button type="button" onClick={openPreferences} className="text-left text-[14px] transition hover:text-white">
                Cookie Preferences
              </button>
            </li>
          </FooterColumn>

          <FooterColumn title="Connect">
            <FooterLink href="mailto:hello@dbmind.ai">hello@dbmind.ai</FooterLink>
          </FooterColumn>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-7">
          <span className="text-[13px]">© 2026 DBMind AI. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h5 className="mb-4 font-mono text-[12.5px] font-semibold text-white">{title.toUpperCase()}</h5>
      <ul className="flex flex-col gap-2.5 text-[14px]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="transition hover:text-white">
        {children}
      </Link>
    </li>
  );
}
