import type { WizardStatus } from '@/types/assessment';

interface FormNavigationProps {
  step: number;
  totalSteps: number;
  status: WizardStatus;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function FormNavigation({ step, totalSteps, status, onBack, onNext, onSubmit }: FormNavigationProps) {
  const isLastStep = step === totalSteps - 1;
  const isBusy = status === 'validating' || status === 'submitting';

  return (
    <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
      <button
        type="button"
        onClick={onBack}
        disabled={step === 0 || isBusy}
        className="rounded-s border border-line px-5 py-2.5 text-[14.5px] font-semibold text-navy transition hover:bg-bg-soft disabled:cursor-not-allowed disabled:opacity-40"
      >
        Back
      </button>

      {isLastStep ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isBusy}
          className="inline-flex items-center gap-2 rounded-s bg-indigo px-6 py-2.5 text-[14.5px] font-semibold text-white shadow-[0_1px_2px_rgba(58,85,217,0.25)] transition hover:bg-[#3049C4] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' && (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
              <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
          {status === 'submitting' ? 'Submitting…' : 'Request my assessment'}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="rounded-s bg-indigo px-6 py-2.5 text-[14.5px] font-semibold text-white shadow-[0_1px_2px_rgba(58,85,217,0.25)] transition hover:bg-[#3049C4]"
        >
          Next
        </button>
      )}
    </div>
  );
}
