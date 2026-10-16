import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { reviews } from '../src/data/reviews.ts';
import { projects, filterGroups, groupOf } from '../src/data/projects.ts';

test('seven reviews, verbatim data present', () => { assert.equal(reviews.length, 7); for (const r of reviews) { assert.ok(r.name && r.date && r.category && r.text.length > 60); } });
test('every review excerpt is an exact contiguous substring of the full text', () => { for (const r of reviews) if (r.excerpt) assert.ok(r.text.includes(r.excerpt), `${r.id} excerpt is not verbatim`); });
test('review dates are only month/year as supplied', () => { for (const r of reviews) assert.match(r.date, /^(September|October) 2026$/); });
test('no ratings/stars invented in review data', () => { for (const r of reviews) assert.ok(!('rating' in r)); });
test('verbatim spot checks (typos preserved)', () => {
  const k = reviews.find((r) => r.id === 'kevin-j').text; assert.ok(k.includes('including building fences, including drainage as well as fences . 3.'));
  assert.ok(reviews.find((r) => r.id === 'griselda-l').text.includes('We are now be able to enjoy'));
});
test('every project image file exists, has alt text, and is used once', () => {
  const seen = new Set();
  for (const p of projects) { assert.ok(p.images.length > 0, p.slug); for (const i of p.images) { assert.ok(existsSync(new URL('../src/assets/projects/' + i.file, import.meta.url)), i.file); assert.ok(i.alt.length > 25, `alt too short: ${i.file}`); assert.ok(!seen.has(i.file), `duplicate use ${i.file}`); seen.add(i.file); } }
  assert.equal(seen.size, 16);
});
test('project slugs unique; no invented location/budget/dates', () => {
  assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length);
  for (const p of projects) { assert.equal(p.location, undefined); assert.equal(p.completed, undefined); assert.equal(p.detailed, undefined); }
});
test('each project belongs to a filter group', () => { for (const p of projects) assert.notEqual(groupOf(p), 'other', p.slug); assert.ok(filterGroups.length >= 4); });
test('titles requested by the client exist', () => { for (const t of ['Patio Construction', 'Paver Installation', 'Pool House & Outdoor Living Area', 'Kitchen Remodel']) assert.ok(projects.some((p) => p.title === t), t); });
