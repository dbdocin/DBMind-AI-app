import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(900px 420px at 82% -10%, rgba(90,115,240,0.10), transparent 60%)' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-container px-5 text-center sm:px-8">
        <span className="font-mono text-[14px] font-semibold tracking-wide text-indigo">404</span>
        <h1 className="mt-3.5 text-[34px] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-[44px]">
          This page doesn&apos;t exist.
        </h1>
        <p className="mx-auto mt-[22px] max-w-[480px] text-[16.5px] leading-relaxed text-ink-mute">
          The page you&apos;re looking for may have been moved or never existed. Check the URL, or head back to
          somewhere useful.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/"
            className="rounded-s bg-indigo px-6 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_1px_2px_rgba(58,85,217,0.25)] transition hover:bg-[#3049C4]"
          >
            Back to homepage
          </Link>
          <Link
            href="/contact"
            className="rounded-s border border-line px-6 py-3.5 text-[14.5px] font-semibold text-navy transition hover:border-navy hover:bg-bg-soft"
          >
            Get a database assessment
          </Link>
        </div>
      </div>
    </section>
  );
}
