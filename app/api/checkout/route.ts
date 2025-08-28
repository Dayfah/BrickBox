import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16" });

export async function POST(req: Request) {
  try {
    const { plan, email } = await req.json();
    if (!plan || !["monthly", "yearly"].includes(plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const priceId = plan === "yearly" ? process.env.STRIPE_PRICE_YEARLY : process.env.STRIPE_PRICE_MONTHLY;
    if (!priceId) return NextResponse.json({ error: "Missing price" }, { status: 500 });

    const siteUrl = process.env.SITE_URL || "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/success`,
      cancel_url: `${siteUrl}/cancel`,
      allow_promotion_codes: true,
      ...(email ? { customer_email: email } : {}),
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (e:any) {
    console.error("checkout error", e?.message || e);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
