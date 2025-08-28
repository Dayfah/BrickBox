"use client";

import { useState } from "react";

export default function SubscribeButtons() {
  const [loading, setLoading] = useState<"monthly" | "yearly" | null>(null);
  const goCheckout = async (plan: "monthly" | "yearly") => {
    try {
      setLoading(plan);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      if (!res.ok) throw new Error("Checkout error");
      const { url } = await res.json();
      window.location.href = url; // redirect to Stripe Checkout
    } catch (e) {
      alert("Could not start checkout. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
      <button
        onClick={() => goCheckout("monthly")}
        disabled={loading !== null}
        className="bg-bbxRed text-bbxCream px-5 py-3 rounded font-semibold disabled:opacity-60"
      >
        {loading === "monthly" ? "Loading…" : "Subscribe – Monthly"}
      </button>
      <button
        onClick={() => goCheckout("yearly")}
        disabled={loading !== null}
        className="bg-bbxCream text-bbxDark px-5 py-3 rounded font-semibold disabled:opacity-60"
      >
        {loading === "yearly" ? "Loading…" : "Subscribe – Yearly"}
      </button>
    </div>
  );
}
