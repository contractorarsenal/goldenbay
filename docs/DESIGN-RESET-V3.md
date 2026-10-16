# Design reset v3 (contractor-grade, sans-serif)

Status: homepage rebuilt and published to the noindex preview. **Awaiting client visual approval.** Inner pages inherit the shared system (tokens, header, buttons, footer) and have had a visual check only for regressions.

## Reference inspection
The reference site (refinedpainting-com.pages.dev) was opened in Chromium at 1440 and 390 px and captured in full. Observed structure: photo hero with a bold sans headline, two buttons (primary filled, secondary outline), a trust strip, four homeowner-problem blocks, a five-tile service grid, a three-up project gallery with category labels and a View All button, a four-step process on a dark band, a review block with a featured quote, compact service-area chips, a bold closing CTA and a dark multi-column footer. Its colors, imagery, ratings, warranty and branding were not copied.

## What was borrowed as principles
Clear section order that moves visitor from problem to solution; bold sans headings; primary and secondary CTA pairs; a dark band for process and footer only; compact trust statements; service tiles with an obvious link; equal-sized project cards with category labels; a featured review with supporting quotes.

## Gold Bay decisions
- **Palette:** white #FFFFFF, charcoal #17191D, light gray #F3F4F5, muted gold #B48A52 (fills and accents), gold text #8A6A3A on white (about 5:1), gold on charcoal #D4B07C (about 7:1), body #3E4248.
- **Type:** Manrope (variable, self-hosted) for everything, including headings. Instrument Serif removed. Headings 800/700, body 16 px / 1.65.
- **Radius:** buttons 12 px, cards 16 px, images 16 px, small thumbnails 10 px. Chips are the only pills.
- **Header:** white when not over the hero, transparent over the hero, solid after scroll. Desktop: five links, Call Now (outline) and Request an Estimate (gold). Tablet shows both buttons; phones show Menu only.
- **Hero:** full-bleed real bathroom photograph; approved headline; eyebrow with the San Jose service area; two CTAs; "Serving San Jose, California" line.
- **Homeowner problems:** four blocks framed as common concerns with a question to ask. Presented as concerns, not guarantees.
- **Services:** five tiles, each with a short description, its scope points and the link to its page. Kitchen & Bath carries two real thumbnails.
- **Projects:** three equal cards with real photographs, category, title and View Project.
- **How it works:** four steps labelled as general guidance, with a link to the full process page.
- **Reviews:** a featured quote (Terri M., exact text) and two supporting quotes (Andrea J., Kevin J.), with View All Reviews.
- **San Jose:** short statement and two chips (San Jose and all service areas). No unconfirmed cities.
- **FAQ and contractor questions:** the six homeowner-guidance questions as an accordion, then the FAQ accordion.
- **Final CTA:** charcoal band, "Ready to get your project started?", Request an Estimate and Call Now, with Email Us as a text link.
- **Footer:** charcoal, brand and tagline, action buttons, service/navigation/location columns, legal links, "Website by Contractor Arsenal".

## Removed in this pass
- The editorial architecture system (`architectural.css`) is deleted.
- Instrument Serif is uninstalled.
- Legacy homepage CSS is unused and remains only where shared components still reference it (see Known gaps).

## Known gaps
- **Hero image:** the source is 1320 px wide, so it looks soft at large sizes. Original photography would fix this.
- **Services grid:** the Custom Home card has blank space beside the taller Kitchen & Bath card. A custom-home photograph would fill it.
- **Legacy CSS:** `global.css` still holds older component rules that inner pages use. A cleanup pass should remove the unreachable ones after inner pages are reviewed.
- **Inner pages:** services, projects, guides and city pages have had only regression checks. They need a design pass after this homepage is approved.
- **Reviews and business facts:** republishing permission, the legal entity, and CSLB verification are still open.
