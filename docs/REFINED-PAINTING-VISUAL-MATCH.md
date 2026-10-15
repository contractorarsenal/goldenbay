# Refined Painting visual match (homepage pass 2)

Method: both sites opened in Chromium (Playwright). Measurements are computed styles and bounding boxes from the same script at 390, 768 and 1440 px. Popups, the chat launcher and sticky headers were hidden in screenshots so only page design is compared. Contact sheets: `docs/screenshots/refined-match/contact-1440.jpg` and `contact-390.jpg` (left = Refined Painting, right = Gold Bay).

## Measured comparison (homepage)
| Measure | Refined Painting | Gold Bay (after) |
|---|---|---|
| Header height | 80 px | 81 px |
| Nav labels | condensed, uppercase | condensed, uppercase (matched) |
| H1 font | Barlow Condensed 72 px (1440) / 60 px (768) / 48 px (390) | same |
| H2 font | Barlow Condensed 48 px uppercase | Barlow Condensed 48 px uppercase |
| Body font | Inter | Inter (matched) |
| Button radius | 4 px | 4 px (matched) |
| Button height, primary CTA | 36 px (nav), 56-60 px (hero) | 44 px (nav), 52 px (hero) |
| Container | 1240 px | 1240 px (matched) |
| Section padding | 80 / 96 / 112 / 128 px | 80 / 96 / 112 / 128 px (matched) |
| Hero height (1440x900) | 792 px | 792 px |
| Footer height | 626 px | ~626 px |

Section heights at 1440 px:

| Section | Refined Painting | Gold Bay | Ratio |
|---|---|---|---|
| Hero | 792 px | 792 px | 100% |
| Trust / introduction | 169 px | 225 px | 133% |
| Homeowner problems | 436 px | 610 px | 140% |
| Services | 849 px | 980 px | 115% |
| Recent projects | 701 px | 817 px | 117% |
| Process | 621 px | 644 px | 104% |
| Reviews | 705 px | 869 px | 123% |
| Service area | 387 px | 403 px | 104% |
| Final CTA | 658 px | 657 px | 100% |
| Whole page | 5944 px | 6601 px | 111% |

At 390 px the whole page is 109% of the reference (10,125 px against 9,250 px). At 768 px it is 117%.

## What changed in this pass
- Typography: headings and buttons switched to Barlow Condensed 800 uppercase, body to Inter (both self-hosted, OFL). Manrope removed.
- Geometry tokens taken from the measurements: 1240 px container, 80 px header, 80/96/112/128 px section padding, 4 px button and card corners.
- Hero headline sized to two lines at 1440 px.
- Homeowner problems: heading left, 2x2 blocks right, as in the reference.
- Services, process, service area and final CTA headings centred, as in the reference.
- Six homeowner questions removed from the homepage and moved to the FAQ page (`/faq/`). The homepage FAQ was removed too.
- Final CTA uses a gold band (Gold Bay colour) in place of the reference's red band.

## Where it still differs
- **Homeowner problems** is the largest gap (140%). Our blocks carry a question each; the reference's are title and one line only.
- **Trust strip** (133%): the reference shows badge logos. We have none, and the brief forbids inventing them, so we use text.
- **Services**: the reference's top two cards are photo tiles. Only the kitchen and bathroom work has usable photos, so the other feature card is text-only. Compact cards still carry a description and links.
- **Reviews** (123%): the reference shows a star rating and review counts. We have no ratings, so we omit them.
- **Trust, services and reviews** are the sections where the page is taller than the reference.
- **Colour**: the reference's palette (navy, cream, red) is not used. Gold Bay keeps charcoal, white and gold.
- **Imagery**: the source photographs are 1320 px video stills, which look softer than the reference's full-resolution photography.

## Not verified
Safari, Firefox and real phones. Lighthouse for this pass (see the report that accompanies this file).

## Lighthouse (live preview, one run, 2026-10-15)
Performance 100 · Accessibility 100 · Best Practices 100 · SEO 69. The SEO score is low because the preview is deliberately `noindex`, which Lighthouse counts against. Indexable builds scored 100 (see the earlier QA report). LCP 1.3 s, CLS 0.001, TBT 0 ms, 181 KB transferred.
