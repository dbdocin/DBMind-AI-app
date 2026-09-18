const METRICS = [
  { label: 'Query perf.', value: 82 },
  { label: 'CPU', value: 65 },
  { label: 'I/O', value: 48 },
];

export function AIShowcase() {
  return (
    <div className="rounded-l border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#E9825E]" />
          <span className="h-2 w-2 rounded-full bg-[#E3C15E]" />
          <span className="h-2 w-2 rounded-full bg-[#5EC98A]" />
        </div>
        <span className="font-mono text-[11.5px] text-[#A9B2CC]">PROD-CLUSTER-04 · sample data</span>
      </div>

      {METRICS.map((m) => (
        <div key={m.label} className="mb-3.5 grid grid-cols-[90px_1fr_40px] items-center gap-3.5">
          <span className="text-[13px] font-medium text-[#A9B2CC]">{m.label}</span>
          <div className="h-[7px] overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-2 to-brandPurple" style={{ width: `${m.value}%` }} />
          </div>
          <span className="text-right font-mono text-[12.5px] text-white">{m.value}%</span>
        </div>
      ))}

      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4 pt-1">
        <span className="text-[13px] text-[#A9B2CC]">Blocking sessions</span>
        <span className="rounded-[6px] bg-[#F3C77A]/10 px-2.5 py-1 font-mono text-[12.5px] text-[#F3C77A]">3 active</span>
      </div>

      <div className="rounded-m border border-indigo-2/25 bg-indigo-2/10 p-4">
        <div className="flex items-center gap-2 font-mono text-[11.5px] font-semibold text-[#9FB2FF]">
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="M12 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          AI RECOMMENDATION
        </div>
        <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#A9B2CC]">
          Query #1842 is experiencing increased execution time due to a missing index and elevated logical reads.
          Recommendation: create a non-clustered index on CustomerID.
        </p>
        <div className="mt-3 flex justify-between border-t border-white/10 pt-3 text-[12.5px]">
          <span className="text-[#A9B2CC]">Potential impact</span>
          <span className="font-mono font-semibold text-[#7CD9A6]">−62% execution time</span>
        </div>
      </div>

      <p className="mt-4 text-center text-[11.5px] italic text-[#A9B2CC]">
        Illustrative example. Actual metrics and recommendations depend on your environment.
      </p>
    </div>
  );
}
