import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/Hero';

export const metadata: Metadata = {
  title: 'Database Health Assessment',
  description:
    'A structured assessment of database performance, reliability, security, configuration, and modernization opportunities — reviewed by database engineers.',
  alternates: { canonical: '/health-assessment' },
  openGraph: {
    title: 'Database Health Assessment — DBMind AI',
    description: 'Know the health of your database before it becomes a production problem.',
    url: '/health-assessment',
    type: 'website',
  },
};

const DIMENSIONS = [
  { title: 'Performance', body: 'Query patterns, indexing, and resource utilization against a real baseline.' },
  { title: 'Reliability', body: 'Availability, backup/recovery posture, and observability gaps.' },
  { title: 'Security', body: 'Authentication, encryption, access control, and audit coverage.' },
  { title: 'Configuration', body: 'Version-specific settings, deprecated features, and drift from best practice.' },
  { title: 'Modernization opportunities', body: 'Where a version upgrade, cloud move, or platform change would help most.' },
  { title: 'Cost', body: 'Right-sizing and licensing signals worth a second look.' },
];

export default function HealthAssessmentPage() {
  return (
    <>
      <Hero
        breadcrumbLabel="Health Assessment"
        eyebrow="Database health assessment"
        title="Know the health of your database."
        lead="Get a structured assessment of performance, reliability, security, configuration, and modernization opportunities — before small issues become production incidents."
        primaryCta={{ label: 'Request a Health Assessment', href: '/contact?service=health-assessment' }}
        secondaryCta={{ label: 'Talk to an Engineer', href: '/contact' }}
      />

      <section className="py-20">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <h2 className="mb-10 max-w-[560px] text-[30px] font-extrabold text-navy">What we assess</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DIMENSIONS.map((d) => (
              <div key={d.title} className="rounded-m border border-line bg-white p-6">
                <h3 className="text-[16px] font-bold text-navy">{d.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-mute">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-soft py-20">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <h2 className="mb-6 max-w-[600px] text-[30px] font-extrabold text-navy">What you get back</h2>
          <p className="max-w-[640px] text-[15px] leading-relaxed text-ink-mute">
            A structured, engineer-reviewed summary — what&apos;s working, what&apos;s at risk, and what to prioritize
            first — with clear next steps rather than a raw dashboard score. It&apos;s a starting point for a
            conversation, not an automated verdict.
          </p>
        </div>
      </section>

      <section className="bg-navy py-20 text-center text-white">
        <div className="mx-auto max-w-[640px] px-5 sm:px-8">
          <h2 className="text-[32px] font-extrabold">Want a clear picture of where things stand?</h2>
          <p className="mt-4 text-[16.5px] text-[#A9B2CC]">
            Request a health assessment and a database engineer will review your environment.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Link
              href="/contact?service=health-assessment"
              className="rounded-s bg-white px-6 py-3.5 text-[14.5px] font-semibold text-navy hover:bg-[#E7ECFF]"
            >
              Request a Health Assessment
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
