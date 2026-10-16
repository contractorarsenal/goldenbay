# Sitewide redesign V8: report

Written for: the owner and the developer, for review before approval. This is not approved. The client has to see and approve the result.

## 1. Pages audited

All 30 index routes in the built site were captured at 390 and 1440 px, and 768 and 1024 px were captured as well (kept out of the repository to limit size). Routes: home, services hub and six service pages, projects hub and seven project pages, About, Meet David Lerma, Our Process, Service Areas hub and the San Jose page, the five unconfirmed city URLs (no longer generated), Contact, the estimate wizard, Reviews, FAQ, two guides, Privacy, Terms, Accessibility, and 404.

The audit is in `docs/SITEWIDE-REDESIGN-V8-AUDIT.md`. The before-state captures are in `docs/screenshots/sitewide-v8/before/`.

## 2. Pages redesigned

- **Homepage:** services, reviews, and final CTA (hero, trust strip, concerns, projects, process, and service area unchanged).
- **About:** rebuilt (company, owner, services, selected projects, expectations, checking a contractor, CTA).
- **Meet David Lerma:** placeholder portrait and internal "being collected" copy removed.
- **Contact:** rebuilt as two columns (direct contact actions; request-estimate panel with three steps).
- **Service Areas hub:** rebuilt around San Jose. Internal "Confirmed" and "confirming" copy removed.
- **Service Areas city pages:** only San Jose is generated. The five unconfirmed cities are not generated.
- **Services hub:** ruled list.
- **Service pages (six):** one template. Placeholder frame and line-drawing hero removed. "Service N of 06" removed.
- **Interior header (all interior pages):** one shared component, breadcrumb plus sentence-case H1 on a light band. This covers FAQ, Reviews, Our Process, the legal pages, guides, the estimate wizard, and the projects hub and detail pages.
- **Projects detail:** uses the shared header. The "Scope details will be added once they are confirmed" paragraph is removed.

## 3. Shared design-system changes

- `src/styles/v8.css`, loaded after `system.css`. It holds the interior header, breadcrumb, CTA band, split and panel layouts, service list, review cards, About, Service Areas, Contact, and service-page classes.
- `src/components/Breadcrumbs.astro` (new): semantic breadcrumb, current page not linked, `aria-current`.
- `src/components/PageHero.astro`: rewritten as the shared interior header.
- `src/components/Cta.astro`: rewritten as one charcoal band with Request an Estimate, Call Now, and Email Us on one row.
- `src/components/ServicesList.astro` (new), with data in `src/data/home-services.ts`.
- Removed: `Placeholder.astro` and `ArchPlate.astro` (no remaining users).

**Not done in this pass:** `system.css` still contains the older layered rules (`hp-svc`, the two `hp-cta` background declarations, the `pj-*` classes now partly superseded). Inline `style=""` attributes remain on several pages. The estimate wizard and the 404 page were not restyled beyond the shared header. Removing the superseded rules needs a dedicated pass with a before/after comparison at every width.

## 4. Homepage changes

- **Services:** five services as ruled rows (number, title, one line, scope tags, links). Two alternatives were built: the ruled list (A) and a kitchen photo beside the list (B). A was chosen. B's single photo sat beside five services and implied a specialty. Both are in `docs/screenshots/sitewide-v8/services-alternatives/`.
- **Reviews:** three equal quote cards (Terri M., Andrea J., Kevin J.), exact excerpts, "View All Reviews". No ratings.
- **Final CTA:** the shared charcoal band. Headline, text, and three actions on one row. The old gold/charcoal conflict is gone.

## 5. Contact and About improvements

- **Contact:** the oversized hero is gone. Left column: Call Now and Email Us. Right column: Request an Estimate panel with three steps and one gold action. No phone or email is visible as text. A contrast defect (dark step text on the dark panel) was found in the after-capture and fixed.
- **About:** the company introduction, owner section (text only, no portrait), services list, three selected real project photographs, expectations, and the CSLB section (link preserved; the FAQ carries the fuller guidance). No years in business, team size, certifications, or awards.

## 6. Service-area corrections

- Only San Jose is a service city. City pages for Campbell, Cupertino, Los Gatos, Santa Clara, and Sunnyvale are no longer generated. Their routes return 404. Nothing linked to them except the removed Footer list, which now shows only confirmed cities.
- Outside San Jose: "Contact us with your address and project. We will tell you whether we can take the work."
- Test: `tests/v8.test.mjs` checks that only confirmed cities are generated and that internal phrases are absent.

## 7. Project-system regressions checked

Phase 2 browser QA re-run after the changes: 59 of 59 pass. This covers filters and counts, the lone last card at 1440, the lightbox keyboard, Escape and focus return on three detail pages, no console errors, one H1, and no visible phone or email. Indexing is unchanged: detail pages stay noindex (`isIndexable` false).

## 8. Content verification blockers

- **Legal pages:** Privacy, Terms, and Accessibility still show the "Draft / not yet reviewed by an attorney" notice. Legal review is required before these pages go live.
- **David Lerma:** no approved biography or portrait. About says only what is verified (owner, main point of contact).
- **Claims needing David's confirmation:** About's "Scope in writing", "Estimates on the same scope", and "Questions at every stage" describe general practice, not confirmed commitments.
- **Reviews:** republishing permission and source platform still unconfirmed (carried from earlier phases).
- **Business identity:** legal name and license verification still open (carried).
- **Live estimate delivery:** not claimed. The wizard's unconfigured state is unchanged.

## 9. Before-and-after screenshot paths

- Before (390 and 1440): `docs/screenshots/sitewide-v8/before/`
- After (390 and 1440): `docs/screenshots/sitewide-v8/after/`
- Services alternatives (390 and 1440): `docs/screenshots/sitewide-v8/services-alternatives/`
- Tablet captures (768 and 1024) were taken and kept out of the repository to keep its size down. They are in the working scratch folder.

Full-page captures scroll the page first so lazy photos load. The first before-state run used URLs without trailing slashes and recorded 404 pages. Those files were discarded.

## 10. Test results

- `npm run check`: 0 errors.
- `npm test`: 46 of 46 pass (33 from earlier phases, including the 13 Phase 2 projects tests, plus 13 new V8 tests in `tests/v8.test.mjs`).
- `npm run build`: 31 pages.
- `npm run verify`: `verify-site: OK`, 31 pages, 17 indexable, 14 noindex.
- Layout and axe audit (overflow, header collisions, text under 12 px, tap targets under 40 px on mobile, clipped text, broken images, WCAG 2.2 AA): clean on home, Contact, About, Service Areas, a service page, and a project page. A tap-target defect on About (project captions at 19 px) was fixed.
- Phase 2 browser QA: 59 of 59.

**Not run:** Lighthouse (noindex preview, scores expected to be low, as before). A full layout audit at every width from 375 to 1920 was run only on the routes listed above. Remote preview verification is in section 12.

## 11. Commit SHA

To be filled in after commit.

## 12. Preview URL

https://cf-preview.goldbay-1oh.pages.dev (noindex). Publishing and remote verification are recorded below after the publish step.

## Items that could not be completed in this pass

- Consolidating `system.css` and removing superseded rules and inline styles (see section 3).
- Restyling the estimate wizard and the 404 page beyond the shared header.
- Refined Painting was not re-captured in this pass.
- Lighthouse.
- Owner decisions listed in section 8.

Nothing in this report is approved. The client has to see and approve it.
