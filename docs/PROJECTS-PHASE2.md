# Projects Phase 2: portfolio hub and project detail pages

Written for: the owner and the developer reviewing the preview before approval.

## What changed

- **Hub** (`/projects/`): compact hero, category filters with counts (`aria-pressed`, live status text), a 3 / 2 / 1-column grid of equal-height 4:5 cards (photo, category, title, intro, photo count, "View project").
- **Lone last card**: with 7 projects the last card spans the full row (horizontal layout at 48rem and up), so no column is left with a single card.
- **Detail pages** (`/projects/<slug>/`, 7 pages): breadcrumb, category, H1, intro, every photo at 4:5, an "Enlarge" control on each photo, facts column, service links, related projects (up to 3), and a "Planning Something Similar?" CTA with Request an Estimate and Call Now.
- **Lightbox**: native `<dialog>`. Previous/next buttons, ArrowLeft/ArrowRight, Escape and Close, focus moves into the dialog and returns to the photo that opened it. The enlarged image is created on first open.
- **Data helpers** in `src/data/projects.ts`: `relatedProjects`, `isIndexable`, `introFor`, `activeFilterGroups`, `groupOf`.

## Inventory

- 7 projects, 16 photos (all from `assets-src/originals/`, used once each).
- Filter groups with projects: Bathrooms (3), Kitchens (1), Outdoor Living (1), Patios & Pavers (2). "Custom Construction" has no projects, so no chip is rendered for it.
- In-progress photos (paver and pool work, 5 photos) carry a "Photo taken during installation." note and an "Includes installation photos" label on the card. They are not labelled as finished work.

## Grouping assumptions (confirm with owner)

- Patio Construction and Paver Installation are grouped under **Patios & Pavers**.
- Pool House & Outdoor Living Area is grouped under **Outdoor Living**.
- All three bathroom projects are grouped under **Bathrooms**.
- Projects have no service links where `services` is empty (patio, paver, pool); the detail page links to the services index instead.

## Missing information (not invented)

Not on any page, because nothing has been confirmed for them:

- Locations (no city or neighborhood is shown; the earlier "San Jose, CA" description was removed from the detail page).
- Completion dates and durations.
- Scope lists for most projects. Where scope is absent, the page says scope details will be added once confirmed.
- Client-approved project descriptions. The intros are factual descriptions of the photographs only.

## SEO and indexing

- Hub: indexable (sitemap includes it).
- Detail pages: **noindex** on all 7, because `isIndexable(p)` requires `detailed: true`, and no project has been confirmed yet. Setting `detailed: true` on a project (after its scope and description are approved) makes that page indexable and adds it to the sitemap automatically.
- Each page has a unique title, description and canonical; one H1; BreadcrumbList JSON-LD emitted once by the base layout; a CreativeWork block with ImageObject entries that only carry the alt text and the page name (no license, rating or address data).
- Preview remains noindex at the site level.

## Tests

- `tests/projects.test.mjs` adds 13 tests: filter chips only for populated groups; URL-safe group keys and slugs; unique image files; related projects exclude self, cap at 3, prefer same category; no project indexable yet; intro copy has no promise words; missing-image pending slot exists in `ProjectImage`; detail page wiring (noindex, lightbox, CTA, no "San Jose"); one H1 on the hub; every `pj-*` class used in the markup has CSS.
- Full suite: **33 of 33 passing**.
- `npm run check`: 0 errors (one pre-existing unused-import hint in `scripts/publish-preview-branch.mjs`).
- `npm run build`: 36 pages.
- `npm run verify`: `verify-site: OK`, 36 pages, 17 indexable, 19 noindex.
- Layout audit (overflow, header collisions, text under 12px, tap targets under 40px on mobile, clipped text, broken images, axe WCAG 2.2 AA) at 375, 390, 768, 850, 1024, 1100, 1280, 1440, 1920: no findings on the hub or on detail pages.
- Browser QA (`scratchpad/phase2-qa.mjs`): **59 of 59 passing**. Covers filters and counts, 44px chip height at 390, full-row lone card at 1440, lightbox keyboard/Escape/focus return on three detail pages, status 200, one H1, no visible raw phone or email, no console errors.

## Fixes made during QA

- Breadcrumb and card-title links on mobile raised to 44px tall.
- The lightbox `<img>` was empty in the static HTML (flagged as broken); it is now created on first open.
- A duplicate BreadcrumbList was removed from the detail page; the base layout already emits it.
- Lightbox image dimensions are set from each photo's native size when it opens.

## Screenshots

Folder: `docs/screenshots/projects-phase2/`

- `projects-hub-390.png`, `projects-hub-768.png`, `projects-hub-1440.png`
- `detail-bathroom-blue-tile-soaking-tub-1440.png`
- `detail-kitchen-remodel-390.png`
- `detail-pool-house-outdoor-living-area-1440.png`
- `detail-patio-construction-768.png`
- `lightbox-bathroom-blue-tile-1440.png`

Full-page captures scroll the page first so lazy photos load.

## Not yet done

- Lighthouse run on the hub and a detail page (preview is noindex, so SEO score is expected to be low, as before).
- Live verification on the Cloudflare preview: `verify:remote` and a check of at least three detail pages on the deployed URL.
- Visual approval by the owner.

## Remaining content requirements

1. Confirm the grouping above (especially Patios & Pavers and Outdoor Living).
2. For each project to be indexed: approved description, scope list, and whether the location can be shown. Then set `detailed: true`.
3. Client permission to publish photos with any identifying details removed.
4. Confirm whether in-progress photos should stay on the hub or move to a separate "in progress" view.
