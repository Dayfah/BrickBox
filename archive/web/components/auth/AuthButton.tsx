'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export function AuthButton(){
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session)=>{
      setUser(session?.user ?? null);
    });
    return () => { sub.subscription.unsubscribe(); }
  }, []);

  if (!user) return <Link href="/login">Sign in</Link>;

  return (
    <div style={{display:'flex', gap:8, alignItems:'center'}}>
      <span className="small">Hi, {user.email}</span>
      <button className="btn" onClick={async ()=>{ await supabase.auth.signOut(); location.href='/'; }}>Sign out</button>
    </div>
  );
}
