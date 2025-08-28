import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const plan = body.plan as 'monthly' | 'yearly';
  const user_id = body.user_id as string | null;

  if (!plan) return NextResponse.json({ error: 'Missing plan' }, { status: 400 });
  if (!user_id) return NextResponse.json({ error: 'Sign in required' }, { status: 401 });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
  const priceId = plan === 'monthly' ? process.env.STRIPE_PRICE_MONTHLY! : process.env.STRIPE_PRICE_YEARLY!;

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    metadata: { user_id, plan }
  });

  return NextResponse.json({ url: session.url });
}
