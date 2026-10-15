// Safety net for Cloudflare Pages. If the Pages project has NO build command in its dashboard settings, Cloudflare
// installs dependencies and then looks for `dist/` (wrangler.toml: pages_build_output_dir) without building anything.
// On Cloudflare only (CF_PAGES=1), and only when dist/ is missing, build the site here.
// Local installs, CI and dashboards that already run `npm run build` are unaffected (a later `npm run build` just rebuilds).
// Remove this file and the "postinstall" script once the dashboard build command is confirmed as `npm run build`.
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
if (process.env.CF_PAGES !== '1') process.exit(0);
if (existsSync(new URL('../dist/index.html', import.meta.url))) process.exit(0);
console.log('[cf-postinstall] CF_PAGES=1 and dist/ is missing: building the site (the Pages project may have no build command).');
execSync('npx astro build', { stdio: 'inherit' });
