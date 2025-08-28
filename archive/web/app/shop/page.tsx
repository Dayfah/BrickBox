'use client';
import { useEffect, useState } from 'react';

type Prod = { id: string; title: string; images?: { src: string }[]; };

export default function ShopPage() {
  const [prods, setProds] = useState<Prod[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/printify/products').then(r=>r.json()).then(json => {
      if (json.ok) setProds(json.products || []);
      else setError(json.reason || 'Error');
    }).catch(e => setError(String(e)));
  }, []);

  return (
    <div className="card">
      <h2>BrickBox Store</h2>
      <p className="small">Powered by Printify</p>
      {error && (
        <div className="card" style={{marginTop:12}}>
          <div className="small">Live product pull not configured ({error}).</div>
          <a className="btn" href="https://brickbox.printify.me/" target="_blank">Open Store</a>
        </div>
      )}
      {!error && !prods && <div className="small">Loading products…</div>}
      {!error && prods && prods.length === 0 && <div className="small">No products found yet.</div>}
      {!error && prods && prods.length > 0 && (
        <div className="grid two" style={{marginTop: 12}}>
          {prods.map((p: any) => {
            const img = p.images?.[0]?.src || p?.images?.[0] || null;
            return (
              <div key={p.id} className="card">
                {img ? <img alt={p.title} src={img} /> : null}
                <strong>{p.title}</strong>
                <div style={{height:8}}/>
                <a className="btn" href="https://brickbox.printify.me/" target="_blank">Buy</a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
