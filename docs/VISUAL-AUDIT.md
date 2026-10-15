# Visual audit

Method: site served locally (`astro preview`), captured in Chromium at 1440×900 and 390×844 (full-page + first screen) for home, all six service pages, projects, about, contact, estimate wizard, San Jose area page and the ADU guide; pages viewed after the first build ("v1") and again after the improvement pass ("v2"). Scores are 1–10 and reflect what was seen, not what the code intends. **No page is award-level, and none can be while the site has no real photography.**

## Is the house-elevation illustration a premium solution?
**No. It is a competent, on-brand placeholder, not a premium hero.** It gives the dark hero a deliberate blueprint identity and keeps the page fast and honest. But a residential builder's credibility comes from photographs of built work, and thin gold line art on charcoal reads as "architectural studio brand", not "proof this crew builds well". It also reads as a generic house, not a San Jose one. It should be replaced by a real full-bleed project photograph as soon as one is approved; the hero layout is built so a photo can replace the plate.

## Scores (v2, after improvements; v1 in brackets)
| Page | Visual | Usability | Trust | Conversion clarity | Observations |
|---|---|---|---|---|---|
| Home | 6.5 (5.5) | 8 | 5 | 8 | Strong type pairing and hierarchy; blueprint grid and larger plate give the hero a point of view. Below the hero the page is mostly text on flat bands: no imagery, repeated "eyebrow + serif H2 + text" rhythm. Trust is capped: no reviews, photos, license or bio yet. CTAs are clear and repeated (header, hero, mobile bar, closing). |
| Service pages (6) | 6.5 (5) | 8 | 5.5 | 8 | Each now has its own plan diagram, an at-a-glance strip and a direct "short answer". Three section compositions rotate. Still text-only and structurally the same family, so six pages feel related rather than distinct. |
| Projects | 4 (3) | 6 | 3 | 6 | Honest empty state (what each case study will include) but there is nothing to see; it cannot sell. Hidden from search for this reason. |
| About | 4.5 | 7 | 4 | 6 | Clean but sparse; left column empty beside the text. Needs a portrait, a founding story and credentials. |
| Contact | 5.5 | 8 | 5 | 8 | Clear, large phone number; minimal. Mobile layout is right. |
| Estimate wizard | 7 (6) | 8.5 | 6 | 8.5 | Clear progress bars, large touch targets, keyboard-complete, side panel explains what happens next. Fixed a focus ring that showed on page load. Not live-tested. |

## Ten most important improvements (status)
1. **Real project photography in the hero and portfolio**: *blocked on assets* (largest single gain).
2. Real, permissioned reviews and a verified license line: *blocked on David*.
3. David Lerma portrait + approved story on Home/About/Meet pages: *blocked*.
4. Distinct service heroes: **done** (plan diagrams per service; to be replaced/augmented by photos).
5. Direct-answer blocks + at-a-glance facts on services (AEO): **done**.
6. Guides surfaced on the homepage and linked from service pages (internal linking): **done**.
7. Wizard side panel and focus fix: **done**.
8. Break up the text-only rhythm below the hero with photographic or diagrammatic compositions: **partly** (plates only on service heroes); needs photography.
9. Typographic logo → real brand mark; real social image: *needs brand assets*.
10. Dropdown keyboard behavior and mobile footer strip: **done** (Escape now closes the menu; mobile bottom strip removed).

## Other observations
Navigation, spacing, alignment, contrast, and mobile layouts held up in review; the sticky mobile call bar covers the lower thumb zone without hiding content. Section transitions are hard cuts between flat color bands, which is clean but not a distinctive feature. Motion is limited to a subtle reveal and hover states and respects reduced-motion.
