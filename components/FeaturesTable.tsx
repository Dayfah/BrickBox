export default function FeaturesTable(){
  const rows = [
    { feature: "Members-only drops", monthly:true, yearly:true },
    { feature: "Early merch access", monthly:true, yearly:true },
    { feature: "Whitelist perks", monthly:true, yearly:true },
    { feature: "VIP shoutout", monthly:false, yearly:true },
    { feature: "2 surprise drops/yr", monthly:false, yearly:true },
    { feature: "Priority support", monthly:true, yearly:true }
  ];
  const Dot = ({ok}:{ok:boolean}) => (<span className={`inline-block h-2 w-2 rounded-full ${ok?"bg-bbxCream":"bg-bbxRed/40"}`} />);
  return (
    <div className="overflow-x-auto border border-bbxRed/50 rounded-xl">
      <table className="w-full text-left">
        <thead className="bg-black/20">
          <tr><th className="p-4">Feature</th><th className="p-4">Monthly</th><th className="p-4">Yearly</th></tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i} className="border-t border-bbxRed/30">
              <td className="p-4">{r.feature}</td>
              <td className="p-4"><Dot ok={r.monthly}/></td>
              <td className="p-4"><Dot ok={r.yearly}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
