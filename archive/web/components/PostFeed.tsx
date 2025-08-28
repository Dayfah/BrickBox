import { supabaseServer } from '../lib/supabaseServer';

export async function PostFeed(){
  const supa = supabaseServer();
  const { data: posts } = await supa.from('posts').select('*').order('created_at', { ascending: false }).limit(50);
  return (
    <div className="grid" style={{marginTop:16}}>
      {posts?.map((p: any) => (
        <div className="card" key={p.id}>
          <div className="small">{new Date(p.created_at).toLocaleString()}</div>
          <p>{p.content}</p>
          {p.image_url ? <img src={p.image_url} alt="post image" /> : null}
        </div>
      ))}
    </div>
  );
}
