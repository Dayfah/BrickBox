import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-04-10",
  });
  const { plan } = await req.json();
  const priceId =
    plan === "yearly"
      ? process.env.STRIPE_PRICE_YEARLY
      : process.env.STRIPE_PRICE_MONTHLY;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [{ price: priceId!, quantity: 1 }],
    success_url: "https://yourdomain.com/success",
    cancel_url: "https://yourdomain.com/cancel",
  });

  return NextResponse.json({ url: session.url });
}
