import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AssessmentWizard } from '@/components/assessment/AssessmentWizard';

export const metadata: Metadata = {
  title: 'Get a Database Assessment',
  description: 'Tell us about your database environment and a database engineer will follow up with next steps.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Get a Database Assessment — DBMind AI',
    description: 'Start a database assessment request — migration, performance, reliability, security, or AI-assisted optimization.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <section className="bg-bg-soft py-16 sm:py-20">
      <div className="mx-auto max-w-[760px] px-5 sm:px-8">
        <div className="mb-9 text-center">
          <span className="font-mono text-[12.5px] font-medium text-indigo">Let&apos;s talk</span>
          <h1 className="mt-2.5 text-[32px] font-extrabold text-navy sm:text-[36px]">Get a database assessment</h1>
          <p className="mx-auto mt-3 max-w-[520px] text-[15.5px] leading-relaxed text-ink-mute">
            Tell us about your environment — a database engineer reviews every request and follows up with next
            steps. No commitment, no sales queue.
          </p>
        </div>

        <Suspense fallback={<div className="rounded-l border border-line bg-white p-8 text-center text-ink-mute">Loading form…</div>}>
          <AssessmentWizard />
        </Suspense>
      </div>
    </section>
  );
}
