// Post-build checks on ./dist: metadata, canonicals, H1, JSON-LD, internal links, sitemap vs noindex.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const pages = walk(dist).filter((f) => f.endsWith('index.html') || f.endsWith('404.html'));
const problems = []; const titles = new Map(); const descs = new Map(); const noindexRoutes = new Set(); const routes = new Set();
for (const f of pages) {
  const html = readFileSync(f, 'utf8'); const route = '/' + relative(dist, f).replace(/index\.html$/, '').replace(/404\.html$/, '404/');
  routes.add(route);
  const t = html.match(/<title>(.*?)<\/title>/)?.[1], d = html.match(/<meta name="description" content="(.*?)"/)?.[1];
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (!t) problems.push(`${route}: missing title`); else titles.set(t, [...(titles.get(t) || []), route]);
  if (!d) problems.push(`${route}: missing description`); else descs.set(d, [...(descs.get(d) || []), route]);
  if (!html.includes('rel="canonical"')) problems.push(`${route}: missing canonical`);
  if (h1s !== 1) problems.push(`${route}: ${h1s} h1 elements`);
  if (/noindex/.test(html.match(/<meta name="robots" content="(.*?)"/)?.[1] || '')) noindexRoutes.add(route);
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) { try { JSON.parse(m[1].replace(/&quot;/g, '"')); } catch { problems.push(`${route}: invalid JSON-LD`); } }
  for (const m of html.matchAll(/<a [^>]*href="(\/[^"#?]*)"/g)) {
    const h = m[1]; if (/\.[a-z0-9]+$/i.test(h)) { if (!existsSync(join(dist, h))) problems.push(`${route}: missing asset ${h}`); continue; }
    if (!routes.has(h) && !existsSync(join(dist, h, 'index.html'))) problems.push(`${route}: broken link ${h}`);
  }
}
// Brand/licence safety. No licence number may appear anywhere until verified (see src/data/business.ts).
for (const f of pages) {
  const html = readFileSync(f, 'utf8'); const route = '/' + relative(dist, f).replace(/index\.html$/, '');
  if (/115776|1157776/.test(html.replace(/<script[^>]*>[\s\S]*?<\/script>/g, ''))) problems.push(`${route}: licence number published`);
  if (/\bI(?:'|’)?m (?:licensed|bonded)|licensed,? bonded|licensed (?:&|and) (?:insured|bonded)|insured (?:&|and) bonded/i.test(html)) problems.push(`${route}: unverified licensed/bonded/insured claim`);
}
// Images: every <img> needs an alt attribute; no placeholder text may ship on pages with real photos.
for (const f of pages) { const html = readFileSync(f, 'utf8'); const route = '/' + relative(dist, f).replace(/index\.html$/, '');
  for (const m of html.matchAll(/<img\b[^>]*>/g)) { if (!/\balt=/.test(m[0])) problems.push(`${route}: <img> without alt`); if (!/\bwidth=/.test(m[0]) || !/\bheight=/.test(m[0])) problems.push(`${route}: <img> without dimensions (CLS risk)`); }
  if (/https?:\/\/(?:github\.com\/user-attachments|user-images\.githubusercontent\.com)/.test(html)) problems.push(`${route}: hotlinks GitHub-hosted image`);
  if (/"@type":"(?:Review|AggregateRating|Rating)"/.test(html)) problems.push(`${route}: Review/Rating schema present (not allowed)`); }
const robotsTxt = readFileSync(join(dist, 'robots.txt'), 'utf8');
if (!/Allow: \//.test(robotsTxt) || !/Sitemap: https?:\/\/\S+\/sitemap-index\.xml/.test(robotsTxt) || /Disallow: \//.test(robotsTxt)) problems.push('robots.txt (indexing build) should allow crawling and list the sitemap');
const home = readFileSync(join(dist, 'index.html'), 'utf8');
for (const m of home.matchAll(/class="pimg-pending"[^>]*aria-label="([^"]+)"/g)) if (!m[1].startsWith('Portrait of David Lerma')) problems.push(`/: unexpected placeholder photo slot: ${m[1].slice(0, 40)}`);
if (!/<link rel="preload"|fetchpriority="high"/.test(home)) problems.push('/: hero image is not prioritised (LCP)');
if (/Golden Bay/.test(home)) problems.push('/: still uses the old name "Golden Bay"');
if (!/Gold Bay Builders/.test(home)) problems.push('/: provisional brand missing');
if (!/Building <b>YOUR<\/b> bay home|Building YOUR bay home/.test(home)) problems.push('/: tagline missing');
for (const [k, v] of titles) if (v.length > 1) problems.push(`duplicate title "${k}": ${v.join(', ')}`);
for (const v of descs.values()) if (v.length > 1) problems.push(`duplicate description: ${v.join(', ')}`);
const sm = walk(dist).filter((f) => /sitemap-\d+\.xml$/.test(f)).map((f) => readFileSync(f, 'utf8')).join('');
for (const r of noindexRoutes) if (sm.includes(`${r}</loc>`)) problems.push(`${r}: noindex but in sitemap`);
const indexable = [...routes].filter((r) => !noindexRoutes.has(r));
for (const r of indexable) if (!sm.includes(`${r}</loc>`)) problems.push(`${r}: indexable but missing from sitemap`);
console.log(`pages: ${pages.length}  indexable: ${indexable.length}  noindex: ${noindexRoutes.size}`);
console.log(problems.length ? 'PROBLEMS:\n' + problems.join('\n') : 'verify-site: OK');
process.exit(problems.length ? 1 : 0);
