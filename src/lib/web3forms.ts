/**
 * Web3Forms submission for the estimate wizard (client-side; no server code).
 *
 * The access key below is Web3Forms' PUBLIC form key, meant to be visible in the browser. It is not a
 * private API secret, and it does not stop abuse by itself. The receiving inbox is set in the Web3Forms
 * dashboard, not here. Reference: https://docs.web3forms.com/getting-started/api-reference
 */
import type { EstimateInput } from './estimate';

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
export const WEB3FORMS_ACCESS_KEY = 'd2de4d02-518f-4e25-9e1f-e66543e98ade';
export const WEB3FORMS_SUBJECT = 'New Estimate Request | Gold Bay Builders';
export const WEB3FORMS_TIMEOUT_MS = 20000;

export type SubmitFailure = 'rejected' | 'rate_limited' | 'server' | 'network' | 'timeout' | 'blocked';
export type SubmitResult = { ok: true } | { ok: false; reason: SubmitFailure; message: string };

/** Readable field names for the notification email. `email` is Web3Forms' reserved field and becomes Reply-To. */
export function buildWeb3FormsFields(d: EstimateInput): Record<string, string> {
  const fields: Record<string, string> = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: WEB3FORMS_SUBJECT,
    Source: 'Gold Bay Builders Website',
    Form: 'Request an Estimate',
    'Project type': d.projectType,
    'Relationship to property': d.propertyStatus,
    City: d.city.trim(),
    'ZIP code': d.zip.trim(),
    'Project stage': d.stage,
    'Budget range': d.budget,
    Timeline: d.timeline,
    'Project details': d.details.trim(),
    'Full name': d.name.trim(),
    'Phone number': d.phone.trim(),
    'Preferred contact method': d.contactMethod,
    'Consent to contact': d.consent ? 'Yes' : 'No',
    email: d.email.trim(),
  };
  if (d.street && d.street.trim()) fields['Street address'] = d.street.trim();
  return fields;
}

const MESSAGES: Record<SubmitFailure, string> = {
  rejected: 'Your request was not sent. Please check your entries and try again, or call us.',
  rate_limited: 'Too many requests came from this connection. Please wait a few minutes and try again.',
  server: 'Something went wrong on our side and your request was not sent. Your answers are still here. Please try again, or call us.',
  network: 'We could not reach the server. Your answers are still here. Please check your connection and try again, or call us.',
  timeout: 'The request is taking too long. Your answers are still here. Please try again, or call us.',
  blocked: 'Your request was not sent. Please call us.',
};

/**
 * Sends the estimate. Success is reported only when Web3Forms returns `success: true` in the response body.
 * `fetchFn` is injectable so tests can mock the API. Personal details are never logged.
 */
export async function submitEstimate(
  input: EstimateInput & { website?: string; botcheck?: boolean },
  fetchFn: typeof fetch = fetch,
  timeoutMs: number = WEB3FORMS_TIMEOUT_MS,
): Promise<SubmitResult> {
  return postWeb3Form(buildWeb3FormsFields(input), { website: input.website, botcheck: input.botcheck }, fetchFn, timeoutMs);
}

/**
 * Posts any field set to Web3Forms. Shared by the estimate wizard and the contact form.
 * Honeypot filled, or the botcheck checkbox ticked: nothing is sent.
 */
export async function postWeb3Form(
  fields: Record<string, string>,
  spam: { website?: string; botcheck?: boolean },
  fetchFn: typeof fetch = fetch,
  timeoutMs: number = WEB3FORMS_TIMEOUT_MS,
): Promise<SubmitResult> {
  if ((spam.website && spam.website !== '') || spam.botcheck) return { ok: false, reason: 'blocked', message: MESSAGES.blocked };

  const body = new FormData();
  for (const [k, v] of Object.entries(fields)) body.append(k, v);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetchFn(WEB3FORMS_ENDPOINT, { method: 'POST', body, headers: { Accept: 'application/json' }, signal: controller.signal });
    if (res.status === 429) return { ok: false, reason: 'rate_limited', message: MESSAGES.rate_limited };
    if (res.status >= 500) return { ok: false, reason: 'server', message: MESSAGES.server };
    let json: { success?: unknown } | null = null;
    try { json = await res.json(); } catch { json = null; }
    if (res.ok && json && json.success === true) return { ok: true };
    return { ok: false, reason: 'rejected', message: MESSAGES.rejected };
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') return { ok: false, reason: 'timeout', message: MESSAGES.timeout };
    return { ok: false, reason: 'network', message: MESSAGES.network };
  } finally {
    clearTimeout(timer);
  }
}

/** Contact form: name, email and message are required; phone and service are optional. */
export interface ContactInput { name: string; email: string; phone: string; service: string; message: string; website?: string; botcheck?: boolean }
export type ContactErrors = Partial<Record<'name' | 'email' | 'phone' | 'message', string>>;

export function validateContact(d: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  const name = d.name.trim();
  if (name.length < 2 || name.length > 100) e.name = 'Enter your name.';
  const email = d.email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 160) e.email = 'Enter a valid email address.';
  const phone = d.phone.trim();
  if (phone !== '' && !(phone.replace(/\D/g, '').length >= 10 && phone.replace(/\D/g, '').length <= 11)) e.phone = 'Enter a 10-digit phone number, or leave this blank.';
  const message = d.message.trim();
  if (message.length < 10 || message.length > 3000) e.message = 'Tell us a little about your question (at least 10 characters).';
  return e;
}

/** Readable field names for the contact notification. `email` is Web3Forms' reserved field and becomes Reply-To. */
export function buildContactFields(d: ContactInput): Record<string, string> {
  const fields: Record<string, string> = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: 'New Contact Message | Gold Bay Builders',
    Source: 'Gold Bay Builders Website',
    Form: 'Contact',
    'Full name': d.name.trim(),
    email: d.email.trim(),
    Message: d.message.trim(),
  };
  if (d.phone.trim()) fields['Phone number'] = d.phone.trim();
  if (d.service.trim()) fields['Service of interest'] = d.service.trim();
  return fields;
}

export async function submitContact(input: ContactInput, fetchFn: typeof fetch = fetch, timeoutMs: number = WEB3FORMS_TIMEOUT_MS): Promise<SubmitResult> {
  return postWeb3Form(buildContactFields(input), { website: input.website, botcheck: input.botcheck }, fetchFn, timeoutMs);
}
