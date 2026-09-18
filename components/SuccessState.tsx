import Link from 'next/link';
import { SchedulingCard } from './SchedulingCard';

export function SuccessState({ referenceId }: { referenceId: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-good/10">
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-good" aria-hidden="true">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-navy">Assessment request received</h2>
      <p className="mt-2 text-[14.5px] text-ink-mute">Thank you. Your request has been received.</p>

      <div className="mx-auto mt-5 inline-block rounded-s border border-line bg-bg-soft px-5 py-3">
        <span className="block font-mono text-[11px] text-ink-faint">REFERENCE</span>
        <span className="font-mono text-base font-semibold text-navy">{referenceId}</span>
      </div>

      <p className="mx-auto mt-5 max-w-md text-[14px] leading-relaxed text-ink-mute">
        A database engineer will review the information and follow up with next steps. This reference number is for
        your records — it is not an assessment result.
      </p>

      <div className="mt-8">
        <SchedulingCard />
      </div>

      <Link href="/" className="mt-6 inline-block text-[14px] font-semibold text-indigo">
        Return to the DBMind AI homepage
      </Link>
    </div>
  );
}
