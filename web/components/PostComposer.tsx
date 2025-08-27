'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export function PostComposer(){
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(){
    setLoading(true);
    let image_url: string | null = null;
    if (file){
      const filePath = `posts/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from('public').upload(filePath, file);
      if (error) { alert(error.message); setLoading(false); return; }
      image_url = supabase.storage.from('public').getPublicUrl(filePath).data.publicUrl;
    }
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) { alert('Sign in first'); setLoading(false); return; }
    const { error: insertError } = await supabase.from('posts').insert({
      user_id: user.id,
      content,
      image_url
    });
    if (insertError){ alert(insertError.message); }
    setContent(''); setFile(null);
    setLoading(false);
    location.reload();
  }

  return (
    <div className="card">
      <h3>Post an update</h3>
      <textarea className="textarea" rows={3} placeholder="New haul? Variant flex?"
        value={content} onChange={e=>setContent(e.target.value)} />
      <div style={{height:8}}/>
      <input className="input" type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)}/>
      <div style={{height:10}}/>
      <button className="btn" disabled={loading} onClick={submit}>{loading ? 'Posting...' : 'Post'}</button>
    </div>
  );
}
