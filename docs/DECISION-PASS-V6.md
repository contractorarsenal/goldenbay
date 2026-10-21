# Decision pass: services, projects, typography, navigation

Scope: four decisions, each tested in the browser before choosing. Hero, copy, reviews, business facts, form and production config were not changed.

## 1. Services
Alternatives rendered at 1440, 1024, 768 and 390 px (`screenshots/decision-v6/svc-*.png`):
- **A, four cards plus a Custom Home band (previous):** Kitchen & Bathroom, with two photos, sat in the first row with three text cards. The Custom Home band was text-only with a large empty area on its right.
- **B, five cards: three over two (chosen, desktop):** the first row has Kitchen & Bathroom (photos), Full Home and Additions; the second row has ADU and Custom Home at equal width. Within each row all cards are equal height. No card dominates and no row has a gap.
- Rejected during testing: five equal cards in three columns (the second row left an empty slot), and the full-width feature row (dominant).
- Tablet (48–71.99 rem) keeps two columns with Custom Home on a full row, so nothing is left alone. Phones stack in one column.

Measured card heights (px):
| Width | Layout | Heights |
|---|---|---|
| 1440 | three over two | 311, 311, 311 / 166, 166 |
| 1024 | two columns | 304, 304 / 166, 166 / 166 |
| 768 | two columns | 343, 343 / 193, 193 / 166 |
| 390 | one column | 392, 213, 213, 243, 191 (each card's own height) |

## 2. Projects at tablet
Alternatives rendered at 768 px (`screenshots/decision-v6/proj-*.png`):
- **Previous:** two cards on the first row and the third alone on the second, leaving an empty slot.
- **Chosen:** the third card spans the full row as a horizontal card, with the photograph at 16:9 on the left and the text on the right. The patio photo keeps most of its frame at this crop.
- Rendered size: photograph about 370 px wide, card 707 px wide. The photograph is not upscaled.

## 3. Typography
Rendered side by side at 1440 (`screenshots/decision-v6/type-*.png`, `nav-compare.jpg`):
- **Card titles (services, projects, problems, process): Inter 700, chosen.** Barlow Condensed made two-line titles cramped ("Kitchen & Bathroom Remodeling"). Inter reads more cleanly at card size.
- **Navigation labels: Inter 600, chosen.** Barlow uppercase competed with the headline and buttons. Inter is easier to read at navigation size.
- **Kept in Barlow Condensed:** the H1 and H2 display headings and the uppercase buttons. They work at display size and give the page its character.

Resulting hierarchy: H1 Barlow 800 uppercase (72 px desktop); H2 Barlow 700 sentence case (48 px); card titles Inter 700; navigation Inter 600; buttons Barlow 800 uppercase; body Inter 400.

## 4. Navigation at 1100–1200 px
- Previously the desktop links switched on at 1200 px (75 rem). At 1100–1199 px the links were hidden behind Menu.
- Tested: the links fit at 1100 px with the normal label size if spacing is reduced (nav gap clamp .9–2.1 rem, button padding .9 rem). No overflow at 1100, 1150 or 1199 px. Text is not shrunk.
- **Chosen:** desktop navigation from 68.75 rem (1100 px). Below 1100 px, Menu.
- Header height is 81 px on both sides of the switch, with no clipped controls and no overflow at 1024, 1099, 1100, 1150, 1199 or 1200 px.

## Engineering
- `npm run check`: 0 errors.
- `npm test`: 20 of 20.
- `npm run verify`: passes (36 pages, 17 indexable).
- `npm run verify:preview`: passes (all pages noindex).
- `node scripts/qa-browser.mjs`: passes.
- Layout audit at 375, 390, 768, 850, 1024, 1100, 1280, 1440 and 1920 px: zero overflow, header collisions, clipped text, text under 12 px, tap targets under 44 px, or axe violations.
- Preview and live results are recorded in the report accompanying this commit.

## Not verified
- Safari, Firefox and real devices.
- The screen recording, which was not accessible.
