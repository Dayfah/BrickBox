"use client";
import { useState } from "react";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const openPortal = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data?.error || "Could not open billing portal.");
        setLoading(false);
        return;
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      alert("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-center">Manage Billing</h1>
      <p className="opacity-90 text-sm text-center">
        Enter the email you used at checkout to open Stripe’s billing portal.
      </p>
      <input
        type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full p-3 rounded bg-bbxDark border border-bbxCream text-bbxCream"
      />
      <button
        onClick={openPortal}
        disabled={loading || !email}
        className="w-full bg-bbxRed text-bbxCream px-4 py-3 rounded font-semibold disabled:opacity-60"
      >
        {loading ? "Opening…" : "Open Billing Portal"}
      </button>
      <p className="opacity-70 text-xs text-center">
        Tip: If you subscribed with a different email, use that one here.
      </p>
    </section>
  );
}

