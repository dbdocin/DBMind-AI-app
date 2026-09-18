import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/Hero';

export const metadata: Metadata = {
  title: 'Database Performance & Reliability Consulting',
  description:
    'Diagnose slow queries, indexing issues, blocking, deadlocks, and resource bottlenecks — database performance optimization and reliability engineering.',
  alternates: { canonical: '/performance' },
  openGraph: {
    title: 'Database Performance & Reliability — DBMind AI',
    description: 'Find and fix what is slowing your database down, with a clear before/after baseline.',
    url: '/performance',
    type: 'website',
  },
};

const SYMPTOMS = [
  { title: 'Slow queries', body: 'Execution times climbing under load, timeouts on customer-facing paths.' },
  { title: 'Blocking & deadlocks', body: 'Transactions waiting on each other, intermittent failures under concurrency.' },
  { title: 'Resource bottlenecks', body: 'CPU, memory, or I/O saturating well below expected workload levels.' },
  { title: 'Unpredictable performance', body: 'Behavior that changes with data growth or after routine deployments.' },
];

const WHAT_WE_LOOK_AT = [
  'Query and execution plan analysis',
  'Indexing strategy and fragmentation',
  'Blocking chains and lock contention',
  'Resource utilization baselines',
  'Configuration and parameter tuning',
  'Workload pattern analysis',
];

export default function PerformancePage() {
  return (
    <>
      <Hero
        breadcrumbLabel="Performance"
        eyebrow="Performance & reliability"
        title="Find and fix what's slowing your database down."
        lead="Diagnose slow queries, indexing issues, blocking, deadlocks, and resource bottlenecks — with a clear baseline before and after any change."
        primaryCta={{ label: 'Get a Performance Assessment', href: '/contact?service=performance' }}
        secondaryCta={{ label: 'Talk to an Engineer', href: '/contact' }}
      />

      <section className="py-20">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <h2 className="mb-10 max-w-[560px] text-[30px] font-extrabold text-navy">Common symptoms we diagnose</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SYMPTOMS.map((s) => (
              <div key={s.title} className="rounded-m border border-line bg-white p-6">
                <h3 className="text-[16px] font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-mute">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-soft py-20">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <h2 className="mb-8 max-w-[560px] text-[30px] font-extrabold text-navy">What we look at</h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_WE_LOOK_AT.map((item) => (
              <li key={item} className="flex items-center gap-2.5 rounded-s border border-line bg-white px-4 py-3 text-[14px] text-ink-mute">
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 flex-shrink-0 text-indigo" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-navy py-20 text-center text-white">
        <div className="mx-auto max-w-[640px] px-5 sm:px-8">
          <h2 className="text-[32px] font-extrabold">Dealing with a performance problem right now?</h2>
          <p className="mt-4 text-[16.5px] text-[#A9B2CC]">
            Tell us what you&apos;re seeing and we&apos;ll help you scope a focused diagnostic before it becomes an
            incident.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Link href="/contact?service=performance" className="rounded-s bg-white px-6 py-3.5 text-[14.5px] font-semibold text-navy hover:bg-[#E7ECFF]">
              Get a Performance Assessment
            </Link>
            <Link href="/contact" className="rounded-s border border-white/15 px-6 py-3.5 text-[14.5px] font-semibold text-white hover:bg-white/5">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
