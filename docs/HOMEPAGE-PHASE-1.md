# Homepage Phase 1: brand + premium redesign

Status: built and inspected locally; **awaiting visual approval** before any other page is redesigned. Not deployed.

## Brand source
The owner's business card was described in the brief but **the photograph itself was not available to me** (not attached, not on disk), so nothing here was read from the image. Colors and logo treatment follow the written description: black, metallic gold, warm white, silver; logo = crossed hammers + roofline + "GOLD BAY / BUILDERS INC.". Gold values (`#cfa955` on dark, `#7a5b14` as text-safe gold on light) are chosen, not sampled; sample from the real logo file when supplied.

Brand text lives in **`src/data/business.ts`** only (`name`, `shortName`, `tagline`, `brandProvisional`, `legalNameConfirmed`, license gate). Change it there.

### Logo
No source file exists. `Logo.astro` is a **typographic stand-in** ("GOLD BAY" spaced serif capitals over a gold hairline and "BUILDERS INC."), with no invented symbol. **Required:** the original logo as vector (SVG/AI/EPS/PDF) or a ≥2000px transparent PNG. A cleaned redraw of the hammers + roofline mark could be proposed for approval, but it is not substituted here. Do not crop the card photo.

### Legal/licensing (unverified; nothing published)
- Card name "GOLD BAY BUILDERS INC."; card license **1157776** (earlier brief said 115776). A secondary aggregator (BuildZoom) lists "Goldbay Builders Inc" with #1157776, in line with the Gemini report's "Goldbay Builders Inc." finding; a separate, older "Golden Bay Builders Inc" exists. **CSLB itself has not been checked.** "Insured & Bonded" is owner-reported.
- `verify-site.mjs` fails the build if either license number, or any "licensed/bonded/insured" phrase, appears in any page.
- Needed from David: exact registered corporation name + any DBA; CSLB number/status/classification; bond and insurance certificates.

## Design decisions
| Decision | Why |
|---|---|
| Hero: dark charcoal, copy left, full-bleed photo slot right (bleeds to viewport edge, full height) | Photography-first; when a real photo arrives it replaces the slot with no layout change. Mobile: copy first, 4:3 image after. |
| Palette: ink `#141413`, warm white `#f8f5ef`, limestone `#ebe5d9`, silver, gold as accent only | Card palette with controlled contrast; gold is text/rules/CTA, never a background field. |
| Fraunces (display) + Inter (text) kept | Already site-wide; shared tokens only changed in color. |
| Transparent header over hero, solid on scroll; mobile menu below 75rem | Premium feel; fixes crowding found at 1024px. |
| Each section has its own composition | Statement (no columns) · mixed-fill service grid · asymmetric gallery · three-column question table · portrait + offset frame · horizontal timeline · giant typographic band · FAQ · CTA with side contact. No repeated two-column alternation. |
| No blueprint grid, no house illustration, no gold gradients | Removed from the homepage. (Other pages still use `ArchPlate`/blueprint; out of scope.) |
| Temporary image state = dark panel with crop marks and a "PHOTO SLOT · ratio · awaiting approved project photography" label | Cannot be mistaken for real work. |
| "Why choose" became "Six things worth asking any contractor" | Uses research pain points (communication, budget, planning, timelines, quality, permits) as education, with **no** Gold Bay promises (no weekly updates, fixed price, PM or timeline guarantee). |
| Process framed as a general guide | Explicitly says scope/schedule are set in the estimate and contract. |

## Files changed
Modified: `src/data/business.ts`, `src/data/nav.ts`, `src/data/faqs.ts`, `src/data/projects.ts`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/layouts/Base.astro`, `src/pages/index.astro`, `src/styles/global.css`, `public/og-default.svg`, `scripts/qa-browser.mjs`, `scripts/verify-site.mjs`.
New: `src/components/Logo.astro`, `ProjectImage.astro`, `BeforeAfter.astro`, `src/data/home.ts`, `src/assets/projects/README.md`, `tests/brand.test.mjs`, this doc.

## Photography system
`ProjectImage.astro`: `file` (name in `src/assets/projects/`), optional `mobileFile`, `aspect`/`mobileAspect`, `focus`/`mobileFocus`, `sizes`, `priority` (eager + `fetchpriority=high` for the hero/LCP), `caption`, `credit`. Generates AVIF + WebP + JPEG fallback at 480/768/1100/1600/2200 (never upscaled), intrinsic width/height to prevent layout shift. A missing file renders the labelled photo slot. `BeforeAfter.astro` provides an accessible native-range comparison (not yet used). Homepage featured slots are driven by `projects.ts` entries with `featured: true` and `file`.

### Images needed (filenames the homepage already references are marked ★)
| File | Use | Crop | Notes |
|---|---|---|---|
| ★ `hero-exterior-01.jpg` | Hero | 4:5 portrait (desktop right panel) | Best finished exterior or signature interior; keep subject in center-right. ≥2400px tall. |
| ★ `hero-exterior-01-mobile.jpg` | Hero (mobile) | 4:3 landscape | Optional separate crop; otherwise the 4:5 is cropped to 4:3. |
| `featured-01` … `03` (descriptive names, set in `projects.ts`) | Featured work | 01: 4:3 (large) · 02, 03: 3:2 | Three different service types (e.g. kitchen, ADU, addition). Captions need project name, category, location (only if approved). |
| ★ `david-lerma-portrait.jpg` | Owner section | 4:5 | Natural, on a job site or in a finished room; face in upper third. |
| Per-service heroes (6) | Later phase | 16:9 + 4:5 | For the service-page phase. |
| Before/after pairs | Later | same crop each | Identical framing. |
All: owner-approved, original resolution, with homeowner permission for location text; no stock.

## SEO / GEO / AEO (homepage)
Title "Gold Bay Builders | Home Remodeling & Construction in San Jose, CA"; one H1 ("Built for the way you live."); unique description; canonical; headings h1 → h2 → h3 in order; server-rendered text; internal links to all five service groups (both kitchen and bathroom pages), guides, process, area, FAQ; FAQPage markup (six answers also visible on the page); Organization/GeneralContractor schema uses `business.name`; **no license in schema**. Indexing controls unchanged (site-wide noindex unless `PUBLIC_ALLOW_INDEXING=true`).

## Pages still using the old name "Golden Bay" (not changed this phase; do in a controlled pass)
`about`, `accessibility`, `contact`, `faq`, `meet-david-lerma`, `our-process`, `privacy-policy`, `terms`, `reviews`, `request-estimate`, `projects/index`, `services/index`, `service-areas/index`, `service-areas/[slug]`; components `Guide`, `ArchPlate`, `ElevationArt` (comments/labels); data `services.ts` (8 occurrences), `locations.ts`, `service-extras` (none). Their `<title>` suffix and schema already use "Gold Bay" via `business`, so **titles and body text now disagree on those pages** until updated. `ElevationArt.astro` is no longer used on the homepage. Also `README.md` / docs mention the old name.

## Other follow-ups
Real logo; photos; David's bio; license/entity confirmation; social image PNG; per-page redesigns (services, projects, about, contact) one at a time after homepage approval.
