import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/seo/JsonLd';
import { getServiceSchema, getBreadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Database Migration & Modernization Consulting',
  description:
    'Homogeneous and cross-platform database migration, AI-assisted migration assessment, and a structured migration approach — SQL Server, PostgreSQL, MySQL, Oracle, MongoDB.',
  alternates: { canonical: '/migration' },
  openGraph: {
    title: 'Database Migration & Modernization — DBMind AI',
    description: 'Move your database with confidence — version upgrades, cloud migrations, and cross-platform transformations.',
    url: '/migration',
    type: 'website',
  },
};

const MIGRATION_TYPES = [
  {
    title: 'Homogeneous migration',
    tagline: 'Same database technology. Modern platform.',
    body: 'Move from one version, infrastructure, or deployment model to another while retaining the same database technology.',
    examples: ['SQL Server 2012 → SQL Server 2022', 'On-premises → Azure SQL Managed Instance', 'On-premises → SQL Server on AWS'],
  },
  {
    title: 'Heterogeneous migration',
    tagline: 'Move across database technologies.',
    body: 'Transform data and workloads from one database platform to another, addressing schema, SQL, data type, and application differences.',
    examples: ['Oracle → PostgreSQL', 'SQL Server → PostgreSQL', 'MySQL → PostgreSQL'],
  },
];

const APPROACH = [
  { title: 'Discover', body: 'Inventory databases, workloads, dependencies and infrastructure.' },
  { title: 'Assess', body: 'Analyze compatibility, complexity, risks and migration effort.' },
  { title: 'Plan', body: 'Define architecture, migration method, downtime and rollback strategy.' },
  { title: 'Test', body: 'Perform trial migration and validate applications and workloads.' },
  { title: 'Migrate', body: 'Execute production migration and cutover.' },
  { title: 'Validate', body: 'Validate data, applications, performance and functionality.' },
  { title: 'Optimize', body: 'Tune the target environment and stabilize production.' },
];


const serviceSchema = getServiceSchema({
  name: 'Database Migration & Modernization',
  description: 'Homogeneous and cross-platform database migration, AI-assisted migration assessment, and a structured migration approach.',
  url: '/migration',
});
const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Migration & Modernization', url: '/migration' },
]);

export default function MigrationPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Hero
        breadcrumbLabel="Migration & Modernization"
        eyebrow="Database migration & modernization"
        title="Move your database with confidence."
        lead="From version upgrades and cloud migrations to complex cross-platform transformations, DBMind AI combines database engineering expertise with AI-assisted assessment and migration planning."
        primaryCta={{ label: 'Get a Migration Assessment', href: '/contact?service=migration' }}
        secondaryCta={{ label: 'Talk to a Migration Engineer', href: '/contact' }}
      />

      <section className="py-20">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <h2 className="mb-10 max-w-[560px] text-[30px] font-extrabold text-navy">Migration expertise</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {MIGRATION_TYPES.map((type) => (
              <div key={type.title} className="rounded-l border border-line bg-white p-7">
                <h3 className="text-[19px] font-bold text-navy">{type.title}</h3>
                <p className="mt-1 text-[14.5px] font-semibold text-indigo">{type.tagline}</p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-mute">{type.body}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {type.examples.map((ex) => (
                    <li key={ex} className="rounded-s bg-bg-soft2 px-3 py-2 font-mono text-[13px] text-navy">
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-soft py-20">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <h2 className="mb-10 max-w-[560px] text-[30px] font-extrabold text-navy">A structured migration approach</h2>
          <ol className="flex flex-col">
            {APPROACH.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[40px_1fr] gap-5">
                <div className="flex flex-col items-center">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy font-mono text-[13px] font-semibold text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {i < APPROACH.length - 1 && <span className="mt-1.5 w-px flex-1 bg-line" />}
                </div>
                <div className="pb-8">
                  <h4 className="text-[16.5px] font-bold text-navy">{step.title}</h4>
                  <p className="mt-1.5 max-w-md text-[14px] leading-relaxed text-ink-mute">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-navy py-20 text-center text-white">
        <div className="mx-auto max-w-[640px] px-5 sm:px-8">
          <h2 className="text-[32px] font-extrabold">Planning a database migration?</h2>
          <p className="mt-4 text-[16.5px] text-[#A9B2CC]">
            Let&apos;s assess your environment, identify migration risks, and build a practical migration strategy
            before you move production workloads.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Link href="/contact?service=migration" className="rounded-s bg-white px-6 py-3.5 text-[14.5px] font-semibold text-navy hover:bg-[#E7ECFF]">
              Request a Migration Assessment
            </Link>
            <Link href="/contact" className="rounded-s border border-white/15 px-6 py-3.5 text-[14.5px] font-semibold text-white hover:bg-white/5">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
