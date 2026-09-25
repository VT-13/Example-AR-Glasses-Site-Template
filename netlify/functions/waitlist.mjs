import { createHash } from 'node:crypto';
import { getStore } from '@netlify/blobs';

const json = (body, status) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export default async function handler(request) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return json({ error: 'Invalid request origin.' }, 403);
  // Read a bounded body even when Content-Length is absent or inaccurate.
  const reader = request.body?.getReader();
  if (!reader) return json({ error: 'Please enter a valid email address.' }, 400);
  let body = '';
  let bytes = 0;
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > 2048) { await reader.cancel(); return json({ error: 'Request too large.' }, 413); }
    body += decoder.decode(value, { stream: true });
  }
  body += decoder.decode();
  let email;
  try { email = JSON.parse(body).email; } catch { return json({ error: 'Invalid JSON.' }, 400); }
  if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return json({ error: 'Please enter a valid email address.' }, 400);
  }
  email = email.trim().toLowerCase();
  try {
    const key = createHash('sha256').update(email).digest('hex');
    await getStore('blank-waitlist').setJSON(key, { email, createdAt: new Date().toISOString() }, { onlyIfNew: true });
    return json({ success: true }, 201);
  } catch (error) {
    console.error('Waitlist storage failed', error);
    return json({ error: 'We could not save your email. Please try again.' }, 503);
  }
}
