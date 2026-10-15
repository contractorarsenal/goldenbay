// Browser QA against `astro preview`: overflow, console errors, axe, screenshots, wizard flow.
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';
const base = process.env.BASE || 'http://localhost:4321';
const out = process.env.SHOTS || 'qa-screenshots'; mkdirSync(out, { recursive: true });
const routes = ['/', '/services/', '/services/adu-construction/', '/services/kitchen-remodeling/', '/projects/', '/about/', '/service-areas/san-jose/', '/guides/san-jose-adu-guide/', '/faq/', '/contact/', '/request-estimate/', '/reviews/', '/projects/kitchen-remodel/', '/projects/pool-house-outdoor-living-area/', '/services/bathroom-remodeling/', '/nope/'];
const sizes = { mobile: { width: 375, height: 800 }, tablet: { width: 820, height: 1100 }, desktop: { width: 1440, height: 900 } };
const browser = await chromium.launch(); const fails = [];
for (const [name, vp] of Object.entries(sizes)) {
  const ctx = await browser.newContext({ viewport: vp }); const page = await ctx.newPage();
  const errs = []; page.on('console', (m) => m.type() === 'error' && errs.push(m.text())); page.on('pageerror', (e) => errs.push(String(e)));
  for (const r of routes) {
    const res = await page.goto(base + r, { waitUntil: 'networkidle' });
    if (r !== '/nope/' && res.status() !== 200) fails.push(`${name} ${r}: HTTP ${res.status()}`);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (over > 1) fails.push(`${name} ${r}: horizontal overflow ${over}px`);
    if (name !== 'tablet') { const ax = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze(); for (const v of ax.violations) fails.push(`${name} ${r}: axe ${v.id} (${v.impact}) x${v.nodes.length}`); }
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo({ top: y, behavior: "instant" }); await new Promise((r) => setTimeout(r, 40)); } window.scrollTo({ top: 0, behavior: "instant" }); await new Promise((r) => setTimeout(r, 800)); });
    if (['/', '/services/adu-construction/', '/request-estimate/'].includes(r)) await page.screenshot({ path: `${out}/${name}${r.replace(/\//g, '_')}.png`, fullPage: name !== 'mobile' || r !== '/' ? true : true });
  }
  const real = errs.filter((e) => !/404/.test(e)); if (real.length) fails.push(`${name}: console errors: ${[...new Set(real)].join(' | ')}`);
  await ctx.close();
}
// Homepage: five widths: overflow, clipped headings, axe, overlay header turns solid on scroll, CTAs resolve
for (const w of [375, 768, 1024, 1440, 1920]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 800 ? 900 : 1000 } }); const page = await ctx.newPage();
  const errs = []; page.on('console', (m) => m.type() === 'error' && errs.push(m.text())); page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const o = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); if (o > 1) fails.push(`home@${w}: overflow ${o}px`);
  const clipped = await page.evaluate(() => [...document.querySelectorAll('h1,h2,h3')].filter((e) => e.scrollWidth > e.clientWidth + 1).map((e) => e.textContent.slice(0, 30))); if (clipped.length) fails.push(`home@${w}: clipped headings ${clipped.join('|')}`);
  const h1 = await page.locator('h1').count(); if (h1 !== 1) fails.push(`home@${w}: ${h1} h1`);
  if ((await page.getAttribute('.site-header', 'class')).includes('solid')) fails.push(`home@${w}: header solid at top`);
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' })); await page.waitForTimeout(400);
  if (!(await page.getAttribute('.site-header', 'class')).includes('solid')) fails.push(`home@${w}: header did not turn solid on scroll`);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await page.waitForTimeout(800);
  const ax = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze(); for (const v of ax.violations) fails.push(`home@${w}: axe ${v.id} (${v.impact}) x${v.nodes.length}`);
  const hrefs = await page.$$eval('main a[href^="/"]', (as) => [...new Set(as.map((a) => a.getAttribute('href')))]);
  for (const h of hrefs) { const r = await page.request.get(base + h); if (r.status() !== 200) fails.push(`home@${w}: link ${h} -> ${r.status()}`); }
  if (errs.filter((e) => !/404/.test(e)).length) fails.push(`home@${w}: console errors`);
  await ctx.close();
}
// Real images: every <img> loads (naturalWidth>0), no layout-breaking sizes; projects filter works and only shows real categories
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } }); const page = await ctx.newPage();
  for (const r of ['/', '/projects/', '/projects/paver-installation/', '/reviews/']) {
    await page.goto(base + r, { waitUntil: 'networkidle' });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise((x) => setTimeout(x, 60)); } window.scrollTo({ top: 0, behavior: 'instant' }); });
    await page.waitForTimeout(500);
    const bad = await page.$$eval('img', (is) => is.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src));
    if (bad.length) fails.push(`${r}: images failed to load: ${bad.slice(0, 2).join(', ')}`);
    const noAlt = await page.$$eval('img', (is) => is.filter((i) => !i.hasAttribute('alt')).length); if (noAlt) fails.push(`${r}: ${noAlt} images missing alt`);
  }
  await page.goto(base + '/projects/', { waitUntil: 'networkidle' });
  const chips = await page.$$eval('.pf-chip', (c) => c.map((x) => x.firstChild.textContent.trim())); if (chips.join('|') !== 'All Projects|Bathrooms|Kitchens|Outdoor Living|Patios & Pavers') fails.push('projects filters unexpected: ' + chips.join('|'));
  const visible = () => page.$$eval('.pf-card', (c) => c.filter((x) => !x.hidden).length);
  if ((await visible()) !== 7) fails.push('projects: expected 7 visible initially');
  await page.click('.pf-chip[data-filter="bathrooms"]'); if ((await visible()) !== 3) fails.push('projects: Bathrooms filter should show 3');
  if (!(await page.textContent('#pf-status')).includes('3 projects')) fails.push('projects: filter status not announced');
  await page.click('.pf-chip[data-filter="patios-pavers"]'); if ((await visible()) !== 2) fails.push('projects: Patios & Pavers should show 2');
  await page.click('.pf-chip[data-filter="all"]'); if ((await visible()) !== 7) fails.push('projects: All should restore 7');
  // keyboard: chips reachable and Enter/Space toggles
  await page.focus('.pf-chip[data-filter="kitchens"]'); await page.keyboard.press('Enter'); if ((await visible()) !== 1) fails.push('projects: Kitchens via keyboard should show 1');
  await ctx.close();
}
// Mobile menu + keyboard
{
  const ctx = await browser.newContext({ viewport: sizes.mobile }); const page = await ctx.newPage(); await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForLoadState('networkidle');
  await page.click('.menu-toggle'); await page.waitForTimeout(400); if (!(await page.isVisible('#mobile-panel a[href="/contact/"]')) || (await page.getAttribute('.menu-toggle', 'aria-expanded')) !== 'true') fails.push('mobile menu did not open');
  await page.keyboard.press('Escape'); await page.waitForTimeout(400); if (await page.isVisible('#mobile-panel')) fails.push('Escape did not close mobile menu');
  await ctx.close();
}
// Keyboard-only: skip link first, services dropdown via Enter, Escape closes, wizard completes without a mouse
{
  const ctx = await browser.newContext({ viewport: sizes.desktop }); const page = await ctx.newPage(); await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab'); if (!(await page.evaluate(() => document.activeElement?.className === 'skip'))) fails.push('keyboard: skip link is not first tab stop');
  for (let i = 0; i < 3; i++) await page.keyboard.press("Tab");
  const onBtn = await page.evaluate(() => document.activeElement?.textContent?.trim().startsWith('Services'));
  if (!onBtn) fails.push('keyboard: Services button not the 4th tab stop (skip, logo, Home, Services)');
  await page.keyboard.press('Enter'); await page.waitForTimeout(300);
  if (!(await page.isVisible('#dd-services a[href="/services/adu-construction/"]'))) fails.push('keyboard: dropdown did not open on Enter');
  await page.keyboard.press('Escape'); await page.waitForTimeout(300); if (await page.isVisible('#dd-services')) fails.push('keyboard: Escape did not close dropdown');
  await page.goto(base + '/request-estimate/', { waitUntil: 'networkidle' });
  const tabTo = async (sel) => { for (let i = 0; i < 40; i++) { if (await page.evaluate((s) => document.activeElement?.matches(s), sel)) return true; await page.keyboard.press('Tab'); } return false; };
  if (!(await tabTo('input[name="projectType"]'))) fails.push('keyboard: cannot reach step 1 options');
  await page.keyboard.press('Space'); await tabTo('#next'); await page.keyboard.press('Enter'); await page.waitForTimeout(150);
  if ((await page.textContent('#step-label')).trim() !== 'Step 2 of 7') fails.push('keyboard: Continue via Enter did not advance');
  const focusedIsLegend = await page.evaluate(() => document.activeElement?.tagName === 'LEGEND'); if (!focusedIsLegend) fails.push('keyboard: focus not moved to step heading');
  await ctx.close();
}
// Wizard: validation, back/forward persistence, unavailable (no backend), success (mocked), double submit
async function fill(page) {
  const next = () => page.click('#next');
  await next(); if (!(await page.textContent('[data-err="projectType"]')).trim()) fails.push('wizard: step1 no error');
  await page.check('input[value="ADU"]'); await next();
  await next(); if (!(await page.textContent('[data-err="propertyStatus"]')).trim()) fails.push('wizard: property status not required');
  await page.check('input[value="I own the home"]'); await page.fill('#zip', '95112'); await next();
  await page.check('input[value="Planning"]'); await next();
  await page.check('input[value="Not sure yet"]'); await next();
  await page.check('input[value="Flexible"]'); await next();
  await page.fill('#details', 'Detached ADU in the backyard, one bedroom.'); await next();
  await page.fill('#name', 'Test Person'); await page.fill('#phone', '4085550100'); await page.fill('#email', 'test@example.com'); await page.check('input[value="Email"]'); await page.check('input[name="consent"]');
}
{
  const ctx = await browser.newContext({ viewport: sizes.mobile }); const page = await ctx.newPage(); await page.goto(base + '/request-estimate/');
  await fill(page); await page.click('#back'); await page.click('#back');
  await page.click('#next'); await page.click('#next');
  if (!(await page.inputValue('#name'))) fails.push('wizard: answers not preserved across steps');
  await page.route('**/api/estimate', (r) => r.fulfill({ status: 503, body: '{"ok":false}' }));
  await page.click('#submit'); await page.waitForSelector('#unavailable:not([hidden])'); if (await page.isVisible('#success')) fails.push('wizard: claimed success on 503');
  await ctx.close();
}
{
  const ctx = await browser.newContext({ viewport: sizes.desktop }); const page = await ctx.newPage(); await page.goto(base + '/request-estimate/');
  let calls = 0; await page.route('**/api/estimate', async (r) => { calls++; await new Promise((x) => setTimeout(x, 300)); r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }); });
  await fill(page); await page.dblclick('#submit'); await page.waitForSelector('#success:not([hidden])');
  if (calls !== 1) fails.push(`wizard: duplicate submit, ${calls} calls`);
  await ctx.close();
}
await browser.close();
console.log(fails.length ? 'QA FAILURES:\n' + fails.join('\n') : 'qa-browser: OK'); process.exit(fails.length ? 1 : 0);
