# Sitewide redesign V8: visual audit (before)

Written for: the owner and the developer, to establish what needs fixing before any page is rebuilt.

## Method

- Baseline: live preview at `b351b89` (`feature/full-site-build`), captured in a real browser.
- Captured: 35 routes at 390, 768, 1024 and 1440 px, full page. 140 images in `docs/screenshots/sitewide-v8/before/`.
- A first capture used URLs without trailing slashes and recorded 404 pages. Those files were discarded and the capture was repeated with trailing slashes (the site uses `trailingSlash: always`).
- Source read for every interior template, shared component and stylesheet.
- Refined Painting was not captured in this pass. Its homepage was used as the structural reference in earlier passes (`docs/REFINED-PAINTING-VISUAL-MATCH.md`).

## Shared design problems

1. **Interior heroes are inconsistent.** Contact, About, FAQ, Reviews, Services, and the legal pages each use a different dark block. Service pages use a dark block with a grid texture and a line drawing. Project pages use a light block with its own classes (`pj-*`). There is no single interior header.
2. **Oversized uppercase condensed H1s on inner pages.** The Barlow 800 uppercase H1 runs to about 72 px at desktop, and wraps to two or three lines on Contact, About, and Services. Inner pages should carry a smaller sentence-case heading.
3. **Breadcrumbs are detached and incomplete.** Contact's breadcrumb renders as "Home /" with no current page. Other pages mix a breadcrumb in the hero with a second label (the eyebrow), and some have none.
4. **Placeholder and internal language is visible to customers.** Examples:
   - "Placeholder" frames with "Awaiting approved photography" (Meet David portrait; service split layouts).
   - "Service 03 of 06" eyebrow on each service hero.
   - Meet David: "His full story … is being collected and will be published here after his review."
   - Service Areas: a "Confirmed" heading and "We are confirming which neighboring cities we will serve."
   - City pages: "Gold Bay Builders' service to X is being confirmed."
   - FAQ: "Additional nearby cities are being confirmed."
   - Projects: "Scope details will be added once they are confirmed."
5. **Decorative line drawings act as hero imagery.** `ArchPlate` floor plans (captioned "illustrative diagram, not a project") fill the service hero right column. They take the place of real photography and look like filler.
6. **Duplicate CSS systems.** `system.css` has six or more layered passes. Services rules are rewritten three times (`hp-svc` at lines 355–413). The final CTA is set to gold, then overridden to charcoal (lines 252 and 342). Projects and services use separate breakpoint rules. Many pages carry inline `style=""` attributes.
7. **Redundant CTA treatment.** The footer repeats the same three actions that the final CTA shows directly above it.
8. **Typography.** Condensed uppercase is used for card and link text as well as headings. Arrow links and nav labels are uppercase Barlow, which reads poorly in running text and small sizes.

## Page-by-page findings

| Route | Finding | Severity |
| --- | --- | --- |
| `/` Home | Services as five boxes; a two-photo card and a band card; uneven. Reviews: one large quote dominates two small ones. Final CTA is a large charcoal block with the email action on its own line. | High |
| `/services/` | Dark numbered hero list with uppercase rows; long rows of empty space between title and link. | Medium |
| `/services/<slug>/` (6) | Dark blueprint hero, "Service N of 06" eyebrow, ArchPlate illustration, placeholder split frame on the Kitchen layout, four different body layouts across the six. | High |
| `/about/` | Large condensed H1 over a short lede; left column holds only the H2 (large empty area); CSLB section is educational content that belongs in the FAQ. No owner section. | High |
| `/meet-david-lerma/` | Visible placeholder portrait; internal "being collected" copy. Noindex. | High |
| `/service-areas/` | Internal checklist: "Confirmed" heading, "We are confirming…", list of cities. | High |
| `/service-areas/<city>/` (6) | Five unconfirmed cities publish landing pages with "Building in X" headings, city considerations, and "service … is being confirmed" notices. These pages suggest service territory that has not been verified. | High |
| `/contact/` | Oversized dark hero with a short line; "Talk to us" heading smaller than body text; Call Now and Email Us buttons stacked under text with no alignment to the estimate column; uneven two columns. | High |
| `/faq/` | Large condensed H1; "additional nearby cities are being confirmed" in an answer. | Medium |
| `/reviews/` | Seven reviews in a grid with a dark hero; no visual grouping. Noindex. | Low |
| `/our-process/` | Hero matches the common dark block; process steps are general guidance. | Low |
| `/projects/` | Hero uses its own `pj-*` classes; otherwise consistent with the Phase 2 grid. | Low |
| `/projects/<slug>/` (7) | Hero uses its own classes; "Scope details will be added once they are confirmed" paragraph. | Medium |
| `/guides/*` (2) | Dark hero, "By Gold Bay Builders · Last reviewed" in inline style. | Low |
| `/privacy-policy/`, `/terms/`, `/accessibility/` | Visible "Draft" notice stating the page is not yet reviewed by an attorney. | Blocker (legal review) |
| `/request-estimate/` | Wizard; uses the shared hero. Not restyled in this pass beyond the hero. | Low |
| `404` | Plain, unstyled heading. | Low |

## Decisions taken from this audit

- One interior header (`PageHero` → `Breadcrumbs` + sentence-case H1 on a light band) for every interior page.
- One CTA band (`Cta`) with the three actions in one row. The homepage uses it too.
- Services on the homepage: ruled list, not boxes. A photo-plus-list alternative was built and rejected (one photo beside five services implies a specialty that the photo does not show). Both alternatives are in `docs/screenshots/sitewide-v8/services-alternatives/`.
- Reviews on the homepage: three equal quote cards.
- Service-area pages: San Jose only. Unconfirmed city pages are not generated.
- Placeholder and line-drawing components removed. Service pages use real photographs only where a relevant project photograph exists.

## Items that need a decision from the owner

- Legal pages: the "Draft / not yet reviewed by an attorney" notice remains until legal review is complete.
- David Lerma: his biography and any portrait are not yet approved. The site says only what is verified (owner, main point of contact).
- Business claims that need David's confirmation: "Scope in writing", "Estimates on the same scope", and "Questions at every stage" on About describe general practice.
- Grouping of Patios & Pavers and Outdoor Living on the Projects page (carried from Phase 2).
