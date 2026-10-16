import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { locations } from '../src/data/locations.ts';
import { homeServices } from '../src/data/home-services.ts';
import { services } from '../src/data/services.ts';

const read = (p) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const walk = (dir) => readdirSync(new URL('../' + dir, import.meta.url)).flatMap((f) => {
  const rel = `${dir}/${f}`;
  return statSync(new URL('../' + rel, import.meta.url)).isDirectory() ? walk(rel) : [rel];
});
const pageFiles = walk('src/pages').filter((f) => f.endsWith('.astro'));

test('breadcrumbs: current page is not linked and carries aria-current', () => {
  const src = read('src/components/Breadcrumbs.astro');
  assert.ok(src.includes('aria-label="Breadcrumb"'));
  assert.ok(src.includes('aria-current="page"'));
  assert.ok(src.includes("c.href && i < items.length - 1"), 'only non-final items with an href are links');
});

test('interior hero: one H1 and breadcrumbs rendered from the same component on every interior page', () => {
  const hero = read('src/components/PageHero.astro');
  assert.equal(hero.match(/<h1/g)?.length, 1);
  assert.ok(hero.includes('<Breadcrumbs'));
  assert.ok(hero.includes("current ?? eyebrow ?? title"), 'current crumb falls back to the short eyebrow, not the full title');
});

test('shared CTA band offers Request an Estimate, Call Now and Email Us (phone/email only in href)', () => {
  const src = read('src/components/Cta.astro');
  assert.ok(src.includes('Request an Estimate') && src.includes('Call Now') && src.includes('Email Us'));
  assert.ok(src.includes('business.phoneHref') && src.includes('mailto:${business.email}'));
  assert.ok(!/>\s*\(?408\)?[ -.]?506/.test(src), 'phone digits must not be visible text');
});

test('only confirmed cities generate service-area pages', () => {
  const src = read('src/pages/service-areas/[slug].astro');
  assert.ok(src.includes('locations.filter((l) => l.confirmed)'));
  assert.deepEqual(locations.filter((l) => l.confirmed).map((l) => l.slug), ['san-jose']);
});

test('service-area index does not list unconfirmed cities or internal "confirming" language', () => {
  const src = read('src/pages/service-areas/index.astro');
  assert.ok(!/Confirmed<|confirming|Nearby cities/.test(src));
  assert.ok(!src.includes("l.confirmed).map"), 'no list of other cities');
});

test('no customer-facing internal planning or placeholder language in pages', () => {
  const banned = [/being confirmed/i, /are confirming/i, /being collected/i, /will be published here/i, /awaiting approved/i, /Placeholder/, /Service \{s\.num\} of 06/, /once they are confirmed/i, /will be added once/i];
  for (const f of pageFiles) {
    const src = read('src/' + f.replace(/^src\//, ''));
    for (const re of banned) assert.ok(!re.test(src), `${f} contains ${re}`);
  }
});

test('no page imports the removed placeholder or line-drawing components', () => {
  for (const f of pageFiles) {
    const src = read('src/' + f.replace(/^src\//, ''));
    assert.ok(!/components\/(Placeholder|ArchPlate)\.astro/.test(src), f);
  }
  assert.equal(existsSync(new URL('../src/components/Placeholder.astro', import.meta.url)), false);
  assert.equal(existsSync(new URL('../src/components/ArchPlate.astro', import.meta.url)), false);
});

test('homepage services: five offerings, each with a working internal link', () => {
  assert.equal(homeServices.length, 5);
  for (const s of homeServices) assert.match(s.href, /^\/services\/[a-z0-9-]+\/$/, s.href);
  const titles = homeServices.map((s) => s.title);
  for (const t of ['Full Home Remodeling', 'Home Additions', 'ADU Construction', 'Kitchen & Bathroom Remodeling', 'Custom Home Building']) assert.ok(titles.includes(t), t);
});

test('homepage services list links to real service slugs', () => {
  const slugs = new Set(services.map((s) => s.slug));
  for (const s of homeServices) assert.ok(slugs.has(s.href.split('/')[2]), s.href);
});

test('service pages: no numbered "of 06" eyebrow and no dark decorative plate', () => {
  const src = read('src/pages/services/[slug].astro');
  assert.ok(!src.includes('of 06'));
  assert.ok(!src.includes('blueprint'));
});

test('homepage reviews are three equal cards from the verified review set', () => {
  const src = read('src/pages/index.astro');
  assert.ok(src.includes("['terri-m', 'andrea-j', 'kevin-j']"));
  assert.ok(src.includes('class="rv-cards"'));
});

test('about page: no years-in-business, team-size or unverified credential claims', () => {
  const src = read('src/pages/about.astro');
  assert.ok(!/\b\d+\+?\s+years\b/i.test(src));
  assert.ok(!/\bteam of\b/i.test(src));
  assert.ok(!/\b(bonded|insured|award|guarantee)\b/i.test(src));
  assert.ok(!src.includes('<img'), 'no portrait or unverified images on About');
});

test('contact page shows no visible phone number or email text', () => {
  const src = read('src/pages/contact.astro');
  assert.ok(!/408[- .)]*506/.test(src.replace(/href=\{[^}]*\}/g, '')));
  assert.ok(!/goldbaybuilderinc@gmail/.test(src.replace(/href=\{[^}]*\}/g, '')));
});
