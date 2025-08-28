/**
 * BrickBox Cloudflare Worker
 * - Receives Stripe webhooks
 * - Manually verifies signature
 * - Writes subscription status to Supabase
 */

export default {
  async fetch(request, env, ctx) {
    if (request.method !== 'POST') {
      return new Response('OK', { status: 200 });
    }

    const sig = request.headers.get('stripe-signature');
    const payload = await request.text();

    try {
      await verifyStripeSignature(payload, sig, env.STRIPE_WEBHOOK_SECRET);
      const event = JSON.parse(payload);

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        await upsertSubscriptionFromSession(session, env);
      }
      if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
        const sub = event.data.object;
        await updateSubscription(sub, env);
      }

      return new Response('ok', { status: 200 });
    } catch (err) {
      return new Response('Invalid signature or error: ' + (err && err.message ? err.message : ''), { status: 400 });
    }
  }
}

function parseStripeSignature(header) {
  const parts = header.split(',');
  const timestampPart = parts.find(p => p.startsWith('t='));
  const sigPart = parts.find(p => p.startsWith('v1='));
  if (!timestampPart || !sigPart) {
    throw new Error('Invalid Stripe signature header');
  }
  return {
    timestamp: timestampPart.slice(2),
    signature: sigPart.slice(3)
  };
}

async function verifyStripeSignature(payload, header, secret) {
  const { timestamp, signature } = parseStripeSignature(header);
  const encoder = new TextEncoder();
  const data = encoder.encode(`${timestamp}.${payload}`);
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signed = await crypto.subtle.sign('HMAC', key, data);
  const expected = Array.from(new Uint8Array(signed)).map(b => b.toString(16).padStart(2, '0')).join('');
  if (!timingSafeEqual(expected, signature)) {
    throw new Error('Invalid signature');
  }
}

function timingSafeEqual(a, b) {
  const len = a.length;
  if (len !== b.length) return false;
  let result = 0;
  for (let i = 0; i < len; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function upsertSubscriptionFromSession(session, env) {
  const user_id = session.metadata && session.metadata.user_id;
  const stripe_customer_id = session.customer;
  const stripe_subscription_id = session.subscription;
  const plan = session.metadata && session.metadata.plan || null;

  if (!user_id) return;

  const body = { user_id, stripe_customer_id, stripe_subscription_id, plan, status: 'active' };

  await fetch(`${env.SUPABASE_URL}/rest/v1/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': env.SUPABASE_SERVICE_ROLE,
      'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE}`,
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(body)
  });
}

async function updateSubscription(sub, env) {
  const stripe_subscription_id = sub.id;
  const status = sub.status;
  const current_period_end = new Date(sub.current_period_end * 1000).toISOString();

  await fetch(`${env.SUPABASE_URL}/rest/v1/subscriptions?stripe_subscription_id=eq.${stripe_subscription_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': env.SUPABASE_SERVICE_ROLE,
      'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE}`
    },
    body: JSON.stringify({ status, current_period_end, updated_at: new Date().toISOString() })
  });
}
