# QA report

Run 2026-10-15 on the `feature/full-site-build` branch (local, Chromium via Playwright 1.64).

## Results (actual)
| Check | Command | Result |
|---|---|---|
| Types/diagnostics | `npm run check` | 0 errors, 0 warnings, 0 hints (45 files) |
| Unit tests | `npm test` | 7 pass, 0 fail (form validation ×6; endpoint returns 503, never success, when unconfigured) |
| Build | `npm run build` | 29 pages built |
| Site verification | `npm run verify` | OK: 29 pages (16 indexable, 13 noindex); unique titles/descriptions, canonical, exactly one H1, valid JSON-LD, 0 broken internal links, sitemap matches indexability |
| Browser QA | `node scripts/qa-browser.mjs` | OK at 375/820/1440 px across 12 routes: no horizontal overflow, no console errors, **0 axe violations** (WCAG 2.0/2.1/2.2 A/AA tags), 404 page, mobile menu open/Escape-close, estimate wizard (per-step validation, answers preserved on Back, 503 shows "not available" not success, mocked success, double-click sends one request) |

Fixes made during QA: mobile overflow on home (grid min-content), insufficient contrast of bronze text on limestone, link-in-text-block underlines.

## NOT verified
- **Lead delivery:** no provider credentials; the wizard was tested against *mocked* responses only. Not live.
- Turnstile (no keys), analytics (no IDs).
- Manual keyboard-only pass and screen-reader testing; automated axe does not prove WCAG conformance.
- Lighthouse / Core Web Vitals scores not measured; no real images exist yet (pages are light, system-free of third-party scripts).
- Real devices (iOS Safari etc.); only Chromium.
- Cloudflare Function runtime under `wrangler`; only unit-tested by direct invocation.
- Preview deployment: none created.

## Known blockers
See CONTENT-REQUIREMENTS.md (license verification, domain, photos, testimonials, bio, legal review, credentials).
