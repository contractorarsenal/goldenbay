# Comprehensive audit v5

Scope: the homepage (all sections) and the shared header, footer, buttons and typography. Evidence: browser measurements and screenshots from the local build (`astro preview`) and the live preview, at 375, 390, 768, 850, 1024, 1100, 1280, 1440 and 1920 px. The client's screen recording was **not accessible** in this environment, so it was not reviewed. Findings below come from the live build and automated measurement.

Severity: High = blocks use or fails a standard; Medium = visible quality or usability issue; Low = minor. "Judgment" means a visual decision for the client, not an objective defect.

## Defect table
| ID | Sev | Component | Viewport | Evidence | Root cause | Resolution | Verification |
|---|---|---|---|---|---|---|---|
| D1 | Medium | Sticky mobile call bar | 768-1199 | `audit-1100-fold.png`: bar covers the bottom of the page and duplicates the header buttons | `.callbar` hidden only from 75 rem; header shows the same actions from 48 rem | **Fixed**: bar hidden from 48 rem | Layout audit: no duplicate bar at any tablet/laptop width |
| D2 | Low | Footer bottom padding | 768-1199 | blank strip reserved for the bar | padding tied to the 75 rem breakpoint | **Fixed**: aligned to 48 rem | Visual check of the footer at 768 and 1024 |
| D3 | High (WCAG 2.5.8) | Text links: service cards, area chips, CTA inline link | 375, 390 | tap targets 19-37 px tall | links are text-height; no minimum target | **Fixed**: 44 px minimum on touch widths | Layout audit: zero tap-target findings |
| D4 | Medium | Eyebrows and project category labels | all | computed size 11 px / 11.2 px | `--fs-eyebrow` 11 px; `.hp-proj-cat` 0.7 rem | **Fixed**: 12 px minimum | Layout audit: zero text under 12 px |
| D5 | Medium | Services layout: Kitchen & Bathroom dominates | 1440, 768 | feature row spans full width; orphaned card on tablet | structure chosen in an earlier pass | **Fixed** (judgment): four equal cards in the first row, Custom Home as a full-width band | Two other arrangements were tested in the browser and rejected: five equal cards in three columns (empty second-row slot); the feature row (dominant). Layout audit clean at every width |
| D6 | Medium | Hero: dark tile fills the frame | 1440, 1100 | `hero/contact.jpg`: seven real photos compared | crop and overlay | **Fixed** (judgment): focal point moved to the light tub; lighter wash on the right. Photo kept | Visual check; no other real photograph gave a stronger first impression |
| D7 | High (investigated) | Business email/phone exposure | all | Built HTML: 222 `mailto:`/`tel:` hrefs, 72 structured-data values, **0** visible-text, aria, alt, title or CSS occurrences. Live page checked the same way | - | **No defect found.** Structured data keeps the number and email (accurate business data, not visible) | Live check: phone visible = False, email visible = False |
| D8 | Low | Project and service links: inherited full-width underline | desktop | underline spans whole box | legacy `.arrow-link` border | **Fixed** in the v4 pass | Visual check |
| D9 | Medium | Project cards: title lengths misalign links | 1440 | one title wraps to two lines | variable title length | **Fixed**: titles reserve two lines | Visual check |
| D10 | Low | Review card: empty space | 1440 | quote card stretched to the side column | grid stretch | **Fixed**: top alignment | Visual check |
| D11 | Medium | Footer primary button invisible | all | charcoal on charcoal | footer reused dark button | **Fixed**: gold | Contrast audit: zero failures |
| D12 | Medium | Outdated name or unverified licence claim in visible text | all | scan of every built page: 0 "Golden Bay", 0 licence numbers, 0 licensed/bonded/insured claims, 0 ratings | - | **No defect found** | Scan (above) |
| D13 | Low | Conflicting service-grid rules | 768-1199 | two rules at 48 rem | v3-v4 iterations | **Fixed**: one set of breakpoint rules | Layout audit |
| D14 | Medium | Unused homepage CSS | - | rules for removed sections | redesign history | **Partly fixed**: rules removed where grep proves no use. Legacy rules in `global.css` remain because inner pages still use them | Build and visual check of inner pages |
| D15 | Judgment | Desktop nav hidden behind Menu at 1100-1199 px | 1100 | `audit-1100-fold.png`: Menu button, no links | nav breakpoint 75 rem | **Not changed**: needs a decision (narrower spacing could fit the links at 1100) | - |
| D16 | Judgment | Projects at 768 px: three cards, two on the first row and one alone | 768 | project audit | 2-column tablet grid | **Not changed**: suggestion is to span the last card full width | - |
| D17 | Unresolved (suggestion) | Less condensed sans for H3, cards and controls | all | not tested | - | **Not implemented** in this pass. The brief asked for a test; no alternative was rendered, so this is open | - |
| D18 | Blocker (external) | Lead delivery | all | Resend and Turnstile not configured | external | **Unresolved**: wizard shows the unavailable state; no live delivery claimed | `verify:remote` form probe returns 503 |
| D19 | Blocker (external) | Licence, legal entity, review permission | - | CLAUDE.md, RESEARCH-RECONCILIATION.md | client verification pending | **Unresolved** | - |
| D20 | Transient | Stylesheet MIME error on `/about/` after a deploy | live | `verify:remote` failed once, then passed on re-run; the stylesheet served correctly when fetched | propagation right after deploy | Reported; not reproduced after propagation | Re-run passed |

## Totals
- Issues discovered: 20 (D1-D20).
- Confirmed defects fixed: D1, D2, D3, D4, D8, D9, D10, D11, D13 (nine), and D14 partly fixed.
- Judgment changes implemented: D5 (services arrangement), D6 (hero crop and overlay).
- Investigated with no defect: D7, D12.
- Open for decision: D15, D16, D17.
- External blockers: D18, D19.
- Transient, resolved on re-run: D20.

## Browser QA and tests
- Layout audit, nine widths (375, 390, 768, 850, 1024, 1100, 1280, 1440, 1920): **zero** overflow, header collisions, clipped text, text under 12 px, tap targets under 44 px, broken images, or axe contrast/ARIA violations.
- Automated checks: see the commands run and their results in the final report.

## What was not verified
- Safari, Firefox and real devices.
- The client's screen recording.
- Pixel-level screenshot regression: differences in font rendering and image timing make it unreliable here, so visual changes were judged by eye.
- Less condensed secondary headings (D17).
