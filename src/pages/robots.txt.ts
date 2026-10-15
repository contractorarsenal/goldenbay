import type { APIRoute } from 'astro';
import { business, abs } from '../data/business';

/** Previews and every build without PUBLIC_ALLOW_INDEXING=true disallow all crawling. Production allows it and points at the sitemap. */
export const GET: APIRoute = () => {
  const body = business.indexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap-index.xml')}\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
