interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  updated: string;
  sections: LegalSection[];
}

export function LegalPage({ eyebrow, title, updated, sections }: LegalPageProps) {
  return (
    <>
      <section className="py-16">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <span className="font-mono text-[14px] font-semibold tracking-wide text-indigo">{eyebrow}</span>
          <h1 className="mt-3.5 text-[32px] font-extrabold text-navy sm:text-[38px]">{title}</h1>
          <div className="mt-2.5 font-mono text-[13px] text-ink-faint">{updated}</div>
        </div>
      </section>

      <section className="pb-24 pt-5">
        <div className="mx-auto grid max-w-container grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[240px_1fr] lg:gap-14">
          <nav aria-label="Sections" className="flex flex-row flex-wrap gap-2 lg:sticky lg:top-24 lg:flex-col lg:gap-0.5 lg:self-start">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-line px-3 py-1.5 text-[13px] text-ink-mute transition hover:text-navy lg:border-none lg:border-l-2 lg:border-transparent lg:px-3.5 lg:py-1.5 lg:hover:border-line"
              >
                {s.title}
              </a>
            ))}
          </nav>

          <div>
            {sections.map((s, i) => (
              <div key={s.id} id={s.id} className={`max-w-[680px] pb-9 ${i < sections.length - 1 ? 'mb-9 border-b border-line' : ''}`}>
                <h2 className="text-[20px] font-bold text-navy">
                  <span className="mr-2.5 font-mono text-[13px] font-semibold text-indigo">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>
                <div className="mt-3 flex flex-col gap-2.5 text-[14.5px] leading-relaxed text-ink-mute">{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
