# Golden Bay Builders: website

Static-first marketing site for **Golden Bay Builders Inc.** (San Jose, CA residential construction). *Building Your Bay Home.*

**Status:** feature-complete build on a feature branch; **not launch-ready**. See [docs/CONTENT-REQUIREMENTS.md](docs/CONTENT-REQUIREMENTS.md) and [docs/QA-REPORT.md](docs/QA-REPORT.md).

## Stack
Astro 7 · TypeScript · Tailwind CSS v4 (tokens in `src/styles/global.css`) · self-hosted Fraunces + Inter (`@fontsource`) · Cloudflare Pages + a Pages Function for the lead form. Client JS is limited to the menu, reveal-on-scroll, event push and the estimate wizard.

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
See `.env.example`. `PUBLIC_SITE_URL` (production domain) and `PUBLIC_ALLOW_INDEXING=true` must be set at build time for launch. **Without them every page is `noindex`.** Analytics IDs are optional; nothing loads until set. `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` are server-side Cloudflare Pages secrets.

## Where things live
- `src/data/`: **business.ts** (identity, license gate), services, locations, projects, process, faqs, nav
- `src/pages/`: routes · `src/components/`, `src/layouts/Base.astro` (SEO, JSON-LD, nav, tracking)
- `src/lib/estimate.ts`: validation shared by wizard and server · `functions/api/estimate.ts`: lead endpoint
- Adding a project: append to `src/data/projects.ts`; the case-study page is generated. Remove `projects` from the sitemap filter in `astro.config.mjs` once real projects exist.
- Confirming a city: set `confirmed: true` in `locations.ts` and remove the city from the sitemap filter.

## Deployment
See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). Never deploy to production without owner approval.
