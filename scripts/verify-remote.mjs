// Verifies a DEPLOYED preview. Usage: BASE=https://cf-preview.goldbay-1oh.pages.dev node scripts/verify-remote.mjs
// Needs a local ./dist (npm run build) only to enumerate routes. Sends NO valid lead: the wizard run happens only if
// POST {} proves the endpoint is unconfigured (503), and even then submission would be rejected before delivery.
import { chromium } from 'playwright';
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
const BASE = (process.env.BASE || '').replace(/\/$/, ''); if (!BASE) { console.error('Set BASE'); process.exit(2); }
const host = new URL(BASE).host; const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const routes = walk(dist).filter((f) => f.endsWith('index.html')).map((f) => '/' + relative(dist, f).replace(/index\.html$/, '')).sort();
const fails = []; const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const page = await ctx.newPage();
let errs = []; page.on('console', (m) => m.type() === 'error' && errs.push(m.text())); page.on('pageerror', (e) => errs.push(String(e)));
let imgCount = 0;
for (const r of routes) {
  errs = []; const res = await page.goto(BASE + r, { waitUntil: 'networkidle' });
  if (res.status() !== 200) fails.push(`${r}: HTTP ${res.status()}`);
  const h = (await res.headerValue('x-robots-tag')) || ''; if (!/noindex/.test(h)) fails.push(`${r}: X-Robots-Tag missing noindex (${h || 'none'})`);
  const meta = await page.getAttribute('meta[name="robots"]', 'content'); if (!/noindex/.test(meta || '')) fails.push(`${r}: meta robots not noindex`);
  const canon = await page.getAttribute('link[rel="canonical"]', 'href'); if (!canon || new URL(canon).host !== host) fails.push(`${r}: canonical host is ${canon}`);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise((x) => setTimeout(x, 40)); } window.scrollTo({ top: 0, behavior: 'instant' }); });
  await page.waitForTimeout(250);
  const bad = await page.$$eval('img', (is) => is.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src)); imgCount += await page.$$eval('img', (i) => i.length);
  if (bad.length) fails.push(`${r}: broken images ${bad.slice(0, 2).join(',')}`);
  const real = errs.filter((e) => !/favicon/.test(e)); if (real.length) fails.push(`${r}: console errors: ${real.slice(0, 2).join(' | ')}`);
}
// 404 behaviour
const nf = await page.goto(BASE + '/definitely-not-a-page/'); if (nf.status() !== 404) fails.push(`unknown route gave ${nf.status()}, expected 404`);
// robots.txt
const rt = await (await ctx.request.get(BASE + '/robots.txt')).text(); if (!/Disallow: \//.test(rt) || /Allow: \//.test(rt)) fails.push('robots.txt is not a full Disallow');
// raw repo must not be exposed
for (const p of ['/README.md', '/package.json', '/CLAUDE.md', '/src/data/business.ts', '/.env.example', '/assets-src/manifest.json']) { const s = (await ctx.request.get(BASE + p)).status(); if (s === 200) fails.push(`repo file exposed: ${p}`); }
// Forms submit to Web3Forms from the browser; the site has no server endpoint. Nothing is submitted by this check.
const probe = await ctx.request.post(BASE + '/api/estimate', { data: {}, headers: { 'content-type': 'application/json' } });
console.log('POST /api/estimate (removed endpoint) ->', probe.status());
if (probe.status() < 400) fails.push(`/api/estimate answered ${probe.status()}: a server endpoint is live that should not exist`);
for (const path of ['/request-estimate/', '/contact/']) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  const srcs = await page.$$eval('script[src]', (s) => s.map((x) => x.src));
  let wired = false;
  for (const u of srcs) { if ((await (await ctx.request.get(u)).text()).includes('api.web3forms.com/submit')) { wired = true; break; } }
  if (!wired) fails.push(`${path}: Web3Forms endpoint not found in the page scripts`);
  console.log(path, '-> Web3Forms endpoint wired:', wired);
}
await b.close();
console.log(`${routes.length} routes crawled, ${imgCount} <img> checked`); console.log(fails.length ? 'FAILURES:\n' + fails.join('\n') : 'verify-remote: OK'); process.exit(fails.length ? 1 : 0);
