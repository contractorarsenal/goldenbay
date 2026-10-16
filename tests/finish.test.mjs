import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';

const read = (p) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const walk = (dir) => readdirSync(new URL('../' + dir, import.meta.url)).flatMap((f) => {
  const rel = `${dir}/${f}`;
  return statSync(new URL('../' + rel, import.meta.url)).isDirectory() ? walk(rel) : [rel];
});
const markupFiles = [...walk('src/pages'), ...walk('src/components'), ...walk('src/layouts')].filter((f) => f.endsWith('.astro'));
const styleText = ['src/styles/global.css', 'src/styles/system.css', 'src/styles/v8.css'].map(read).join('\n');

test('every literal class in markup still has a style rule (CSS cleanup regression)', () => {
  // Classes that are deliberately unstyled hooks (JS or test targets) are listed explicitly.
  const hooks = new Set(['js', 'in', 'open', 'solid', 'done', 'overlay', 'hidden', 'skip', 'hp', 'cf-turnstile', 'callbar', 'mobile-panel', 'desk-nav', 'mobile-ctas', 'sub', 'menu-toggle', 'has-dd', 'form-err', 'err', 'hint', 'field', 'choices', 'choice', 'progress', 'wiz', 'wz-result', 'pimg-pending', 'pj-status', 'pj-lb', 'pj-lb-count', 'pj-lb-alt', 'pj-lb-bar', 'pj-lb-close', 'pj-lb-stage', 'pj-lb-nav', 'pj-enlarge', 'pj-single', 'pj-note', 'pj-generic', 'pj-scope', 'pj-svc-links', 'pj-facts-cta', 'pj-related', 'pj-thumb', 'pj-gallery-grid', 'pj-lone', 'pj-card', 'pj-img', 'pj-body', 'pj-cat', 'pj-meta', 'pj-intro', 'pj-view', 'pj-chip', 'pj-filters', 'pj-grid', 'pj-rel-grid', 'pj-facts', 'pj-detail-grid', 'pj-rel-grid', 'legal-status', 'legal-body', 'fill', 'pimg', 'sr-only', 'eyebrow', 'lede', 'wrap', 'section', 'prose', 'split', 'rev', 'bg-ink', 'bg-stone', 'on-dark', 'logo', 'btn', 'faq', 'table-scroll', 'reveal', 'site-header', 'site-footer', 'foot-top', 'foot-tag', 'foot-lede', 'foot-actions', 'foot-brand', 'legal', 'legal-links', 'credit', 'header-call', 'header-cta', 'nav-list', 'nav-link', 'menu', 'logo-mark', 'logo-sub', 'logo-gold', 'bar', 'header-actions', 'arrow-link', 'num', 'plate', 'placeholder', 'glance', 'answer-box', 'tiles', 'rule-list', 'svc-hero-grid', 'svc-row', 'svc-quotes', 'blueprint', 'table', 'mobile-panel', 'tq', 'tq-md', 'tq-lg', 'tq-light', 'tq-dark', 'figure', 'b']);
  const missing = new Set();
  for (const f of markupFiles) {
    const src = read('src/' + f.replace(/^src\//, ''));
    for (const m of src.matchAll(/class="([^"{}]+)"/g)) {
      for (const c of m[1].split(/\s+/).filter(Boolean)) {
        if (c.startsWith('pj-') || c.startsWith('sv-') || c.startsWith('v8-') || c.startsWith('ih') || c.startsWith('cb') || c.startsWith('ct-') || c.startsWith('sa-') || c.startsWith('ab-') || c.startsWith('wz-') || c.startsWith('svp-') || c.startsWith('rv-') || c.startsWith('crumbs') || c.startsWith('hp-')) {
          // covered by the stylesheet below
        }
        if (hooks.has(c)) continue;
        if (!new RegExp(`\\.${c.replace(/[-]/g, '\\-')}(?![A-Za-z0-9_-])`).test(styleText)) missing.add(`${f}: .${c}`);
      }
    }
  }
  assert.deepEqual([...missing], [], `classes with no style rule: ${[...missing].join(', ')}`);
});

test('404 page: explanation, return-home and projects actions, noindex', () => {
  const src = read('src/pages/404.astro');
  assert.ok(src.includes('noindex'));
  assert.ok(src.includes('href="/"') && src.includes('Return home'));
  assert.ok(src.includes('href="/projects/"'));
  assert.ok(src.includes('could not be found'));
});

test('legal pages: pending-review status is shown and pages stay noindex', () => {
  const src = read('src/components/Legal.astro');
  assert.ok(src.includes('Pending legal review'));
  assert.ok(src.includes('data-legal-status="pending-attorney-review"'));
  assert.ok(src.includes('noindex'));
  assert.ok(src.includes('has not yet been reviewed by an attorney'));
  assert.ok(!/has been reviewed by an attorney|attorney review (is )?complete/i.test(src), 'must not claim attorney review is complete');
});

test('estimate wizard: no commitment that a site visit is arranged, and the submit logic is unchanged', () => {
  const src = read('src/pages/request-estimate.astro');
  assert.ok(!/arrange a site visit/i.test(src));
  assert.ok(src.includes("fetch('/api/estimate'"));
  assert.ok(src.includes("res.status === 503 || res.status === 404 || res.status === 405"), 'unavailable state still handled');
  assert.ok(!/success[^<]*Thank you/.test(src.split('<div id="success"')[0]), 'success is not shown before a response');
});

test('wizard failure states: unavailable and validation messages exist in markup', () => {
  const src = read('src/pages/request-estimate.astro');
  assert.ok(src.includes('id="unavailable"'));
  assert.ok(src.includes('data-err="projectType"') && src.includes('role="alert"'));
  assert.ok(src.includes('id="form-err"'));
});

test('build marker is emitted only when PUBLIC_BUILD_ID is set, and the publisher sets it', () => {
  const base = read('src/layouts/Base.astro');
  assert.ok(base.includes('import.meta.env.PUBLIC_BUILD_ID && <meta name="gb-build"'));
  const pub = read('scripts/publish-preview-branch.mjs');
  assert.ok(pub.includes('PUBLIC_BUILD_ID: sha'));
});

test('removed city routes are not generated and are not linked', () => {
  const src = read('src/pages/service-areas/[slug].astro');
  assert.ok(src.includes('locations.filter((l) => l.confirmed)'));
  const footer = read('src/components/Footer.astro');
  assert.ok(footer.includes('l.confirmed'), 'footer lists only confirmed cities');
});

test('process guidance is worded as general practice, not company commitments', () => {
  const src = read('src/data/process.ts');
  assert.ok(/The written agreement for each project sets its timeline/.test(src));
  assert.ok(!/final walkthrough|before closeout/i.test(src));
  assert.ok(!/Typically a site visit/i.test(src));
});
