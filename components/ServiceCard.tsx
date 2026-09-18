import Link from 'next/link';
import type { ReactNode } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
}

export function ServiceCard({ icon, title, description, href, ctaLabel }: ServiceCardProps) {
  return (
    <div className="flex flex-col rounded-m border border-line bg-white p-7 transition hover:border-indigo/30 hover:shadow-cardHover">
      <div className="mb-5 flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-navy text-white">{icon}</div>
      <h3 className="text-[17px] font-bold text-navy">{title}</h3>
      <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-ink-mute">{description}</p>
      <Link href={href} className="mt-4 inline-flex w-fit items-center gap-1.5 text-[13.5px] font-semibold text-indigo">
        {ctaLabel}
      </Link>
    </div>
  );
}
