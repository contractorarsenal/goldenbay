import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequestPost } from '../functions/api/estimate.ts';
test('endpoint returns 503 (never success) when delivery is not configured', async () => {
  const res = await onRequestPost({ request: new Request('https://x.test/api/estimate', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' }), env: {} });
  assert.equal(res.status, 503);
  assert.equal((await res.json()).ok, false);
});
