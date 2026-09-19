import { getSiteUrl } from './site';

// Centralized so every page builds structured data the same way — a schema
// error fixed here fixes it everywhere it's used, rather than hunting
// through per-page duplicated JSON-LD objects.

export function getOrganizationSchema() {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'DBMind AI',
    url: siteUrl,
    logo: `${siteUrl}/favicon.svg`,
    image: `${siteUrl}/opengraph-image`,
    description:
      'AI-powered database consulting, migration, and optimization. Expert database engineering across SQL Server, PostgreSQL, MySQL, Oracle, MongoDB, Azure, and AWS.',
    email: 'databasedoctor@dbmindai.com',
    areaServed: 'Worldwide',
    knowsAbout: [
      'Database migration',
      'Database performance optimization',
      'Database reliability engineering',
      'High availability and disaster recovery',
      'Database security',
      'AI-assisted database optimization',
      'SQL Server',
      'PostgreSQL',
      'MySQL',
      'Oracle Database',
      'MongoDB',
    ],
  };
}

export function getServiceSchema(opts: { name: string; description: string; url: string }) {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: `${siteUrl}${opts.url}`,
    provider: {
      '@type': 'ProfessionalService',
      name: 'DBMind AI',
      url: siteUrl,
    },
    areaServed: 'Worldwide',
  };
}

export function getFaqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}
