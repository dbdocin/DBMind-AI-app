'use client';

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
        <div className="mt-4 rounded-s border border-dashed border-line bg-bg-soft p-3.5 text-[12.5px] text-ink-faint">
          Scheduling isn&apos;t connected in this environment yet — no real availability is shown. Once a provider
          (e.g. Cal.com, SavvyCal) is configured via <code className="font-mono">NEXT_PUBLIC_SCHEDULING_URL</code>,
          this becomes a live &quot;View available times&quot; link.
        </div>
      )}
    </div>
  );
}
