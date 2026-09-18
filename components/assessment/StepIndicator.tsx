const STEPS = ['Contact', 'Your database', 'Project & consent'];

export function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <ol className="mb-8 flex items-center gap-3" aria-label="Assessment form progress">
      {STEPS.map((label, index) => {
        const stepNumber = index + 1;
        const isComplete = index < currentStep;
        const isCurrent = index === currentStep;
        return (
          <li key={label} className="flex flex-1 items-center gap-3">
            <div className="flex items-center gap-2.5">
              <span
                aria-current={isCurrent ? 'step' : undefined}
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full font-mono text-[12px] font-semibold ${
                  isComplete
                    ? 'bg-indigo text-white'
                    : isCurrent
                      ? 'border-2 border-indigo text-indigo'
                      : 'border border-line text-ink-faint'
                }`}
              >
                {isComplete ? (
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </span>
              <span className={`hidden text-[13.5px] font-medium sm:inline ${isCurrent ? 'text-navy' : 'text-ink-faint'}`}>
                {label}
              </span>
            </div>
            {stepNumber < STEPS.length && <div className={`h-px flex-1 ${isComplete ? 'bg-indigo' : 'bg-line'}`} />}
          </li>
        );
      })}
    </ol>
  );
}
