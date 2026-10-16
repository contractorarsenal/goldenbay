// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The production domain has not been supplied. Set PUBLIC_SITE_URL at build time.
// On Cloudflare Pages previews, CF_PAGES_URL (the deployment's own URL) is used so canonicals/OG/schema are not localhost.
// Indexing is controlled separately (PUBLIC_ALLOW_INDEXING) and is never enabled by this fallback.
if (!process.env.PUBLIC_SITE_URL && process.env.CF_PAGES_URL) process.env.PUBLIC_SITE_URL = process.env.CF_PAGES_URL;
const site = process.env.PUBLIC_SITE_URL || 'http://localhost:4321';

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Pages awaiting verified content are noindex and must stay out of the sitemap.  Project detail pages stay out until details exist.
      filter: (page) => !/\/(reviews|meet-david-lerma|request-estimate|privacy-policy|terms|accessibility|404)\/?$|\/projects\/.+|\/service-areas\/(santa-clara|sunnyvale|los-gatos|cupertino|campbell)\/?$/.test(page),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
