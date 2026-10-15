# CLAUDE.md: Golden Bay Builders

## Business context
Golden Bay Builders Inc., owner David Lerma, 408-506-7184, goldbaybuilderinc@gmail.com, San Jose CA. Six services: full home remodeling, additions, ADUs, kitchens, bathrooms, custom homes. Tagline "Building Your Bay Home".

## Hard content rules
- **License:** `115776` was supplied but a CSLB search found no matching record. Do NOT publish any license number, "licensed/bonded/insured" claim or CSLB badge until David confirms the legal entity and the CSLB record is checked. Gate in `business.license.verified`.
- Never invent reviews, ratings, awards, projects, addresses, hours, years in business, team size, prices, timelines or guarantees. No stock/AI imagery presented as the company's work.
- No unsupported regulatory claims. Cite official sources (City of San José, HCD, CSLB) in guides.
- Unfinished/unconfirmed pages use `noindex` and stay out of the sitemap (see `astro.config.mjs` filter).
- Avoid cliché copy ("dream home", "unparalleled excellence"…). Specific, plain, homeowner-first.

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
