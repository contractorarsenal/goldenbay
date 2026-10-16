# Modern Architectural design system (homepage v3)

Status: built, inspected at 375/768/1024/1440/1920 px, and published to the noindex preview. **Awaiting client visual approval.** Other pages are inherited through shared tokens and header/footer/button rules only; they have not had a design pass.

## Typography
- **Display: Instrument Serif** (400 + 400 italic, @fontsource, OFL). A condensed contemporary serif. Chosen for editorial headlines; the hero and final CTA read as architectural lettering at display sizes.
- **Text and controls: Manrope Variable** (@fontsource-variable, OFL). Geometric, legible at 15-17 px, and it holds up in buttons and navigation.
- Replaced: Fraunces + Inter (packages removed).
- Scale (CSS variables in `src/styles/architectural.css`): display XL `clamp(3.3rem, 8vw, 7.4rem)`, display L `clamp(2.5rem, 5.4vw, 4.6rem)`, H2 `clamp(2.1rem, 4vw, 3.6rem)`, lead `clamp(1.125rem, 1.5vw, 1.3rem)`, body 17 px / 1.7.

## Color tokens
| Token | Value | Use |
|---|---|---|
| `--color-ivory` | #F7F5F0 | primary surface |
| `--color-ink` | #181919 | headlines, buttons, final CTA, mobile menu |
| `--color-stone` | #E7E3DA | quiet surfaces |
| `--color-white` | #FFFFFF | services, featured projects, San Jose, FAQ |
| `--color-champagne` | #AC9165 | decorative accent only (2.7:1 on ivory, not for text) |
| `--color-champagne-text` | #76613D | accent text on ivory/white (about 5.4:1) |
| `--color-champagne-light` | #C9B38C | accent text on ink |
| `--color-muted` | #5C5952 | secondary text (about 6.5:1 on ivory) |

Dark surfaces are used deliberately: the final CTA only. The footer is light.

## Layout system
- Sections alternate between ivory and white with hairline dividers, not a dark/light cycle.
- Services are a numbered directory (4 columns on desktop). Process is a three-column numbered sequence. Projects are three equal frames, one column on phones. Reviews are one large quote and two supporting quotes. The accordion has minimal rules and a plus/minus glyph.
- Buttons: 12 px radius, ink fill or 1 px outline, no shadows, with hover, focus-visible, active and disabled states.
- Header: transparent over the hero, solid ivory after scrolling. Desktop shows five links plus Call Now and Request an Estimate; the tablet bar shows the two buttons; phones show Menu only.

## Hero
Full-viewport photograph (the bathroom remodel) with the approved headline "Built for the way you live." set over it. A directional gradient (about 0.78 at the left edge, falling to 0.1 at the right) keeps the copy at readable contrast. The phone crop uses a lower focal point to keep the tub and tile.

**Image limitation:** the source photo is 1320 px wide. At 1920 px it is upscaled about 1.45x and looks soft. I did not fabricate detail or substitute stock. An original camera photograph would fix this.

## Services
Five rows, not boxed cards. Kitchen & Bath carries two real thumbnails, because those are the only relevant photos. Other rows have no image, rather than a placeholder. Each row has a clear CTA; Kitchen & Bath links to both pages.

## Portfolio
Three equal 4:5 frames with focal points set per photo, real captions (category, title) and View Project links. "View All Projects" follows. No locations, budgets or details are invented.

## Reviews
Exact supplied text, shown as an editorial pair. The big quote is Terri M. (excerpt); Andrea J. and Kevin J. are supporting. Attribution and the "Excerpt from a longer review" label are shown. No ratings, quotation-mark decoration or badges. Republishing permission is still a launch blocker.

## Measured results (local preview, 3 Lighthouse runs, median)
Performance 99 · Accessibility 100 · Best Practices 100 · SEO 100 · LCP 1.67 s · CLS 0.000 · TBT 0 ms · 180 KB transferred.

## Before / after
- Before: `docs/screenshots/modern-architectural/before/` (homepage v2: charcoal/gold, card-based services, dark hero panel)
- After: `docs/screenshots/modern-architectural/after/` (fold screenshots at 375, 768, 1024, 1440, 1920 px; full page at 375 and 1440; sections 02-05, 09, footer)

## Known gaps / follow-ups
- Internal pages (services, projects, guides, city pages) have only the shared token, button, header and footer changes. They need a design pass after this homepage is approved.
- Some legacy homepage CSS (`.h-*`, `.h2-*`) remains in `global.css` and is no longer used by the homepage. Remove it in the cleanup pass.
- Accessibility: the reduced-motion rule is inherited from global CSS. Manual screen-reader testing has not been done.
