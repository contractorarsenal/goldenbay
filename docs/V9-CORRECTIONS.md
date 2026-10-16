# V9 targeted corrections

Written for: the owner and the developer, for client approval. The client approved Our Projects and most of the homepage. This round changes only what the client asked to change.

## Before and after

- **Homepage services:** the numbered rows with keyword pills became a 3-over-2 card grid. Each card has a title, one short sentence and one link. The five categories are unchanged. An editorial two-column alternative was built and rejected (its right column left an empty block beside a photo). Screenshots: `docs/screenshots/v9-services/`.
- **About:** rebuilt around five questions in order: who we are, who David Lerma is, what we build, the work, and one closing CTA. One owner section. No portrait; the owner block is typographic. Real kitchen, bathroom and patio photographs. The license section is gone (the FAQ carries it).
- **Contact:** a compact intro, then one two-column layout. Direct contact (Call Now, Email Us) on the left; the estimate panel on the right, first on phones. The empty gap in the direct-contact card was removed by aligning the cards to their content.

## Duplicate closing CTA

The footer used to repeat Request an Estimate, Call Now and Email Us directly below the closing band. Fix at the layout level: `Base` takes a `closingCta` prop and passes it to `Footer`. On pages with a closing band the footer renders no action group, not hidden with CSS. On other pages it renders one restrained "Contact us" link. The Contact page omits that link, since it is the same page.

| Route | Closing band | Footer |
| --- | --- | --- |
| `/`, `/about/`, `/faq/`, `/our-process/`, `/reviews/`, `/meet-david-lerma/`, `/404`, guides | yes | no action group |
| `/services/`, six service pages, `/service-areas/`, San Jose page | yes | no action group |
| `/projects/`, seven project pages | yes ("Planning Something Similar?", kept) | no action group |
| `/contact/` | no (page is the contact action) | none |
| `/request-estimate/` | no | one contact link |
| `/privacy-policy/`, `/terms/`, `/accessibility/` | no | one contact link |

Regression tests: `tests/cta-footer.test.mjs` checks the built HTML for every page.

## Projects

Only the footer change touches Projects. Layout, cards, filters, gallery, lightbox, typography, content and indexing are unchanged.

## Mobile call bar

The fixed bar is hidden on phone widths on the estimate and contact pages, where the page already shows the same actions in full. Elsewhere it stays.

## Launch blockers (unchanged)

- Resend and Turnstile are not configured. The estimate form cannot deliver requests; no working-delivery claim is made.
- Legal review of privacy, terms and accessibility.
- Review permission and source platform.
- License verification and legal entity name.
