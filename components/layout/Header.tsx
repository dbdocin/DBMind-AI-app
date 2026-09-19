'use client';

import { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/migration', label: 'Migration' },
  { href: '/performance', label: 'Performance' },
  { href: '/health-assessment', label: 'Health Assessment' },
  { href: '/ai-consulting', label: 'AI Consulting' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-[100] border-b border-line bg-white/85 backdrop-blur-md">
        <nav className="mx-auto flex h-[72px] max-w-container items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5 text-[17px] font-bold text-navy">
            <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-gradient-to-br from-indigo to-brandPurple">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M4 6c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2Z" stroke="white" strokeWidth="1.6" />
                <path d="M4 6v12c0 1.1 3.6 2 8 2s8-.9 8-2V6" stroke="white" strokeWidth="1.6" />
                <path d="M4 12c0 1.1 3.6 2 8 2s8-.9 8-2" stroke="white" strokeWidth="1.6" />
              </svg>
            </span>
            DBMind AI
          </Link>

          {/* Desktop nav only — mobile version lives in the separate overlay
              below, deliberately rendered outside this header so it isn't a
              descendant of the backdrop-blur element (see overlay comment). */}
          <ul className="hidden lg:flex lg:items-center lg:gap-5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[14.5px] font-medium text-ink-mute transition hover:text-navy">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-shrink-0 items-center gap-4">
            <Link
              href="/contact"
              className="hidden rounded-s bg-indigo px-5 py-2.5 text-[13.5px] font-semibold text-white transition hover:bg-[#3049C4] lg:inline-flex"
            >
              Get a Database Assessment
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-6 w-6 flex-col justify-center gap-[5px] lg:hidden"
            >
              <span className="block h-0.5 w-full rounded bg-navy" />
              <span className="block h-0.5 w-full rounded bg-navy" />
              <span className="block h-0.5 w-full rounded bg-navy" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile off-canvas menu — deliberately a SIBLING of <header>, not a
          child of it. `backdrop-filter` (used above for the translucent
          sticky nav) makes its element a "containing block" for any
          `position: fixed` descendant in modern browsers — so a fixed
          element nested inside it anchors to that small 72px header box
          instead of the real viewport, causing exactly the glitchy
          partial-visibility-while-scrolling bug this fixes. Keeping this
          panel outside the blurred header entirely avoids the problem. */}
      <div
        className={`fixed inset-0 top-[72px] z-[90] flex flex-col gap-5 overflow-y-auto bg-white p-6 transition-transform duration-200 lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[17px] font-medium text-navy transition hover:text-indigo"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex rounded-s bg-indigo px-5 py-2.5 text-[14.5px] font-semibold text-white"
            >
              Get a Database Assessment
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
