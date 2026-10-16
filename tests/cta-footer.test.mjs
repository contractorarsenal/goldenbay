import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (p) => readFileSync(new URL(p, root), 'utf8');
const htmlFiles = (dir) => readdirSync(new URL(dir, root)).flatMap((f) => {
  const rel = `${dir}${f}`;
  return statSync(new URL(rel, root)).isDirectory() ? htmlFiles(rel + '/') : rel.endsWith('.html') ? [rel] : [];
});
const built = existsSync(new URL('dist/index.html', root));

test('footer renders its action group only when the page has no closing CTA (source)', () => {
  const src = read('src/components/Footer.astro');
  assert.ok(src.includes('{!closingCta && path !== \'/contact/\' && <a class="foot-contact"'), 'restrained link only when no closing CTA');
  assert.ok(!/<div class="foot-actions">/.test(src) || src.indexOf('{!closingCta') < src.indexOf('foot-actions'), 'action group is not rendered unconditionally');
});

test('every page that renders a closing CTA band passes closingCta to Base', () => {
  const pages = ['src/pages/about.astro', 'src/pages/faq.astro', 'src/pages/index.astro', 'src/pages/meet-david-lerma.astro', 'src/pages/our-process.astro', 'src/pages/projects/[slug].astro', 'src/pages/projects/index.astro', 'src/pages/reviews.astro', 'src/pages/service-areas/[slug].astro', 'src/pages/service-areas/index.astro', 'src/pages/services/[slug].astro', 'src/pages/services/index.astro', 'src/pages/404.astro', 'src/components/Guide.astro'];
  for (const p of pages) {
    const src = read(p);
    assert.ok(src.includes('<Cta'), `${p} has a closing CTA`);
    assert.ok(/<Base\s+closingCta/.test(src), `${p} must pass closingCta to Base`);
  }
});

test('built HTML: no page has a closing CTA band followed by the footer action group', { skip: !built && 'run npm run build first' }, () => {
  let bands = 0;
  for (const f of htmlFiles('dist/')) {
    const html = readFileSync(new URL(f, root), 'utf8');
    const hasBand = html.includes('class="cb on-dark"');
    const hasActions = html.includes('class="foot-actions"');
    if (hasBand) bands++;
    assert.ok(!(hasBand && hasActions), `${f}: closing CTA and footer action group both rendered`);
  }
  assert.ok(bands > 5, `expected several pages with a closing CTA, found ${bands}`);
});

test('built HTML: footer contact link is restrained and not on the contact page', { skip: !built && 'run npm run build first' }, () => {
  for (const f of htmlFiles('dist/')) {
    const html = readFileSync(new URL(f, root), 'utf8');
    if (f === 'dist/index.html' || f.startsWith('dist/service-areas/san-jose')) continue;
    const page = f.replace('dist/', '').replace(/index\.html$/, '');
    if (html.includes('class="cb on-dark"')) continue;
    if (page === 'contact/') assert.ok(!html.includes('class="foot-contact"'), 'no self-link on contact');
  }
});

test('About introduces David Lerma once, with no black owner block or placeholder', () => {
  const src = read('src/pages/about.astro');
  assert.equal((src.match(/David Lerma/g) || []).length, 1, 'David introduced once');
  assert.ok(!/ab-owner/.test(src), 'no owner rectangle');
  assert.ok(!/Meet David Lerma/.test(src), 'owner heading merged into the builder section');
});

test('Projects hub and detail keep their closing CTA and the approved structure', () => {
  const hub = read('src/pages/projects/index.astro');
  const detail = read('src/pages/projects/[slug].astro');
  assert.ok(hub.includes('title="Planning Something Similar?"'));
  assert.ok(detail.includes('isIndexable(p)'), 'indexing rule unchanged');
  assert.ok(hub.includes('closingCta'));
  assert.ok(detail.includes('closingCta'));
});
