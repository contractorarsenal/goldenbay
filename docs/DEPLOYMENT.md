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
