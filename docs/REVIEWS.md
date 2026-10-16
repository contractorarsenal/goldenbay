# Customer reviews: data, placement and publishing requirements

## Data
`src/data/reviews.ts` holds the seven client-supplied reviews (Griselda L., Muhammad T., Terri M., Kevin J., Andrea J., Juan M., Rodrigo P.) with name, month/year, the client's category label and the **verbatim** text (typos and punctuation preserved, e.g. "We are now be able", "fences . 3."). No ratings, stars, surnames, exact dates or platform names were supplied and **none were invented**. Unit tests assert that each short excerpt is an exact contiguous substring of its full review, that dates are only the supplied months, and that no `rating` field exists.

## Placement
| Page | Reviews |
|---|---|
| Homepage | Terri M. (large excerpt) · Andrea J. (full) · Kevin J. (excerpt). Excerpts are labeled "Excerpt from a longer review" |
| Kitchen Remodeling | Muhammad T., Andrea J. |
| Bathroom Remodeling | Andrea J. |
| Home Additions | Griselda L. (excerpt), Terri M. (excerpt) |
| ADU Construction | Kevin J. (excerpt), Rodrigo P. (excerpt) |
| Full Home Remodeling (added) | Griselda L. (her review is a multi-room renovation) |
| Reviews page | All seven, in full |
Juan M. (fence) appears only on the Reviews page. Reviews are **not** tied to specific photographed projects.

## Pending before launch (the Reviews page is `noindex` and out of the sitemap until resolved)
1. **Source platform**: unknown. Do not label any review as Angi/HomeAdvisor/etc. Ask the client where "Verified Review" text came from.
2. **Permission/terms**: confirm the customers (or the platform's terms) allow republishing the text with first name + last initial.
3. **Accuracy**: Griselda L.'s review shows the category "Major Renovation - Multiple Rooms" but is placed on the Home Additions page (as the brief requested); Kevin J.'s category is "Outdoor Kitchen - Build" though his text describes an ADU, landscaping and stucco; Andrea J. says "on schedule, and in budget" and "specialist in bathrooms and kitchens", and Terri M. says "onsite everyday". These are customers' statements shown with attribution, **not company guarantees**; do not repeat them as promises.
4. **Rodrigo P.** and possibly **Juan M.** appear to be trade/peer contractors, not homeowners; on the page they are not described as homeowners.
5. **Schema**: no Review, AggregateRating or LocalBusiness review markup (self-serving reviews are restricted). `npm run verify` fails if any appears.
6. **Counts**: only "seven" is used (the Reviews page), never an average or aggregate.
