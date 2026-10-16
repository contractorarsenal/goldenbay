# Visual polish v4: audit, changes, measurements

Scope: formatting, typography, spacing, alignment and responsive behaviour of the existing homepage. Structure and content were kept. Captures: `docs/screenshots/visual-polish-v4/`.

## Audit (before, measured at 375-1920 px)
Prioritised problems found in the pre-polish build:
1. **Tablet service grid** (768 px): four service cards in one row, about 170 px each. Fixed: two columns from 48 to 71.99 rem, four from 72 rem.
2. **Tablet project grid** (768 px): three project cards at 227 px. Fixed: two columns on tablet, three from 64 rem.
3. **Tablet process** (768 px): four steps at 117 px each. Fixed: two columns from 48 to 71.99 rem.
4. **Laptop problems** (1024 px): the 2x2 blocks were squeezed into a 204 px column beside the heading. Fixed: side-by-side layout only from 72 rem.
5. **Laptop services** (1024 px): four cards at 174 px. Fixed by the same breakpoint change.
6. **Body line length**: lines ranged from 16 to 85 characters. Fixed: paragraphs capped at 62ch.
7. **H2 and H3 in uppercase condensed**: aggressive at this size. Now sentence case, weight 700. H1, buttons and eyebrows stay uppercase.
8. **Gutters**: a fixed 24 px at every width. Now `clamp(24px, 4vw, 48px)`.
9. **Services heading**: centred block was anchored left, so it sat off the page centre. Fixed with auto margins.
10. **Project links**: an inherited full-width border under each link, and a two-line title that pushed one link out of line. Links now underline the text only; titles reserve two lines.
11. **Review card**: the quote card stretched to the side column, leaving empty space. Fixed with top alignment.
12. **Footer primary button**: charcoal on charcoal, invisible. Now gold.
13. **Stylesheet**: conflicting service-grid rules at the same breakpoint removed. Unused homepage rules for removed sections deleted. Verified against the markup.

## Measurements (after)
| Width | Overflow | H1 | Body line length | Compact card heights | Project image |
|---|---|---|---|---|---|
| 375 | 0 | 48 px, 2 lines | 38-47 ch | 188/188/193/166 (single column) | 327x245 |
| 390 | 0 | 48 px, 2 lines | 40-49 ch | 188/188/193/166 (single column) | 342x257 |
| 768 | 0 | 60 px, 2 lines | 42-78 ch | 188/188/193/193 (two columns) | 343x257 |
| 1024 | 0 | 72 px, 2 lines | 50-78 ch | 166 each (two columns) | 301x226 |
| 1440 | 0 | 72 px, 2 lines | 35-78 ch | 193 each (four columns) | 400x300 |
| 1920 | 0 | 72 px, 2 lines | 35-78 ch | 193 each (four columns) | 400x300 |

Line length is an estimate (half the font size per character). The upper end of the range can exceed 75 ch on wide cards. The lower end on phones is about 40 ch, because the viewport is narrow.

## Not changed on purpose
- The hero photograph, headline and CTA pair (approved).
- The five services, the three project cards, the four process steps, and the review text (unedited).
- The final CTA colours (charcoal, white, gold) and its centred structure.

## Limitations
- Phone line lengths sit at about 40-49 characters, below the 55-75 target. Narrow viewports can't reach that without shrinking type.
- The services grid at tablet leaves the fifth card on its own row, since five cards don't divide into two columns.
- Source photographs remain soft at large sizes.
- Safari, Firefox and real devices were not tested.
