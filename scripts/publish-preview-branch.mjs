// Publishes a NOINDEX preview build to the `cf-preview` branch, for a Cloudflare Pages project that has no build command
// and serves each branch's repository root (confirmed 2026-10-15). Cloudflare then serves that branch's root as the site
// Normal (non-force) push; never touches main or the source branch. The site has no server functions: estimate and
// contact forms submit to Web3Forms from the browser.
//   Usage: npm run preview:branch      (requires a clean working tree so the build matches a commit)
// Remove this once the Pages project's dashboard is set to: build command `npm run build`, output directory `dist`.
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, mkdirSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const BRANCH = process.env.PREVIEW_BRANCH || 'cf-preview';
const HOST = process.env.PREVIEW_HOST || 'goldbay-1oh.pages.dev'; // <project subdomain>.pages.dev (observed from the Cloudflare check links)
const SITE = `https://${BRANCH}.${HOST}`;
const sh = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: ['ignore', 'pipe', 'inherit'], encoding: 'utf8', ...opts }).trim();

if (sh('git', ['status', '--porcelain'], { cwd: ROOT })) { console.error('Working tree is not clean. Commit first so the preview matches a commit.'); process.exit(1); }
const sha = sh('git', ['rev-parse', '--short', 'HEAD'], { cwd: ROOT });
const srcBranch = sh('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { cwd: ROOT });
const origin = sh('git', ['remote', 'get-url', 'origin'], { cwd: ROOT });
const tmp = mkdtempSync(join(tmpdir(), 'gb-preview-'));
// Build inside the project: Astro moves assets with rename(), which fails across filesystems (e.g. external volume vs OS temp).
const site = join(ROOT, '.preview-site'), work = join(tmp, 'branch');
rmSync(site, { recursive: true, force: true });

console.log(`Building ${srcBranch}@${sha} for ${SITE} (noindex)...`);
const env = { ...process.env, PUBLIC_SITE_URL: SITE, PUBLIC_BUILD_ID: sha }; delete env.PUBLIC_ALLOW_INDEXING; // build marker: the commit SHA is already public on the branch
execFileSync('npx', ['astro', 'build', '--outDir', site], { cwd: ROOT, env, stdio: ['ignore', 'ignore', 'inherit'] });

const exists = sh('git', ['ls-remote', '--heads', origin, BRANCH]).length > 0;
if (exists) sh('git', ['clone', '--quiet', '--depth', '1', '--branch', BRANCH, origin, work]);
else { mkdirSync(work); sh('git', ['init', '-q', '-b', BRANCH], { cwd: work }); sh('git', ['remote', 'add', 'origin', origin], { cwd: work }); }

for (const f of readdirSync(work)) if (f !== '.git') rmSync(join(work, f), { recursive: true, force: true });
cpSync(site, work, { recursive: true });                                   // the built site (incl. _headers, robots.txt)
rmSync(site, { recursive: true, force: true });

const gitCfg = ['-c', `user.name=${process.env.GIT_AUTHOR_NAME || sh('git', ['config', 'user.name'], { cwd: ROOT }) || 'Preview Builder'}`, '-c', `user.email=${process.env.GIT_AUTHOR_EMAIL || sh('git', ['config', 'user.email'], { cwd: ROOT }) || 'preview@invalid'}`];
sh('git', ['add', '-A'], { cwd: work });
try { sh('git', ['diff', '--cached', '--quiet'], { cwd: work }); console.log('No changes since the last preview build.'); rmSync(tmp, { recursive: true, force: true }); process.exit(0); } catch { /* there are changes */ }
sh('git', [...gitCfg, 'commit', '-q', '-m', `Preview build of ${srcBranch}@${sha} (noindex, generated; do not edit)${process.env.COMMIT_TRAILER ? '\n\n' + process.env.COMMIT_TRAILER : ''}`], { cwd: work });
sh('git', ['push', ...(exists ? [] : ['-u']), 'origin', BRANCH], { cwd: work });
rmSync(tmp, { recursive: true, force: true });
console.log(`Pushed ${BRANCH}. Cloudflare will publish: ${SITE}  (and a per-deployment hash URL). Preview is noindex but PUBLIC unless Cloudflare Access is enabled.`);
