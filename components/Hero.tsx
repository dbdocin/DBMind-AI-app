import Link from 'next/link';
import type { ReactNode } from 'react';

interface CtaLink {
  label: string;
  href: string;
}

interface HeroProps {
  eyebrow?: string;
  title: string;
  lead: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  breadcrumbLabel?: string;
  visual?: ReactNode;
}

export function Hero({ eyebrow, title, lead, primaryCta, secondaryCta, breadcrumbLabel, visual }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white pb-20 pt-16 sm:pt-[76px]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(900px 420px at 82% -10%, rgba(90,115,240,0.10), transparent 60%)' }}
        aria-hidden="true"
      />
      <div className={`relative mx-auto max-w-container px-5 sm:px-8 ${visual ? 'grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center' : ''}`}>
        <div className={visual ? '' : 'max-w-[760px]'}>
          {breadcrumbLabel && (
            <div className="mb-1.5 text-[13.5px] text-ink-faint">
              <Link href="/" className="text-ink-mute hover:text-indigo">
                Home
              </Link>{' '}
              / {breadcrumbLabel}
            </div>
          )}
          {eyebrow && <span className="font-mono text-[12.5px] font-medium text-indigo">{eyebrow}</span>}
          <h1 className="mt-[18px] text-[34px] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-[44px] lg:text-[54px]">
            {title}
          </h1>
          <p className="mt-[22px] max-w-[560px] text-[18px] leading-relaxed text-ink-mute">{lead}</p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link
              href={primaryCta.href}
              className="rounded-s bg-indigo px-6 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_1px_2px_rgba(58,85,217,0.25)] transition hover:bg-[#3049C4]"
            >
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="rounded-s border border-line px-6 py-3.5 text-[14.5px] font-semibold text-navy transition hover:border-navy hover:bg-bg-soft"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
        {visual}
      </div>
    </section>
  );
}
