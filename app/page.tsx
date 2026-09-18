import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { ServiceSection } from '@/components/ServiceSection';
import { AIShowcase } from '@/components/AIShowcase';
import { DatabaseNewsFeed } from '@/components/DatabaseNewsFeed';

export const metadata: Metadata = {
  title: 'AI-Powered Database Consulting & Migration',
  description:
    'DBMind AI combines database engineering expertise with AI-assisted analysis — migration, performance optimization, reliability engineering, and AI-powered database operations.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'AI-Powered Database Consulting & Migration — DBMind AI',
    description:
      'Modernize, migrate, optimize, and operate your databases with expert database engineering and AI-assisted analysis.',
    url: '/',
    type: 'website',
  },
};

function HomeHeroVisual() {
  const steps = [
    { tag: 'DATABASE ENVIRONMENT', title: 'SQL Server · PostgreSQL · AWS', sub: 'workloads · schemas · replicas' },
    { tag: 'DBMIND AI ENGINE', title: 'Query · Metrics · Execution Plan', accent: true },
    { tag: 'INTELLIGENT INSIGHTS', title: 'Performance · Cost · Reliability', sub: '4 signals analyzed' },
    { tag: 'OPTIMIZATION ACTIONS', title: 'Tune · Automate · Fix' },
  ];
  return (
    <div className="flex flex-col">
      {steps.map((s, i) => (
        <div key={s.tag}>
          <div className={`rounded-m border p-5 shadow-card ${s.accent ? 'border-navy bg-gradient-to-b from-navy to-navy-2 text-white' : 'border-line bg-white'}`}>
            <div className={`font-mono text-[11.5px] font-semibold ${s.accent ? 'text-[#9FB2FF]' : 'text-indigo'}`}>{s.tag}</div>
            <div className={`mt-1 text-[15.5px] font-bold ${s.accent ? 'text-white' : 'text-navy'}`}>{s.title}</div>
            {s.sub && <div className={`mt-1.5 font-mono text-[12.5px] ${s.accent ? 'text-[#A9B2CC]' : 'text-ink-faint'}`}>{s.sub}</div>}
          </div>
          {i < steps.length - 1 && (
            <div className="relative flex justify-center py-2.5">
              <div className="absolute inset-y-0 left-1/2 w-[2.5px] -translate-x-1/2 bg-gradient-to-b from-indigo/10 via-indigo/60 to-brandPurple/10" />
              <span className="relative z-10 flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-indigo/50 bg-gradient-to-br from-[#EEF1FE] to-[#F4F1FD] shadow-[0_2px_8px_rgba(58,85,217,0.12)]">
                <svg viewBox="0 0 16 22" fill="none" className="h-3 w-3">
                  <path d="M8 0v18M8 18l-5-5M8 18l5-5" stroke="#3A55D9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const FAQS = [
  {
    q: 'What does a database assessment cost?',
    a: 'The initial assessment request is free — you tell us about your environment, and a database engineer reviews it before we recommend a scope. Any paid engagement gets a clear quote before billable work begins.',
  },
  {
    q: 'Will AI make changes to our database automatically?',
    a: 'No. AI-assisted analysis produces recommendations, not autonomous changes. A database engineer reviews findings against your environment before anything touches production.',
  },
  {
    q: 'Is our database information safe with you?',
    a: 'We ask that credentials, connection strings, and sensitive customer data never be submitted through our forms. Technical details shared during an engagement are treated as confidential.',
  },
  {
    q: 'What database platforms do you support?',
    a: 'SQL Server, PostgreSQL, MySQL, Oracle, and MongoDB, across on-premises, Azure, and AWS.',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="AI-Powered Database Consulting & Migration"
        title="Database consulting, migration & optimization — powered by AI."
        lead="Modernize, migrate, optimize, and operate your databases with expert database engineering and AI-assisted analysis."
        primaryCta={{ label: 'Get a Database Assessment', href: '/contact' }}
        secondaryCta={{ label: 'Explore Migration Services', href: '/migration' }}
        visual={<HomeHeroVisual />}
      />

      <TrustBar />
      <ServiceSection />

      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <div className="mx-auto grid max-w-container gap-14 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <h2 className="text-[32px] font-extrabold leading-tight sm:text-[36px]">Bring AI into your database operations</h2>
            <p className="mt-4 max-w-[460px] text-[16.5px] text-[#A9B2CC]">
              Use AI to understand database behavior, identify performance problems, and accelerate operational
              decisions — reviewed by database engineers before recommendations reach you.
            </p>
            <Link href="/ai-consulting" className="mt-7 inline-flex rounded-s bg-white px-6 py-3.5 text-[14.5px] font-semibold text-navy transition hover:bg-[#E7ECFF]">
              Explore AI database solutions
            </Link>
          </div>
          <AIShowcase />
        </div>
      </section>

      <DatabaseNewsFeed />

      <section className="py-24">
        <div className="mx-auto max-w-[760px] px-5 sm:px-8">
          <h2 className="mb-10 text-[32px] font-extrabold text-navy sm:text-[38px]">Common questions</h2>
          <div className="flex flex-col">
            {FAQS.map((item) => (
              <details key={item.q} className="group border-b border-line first:border-t">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-[22px] text-[16px] font-semibold text-navy">
                  {item.q}
                  <span className="relative h-5 w-5 flex-shrink-0">
                    <span className="absolute left-[3px] top-[9px] h-0.5 w-3.5 rounded bg-indigo" />
                    <span className="absolute left-[9px] top-[3px] h-3.5 w-0.5 rounded bg-indigo transition-transform group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <div className="max-w-[640px] pb-[22px]">
                  <p className="text-[14.5px] leading-relaxed text-ink-mute">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
