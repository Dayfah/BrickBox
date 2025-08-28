import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16" });

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    // Find (or narrow to the first) customer by email
    const list = await stripe.customers.list({ email, limit: 1 });
    const customer = list.data[0];
    if (!customer) {
      return NextResponse.json({ error: "No customer found for that email." }, { status: 404 });
    }

    const siteUrl = process.env.SITE_URL || "http://localhost:3000";
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${siteUrl}/account`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    console.error("portal error:", e?.message || e);
    return NextResponse.json({ error: "Could not create portal session" }, { status: 500 });
  }
}
