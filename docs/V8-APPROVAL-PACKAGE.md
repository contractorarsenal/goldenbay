# V8 approval package: findings for this round

Written for: the owner and the developer. V8 is not approved. This round changed copy and fixed reproducible defects only. No wholesale redesign and no CSS consolidation.

## Visual evidence

Captured from the live preview, not from HTML: `docs/screenshots/v8-approval/live/` (six pages at 390 and 1440). Contact sheets: `docs/screenshots/v8-approval/sheet-desktop.jpg` and `sheet-mobile.jpg`.

What the sheets show: consistent headers, ruled services list, equal review cards, the shared charcoal CTA band, and no empty cards. The mobile sheet is too small to judge detail; a closer review on a phone is still needed before approval.

## Changes this round

- **About:** repeated introductions merged into one. The "checking a contractor" section removed; the FAQ carries that guidance, with the CSLB link. The "scope in writing" point appears once. Owner section uses only verified facts. One process sentence softened to general practice.
- **Homepage:** removed the disclaimer under the homeowner concerns, shortened the process-footer and service-area sentences. No facts removed.
- **Service Areas:** hero copy simplified. San Jose remains the only confirmed service city.
- **Mobile call bar:** reproduced a defect. A keyboard-focused Send button sat under the fixed call bar on a 390 px viewport. Fixed by hiding the bar on the estimate page at phone widths, where the form has its own buttons. Also added a phone scroll-padding rule for other focus targets.
- **Build marker** and preview-only settings are unchanged.

## Contact and estimate verification (browser, submission intercepted)

Nothing was sent. The submit endpoint was intercepted with a 503 response, which the page treats as unavailable.

- Contact: Call Now is `tel:+14085067184`, Email Us is `mailto:` (address in the href only), Request an Estimate links to the estimate page. No phone or email appears as visible text.
- Wizard, all seven steps: validation on step 1 (project type), step 2 (ZIP must be five digits), step 6 (details minimum length) and step 7 (name required). Continue advances only when the step is valid. Back returns and keeps the answer. Send request appears only on step 7.
- Keyboard: Enter in the ZIP field advances to step 3. Focus moves to the step heading on each change.
- Unavailable state: shown on 503. No success message is shown. The request was not sent.
- Test: `scratchpad/wizard-check.mjs`, 19 of 19 passing.

**Not verified:** a successful submission. Lead delivery is not configured, so it cannot be tested end to end. The site must not claim that delivery works.

## Stale deleted-city URLs

Rechecked on the live preview after publication (results below). Expected status for the removed city pages is 404. The plain URL may still return a cached 200 from before the change, while a query-string request returns 404. Full evidence is in `docs/PREVIEW-VERIFICATION-V8.md`.

## Legal review status

Privacy, terms and accessibility pages still carry the "pending legal review" notice. Nothing is represented as attorney-reviewed. These pages stay noindex. Attorney review is a launch blocker.

## Unverified company claims still on the site

These are listed for David's approval in `docs/DAVID-APPROVAL-CHECKLIST.md`:
- Written scope, same-scope estimates, questions along the way (About).
- A first conversation about the house, goals and budget (About).
- "Ask for David Lerma when you call" (Contact).
- Owner as main point of contact (About, Meet David).
- Process steps described as typical practice (Our Process).

## Launch blockers

1. Resend and Turnstile are not configured. The estimate form cannot deliver requests, so no launch claim about lead delivery can be made.
2. Legal review of privacy, terms and accessibility.
3. David's approval of company-practice claims and biography.
4. License number and legal entity name not verified.
5. Review quote source and republishing permission not confirmed.
6. Stale edge cache for five removed city URLs (self-expiring; purge needs the dashboard).
