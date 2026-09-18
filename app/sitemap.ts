import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

const routes = ['', '/migration', '/performance', '/health-assessment', '/ai-consulting', '/contact', '/privacy', '/terms', '/cookies'];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
