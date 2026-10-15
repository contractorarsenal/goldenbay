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
for (const [k, v] of titles) if (v.length > 1) problems.push(`duplicate title "${k}": ${v.join(', ')}`);
for (const [k, v] of descs) if (v.length > 1) problems.push(`duplicate description: ${v.join(', ')}`);
const sm = walk(dist).filter((f) => /sitemap-\d+\.xml$/.test(f)).map((f) => readFileSync(f, 'utf8')).join('');
for (const r of noindexRoutes) if (sm.includes(`${r}</loc>`)) problems.push(`${r}: noindex but in sitemap`);
const indexable = [...routes].filter((r) => !noindexRoutes.has(r));
for (const r of indexable) if (!sm.includes(`${r}</loc>`)) problems.push(`${r}: indexable but missing from sitemap`);
console.log(`pages: ${pages.length}  indexable: ${indexable.length}  noindex: ${noindexRoutes.size}`);
console.log(problems.length ? 'PROBLEMS:\n' + problems.join('\n') : 'verify-site: OK');
process.exit(problems.length ? 1 : 0);
