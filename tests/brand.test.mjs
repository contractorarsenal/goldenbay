import test from 'node:test';
import assert from 'node:assert/strict';
import { business } from '../src/data/business.ts';

test('provisional brand follows the business card', () => {
  assert.equal(business.name, 'Gold Bay Builders Inc.');
  assert.equal(business.shortName, 'Gold Bay Builders');
  assert.equal(business.tagline, 'Building YOUR bay home');
  assert.equal(business.brandProvisional, true);
  assert.equal(business.legalNameConfirmed, false);
});
test('license is never published until verified', () => {
  assert.equal(business.license.verified, false);
  assert.equal(business.license.number, null);
});
test('contact details match the card', () => {
  assert.equal(business.phone, '(408) 506-7184');
  assert.equal(business.phoneHref, 'tel:+14085067184');
  assert.equal(business.email, 'goldbaybuilderinc@gmail.com');
});
