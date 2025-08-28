"use client";
type Plan = "monthly"|"yearly";
export default function PricingCard({
  title, price, period, features, highlight=false, plan, onSubscribe
}:{
  title:string; price:string; period:string; features:string[]; highlight?:boolean; plan:Plan; onSubscribe:(p:Plan)=>void;
}) {
  return (
    <div className={`rounded-xl p-6 border transition ${highlight ? "border-bbxCream bg-bbxRed/10 shadow-lg" : "border-bbxRed/50 bg-black/20"}`}>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-4xl font-extrabold">{price}</span>
        <span className="opacity-80 ml-1">/{period}</span>
      </div>
      <ul className="space-y-2 mb-6 text-left">
        {features.map((f,i)=>(
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-bbxRed inline-block" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button onClick={()=>onSubscribe(plan)} className={`w-full rounded px-4 py-3 font-semibold ${highlight ? "bg-bbxCream text-bbxDark" : "bg-bbxRed text-bbxCream"}`}>
        Subscribe
      </button>
    </div>
  );
}
