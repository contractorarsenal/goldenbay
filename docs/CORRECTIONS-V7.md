# Corrections V7

Scope: the six corrections requested after V6 approval. The homepage design is unchanged.

## 1. Services: final two cards
Measured on the live preview. At 1440 px and 1280 px the two cards in the last row sit exactly on the container edges (1440: 100–710 and 730–1340; 1280: 48–630 and 650–1232) and are the same height (166 px). At 1100 px the layout is two columns, with Custom Home on its own full row. No change was needed.

## 2. Projects: horizontal third card on tablet
Kept as approved (48–63.99 rem). Photograph at 16:9.

## 3. Typography
Kept as approved. Inter 700 for card titles; Inter 600 for navigation; Barlow Condensed for H1, H2 and buttons.

## 4. Navigation breakpoint
Kept at 1100 px (68.75 rem). Header height is 81 px on both sides of the switch.

## 5. Email "exposure" investigation
Checked in a real browser on the live preview, and in the built HTML:
- **Visible text** (`innerText` of the page, the final CTA and the footer): contains no email address and no phone number.
- **Accessible names:** the two email links are named "Email Us" and "EMAIL US". Neither name contains the address.
- **Attributes:** no `title`, `aria-label`, `alt` or other attribute contains the address, except the `mailto:` link's `href`.
- **`mailto:` link:** `href="mailto:goldbaybuilderinc@gmail.com"`. Hovering shows it in the browser's status bar. This is how mail links work, and it is what makes Email Us functional.
- **Structured data:** the address and telephone number appear in the JSON-LD `Organization` block. It is not rendered and is intended for search engines.

**Result:** no visible exposure found. The address is available to visitors through the link itself, as any mailto link is. No change was made, so email functionality is unaffected. If the client still sees the address somewhere, please send a screenshot showing where, and I'll investigate that specific location.

## 6. Process: unapproved claims
Reworded to general guidance, since David has not approved these operational commitments.

Homepage (`src/pages/index.astro`):
- Heading: "A clear process from first call to final walk-through." → "How a residential project usually unfolds."
- Note: "General guidance … Timelines and sequence are set for each project in the estimate and agreement." → "General guidance for homeowners, not a commitment. Timelines, sequence and terms are set for each project in its written agreement."
- Step 1: "Share what you want to change, the property and a budget range." → "Start with your goals" / "Describe what you want to change, the property, and a budget range you are considering."
- Step 2: "We look at the property and write down what is and is not included." → "Define the scope" / "A site visit and a written description of what is and is not included help both sides agree on the work."
- Step 3: "You receive a written estimate to compare, and terms are settled before work begins." → "Compare estimates" / "Written estimates make it easier to compare proposals on the same scope before you decide."
- Step 4: "…with decisions raised before they delay work." → "Plan and build" / "Selections, permits and construction follow the agreed scope. Ask how decisions and changes are handled."

Full process page (`src/data/process.ts`, used by `/our-process/`):
- "We listen first…", "We look at the property…", "You receive a written proposal…", "Plans … are organized so work does not start before it is ready.", "Work proceeds … with regular updates and decisions raised before they delay the job.", and "We review the finished work with you, address punch-list items…" were reworded in the same way.

Removed unused data (`projectStages` in `src/data/home.ts`), which held the same unapproved wording.

**Still for David to approve:** the full process page keeps general descriptions. Any specific commitment (timelines, update frequency, walk-through or punch-list practice) should be added only after he confirms it.

## Tests
- `npm run check`: 0 errors.
- `npm test`: 20 of 20.
- `npm run verify`: passes.
- `npm run verify:preview`: passes.
- `node scripts/qa-browser.mjs`: passes.
- Layout audit at nine widths (375–1920 px): zero issues.
