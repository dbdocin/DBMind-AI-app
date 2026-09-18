import { ServiceCard } from './ServiceCard';

const ICON_PROPS = { viewBox: '0 0 24 24', fill: 'none', className: 'h-[21px] w-[21px]', 'aria-hidden': true } as const;

const SERVICES = [
  {
    title: 'Database Migration & Modernization',
    description: 'Move and modernize databases with minimal downtime and a clear rollback strategy — same-platform or cross-platform.',
    href: '/migration',
    ctaLabel: 'Get a Migration Assessment',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M4 16l6-6 4 4 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Performance Optimization',
    description: 'Identify slow queries, indexing issues, blocking, deadlocks, and resource bottlenecks before they cost you customers.',
    href: '/performance',
    ctaLabel: 'Get a Performance Assessment',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M4 19V9m6 10V5m6 14v-7m6 7v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Database Health Assessment',
    description: 'A structured review of performance, reliability, security, configuration, and modernization opportunities.',
    href: '/health-assessment',
    ctaLabel: 'Request a Health Assessment',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: 'AI-Powered Database Optimization',
    description: 'AI-assisted analysis identifies problems and recommends improvements — reviewed by engineers before anything ships.',
    href: '/ai-consulting',
    ctaLabel: 'Get an AI-Assisted Assessment',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
] as const;

const ALSO_AVAILABLE = [
  'Database Reliability Engineering',
  'High Availability & Disaster Recovery',
  'Database Security',
  'Database Automation',
  'Database Monitoring & Observability',
];

export function ServiceSection() {
  return (
    <section className="bg-bg-soft py-24">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <div className="mb-12 max-w-[640px]">
          <h2 className="text-[32px] font-extrabold text-navy sm:text-[38px]">Where we focus</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <ServiceCard key={s.href} {...s} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-m border border-line bg-white p-6">
          <span className="text-[14px] font-semibold text-navy">Also available:</span>
          {ALSO_AVAILABLE.map((label) => (
            <span key={label} className="rounded-full bg-bg-soft2 px-3.5 py-1.5 text-[13px] font-medium text-ink-mute">
              {label}
            </span>
          ))}
          <a href="/contact" className="ml-auto text-[13.5px] font-semibold text-indigo">
            Talk to us about any of these →
          </a>
        </div>
      </div>
    </section>
  );
}
