# Gold Bay Builders: website

Static-first marketing site for **Gold Bay Builders Inc.** (provisional brand from the owner's business card; legal name unconfirmed) (San Jose, CA residential construction). *Building YOUR bay home.*

**Status:** feature-complete build on a feature branch; **not launch-ready**. See [docs/CONTENT-REQUIREMENTS.md](docs/CONTENT-REQUIREMENTS.md) and [docs/QA-REPORT.md](docs/QA-REPORT.md).

## Stack
Astro 7 · TypeScript · Tailwind CSS v4 (tokens in `src/styles/global.css`) · self-hosted Fraunces + Inter (`@fontsource`) · Cloudflare Pages. No server functions: the contact form and the estimate wizard submit to Web3Forms from the browser (see [docs/WEB3FORMS.md](docs/WEB3FORMS.md)). Client JS is limited to the menu, reveal-on-scroll, event push and the two forms.

## Commands
| | |
|---|---|
| `npm install` | install |
| `npm run dev` | dev server |
| `npm run check` | Astro/TypeScript diagnostics |
| `npm test` | unit tests (form validation) |
| `npm run build` | production build to `dist/` |
| `npm run verify` | post-build checks: titles, descriptions, canonicals, one H1, JSON-LD, internal links, sitemap vs noindex |
| `npx astro preview` then `node scripts/qa-browser.mjs` | Playwright QA: overflow, console errors, axe (WCAG 2.2 AA tags), mobile menu, estimate wizard |

## Environment variables
See `.env.example`. `PUBLIC_SITE_URL` (production domain) and `PUBLIC_ALLOW_INDEXING=true` must be set at build time for launch. **Without them every page is `noindex`.** Analytics IDs are optional; nothing loads until set. The forms need no server secrets: the Web3Forms public access key is in `src/lib/web3forms.ts`, and the receiving inbox is set in the Web3Forms dashboard.

## Where things live
- `src/data/`: **business.ts** (identity, license gate), services, locations, projects, process, faqs, nav
- `src/pages/`: routes · `src/components/`, `src/layouts/Base.astro` (SEO, JSON-LD, nav, tracking)
- `src/lib/estimate.ts`: estimate validation · `src/lib/web3forms.ts`: the shared Web3Forms submission for the estimate wizard and the contact form
- Adding a project: append to `src/data/projects.ts`; the case-study page is generated. Remove `projects` from the sitemap filter in `astro.config.mjs` once real projects exist.
- Confirming a city: set `confirmed: true` in `locations.ts` and remove the city from the sitemap filter.

## Deployment
See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). Never deploy to production without owner approval.
