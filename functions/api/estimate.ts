// Cloudflare Pages Function: POST /api/estimate
// Validates server-side, verifies Turnstile, delivers via Resend. If delivery isn't configured it returns 503
// and NEVER reports success. Lead data is never logged.
import { validateEstimate } from '../../src/lib/estimate.ts';

interface Env { TURNSTILE_SECRET_KEY?: string; RESEND_API_KEY?: string; LEAD_TO_EMAIL?: string; LEAD_FROM_EMAIL?: string }
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  if (!env.RESEND_API_KEY || !env.LEAD_TO_EMAIL || !env.LEAD_FROM_EMAIL || !env.TURNSTILE_SECRET_KEY) {
    return json({ ok: false, error: 'not_configured' }, 503);
  }
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ ok: false, error: 'forbidden' }, 403);
  if (!(request.headers.get('content-type') || '').includes('application/json')) return json({ ok: false, error: 'bad_request' }, 400);

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'bad_request' }, 400); }
  if (typeof body.website === 'string' && body.website !== '') return json({ ok: true }); // honeypot: silently drop bots

  const errors = validateEstimate(body as never);
  if (Object.keys(errors).length) return json({ ok: false, error: 'validation', errors }, 422);

  const ts = new FormData();
  ts.append('secret', env.TURNSTILE_SECRET_KEY);
  ts.append('response', String(body.turnstileToken ?? ''));
  const ip = request.headers.get('CF-Connecting-IP'); if (ip) ts.append('remoteip', ip);
  const tsRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: ts });
  const tsJson = (await tsRes.json()) as { success?: boolean };
  if (!tsJson.success) return json({ ok: false, error: 'spam_check_failed' }, 400);

  const f = (k: string) => esc(String(body[k] ?? '—'));
  const rows = [['Project', 'projectType'], ['City', 'city'], ['ZIP', 'zip'], ['Street', 'street'], ['Stage', 'stage'], ['Budget', 'budget'], ['Timeline', 'timeline'], ['Name', 'name'], ['Phone', 'phone'], ['Email', 'email'], ['Preferred contact', 'contactMethod'], ['Details', 'details']];
  const html = `<h2>New estimate request</h2><table cellpadding="6">${rows.map(([l, k]) => `<tr><td><b>${l}</b></td><td>${f(k)}</td></tr>`).join('')}</table>`;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from: env.LEAD_FROM_EMAIL, to: [env.LEAD_TO_EMAIL], reply_to: String(body.email), subject: `Estimate request: ${String(body.projectType)} (${String(body.city)})`, html }),
  });
  if (!res.ok) return json({ ok: false, error: 'delivery_failed' }, 502);
  return json({ ok: true });
};
export const onRequest = () => json({ ok: false, error: 'method_not_allowed' }, 405);
