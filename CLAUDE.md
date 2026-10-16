# CLAUDE.md: Golden Bay Builders

## Business context
Gold Bay Builders Inc. (provisional brand from the owner's business card; legal name unconfirmed), owner David Lerma, 408-506-7184, goldbaybuilderinc@gmail.com, San Jose CA. Six services: full home remodeling, additions, ADUs, kitchens, bathrooms, custom homes. Tagline "Building Your Bay Home".

## Hard content rules
- **Brand/licence (updated):** public brand = "Gold Bay Builders Inc." from `src/data/business.ts` only. Card shows licence 1157776 (earlier brief: 115776); neither may be published until verified on CSLB. `npm run verify` enforces this. Homepage is redesigned and awaiting approval; do not redesign other pages without instruction (see docs/HOMEPAGE-PHASE-1.md).
- **Entity:** the legal name may be "Goldbay Builders Inc." (see docs/RESEARCH-RECONCILIATION.md §0). Do not launch, publish a license or a legal-entity claim until confirmed. Do not imply affiliation with goldenbaybuildersinc.com (#1137377).
- **Research-suggested promises** (fixed price, guaranteed timelines/updates, PM, "premier") are NOT approved; do not publish.
- **License:** `115776` was supplied but a CSLB search found no matching record. Do NOT publish any license number, "licensed/bonded/insured" claim or CSLB badge until David confirms the legal entity and the CSLB record is checked. Gate in `business.license.verified`.
- Never invent reviews, ratings, awards, projects, addresses, hours, years in business, team size, prices, timelines or guarantees. No stock/AI imagery presented as the company's work.
- No unsupported regulatory claims. Cite official sources (City of San José, HCD, CSLB) in guides.
- Unfinished/unconfirmed pages use `noindex` and stay out of the sitemap (see `astro.config.mjs` filter).
- Avoid cliché copy ("dream home", "unparalleled excellence"…). Specific, plain, homeowner-first.

## Real assets (added)
- Portfolio data: `src/data/projects.ts` (16 client photos, 7 entries; originals in `assets-src/originals/`, never modify). Reviews: `src/data/reviews.ts` (7, **verbatim**; excerpts must be exact substrings; source platform + republishing permission unconfirmed; no ratings/aggregate/Review schema). See docs/PROJECT-PHOTOS.md and docs/REVIEWS.md.
- Never describe photos beyond what is visible; do not invent locations, materials, budgets or dates; in-progress photos stay labelled. Patios/pavers/pool work is portfolio-only, not a core service, until approved.
- Review claims ("on schedule", "in budget", "onsite everyday") are customer statements, never company promises.

## Public contact rule (mandatory)
Never render the business phone number or email address as visible text on the public site. Use labelled actions instead: **Call Now** (`tel:`), **Email Us** (`mailto:`), **Request an Estimate**. Values stay in `src/data/business.ts`, in href attributes and in structured data. `npm run verify` fails if a visible phone number or email appears. Brand text must read "Gold Bay" (never "Golden Bay").

## Design principles
Charcoal / warm white / limestone / bronze accent; Fraunces display + Inter body; editorial, asymmetric, varied section compositions; no repeated card grids; motion subtle and `prefers-reduced-motion` safe; content visible without JS animation.

## Architecture / coding rules
Astro static pages; content in `src/data/*` (typed), never hard-coded in pages when it is reusable. Business facts only from `business.ts`. Semantic HTML, WCAG 2.2 AA, minimal JS. No secrets in repo; `PUBLIC_` vars are public. Never log lead data or send PII to analytics (events carry no payload).

## SEO
Unique title/description/canonical/one H1 per page (enforced by `npm run verify`). JSON-LD only from verified facts (no address, rating, license). FAQ schema is emitted but do not expect rich results.

## Verification before claiming done
`npm run check && npm test && npm run build && npm run verify`, plus the Playwright QA script. Lead delivery is "live" only after a real end-to-end submission succeeds.

## Git / deploy safety
Work on feature branches; never force-push, never merge to `main` or deploy production without explicit approval. Check for connected Cloudflare Pages auto-deploys before pushing.
