const BADGES = ['SQL Server', 'PostgreSQL', 'MySQL', 'Oracle', 'MongoDB', 'Azure', 'AWS'];

export function TrustBar() {
  return (
    <div className="border-y border-line bg-bg-soft py-10">
      <div className="mx-auto flex max-w-container flex-wrap items-center justify-between gap-6 px-5 sm:px-8">
        <span className="flex-shrink-0 text-[13.5px] font-medium text-ink-faint">
          Database expertise across modern enterprise platforms
        </span>
        <div className="flex flex-wrap gap-2.5">
          {BADGES.map((b) => (
            <span key={b} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink-mute">
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
