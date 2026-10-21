# Web3Forms: contact form and estimate wizard

Written for: the owner, David, and the developer. Describes how both forms submit, what is verified, and what is not.

## What is verified and what is not

| Item | Status |
| --- | --- |
| Mocked API success, failure, rate limit, timeout and duplicate-click behaviour | Verified (automated tests, mocked) |
| Real API submission to `api.web3forms.com/submit` | **Unverified.** No real submission has been made. |
| Delivery to the receiving inbox | **Unverified.** Needs a labelled test and a check on David's side. |

No real customer data was submitted during development, and no test email was sent.

## Endpoint and key

- Endpoint: `POST https://api.web3forms.com/submit`
- Public access key: `d2de4d02-518f-4e25-9e1f-e66543e98ade`, in `src/lib/web3forms.ts`. It is Web3Forms' public form key, meant to be visible in the browser. It is not a private secret, and it does not stop abuse by itself.
- The receiving inbox is set in the Web3Forms dashboard, not on the website.
- The website branding is Gold Bay Builders Inc. The Web3Forms dashboard label ("David Lerma GC") is an integration identifier only.

## One shared module

Both forms use `src/lib/web3forms.ts`:
- `postWeb3Form`: sends any field set with a timeout, honours a honeypot and `botcheck`, and reports success only when the response body has `success: true`.
- `submitEstimate` and `submitContact`: build the readable field sets for each form.
- `validateContact`: contact-form validation.

The estimate wizard keeps its own validation in `src/lib/estimate.ts`, which is unchanged.

## Field mapping

Every field uses a readable name, and the Web3Forms `email` field (reserved) becomes Reply-To.

**Contact form** (`/contact/`)
- Required: Full name, email, Message.
- Optional, included only when entered: Phone number, Service of interest.
- Always included: `Source: Gold Bay Builders Website`, `Form: Contact`, `subject: New Contact Message | Gold Bay Builders`, `access_key`.

**Estimate wizard** (`/request-estimate/`)
- Project type, Relationship to property, City, ZIP code, Street address (only if entered), Project stage, Budget range, Timeline, Project details, Full name, Phone number, Preferred contact method, Consent to contact (Yes/No), email (Reply-To).
- Always included: `Source`, `Form: Request an Estimate`, `subject: New Estimate Request | Gold Bay Builders`, `access_key`.

No customer confirmation email is sent. None is configured.

## Validation

- **Contact:** name 2 to 100 characters; email must match a standard pattern; phone, if given, must have 10 or 11 digits; message 10 to 3000 characters.
- **Estimate:** the existing per-step rules (project type, property, ZIP, stage, budget, timeline, details, name, phone, email, contact method, consent). Required steps block Continue; invalid fields are highlighted and focus moves to the first one.
- Browser validation is not the only check. The Web3Forms service applies its own processing to what it receives.

## Submission behaviour

- The button shows "Sending…" and is disabled while a request is in flight. A second click cannot start another request.
- Success is shown only when the response body contains `success: true`. A bare HTTP 200 is not treated as success.
- Failures show a message and keep every entered answer. The button re-enables for retry, and the wizard is not restarted.
- Timeout: 20 seconds (`WEB3FORMS_TIMEOUT_MS`).

| Situation | Message shown |
| --- | --- |
| Rejected (400, or `success: false`) | Your request was not sent. Please check your entries and try again, or call us. |
| Rate limited (429) | Too many requests came from this connection. Please wait a few minutes and try again. |
| Server error (500 or above) | Something went wrong on our side and your request was not sent. Your answers are still here. Please try again, or call us. |
| Network failure | We could not reach the server. Your answers are still here. Please check your connection and try again, or call us. |
| Timeout | The request is taking too long. Your answers are still here. Please try again, or call us. |

No personal details are logged by the site.

## Spam protection

- A hidden `website` field, which real visitors leave empty. If it is filled, nothing is sent.
- A hidden `botcheck` checkbox, Web3Forms' recommended honeypot name. If it is ticked, nothing is sent.
- Web3Forms describes its honeypot as "NOT RECOMMENDED" and deprecated, and it is weaker than a captcha. reCAPTCHA and Turnstile are Pro features according to the Web3Forms docs, and neither is configured.
- Rate limiting is handled by showing the 429 message. The site does not add its own rate limit.

## Removed

- `functions/api/estimate.ts`, the Resend and Turnstile server endpoint. Nothing called it.
- Its test (`tests/endpoint.test.mjs`).
- The `/api/*` header rule in `public/_headers`.
- The Turnstile widget and script in the wizard.
- Environment variables: `PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`.

## Photo uploads

The estimate wizard has no photo or file upload, so none is affected. Web3Forms' attachment support is a Pro feature. If photo uploads are wanted later, that needs a plan upgrade and a new step in the wizard.

## Dashboard settings to confirm before launch

1. The receiving inbox (set in the Web3Forms dashboard).
2. Sender name and subject, if you want them to differ from the defaults. The site sends the subject in the request.
3. Domain restriction: a Pro feature. Without it, the public key can be used from any site.
4. Captcha: a Pro feature. Not configured.

## Tests

- `tests/web3forms.test.mjs`: unit tests, mocked `fetch`. Covers field mapping, validation, success only on `success: true`, each failure type, timeout, honeypot and `botcheck`.
- `scripts/web3forms-qa.mjs`: mocked browser QA for both forms at 390, 768, 1024 and 1440. Every Web3Forms request is intercepted. It checks validation, the failure message, preserved answers, retry, success, payload contents, one request on a double click, and that only the expected mocked HTTP 500 appears in the console.
- `scripts/qa-browser.mjs`: the older browser QA, now mocking Web3Forms.
- `scripts/verify-remote.mjs`: checks that no removed endpoint answers and that both pages load the Web3Forms endpoint. It submits nothing.

Run: `npm run build`, then `npx astro preview --port 4321`, then `node scripts/web3forms-qa.mjs`.

## To complete a real test (not yet authorized)

1. Confirm the dashboard inbox.
2. Authorize one labelled test submission with synthetic details (for example, a name starting "TEST").
3. Record the API response. Then check the inbox and record whether it arrived. Until both are recorded, delivery stays **pending recipient inbox verification**.
