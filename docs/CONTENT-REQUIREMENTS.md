# Content and verification still needed

## Blocking for launch
0. **LEGAL ENTITY (new, highest priority):** the Gemini report and a CSLB pending-list entry (Jan 2026, license # field `0`) point to **"Goldbay Builders Inc."** (David Lerma Macias, 1025 Franquette Ave) rather than "Golden Bay Builders Inc."; a different company at goldenbaybuildersinc.com uses license #1137377. Confirm the exact registered name, any DBA, and whether a CSLB license has actually been **issued** (active, bonded, workers' comp). See RESEARCH-RECONCILIATION.md. Site name, schema and domain may need to change.
1. **Contractor license:** supplied `115776` returned no CSLB match for Golden Bay Builders. Need: exact legal entity name, CSLB license number & classification(s), bond/insurance confirmation. Then set `business.license` (footer + About show it automatically).
2. **Production domain** → `PUBLIC_SITE_URL`; then `PUBLIC_ALLOW_INDEXING=true`.
3. **Lead delivery credentials:** Resend (or alternative), destination/from emails, Cloudflare Turnstile keys; then a real end-to-end test.
4. **Legal review** of Privacy Policy, Terms, Accessibility drafts; confirm whether estimates are free and the consent language.
5. **Gemini research report:** received and reconciled in `docs/RESEARCH-RECONCILIATION.md`. David must decide which of its proposed promises (fixed price, guaranteed timelines/weekly updates, project manager) are real before any are published.

## Content
- Project photography (hero, kitchens, baths, additions, ADUs, custom) with captions, scope, challenge/solution; location approvals; before/afters. Populate `src/data/projects.ts`.
- 3+ permissioned testimonials with attribution; links to independent review profiles.
- David Lerma biography, portrait, years/background (only approved facts).
- Confirm **process steps** (`src/data/process.ts` are plausible defaults, not confirmed practices).
- Confirm **service area** cities beyond San Jose; supply local project examples for each.
- Business address / service-area-business status, hours, social profiles (omitted from schema until supplied).
- Pricing: whether to show budget ranges; real minimum project size (wizard ranges are generic).
- Brand assets: logo, preferred colors/fonts (current identity is a typographic placeholder).
- Re-verify ADU/fee statements in the ADU guide against current City of San José and HCD pages (SB 1117 status noted in research was unresolved; the City FAQ page could not be fetched automatically).
- 1200×630 social image; real favicon.
- Analytics IDs and a consent approach.
