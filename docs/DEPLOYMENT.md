# Deployment

Target: **Cloudflare Pages** (static `dist/` + `functions/`). No deployment config or pipeline existed in the empty repo; nothing has been deployed.

1. Create a Pages project from the GitHub repo; build command `npm run build`, output `dist`, Node 22.
2. **Preview branch settings:** leave `PUBLIC_ALLOW_INDEXING` unset (pages stay noindex).
3. Production variables: `PUBLIC_SITE_URL`, `PUBLIC_ALLOW_INDEXING=true`, `PUBLIC_TURNSTILE_SITE_KEY`, analytics IDs; secrets `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` (verify the sender domain in Resend).
4. Add custom domain; verify `robots.txt` (add a `Sitemap:` line with the final domain) and `sitemap-index.xml`.
5. **Launch checklist:** license verified and shown · legal pages reviewed and indexed · real photos · real end-to-end form test (submit, receive email, spam check) · remove `request-estimate` from sitemap exclusion · social image · Search Console + GA4 · re-run `npm run verify` and the QA script against the preview URL.

Do not merge to `main` or promote to production without approval from the owner.

## Cloudflare preview status (2026-10-15)
- `wrangler.toml` (Pages, `dist`, no account id) and `public/_headers` are committed; `npm run preview:cf` builds and runs `wrangler pages deploy dist --branch preview`.
- **Not deployed.** Wrangler 4.151 is installed via npx but is **not authenticated** (`wrangler whoami`: not authenticated) and no `CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID` exist in the environment. Wrangler's `--temporary` anonymous preview was deliberately not used, because it would publish the client's unreleased site to an unrelated account.
- **Needed:** owner's Cloudflare account access (login or scoped API token with Pages:Edit + account id), a Pages project name decision, and the Pages secrets listed above. Preview deployments should not set `PUBLIC_ALLOW_INDEXING`.
- `functions/api/estimate.ts` has only been unit-tested by direct invocation; verify under `wrangler pages dev` once authenticated.

## Discovered: a Cloudflare Pages project is already connected to this repo (2026-10-15)
While preparing to merge PR #1, GitHub check runs showed a **"Cloudflare Pages" check from the "Cloudflare Workers and Pages" GitHub app**, linking to a Pages project named **`goldbay`** (details link on the check run). Nobody on the development side connected it; Cloudflare was kept out of scope.
- It builds on pushes. `main` (the empty baseline commit) shows a **successful** Cloudflare Pages build, so pushes to `main` very likely run the project's **production** build/deploy. The latest feature-branch commit (`9133c22`) shows a **failed** build (no logs available without Cloudflare access).
- **Merge was therefore NOT performed**: it could publish an unfinished, unreviewed site (unconfirmed license/entity, reviews pending permission, placeholder portrait) to a public production URL and any attached custom domain.
- Our side is clean: a fresh clone of the feature branch builds with `npm ci && npm run build` (36 pages, Node 22.23). **Most likely cause of the Cloudflare failure:** Astro 7 requires **Node >= 22.12**, and the repo pins no Node version, so Cloudflare's default build image may be older. Fix when ready: set `NODE_VERSION=22` in the Pages project (or add `.node-version`), and confirm build command `npm run build` / output `dist`. Not applied yet, because a passing build would start publishing previews/production.
- Safe ways to proceed (owner's choice): (a) in Cloudflare, pause automatic production deploys or change the production branch away from `main`, then merge; (b) require manual approval/"build watch paths" first; (c) accept that merging publishes to the project's production URL. Built output is `noindex, nofollow` unless `PUBLIC_ALLOW_INDEXING=true` is set, but still publicly viewable.
