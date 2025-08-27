'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export function CollectionForm(){
  const [form, setForm] = useState({ title: '', issue: '', publisher: '', variant: '', condition: '', notes: '' });
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: string){ setForm(prev => ({...prev, [k]: v })); }

  async function save(){
    setSaving(true);
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user; if (!user){ alert('Sign in first'); setSaving(false); return; }

    let photo_url: string | null = null;
    if (file){
      const filePath = `collections/${user.id}/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from('public').upload(filePath, file);
      if (error){ alert(error.message); setSaving(false); return; }
      photo_url = supabase.storage.from('public').getPublicUrl(filePath).data.publicUrl;
    }

    const { error: insertError } = await supabase.from('collections').insert({ user_id: user.id, ...form, photo_url });
    if (insertError){ alert(insertError.message); }
    setForm({ title: '', issue: '', publisher: '', variant: '', condition: '', notes: '' });
    setFile(null);
    setSaving(false);
    location.reload();
  }

  return (
    <div className="card">
      <h3>Add to Collection</h3>
      <input className="input" placeholder="Title" value={form.title} onChange={e=>set('title', e.target.value)} />
      <div style={{display:'grid', gap:8, gridTemplateColumns:'1fr 1fr'}}>
        <input className="input" placeholder="Issue #" value={form.issue} onChange={e=>set('issue', e.target.value)} />
        <input className="input" placeholder="Publisher" value={form.publisher} onChange={e=>set('publisher', e.target.value)} />
      </div>
      <div style={{display:'grid', gap:8, gridTemplateColumns:'1fr 1fr'}}>
        <input className="input" placeholder="Variant" value={form.variant} onChange={e=>set('variant', e.target.value)} />
        <input className="input" placeholder="Condition" value={form.condition} onChange={e=>set('condition', e.target.value)} />
      </div>
      <textarea className="textarea" rows={3} placeholder="Notes" value={form.notes} onChange={e=>set('notes', e.target.value)} />
      <input className="input" type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} />
      <div style={{height:10}}/>
      <button className="btn" disabled={saving} onClick={save}>{saving ? 'Saving...' : 'Save'}</button>
    </div>
  );
}
