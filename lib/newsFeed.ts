import Parser from 'rss-parser';

// Real, currently-active feeds as of build time. Each is fetched
// independently and defensively — a dead or slow feed never breaks the
// homepage; it's simply excluded from that render/revalidation cycle.
const FEED_SOURCES = [
  { name: 'InfoQ', url: 'https://feed.infoq.com/rdbms/news/' },
  { name: 'AWS', url: 'https://aws.amazon.com/blogs/database/feed/' },
  { name: 'Percona', url: 'https://www.percona.com/blog/feed/' },
  { name: 'MongoDB', url: 'https://www.mongodb.com/blog/rss' },
] as const;

const FETCH_TIMEOUT_MS = 5000;
const MAX_ITEMS = 4;
// How long Next.js caches this data before refetching — a real "live" feed,
// just not refetched on every single page view.
const REVALIDATE_SECONDS = 3600;

export interface NewsItem {
  title: string;
  link: string;
  source: string;
  publishedAt: string; // ISO string; may be empty if the feed omitted a date
}

const parser = new Parser();

async function fetchFeed(source: (typeof FEED_SOURCES)[number]): Promise<NewsItem[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(source.url, {
      signal: controller.signal,
      // Next.js-specific: this is what actually makes the feed "live" —
      // cached for an hour, then transparently refetched on the next
      // request after that, rather than hit on every single page view.
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { 'User-Agent': 'DBMindAI-NewsFeed/1.0 (+https://dbmindai.com)' },
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const feed = await parser.parseString(xml);

    return (feed.items ?? [])
      .filter((item) => item.title && item.link)
      .map((item) => ({
        title: item.title!.trim(),
        link: item.link!,
        source: source.name,
        publishedAt: item.isoDate ?? item.pubDate ?? '',
      }));
  } catch {
    // Network failure, timeout, malformed XML — all treated the same way:
    // this source contributes nothing this cycle, nothing throws upward.
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Aggregates recent items across all configured feeds. Never throws — a
 * total outage across every source simply returns an empty array, and the
 * calling component is expected to render nothing in that case rather than
 * an empty-looking section.
 */
export async function getDatabaseNews(): Promise<NewsItem[]> {
  const results = await Promise.allSettled(FEED_SOURCES.map(fetchFeed));

  const items = results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));

  return items
    .filter((item) => item.publishedAt) // undated items sort unreliably; skip them
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, MAX_ITEMS);
}

export function formatRelativeTime(isoDate: string): string {
  const then = new Date(isoDate).getTime();
  if (Number.isNaN(then)) return '';
  const diffMs = Date.now() - then;
  const diffMinutes = Math.round(diffMs / 60000);
  if (diffMinutes < 60) return diffMinutes <= 1 ? 'just now' : `${diffMinutes} minutes ago`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  const diffWeeks = Math.round(diffDays / 7);
  if (diffWeeks < 5) return `${diffWeeks} week${diffWeeks === 1 ? '' : 's'} ago`;
  const diffMonths = Math.round(diffDays / 30);
  return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;
}
