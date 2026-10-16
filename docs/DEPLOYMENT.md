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

## Cloudflare Pages: what is confirmed, inferred and unknown (2026-10-15)

**Setup observed:** a Pages project named `goldbay` (subdomain `goldbay-1oh.pages.dev`) is connected to this repo via the "Cloudflare Workers and Pages" GitHub app. No credentials are available to development, so **nothing in the dashboard was read or changed**; everything below comes from GitHub check runs and public HTTP probes.

### Confirmed (observed)
- Every pushed branch builds and deploys; each gets a per-deployment URL `https://<hash>.goldbay-1oh.pages.dev` and a branch alias `https://<branch-slug>.goldbay-1oh.pages.dev`. The empty `main` baseline deployed successfully and a production-style alias `goldbay-1oh.pages.dev` returns an empty 404.
- The project **runs no build**: a deployment of the feature branch served the **repository root as-is** (README, package.json, docs, `src/*.ts`, `assets-src/`...) with no `dist/`. `functions/` was compiled and live (`GET /api/estimate` -> 405).
- Consequence: a root **`wrangler.toml` with `pages_build_output_dir = "./dist"` makes every build fail within ~8 seconds** (the output directory never exists). Removing it flipped builds from failure to "success", proven by A/B pushes (`9133c22`, `1e0f1ac`, `c6d4d64`, `4e5eba4` failed; `9ba900c` succeeded). It is why earlier "Node version" fixes made no difference.
- Preview deployments are **publicly reachable with no Cloudflare Access login** (the hash URL and branch alias both returned 200 to an anonymous client).
- Not a Node problem: Node 22.12.0 (Astro 7's minimum) and 22.23.3 both do a clean `npm ci` + build + 20/20 tests + verify locally. Node is pinned anyway in `.node-version`, `.nvmrc` and `package.json` `engines` (22.12.0).

### Inferred (not confirmed; dashboard not viewed)
- The dashboard build command is empty and the output directory is the repo root, so **`main` is almost certainly the production branch** (its empty baseline deploy produced the production alias). Not verified.

### Unknown
- Production branch setting, custom domains, environment variables/secrets, whether Cloudflare Access is enabled for previews, and the real build logs (the check links require a Cloudflare login).

### Current interim preview (works today, needs no dashboard changes)
`npm run preview:branch` builds the **noindex** preview (canonicals use the preview URL) and pushes only the built output plus `functions/` to the `cf-preview` branch (normal, non-force push). Cloudflare serves that branch's root. URL: **https://cf-preview.goldbay-1oh.pages.dev**. Verified by `npm run verify:remote` (see QA-REPORT.md). The raw-root deployments of other branches are hardened with a root `_headers` (X-Robots-Tag noindex) and `robots.txt` (Disallow).

Noindex layers on the preview: `X-Robots-Tag: noindex, nofollow` header (`_headers` rule for `*.pages.dev`), `<meta name="robots" content="noindex, nofollow">` on every page, and `robots.txt` = `Disallow: /`. **None of this makes it private**; anyone with the URL can open it. Use Cloudflare Access for that.

### The proper fix (owner/dashboard, ~2 minutes) then retire the workaround
In Cloudflare: Workers & Pages -> `goldbay` -> Settings:
1. **Build configuration:** build command `npm run build`, build output directory `dist`, root directory blank. Framework preset: Astro.
2. **Environment variables (Production and Preview):** leave `PUBLIC_ALLOW_INDEXING` **unset** until launch. Do not set `PUBLIC_SITE_URL` for previews (the build uses `CF_PAGES_URL`). `NODE_VERSION` is not needed (`.node-version` is read).
3. **Protect previews:** Settings -> General -> **Enable Access policy** for preview deployments (Cloudflare Access), allowing only the team's emails.
4. **Secrets for the lead form (when ready):** `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`, and `PUBLIC_TURNSTILE_SITE_KEY` at build time.
5. Then remove `scripts/publish-preview-branch.mjs` and the `cf-preview` branch, and (optionally) copy `docs/wrangler.toml.example` to the repo root (a root `wrangler.toml` is only safe once a build produces `dist/`).
6. **Before merging PR #1:** decide the production branch. Merging to `main` publishes to the production URL (`goldbay-1oh.pages.dev` and any custom domain). Production builds stay `noindex` until `PUBLIC_ALLOW_INDEXING=true` is set.

### Launch checklist (unchanged)
License verified and shown, legal pages reviewed, real photos and review permissions, a real end-to-end form test, social image, Search Console + GA4, re-run `verify`, `verify:remote` and the QA script against the final URL.
