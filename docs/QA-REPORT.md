# QA report

## Real photography + reviews integration (latest, 2026-10-15; local preview, Chromium)
| Check | Result |
|---|---|
| `npm run check` | 0 errors (57 files) |
| `npm test` | 20 pass, 0 fail (adds: reviews verbatim/excerpts-are-substrings/no ratings, project data integrity: all 16 files exist, alt text present, each file used once, requested titles exist, no invented location/dates) |
| `npm run build` + `npm run verify` | OK: 36 pages (17 indexable, 19 noindex). New checks: every `<img>` has alt + width/height, no GitHub-hosted image URLs, no Review/AggregateRating schema, no stray placeholder slot on the homepage (only the owner portrait, which has no photo yet), hero image is `fetchpriority=high` |
| `node scripts/qa-browser.mjs` | OK: 16 routes x 375/820/1440 (adds `/reviews/`, 2 project pages, bathroom service page): no overflow, no console errors, 0 axe violations; homepage at 375/768/1024/1440/1920; every image loads (`naturalWidth > 0`); Projects filters show exactly All/Bathrooms/Kitchens/Outdoor Living/Patios & Pavers with correct counts (7/3/1/1/2), announce results, and work by keyboard; estimate wizard unchanged and passing |
| Visual inspection | Hero, services, mosaic, testimonials, projects, project detail, reviews inspected at desktop and mobile. Defects found and fixed: hero stretched to natural image height (1,243 px), uppercase gallery captions from a stale CSS rule, tall empty tile after adding images, hero mobile crop cutting the tub |

### Lighthouse, homepage, indexable build, local preview, 3 runs each (identical conditions)
| | Before (`f0fc61b`, placeholders) | After (real photos) |
|---|---|---|
| Performance (median) | 100 | **99** (runs: 100 / 99 / 99) |
| Accessibility / Best Practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 |
| LCP (median) | 1.50 s | **1.66 s** (1.51 / 1.73 / 1.66) |
| FCP | 1.50 s | 1.06-1.51 s |
| CLS | 0.016 | 0.016 |
| TBT | 0 ms | 0 ms |
| Transfer at load | ~100 KB | ~190 KB |
The hero is now the LCP image (AVIF: 27 KB at 480 w, 91 KB at the native 1320 px width). Lab numbers on a local server with Lighthouse's default mobile throttling; **no field data exists**. Real-network results will differ. `dist/` is 32 MB because every image has AVIF, WebP and JPEG derivatives at several widths.

Not verified: Safari/Firefox/real devices; screen readers; Cloudflare; lead delivery (still mocked only); image quality beyond what the soft, compressed source stills allow.

---
## Earlier results (before real photos)

## Homepage Phase 1 (latest, 2026-10-15; local preview, Chromium)
| Check | Result |
|---|---|
| `npm run check` | 0 errors (53 files) |
| `npm test` | 11 pass, 0 fail (form validation, endpoint 503, brand config: provisional name, license never published, card contact details) |
| `npm run verify` | OK: 29 pages (16 indexable); new checks: no license number or "licensed/bonded/insured" claim anywhere, homepage uses "Gold Bay", tagline present |
| `node scripts/qa-browser.mjs` | OK. Homepage at **375 / 768 / 1024 / 1440 / 1920 px**: no horizontal overflow, no clipped headings, exactly one H1, overlay header transparent at top and solid after scroll, 0 axe violations (WCAG 2.0-2.2 A/AA tags), every internal link in `<main>` returns 200, no console errors. Plus all earlier route/keyboard/wizard checks (keyboard test updated: Home is now tab stop 3, Services 4). |
| Lighthouse, homepage, indexable build (lab, local) | Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.5 s, CLS 0.016, TBT 0 ms. (Default local builds are noindex, which scores SEO 66 by design.) No photos exist yet; expect lower numbers with real images. |
| Visual inspection | Screenshots reviewed at all five widths and per section (`docs/screenshots/homepage-phase1/`). Defects found and fixed: header cramped at 1024 (mobile menu now below 75rem), hero signature wrapping at 1920, services strip clipped under photo, active nav low-contrast on dark header, cramped service-area heading, empty right half of final CTA. |

Not verified: real photography rendering (none supplied; `ProjectImage` tested only in its pending state, so srcset/AVIF output is **untested with real files**); Safari/Firefox/real devices; screen reader; Cloudflare; lead delivery (unchanged; still mocked only).

---
## Earlier full-site results (before Phase 1)

Latest run 2026-10-15, branch `feature/full-site-build`, Chromium (Playwright 1.64), local preview only.

## Results (actual)
| Check | Command | Result |
|---|---|---|
| Types/diagnostics | `npm run check` | 0 errors, 0 warnings (48 files) |
| Unit tests | `npm test` | 8 pass, 0 fail: form validation ×7 (incl. property status); endpoint returns 503 and never success when delivery is unconfigured |
| Build + route/link/SEO/sitemap verification | `npm run verify` | OK: 29 pages (16 indexable, 13 noindex); unique titles and descriptions, canonical, exactly one H1, JSON-LD parses, 0 broken internal links, sitemap == indexable set |
| Browser QA | `node scripts/qa-browser.mjs` | OK: 12 routes × 375/820/1440 px: no horizontal overflow, no console errors, **0 axe violations** (WCAG 2.0/2.1/2.2 A/AA tags), 404 page, mobile menu open/Escape-close |
| Keyboard-only | same script | OK: skip link is first tab stop; Services dropdown opens on Enter and closes on Escape; estimate wizard options selectable with Space, Continue via Enter, focus moves to the next step heading |
| Wizard validation/failure states | same script | OK: empty step shows error; answers preserved across Back/Next; HTTP 503 shows "not available" and **never** success; mocked success shows confirmation; double-click submits once |
| Lighthouse (lab, local preview, mobile profile) | `lighthouse` on `/`, `/services/kitchen-remodeling/`, `/request-estimate/` | Performance 100 / Accessibility 100 / Best Practices 100 on all three; SEO 100 on the two indexable pages (66 on the estimate page because it is intentionally noindex). LCP 1.4–1.5 s, CLS ≤ 0.001, TBT 0 ms. **These are lab numbers on a local server with no photographs; real-image pages will score lower and need re-testing.** |

Defects found and fixed this round: Services dropdown stayed open after Escape (CSS `:focus-within`); focus ring appeared on wizard load; link-in-text-block and low-contrast numerals in the new wizard panel; light strip under the mobile footer; "adu" lowercased in a heading.

## NOT verified / not claimed
- **Lead delivery is not live**: Resend and Turnstile are not configured; the wizard has been exercised only against mocked responses, and the endpoint only by direct function invocation.
- Structured data was checked for valid JSON and by inspection only; it has not been run through Google's Rich Results Test or the Schema.org validator.
- Manual screen-reader testing, real iOS/Android devices, Firefox/Safari. An automated axe score is not WCAG conformance.
- Cloudflare preview: not deployed (not authenticated; see DEPLOYMENT.md).
- Core Web Vitals field data: none (site not live).
