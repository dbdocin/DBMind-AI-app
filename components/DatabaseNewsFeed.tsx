import { getDatabaseNews, formatRelativeTime } from '@/lib/newsFeed';

const SOURCE_COLORS: Record<string, { bg: string; text: string }> = {
  InfoQ: { bg: 'bg-indigo/10', text: 'text-indigo' },
  AWS: { bg: 'bg-[#F3C77A]/15', text: 'text-[#8A5A22]' },
  Percona: { bg: 'bg-good/10', text: 'text-good' },
  MongoDB: { bg: 'bg-good/10', text: 'text-good' },
};

/**
 * Server Component — fetches live, ISR-cached (1hr) items from lib/newsFeed.
 * Renders nothing at all if every source failed this cycle, rather than an
 * empty-looking section; this is a homepage enhancement, not load-bearing
 * content, so it should fail silently.
 */
export async function DatabaseNewsFeed() {
  const items = await getDatabaseNews();
  if (items.length === 0) return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <div className="mb-10 max-w-[560px]">
          <h2 className="text-[30px] font-extrabold text-navy sm:text-[34px]">Recent in the database world</h2>
          <p className="mt-3 text-[15px] text-ink-mute">Pulled from engineering blogs we actually read, updated automatically.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const colors = SOURCE_COLORS[item.source] ?? { bg: 'bg-bg-soft2', text: 'text-ink-mute' };
            return (
              <a
                key={item.link}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col rounded-m border border-line bg-white p-5 transition hover:border-indigo/30 hover:shadow-cardHover"
              >
                <span className={`inline-block w-fit rounded-s px-2.5 py-1 text-[11px] font-semibold ${colors.bg} ${colors.text}`}>
                  {item.source}
                </span>
                <p className="mt-3 flex-1 text-[14.5px] font-semibold leading-snug text-navy">{item.title}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[12px] text-ink-faint">{formatRelativeTime(item.publishedAt)}</span>
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-indigo" aria-hidden="true">
                    <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
