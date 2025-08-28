"use client";
import { useState } from "react";
import PricingCard from "../../components/PricingCard";
import FeaturesTable from "../../components/FeaturesTable";
import FAQ from "../../components/FAQ";
import RefundNote from "../../components/RefundNote";

async function startCheckout(plan:"monthly"|"yearly"){
  const res = await fetch("/api/checkout", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ plan })
  });
  if(!res.ok) throw new Error("Checkout error");
  const { url } = await res.json();
  window.location.href = url;
}

export default function PricingPage(){
  const [loading,setLoading]=useState<"monthly"|"yearly"|null>(null);
  const onSubscribe = async (plan:"monthly"|"yearly")=>{
    try{ setLoading(plan); await startCheckout(plan); }
    catch{ alert("Could not start checkout. Try again."); }
    finally{ setLoading(null); }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold">Pricing</h1>
        <p className="opacity-90">Support BrickBox and unlock drops, perks, and early BBX Token access.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className={loading==="monthly" ? "opacity-70 pointer-events-none":""}>
          <PricingCard
            title="BBX Monthly"
            price="$9"
            period="month"
            plan="monthly"
            onSubscribe={onSubscribe}
            features={[
              "Members-only drops",
              "Early access to new merch",
              "BBX Token whitelist perks",
              "Community role"
            ]}
          />
        </div>
        <div className={loading==="yearly" ? "opacity-70 pointer-events-none":""}>
          <PricingCard
            title="BBX Yearly"
            price="$90"
            period="year"
            plan="yearly"
            onSubscribe={onSubscribe}
            highlight
            features={[
              "Everything in Monthly",
              "2 free surprise drops/year",
              "Priority whitelist tier",
              "VIP role + shoutout"
            ]}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Compare Plans</h2>
        <FeaturesTable />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">FAQ</h2>
        <FAQ />
      </div>

      <RefundNote />
      <div className="text-center">
        <a href="/account" className="underline opacity-90">Already subscribed? Manage billing</a>
      </div>
      <p className="text-xs opacity-70 text-center">
        By subscribing you agree to our <a className="underline" href="/legal/terms">Terms</a> and <a className="underline" href="/legal/privacy">Privacy Policy</a>.
      </p>
    </section>
  );
}
