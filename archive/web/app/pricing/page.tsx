'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
  }, []);

  async function startCheckout(plan: 'monthly' | 'yearly') {
    if (!userId) { alert('Sign in first'); return; }
    setLoadingPlan(plan);
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan, user_id: userId })
    });
    const data = await res.json();
    if (data.url) location.href = data.url;
    setLoadingPlan(null);
  }

  return (
    <div className="grid two">
      <div className="card">
        <h3>Monthly</h3>
        <p>$ / month</p>
        <button className="btn" disabled={loadingPlan==='monthly'} onClick={()=>startCheckout('monthly')}>Choose Monthly</button>
      </div>
      <div className="card">
        <h3>Yearly</h3>
        <p>$ / year</p>
        <button className="btn" disabled={loadingPlan==='yearly'} onClick={()=>startCheckout('yearly')}>Choose Yearly</button>
      </div>
    </div>
  );
}
