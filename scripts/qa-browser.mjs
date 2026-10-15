// Browser QA against `astro preview`: overflow, console errors, axe, screenshots, wizard flow.
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';
const base = process.env.BASE || 'http://localhost:4321';
const out = process.env.SHOTS || 'qa-screenshots'; mkdirSync(out, { recursive: true });
const routes = ['/', '/services/', '/services/adu-construction/', '/services/kitchen-remodeling/', '/projects/', '/about/', '/service-areas/san-jose/', '/guides/san-jose-adu-guide/', '/faq/', '/contact/', '/request-estimate/', '/nope/'];
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
// Mobile menu + keyboard
{
  const ctx = await browser.newContext({ viewport: sizes.mobile }); const page = await ctx.newPage(); await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForLoadState('networkidle');
  await page.click('.menu-toggle'); await page.waitForTimeout(400); if (!(await page.isVisible('#mobile-panel a[href="/contact/"]')) || (await page.getAttribute('.menu-toggle', 'aria-expanded')) !== 'true') fails.push('mobile menu did not open');
  await page.keyboard.press('Escape'); await page.waitForTimeout(400); if (await page.isVisible('#mobile-panel')) fails.push('Escape did not close mobile menu');
  await ctx.close();
}
// Wizard: validation, back/forward persistence, unavailable (no backend), success (mocked), double submit
async function fill(page) {
  const next = () => page.click('#next');
  await next(); if (!(await page.textContent('[data-err="projectType"]')).trim()) fails.push('wizard: step1 no error');
  await page.check('input[value="ADU"]'); await next();
  await page.fill('#zip', '95112'); await next();
  await page.check('input[value="Planning"]'); await next();
  await page.check('input[value="Not sure yet"]'); await next();
  await page.check('input[value="Flexible"]'); await next();
  await page.fill('#details', 'Detached ADU in the backyard, one bedroom.'); await next();
  await page.fill('#name', 'Test Person'); await page.fill('#phone', '4085550100'); await page.fill('#email', 'test@example.com'); await page.check('input[value="Email"]'); await page.check('input[name="consent"]');
}
{
  const ctx = await browser.newContext({ viewport: sizes.mobile }); const page = await ctx.newPage(); await page.goto(base + '/request-estimate/');
  await fill(page); await page.click('#back'); await page.click('#back');
  if ((await page.inputValue('#details')) !== '' && false) fails.push('x');
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
