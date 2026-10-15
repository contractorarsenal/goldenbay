import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEstimate } from '../src/lib/estimate.ts';

const ok = { projectType: 'ADU', propertyStatus: 'I own the home', city: 'San Jose', zip: '95112', stage: 'Planning', budget: 'Not sure yet', timeline: 'Flexible', details: 'Detached ADU in the backyard.', name: 'Test Person', phone: '(408) 555-0100', email: 'a@b.co', contactMethod: 'Email', consent: true };
test('valid input passes', () => assert.deepEqual(validateEstimate(ok), {}));
test('empty input fails every required field', () => assert.ok(Object.keys(validateEstimate({})).length >= 10));
test('bad zip/phone/email rejected', () => {
  const e = validateEstimate({ ...ok, zip: '9511', phone: '123', email: 'nope' });
  assert.ok(e.zip && e.phone && e.email);
});
test('consent required', () => assert.ok(validateEstimate({ ...ok, consent: false }).consent));
test('unknown enum values rejected', () => assert.ok(validateEstimate({ ...ok, projectType: 'Pool' }).projectType));
test('oversized details rejected', () => assert.ok(validateEstimate({ ...ok, details: 'x'.repeat(3001) }).details));
test('property status required and constrained', () => { assert.ok(validateEstimate({ ...ok, propertyStatus: undefined }).propertyStatus); assert.ok(validateEstimate({ ...ok, propertyStatus: 'Renting' }).propertyStatus); });
