# V9 visual refinement: About hero, About flow, Service Areas ending, CTA and footer

Written for: the owner and the developer, for visual approval. Not approved until the client reviews it.

## About hero
- Breadcrumb moved to the content edge above the grid, so it aligns with the headline.
- Headline and copy vertically centred against a square crop of a real kitchen photograph (object position 50% 42%). No portrait-height image.
- Split layout from 48 rem (tablet), so the photograph sits beside the text at 768 px (hero height 818 px before, 438 px after). Stacked 4:3 on phones.
- The hero no longer names David; he is introduced once, in the owner section.

## About flow
1. Introduction: hero, the business described once.
2. The company: services in one sentence, plus recent work (factual), with a real bathroom photograph.
3. Meet David Lerma: one section. The name is shown once in the heading; the dark block reads "Owner" with the company name, not a second name.
4. See the work: three real project photographs linking to Our Projects.
5. One closing CTA.
Section padding is consistent (56 px phone, 72 px desktop). The owner section is no longer on a tinted background.

## Service Areas ending and the CTA/footer transition
- Space between the "Outside San Jose?" panel and the charcoal band reduced.
- A hairline separates the charcoal band from the darker footer, so the two dark surfaces read as deliberate sections.
- Footer legal links (Privacy Policy, Terms, Accessibility) share one centre line (previously offset by about 8 px).
- San Jose is still the only confirmed service location. No cities added.

## Screenshots
- Before and after at 390, 768, 1024, 1440 and 1920: `docs/screenshots/v9b-refine/before/` and `after/`
- About hero element at all five widths: `docs/screenshots/v9b-refine/after/about-hero-*.png`
- Service Areas ending and CTA/footer crops: `docs/screenshots/v9b-refine/after/sa-cta-footer-*.png`

## Files changed
- `src/pages/about.astro`
- `src/pages/service-areas/index.astro` (ending section class only)
- `src/styles/v8.css` (About hero and sections, Service Areas ending, CTA seam, footer legal row)
