"use client";
import { useState } from "react";
const ITEMS = [
  { q:"When does the BBX Token launch?", a:"Soon. Join the Token page email list to get the exact date and whitelist info at drop time." },
  { q:"What do members get?", a:"Exclusive drops, early access, BBX whitelist perks, VIP shoutouts (yearly), and community roles." },
  { q:"Can I cancel anytime?", a:"Yes. Subscriptions are managed by Stripe. Cancel anytime via Stripe customer portal." },
  { q:"Will perks carry over to token?", a:"Yes—membership tiers map to whitelist/priority tiers for initial token utilities." }
];
export default function FAQ(){
  const [open,setOpen]=useState<number|null>(0);
  return (
    <div className="space-y-2">
      {ITEMS.map((it,i)=>{
        const isOpen=open===i;
        return (
          <div key={i} className="border border-bbxRed/40 rounded-lg">
            <button className="w-full text-left p-4 font-semibold flex justify-between items-center" onClick={()=>setOpen(isOpen?null:i)}>
              <span>{it.q}</span><span className="opacity-70">{isOpen?"–":"+"}</span>
            </button>
            {isOpen && <p className="px-4 pb-4 opacity-90">{it.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
