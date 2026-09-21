'use client';

const CONTACT_EMAIL = 'databasedoctor@dbmindai.com';

export function SchedulingCard() {
  const provider = process.env.NEXT_PUBLIC_SCHEDULING_PROVIDER;
  const schedulingUrl = process.env.NEXT_PUBLIC_SCHEDULING_URL;
  const isConnected = Boolean(provider && provider !== 'none' && schedulingUrl);

  return (
    <div className="mx-auto max-w-md rounded-m border border-line bg-white p-6 text-left shadow-card">
      <p className="text-[15px] font-semibold text-navy">Want to speak with a database engineer?</p>
      <p className="mt-1.5 text-[13.5px] text-ink-mute">
        Optional — schedule a short call to walk through your environment directly.
      </p>

      {isConnected ? (
        <a
          href={schedulingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex rounded-s bg-indigo px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#3049C4]"
        >
          View available times
        </a>
      ) : (
        // No scheduling tool configured — a mailto CTA is a real, working
        // next step rather than a broken/absent one, and never exposes any
        // internal configuration detail to a visitor.
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Scheduling a call — database assessment')}`}
          className="mt-4 inline-flex rounded-s bg-indigo px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#3049C4]"
        >
          Email to set up a time
        </a>
      )}
    </div>
  );
}
