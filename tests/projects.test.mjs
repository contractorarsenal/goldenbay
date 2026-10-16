import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { projects, filterGroups, activeFilterGroups, groupOf, relatedProjects, isIndexable, introFor, getProject } from '../src/data/projects.ts';

const read = (p) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');

test('filter chips only for categories that have projects', () => {
  const active = activeFilterGroups();
  assert.ok(active.length > 0);
  for (const g of active) assert.ok(projects.some((p) => groupOf(p) === g.key), `empty chip rendered: ${g.key}`);
  const empty = filterGroups.filter((g) => !active.includes(g));
  for (const g of empty) assert.ok(!projects.some((p) => groupOf(p) === g.key));
});

test('filter group keys are unique and URL/attribute safe', () => {
  const keys = filterGroups.map((g) => g.key);
  assert.equal(new Set(keys).size, keys.length);
  for (const k of keys) assert.match(k, /^[a-z0-9]+(-[a-z0-9]+)*$/);
});

test('every project slug is URL-safe', () => {
  for (const p of projects) assert.match(p.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, p.slug);
});

test('image file names are slug-safe and no image is referenced twice across projects', () => {
  const files = projects.flatMap((p) => p.images.map((i) => i.file));
  assert.equal(new Set(files).size, files.length);
  for (const f of files) assert.match(f, /^[a-z0-9-]+\.jpg$/, f);
});

test('related projects: never include self, at most 3, no duplicates, all real slugs', () => {
  const slugs = new Set(projects.map((p) => p.slug));
  for (const p of projects) {
    const rel = relatedProjects(p.slug, 3);
    assert.ok(rel.length <= 3);
    assert.equal(rel.length, Math.min(3, projects.length - 1), p.slug);
    assert.ok(!rel.some((r) => r.slug === p.slug), `self in related: ${p.slug}`);
    assert.equal(new Set(rel.map((r) => r.slug)).size, rel.length);
    for (const r of rel) assert.ok(slugs.has(r.slug));
  }
});

test('related projects prefer the same category first', () => {
  for (const p of projects) {
    const sameCount = projects.filter((x) => x.slug !== p.slug && x.category === p.category).length;
    const rel = relatedProjects(p.slug, 3);
    const leading = rel.slice(0, Math.min(sameCount, 3));
    assert.ok(leading.every((r) => r.category === p.category), p.slug);
  }
});

test('no project is indexable until its details are confirmed (all detail pages stay noindex)', () => {
  for (const p of projects) assert.equal(isIndexable(p), false, p.slug);
});

test('intro text exists for every project and is not a promise or invented fact', () => {
  for (const p of projects) {
    const t = introFor(p);
    assert.ok(t && t.length > 40, p.slug);
    assert.ok(!/\b(guarantee|on time|on budget|premier|best|award|licensed|bonded|insured)\b/i.test(t), `risky copy in ${p.slug}`);
  }
});

test('getProject resolves each slug to the same project', () => {
  for (const p of projects) assert.equal(getProject(p.slug), p);
});

test('missing-image fallback exists in ProjectImage (pending slot, never a fake photo)', () => {
  const src = read('src/components/ProjectImage.astro');
  assert.ok(src.includes('pimg-pending'));
  assert.ok(src.includes('Photo slot'));
  assert.ok(src.includes(': main && mainS && fallback') || src.includes('main && mainS && fallback'));
});

test('project detail page wires indexing, breadcrumbs, lightbox and related links', () => {
  const src = read('src/pages/projects/[slug].astro');
  assert.ok(src.includes('noindex={noindex}') && src.includes('const noindex = !isIndexable(p)'));
  assert.ok(!src.includes("'@type': 'BreadcrumbList'"), 'Base already emits BreadcrumbList from crumbs; do not duplicate');
  assert.ok(src.includes('crumbs={[{ name: \'Home\''));
  assert.ok(src.includes("import PageHero from '../../components/PageHero.astro'"), 'detail hero uses the shared PageHero (breadcrumb + H1)');
  assert.ok(src.includes('id="pj-lb"') && src.includes('showModal()'));
  assert.ok(src.includes('relatedProjects(p.slug, 3)'));
  assert.ok(src.includes('Planning Something Similar?'));
  assert.ok(src.includes('Request an Estimate') && src.includes('Call Now'));
  assert.ok(!src.includes('San Jose'), 'unconfirmed location claim must not appear on detail pages');
});

test('projects hub has one H1, accessible filter group, and status region', () => {
  const src = read('src/pages/projects/index.astro');
  // The H1 is rendered by the shared PageHero component; the hub passes exactly one title.
  assert.equal((src.match(/<PageHero /g) || []).length, 1);
  assert.equal(read('src/components/PageHero.astro').match(/<h1/g)?.length, 1);
  assert.ok(src.includes('role="group"') && src.includes('aria-pressed'));
  assert.ok(src.includes('aria-live="polite"'));
  assert.ok(!/example\.(invalid|com)/.test(src), 'placeholder domain in hub');
});

test('CSS for every projects class used in the markup exists', () => {
  const css = read('src/styles/system.css');
  const markup = read('src/pages/projects/index.astro') + read('src/pages/projects/[slug].astro');
  const classes = new Set([...markup.matchAll(/class(?::list)?=\{?['"`]([^'"`}]+)['"`]/g)].flatMap((m) => m[1].split(/\s+/)));
  for (const c of classes) if (c.startsWith('pj-')) assert.ok(css.includes(`.${c}`), `missing CSS for .${c}`);
});
