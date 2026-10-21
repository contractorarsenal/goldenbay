// Mocked browser QA for the contact form and the estimate wizard (Web3Forms).
// Every request to api.web3forms.com is intercepted and answered locally. Nothing is sent.
// Usage: npm run build && npx astro preview --port 4321 && node scripts/web3forms-qa.mjs
import { chromium } from 'playwright';

const BASE = process.env.QA_BASE || 'http://localhost:4321';
const KEY = 'd2de4d02-518f-4e25-9e1f-e66543e98ade';
const WIDTHS = [390, 768, 1024, 1440];
const browser = await chromium.launch();
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });

// Console errors are classified. The browser logs every HTTP error response, so a mocked 500 produces one
// "status of 500" entry. That entry is expected only while a mocked 500 is active; anything else is unexpected.
function track(page, state) {
  page.on('console', (m) => {
    if (m.type() !== 'error') return;
    const t = m.text();
    if (/status of 500/.test(t) && state.mocked500 > 0) state.expected500++;
    else state.unexpected.push(t);
  });
  page.on('pageerror', (e) => state.unexpected.push(e.message));
}
function mockApi(page, state) {
  return page.route('https://api.web3forms.com/**', async (route) => {
    state.calls.push(route.request().postData() || '');
    const mode = state.mode;
    if (mode === 'ok') return route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true,"body":{"message":"Email sent successfully!"}}' });
    if (mode === 'fail') { state.mocked500++; return route.fulfill({ status: 500, contentType: 'application/json', body: '{"statusCode":500,"error":"Something went wrong on server."}' }); }
    if (mode === 'slow') { await new Promise((r) => setTimeout(r, 400)); return route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' }); }
    return route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":false,"body":{"message":"rejected"}}' });
  });
}
const newState = () => ({ mode: 'ok', calls: [], mocked500: 0, expected500: 0, unexpected: [] });

for (const w of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, isMobile: w < 500, hasTouch: w < 500 });

  // ---------- Contact form ----------
  {
    const p = await ctx.newPage(); const s = newState(); track(p, s); await mockApi(p, s);
    await p.goto(`${BASE}/contact/`, { waitUntil: 'networkidle' });
    check(`${w} contact: form present`, (await p.$('#contact-form')) !== null);
    check(`${w} contact: no horizontal overflow`, (await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)) <= 1);
    await p.click('#c-submit');
    check(`${w} contact: empty submit shows name error`, (await p.textContent('[data-err="name"]')).includes('Enter your name'));
    check(`${w} contact: empty submit sends nothing`, s.calls.length === 0);
    await p.fill('#c-name', 'Test Person'); await p.fill('#c-email', 'bad@'); await p.fill('#c-message', 'Short question about ADUs.');
    await p.click('#c-submit');
    check(`${w} contact: invalid email rejected, nothing sent`, (await p.textContent('[data-err="email"]')).includes('valid email') && s.calls.length === 0);
    s.mode = 'fail';
    await p.fill('#c-email', 'test@example.com');
    await p.click('#c-submit');
    await p.waitForSelector('#c-form-err:not(:empty)', { timeout: 5000 }).catch(() => {});
    check(`${w} contact: HTTP 500 shows helpful message`, (await p.textContent('#c-form-err')).includes('not sent'));
    check(`${w} contact: answers preserved after failure`, (await p.inputValue('#c-name')) === 'Test Person' && (await p.inputValue('#c-message')).startsWith('Short question'));
    check(`${w} contact: no success shown after failure`, !(await p.isVisible('#c-success')));
    s.mode = 'ok';
    await p.click('#c-submit');
    await p.waitForSelector('#c-success:not([hidden])', { timeout: 5000 }).catch(() => {});
    check(`${w} contact: success after confirmed retry`, await p.isVisible('#c-success'));
    const body = s.calls[s.calls.length - 1] || '';
    check(`${w} contact: payload has key, readable names and reply-to`, body.includes(KEY) && body.includes('Full name') && body.includes('name="email"') && body.includes('Message'));
    check(`${w} contact: only the mocked 500 logged as an error`, s.unexpected.length === 0, s.unexpected.join(' | ').slice(0, 160));
    check(`${w} contact: mocked HTTP 500 logged once (expected)`, s.expected500 === 1, `expected500=${s.expected500}`);
    await p.close();
  }
  {
    const p = await ctx.newPage(); const s = newState(); s.mode = 'slow'; track(p, s); await mockApi(p, s);
    await p.goto(`${BASE}/contact/`, { waitUntil: 'networkidle' });
    await p.fill('#c-name', 'Test Person'); await p.fill('#c-email', 'test@example.com'); await p.fill('#c-message', 'Short question about ADUs.');
    await p.dblclick('#c-submit');
    await p.waitForTimeout(900);
    check(`${w} contact: double click sends exactly one request`, s.calls.length === 1, `requests=${s.calls.length}`);
    await p.close();
  }

  // ---------- Estimate wizard ----------
  {
    const p = await ctx.newPage(); const s = newState(); track(p, s); await mockApi(p, s);
    await p.goto(`${BASE}/request-estimate/`, { waitUntil: 'networkidle' });
    check(`${w} wizard: loads at step 1 of 7`, (await p.textContent('#step-label')).includes('Step 1 of 7'));
    check(`${w} wizard: no horizontal overflow`, (await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)) <= 1);
    await p.click('#next');
    check(`${w} wizard: step 1 requires a project type`, (await p.textContent('[data-err="projectType"]')).includes('Choose a project type'));
    const answers = async (upto) => {
      await p.click('label.choice:has-text("Kitchen remodeling")'); await p.click('#next');
      await p.click('label.choice:has-text("I own the home")'); await p.fill('#zip', '95112'); await p.click('#next');
      await p.click('label.choice:has-text("Planning")'); await p.click('#next');
      await p.click('label.choice:has-text("Not sure yet")'); await p.click('#next');
      await p.click('label.choice:has-text("Flexible")'); await p.click('#next');
      await p.fill('#details', 'Kitchen refresh with new cabinets.'); await p.click('#next');
    };
    await answers();
    check(`${w} wizard: reached step 7 of 7`, (await p.textContent('#step-label')).includes('Step 7 of 7'));
    await p.fill('#name', 'Test Person'); await p.fill('#phone', '4085550123'); await p.fill('#email', 'bad@');
    await p.click('label.choice:has-text("Email")'); await p.click('input[name="consent"]');
    await p.click('#submit');
    check(`${w} wizard: invalid email blocks submission`, (await p.textContent('[data-err="email"]')).includes('valid email') && s.calls.length === 0);
    s.mode = 'fail';
    await p.fill('#email', 'test@example.com');
    await p.click('#submit');
    await p.waitForSelector('#form-err:not(:empty)', { timeout: 5000 }).catch(() => {});
    check(`${w} wizard: HTTP 500 shows helpful message`, (await p.textContent('#form-err')).includes('not sent'));
    check(`${w} wizard: answers preserved after failure`, (await p.inputValue('#name')) === 'Test Person' && (await p.inputValue('#details')).startsWith('Kitchen refresh') && (await p.isChecked('input[name="projectType"][value="Kitchen remodeling"]')));
    check(`${w} wizard: no success after failure`, !(await p.isVisible('#success')));
    check(`${w} wizard: submit re-enabled for retry`, !(await p.$eval('#submit', (e) => e.disabled)));
    s.mode = 'ok';
    await p.click('#submit');
    await p.waitForSelector('#success:not([hidden])', { timeout: 5000 }).catch(() => {});
    check(`${w} wizard: success after confirmed retry`, await p.isVisible('#success'));
    const body = s.calls[s.calls.length - 1] || '';
    check(`${w} wizard: payload has all collected answers with readable names`, ['Project type', 'Relationship to property', 'ZIP code', 'Project stage', 'Budget range', 'Timeline', 'Project details', 'Full name', 'Phone number', 'Preferred contact method'].every((k) => body.includes(k)) && body.includes(KEY));
    check(`${w} wizard: only the mocked 500 logged as an error`, s.unexpected.length === 0, s.unexpected.join(' | ').slice(0, 160));
    check(`${w} wizard: mocked HTTP 500 logged once (expected)`, s.expected500 === 1, `expected500=${s.expected500}`);
    await p.close();
  }
  {
    const p = await ctx.newPage(); const s = newState(); s.mode = 'slow'; track(p, s); await mockApi(p, s);
    await p.goto(`${BASE}/request-estimate/`, { waitUntil: 'networkidle' });
    await p.click('label.choice:has-text("Kitchen remodeling")'); await p.click('#next');
    await p.click('label.choice:has-text("I own the home")'); await p.fill('#zip', '95112'); await p.click('#next');
    await p.click('label.choice:has-text("Planning")'); await p.click('#next');
    await p.click('label.choice:has-text("Not sure yet")'); await p.click('#next');
    await p.click('label.choice:has-text("Flexible")'); await p.click('#next');
    await p.fill('#details', 'Kitchen refresh with new cabinets.'); await p.click('#next');
    await p.fill('#name', 'Test Person'); await p.fill('#phone', '4085550123'); await p.fill('#email', 'test@example.com');
    await p.click('label.choice:has-text("Email")'); await p.click('input[name="consent"]');
    await p.dblclick('#submit');
    await p.waitForTimeout(900);
    check(`${w} wizard: double click sends exactly one request`, s.calls.length === 1, `requests=${s.calls.length}`);
    await p.close();
  }
  await ctx.close();
}

await browser.close();
const failed = results.filter((r) => !r.ok);
for (const r of results) console.log(r.ok ? 'PASS' : 'FAIL', r.name, r.detail ? `(${r.detail})` : '');
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
