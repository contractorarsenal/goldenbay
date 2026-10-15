# QA report

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
