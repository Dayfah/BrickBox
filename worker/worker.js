/**
 * BrickBox Cloudflare Worker
 * - Receives Stripe webhooks
 * - Verifies signature
 * - Writes subscription status to Supabase
 */
import Stripe from 'stripe';

export default {
  async fetch(request, env, ctx) {
    if (request.method !== 'POST') {
      return new Response('OK', { status: 200 });
    }

    const sig = request.headers.get('stripe-signature');
    const payload = await request.text();

    try {
      const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
      const event = stripe.webhooks.constructEvent(payload, sig, env.STRIPE_WEBHOOK_SECRET);

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
