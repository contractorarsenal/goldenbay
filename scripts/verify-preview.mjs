// Builds WITHOUT PUBLIC_ALLOW_INDEXING (how every Cloudflare preview builds) and asserts nothing is indexable.
import { execSync } from 'node:child_process';
import { readdirSync, readFileSync, statSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const out = fileURLToPath(new URL('../dist-preview/', import.meta.url));
rmSync(out, { recursive: true, force: true });
const env = { ...process.env, CF_PAGES_URL: 'https://abc123.goldbay-example.pages.dev' }; delete env.PUBLIC_ALLOW_INDEXING; delete env.PUBLIC_SITE_URL;
execSync('npx astro build --outDir dist-preview', { stdio: 'ignore', env });
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const problems = []; let pages = 0;
for (const f of walk(out).filter((f) => f.endsWith('.html'))) {
  pages++; const html = readFileSync(f, 'utf8'); const robots = html.match(/<meta name="robots" content="(.*?)"/)?.[1] || '';
  if (!/noindex/.test(robots)) problems.push(`${f.replace(out, '/')}: not noindex (${robots || 'no robots meta'})`);
  if (/localhost/.test(html.match(/<link rel="canonical" href="(.*?)"/)?.[1] || 'localhost')) problems.push(`${f.replace(out, '/')}: canonical is localhost/missing`);
}
const robotsTxt = readFileSync(out + 'robots.txt', 'utf8');
if (!/Disallow: \//.test(robotsTxt) || /Allow: \//.test(robotsTxt) || /Sitemap:/.test(robotsTxt)) problems.push('robots.txt is not a full disallow for previews');
const headers = readFileSync(out + '_headers', 'utf8');
if (!/https:\/\/:project\.pages\.dev\/\*\s+X-Robots-Tag: noindex/.test(headers) || !/https:\/\/:version\.:project\.pages\.dev\/\*\s+X-Robots-Tag: noindex/.test(headers)) problems.push('_headers missing pages.dev noindex rules');
const home = readFileSync(out + 'index.html', 'utf8');
if (!home.includes('https://abc123.goldbay-example.pages.dev/')) problems.push('canonical/schema do not use CF_PAGES_URL');
rmSync(out, { recursive: true, force: true });
console.log(`preview build: ${pages} pages checked`); console.log(problems.length ? 'PROBLEMS:\n' + problems.join('\n') : 'verify-preview: OK'); process.exit(problems.length ? 1 : 0);
