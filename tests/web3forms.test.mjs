import test from 'node:test';
import assert from 'node:assert/strict';
import { buildWeb3FormsFields, submitEstimate, WEB3FORMS_ENDPOINT, WEB3FORMS_ACCESS_KEY, WEB3FORMS_SUBJECT } from '../src/lib/web3forms.ts';

// No test in this file performs a network request: fetch is always a local mock.
const input = {
  projectType: 'Kitchen remodeling', propertyStatus: 'I own the home', city: ' San Jose ', zip: '95112', street: '',
  stage: 'Planning', budget: 'Not sure yet', timeline: 'Flexible', details: 'Kitchen refresh with new cabinets.',
  name: 'Test Person', phone: '4085550123', email: 'test@example.com', contactMethod: 'Email', consent: true,
};
const ok = (body = { success: true, message: 'Email sent successfully!' }) => new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } });

test('endpoint, public access key and subject match the documented values', () => {
  assert.equal(WEB3FORMS_ENDPOINT, 'https://api.web3forms.com/submit');
  assert.equal(WEB3FORMS_ACCESS_KEY, 'd2de4d02-518f-4e25-9e1f-e66543e98ade');
  assert.equal(WEB3FORMS_SUBJECT, 'New Estimate Request | Gold Bay Builders');
});

test('field mapping: every wizard answer is present under a readable name, with reply-to email', () => {
  const f = buildWeb3FormsFields(input);
  assert.equal(f.access_key, WEB3FORMS_ACCESS_KEY);
  assert.equal(f.subject, WEB3FORMS_SUBJECT);
  assert.equal(f.Source, 'Gold Bay Builders Website');
  assert.equal(f.Form, 'Request an Estimate');
  assert.equal(f['Project type'], 'Kitchen remodeling');
  assert.equal(f['Relationship to property'], 'I own the home');
  assert.equal(f.City, 'San Jose', 'trimmed');
  assert.equal(f['ZIP code'], '95112');
  assert.equal(f['Project stage'], 'Planning');
  assert.equal(f['Budget range'], 'Not sure yet');
  assert.equal(f.Timeline, 'Flexible');
  assert.equal(f['Project details'], 'Kitchen refresh with new cabinets.');
  assert.equal(f['Full name'], 'Test Person');
  assert.equal(f['Phone number'], '4085550123');
  assert.equal(f['Preferred contact method'], 'Email');
  assert.equal(f['Consent to contact'], 'Yes');
  assert.equal(f.email, 'test@example.com', 'reserved email field sets Reply-To');
});

test('optional street address is included only when entered', () => {
  assert.equal(buildWeb3FormsFields(input)['Street address'], undefined);
  assert.equal(buildWeb3FormsFields({ ...input, street: ' 1 Main St ' })['Street address'], '1 Main St');
});

test('a confirmed success (success: true in the body) reports ok and sends multipart form data', async () => {
  let sent;
  const fetchFn = async (url, init) => { sent = { url, init }; return ok(); };
  const r = await submitEstimate({ ...input, website: '', botcheck: false }, fetchFn, 1000);
  assert.deepEqual(r, { ok: true });
  assert.equal(sent.url, WEB3FORMS_ENDPOINT);
  assert.equal(sent.init.method, 'POST');
  assert.ok(sent.init.body instanceof FormData);
  assert.equal(sent.init.body.get('email'), 'test@example.com');
  assert.equal(sent.init.body.get('access_key'), WEB3FORMS_ACCESS_KEY);
});

test('HTTP 200 without success: true is NOT reported as success', async () => {
  const r = await submitEstimate({ ...input, website: '', botcheck: false }, async () => ok({ success: false, message: 'bad' }), 1000);
  assert.equal(r.ok, false);
  assert.equal(r.reason, 'rejected');
});

test('400 is a rejection and keeps a usable message', async () => {
  const r = await submitEstimate({ ...input, website: '', botcheck: false }, async () => new Response('{"success":false}', { status: 400 }), 1000);
  assert.equal(r.reason, 'rejected');
  assert.match(r.message, /Your answers are still here|not sent/);
});

test('429 reports rate limiting; 500 reports a server problem', async () => {
  const rl = await submitEstimate({ ...input, website: '', botcheck: false }, async () => new Response('{}', { status: 429 }), 1000);
  assert.equal(rl.reason, 'rate_limited');
  const se = await submitEstimate({ ...input, website: '', botcheck: false }, async () => new Response('{}', { status: 500 }), 1000);
  assert.equal(se.reason, 'server');
});

test('network failure is reported as network, with the entries kept', async () => {
  const r = await submitEstimate({ ...input, website: '', botcheck: false }, async () => { throw new TypeError('Failed to fetch'); }, 1000);
  assert.equal(r.reason, 'network');
  assert.match(r.message, /Your answers are still here/);
});

test('a request that never answers times out (abort signal honoured)', async () => {
  const hang = (url, init) => new Promise((_, reject) => init.signal.addEventListener('abort', () => { const e = new Error('aborted'); e.name = 'AbortError'; reject(e); }));
  const r = await submitEstimate({ ...input, website: '', botcheck: false }, hang, 20);
  assert.equal(r.reason, 'timeout');
});

test('honeypot filled or botcheck ticked: nothing is sent', async () => {
  let called = false;
  const fetchFn = async () => { called = true; return ok(); };
  const a = await submitEstimate({ ...input, website: 'spam', botcheck: false }, fetchFn, 1000);
  const b = await submitEstimate({ ...input, website: '', botcheck: true }, fetchFn, 1000);
  assert.equal(a.reason, 'blocked');
  assert.equal(b.reason, 'blocked');
  assert.equal(called, false);
});

// ---- Contact form (no network: fetch is always a local mock) ----
import { validateContact, buildContactFields, submitContact } from '../src/lib/web3forms.ts';
const contact = { name: 'Test Person', email: 'test@example.com', phone: '', service: '', message: 'Do you build ADUs in San Jose?', website: '', botcheck: false };

test('contact: name, email and message are required; phone optional but checked when given', () => {
  assert.deepEqual(Object.keys(validateContact({ ...contact, name: ' ', email: 'x', message: 'short', phone: '12' })).sort(), ['email', 'message', 'name', 'phone']);
  assert.deepEqual(validateContact({ ...contact, phone: '' }), {});
  assert.ok(validateContact({ ...contact, email: 'not-an-email' }).email);
});

test('contact: readable field names, reply-to email, optional phone and service only when given', () => {
  const f = buildContactFields(contact);
  assert.equal(f.access_key, WEB3FORMS_ACCESS_KEY);
  assert.equal(f.Form, 'Contact');
  assert.equal(f['Full name'], 'Test Person');
  assert.equal(f.email, 'test@example.com');
  assert.equal(f.Message, 'Do you build ADUs in San Jose?');
  assert.equal(f['Phone number'], undefined);
  assert.equal(buildContactFields({ ...contact, phone: '4085550123', service: 'ADU Construction' })['Service of interest'], 'ADU Construction');
});

test('contact: success only when the response body says success: true', async () => {
  const r = await submitContact(contact, async () => new Response('{"success":true}', { status: 200 }), 1000);
  assert.deepEqual(r, { ok: true });
  const bad = await submitContact(contact, async () => new Response('{"success":false,"message":"x"}', { status: 200 }), 1000);
  assert.equal(bad.ok, false);
});

test('contact: failures (400, 429, 500, network, timeout) return a usable message and never report ok', async () => {
  for (const status of [400, 429, 500]) {
    const r = await submitContact(contact, async () => new Response('{}', { status }), 1000);
    assert.equal(r.ok, false);
    assert.ok(r.message.length > 20);
  }
  const net = await submitContact(contact, async () => { throw new TypeError('Failed to fetch'); }, 1000);
  assert.equal(net.reason, 'network');
  const hang = (url, init) => new Promise((_, rej) => init.signal.addEventListener('abort', () => { const e = new Error('a'); e.name = 'AbortError'; rej(e); }));
  assert.equal((await submitContact(contact, hang, 20)).reason, 'timeout');
});

test('contact: honeypot or botcheck means nothing is sent', async () => {
  let called = false;
  const fn = async () => { called = true; return new Response('{"success":true}'); };
  assert.equal((await submitContact({ ...contact, website: 'x' }, fn, 1000)).reason, 'blocked');
  assert.equal((await submitContact({ ...contact, botcheck: true }, fn, 1000)).reason, 'blocked');
  assert.equal(called, false);
});
