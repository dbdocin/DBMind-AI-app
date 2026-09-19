import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/seo/JsonLd';
import { getServiceSchema, getBreadcrumbSchema } from '@/lib/structuredData';
import { AIShowcase } from '@/components/AIShowcase';

export const metadata: Metadata = {
  title: 'AI-Powered Database Optimization Consulting',
  description:
    'AI-assisted database analysis for assessment, root-cause analysis, and optimization — recommendations reviewed by database engineers before they reach you.',
  alternates: { canonical: '/ai-consulting' },
  openGraph: {
    title: 'AI-Powered Database Optimization — DBMind AI',
    description: 'AI-assisted database engineering, not a black box.',
    url: '/ai-consulting',
    type: 'website',
  },
};

const LIFECYCLE = [
  { title: 'Assessment', body: 'Rapidly inventory environments and flag compatibility and risk before a project begins.' },
  { title: 'Analysis', body: 'Correlate query plans, metrics, and logs to find root causes faster than manual review.' },
  { title: 'Planning', body: 'Model migration and optimization options, and estimate effort, risk, and impact.' },
  { title: 'Optimization', body: 'Recommend indexing, query, and configuration changes ranked by impact.' },
  { title: 'Automation', body: 'Apply low-risk, pre-approved changes automatically, on your schedule.' },
  { title: 'Validation', body: 'Confirm outcomes against baselines after every change is applied.' },
];

const PRINCIPLES = [
  { title: 'Recommendations, not autonomous changes', body: 'AI surfaces options; your team and ours decide what gets applied and when.' },
  { title: 'Explainable by design', body: 'Every recommendation includes the evidence and reasoning behind it.' },
  { title: 'Engineer-reviewed', body: 'Database engineers validate AI findings against your environment before production.' },
  { title: 'Full audit trail', body: 'Every recommendation, decision, and change is logged for compliance and review.' },
];


const serviceSchema = getServiceSchema({
  name: 'AI-Powered Database Optimization',
  description: 'AI-assisted database analysis for assessment, root-cause analysis, and optimization, reviewed by database engineers.',
  url: '/ai-consulting',
});
const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'AI Consulting', url: '/ai-consulting' },
]);

export default function AiConsultingPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Hero
        breadcrumbLabel="AI Consulting"
        eyebrow="AI for databases"
        title="AI-assisted database engineering, not a black box."
        lead="DBMind AI uses AI to accelerate assessment, analysis, planning, optimization, automation, and validation — with database engineers reviewing every recommendation before it touches production."
        primaryCta={{ label: 'Get an AI-Assisted Assessment', href: '/contact?service=ai-consulting' }}
        secondaryCta={{ label: 'Talk to an Engineer', href: '/contact' }}
      />

      <section className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-[820px] px-5 sm:px-8">
          <h2 className="text-center text-[28px] font-extrabold">AI analysis, live on your workload</h2>
          <p className="mx-auto mt-3 max-w-[520px] text-center text-[15.5px] text-[#A9B2CC]">
            A live view of workload health, with AI recommendations ranked by impact.
          </p>
          <div className="mt-10">
            <AIShowcase />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <h2 className="mb-10 max-w-[600px] text-[30px] font-extrabold text-navy">Where AI fits into database engineering</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {LIFECYCLE.map((l) => (
              <div key={l.title} className="rounded-m border border-line bg-white p-6">
                <h3 className="text-[16px] font-bold text-navy">{l.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-mute">{l.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-soft py-20">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <h2 className="mb-3 max-w-[600px] text-[30px] font-extrabold text-navy">AI-assisted, engineer-validated</h2>
          <p className="mb-10 max-w-[600px] text-[15px] leading-relaxed text-ink-mute">
            AI accelerates the work — it doesn&apos;t replace engineering judgment.
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="rounded-m border border-line bg-white p-6">
                <h3 className="text-[15px] font-bold text-navy">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-mute">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 text-center text-white">
        <div className="mx-auto max-w-[640px] px-5 sm:px-8">
          <h2 className="text-[32px] font-extrabold">See what AI can find in your database.</h2>
          <p className="mt-4 text-[16.5px] text-[#A9B2CC]">
            Get a structured, AI-assisted assessment of your environment — reviewed by database engineers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Link
              href="/contact?service=ai-consulting"
              className="rounded-s bg-white px-6 py-3.5 text-[14.5px] font-semibold text-navy hover:bg-[#E7ECFF]"
            >
              Get an AI-Assisted Assessment
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
