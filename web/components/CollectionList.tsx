import { supabaseServer } from '../lib/supabaseServer';

export async function CollectionList(){
  const supa = supabaseServer();
  const { data: items } = await supa.from('collections').select('*').order('created_at', { ascending: false }).limit(50);
  if (!items?.length) return <div className="card"><h3>Your Collection</h3><p className="small">Nothing yet. Add your first book →</p></div>;
  return (
    <div className="card">
      <h3>Your Collection</h3>
      <div className="grid two" style={{marginTop:12}}>
        {items.map((it: any) => (
          <div className="card" key={it.id}>
            <div className="small">{new Date(it.created_at).toLocaleDateString()}</div>
            <strong>{it.title}</strong> <span className="small">#{it.issue}</span>
            <div className="small">{it.publisher} {it.variant ? `— ${it.variant}` : ''}</div>
            {it.photo_url ? <img src={it.photo_url} alt={it.title}/> : null}
            {it.notes ? <div className="small">{it.notes}</div> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
