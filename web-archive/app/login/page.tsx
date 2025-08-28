'use client';
import { supabase } from '../../lib/supabaseClient';

export default function LoginPage() {
  async function signInWithMagicLink(formData: FormData) {
    const email = String(formData.get('email') || '');
    const { error } = await supabase.auth.signInWithOtp({
      email, options: { emailRedirectTo: `${location.origin}` }
    });
    if (error) alert(error.message); else alert('Check your email for a magic link');
  }
  async function signOut() { await supabase.auth.signOut(); location.href = '/'; }
  return (
    <div className="card">
      <h2>Sign in</h2>
      <form action={signInWithMagicLink}>
        <input className="input" name="email" type="email" placeholder="you@comicfan.com" required />
        <div style={{height:10}}/>
        <button className="btn" type="submit">Send magic link</button>
      </form>
      <hr/>
      <button className="btn" onClick={signOut}>Sign out</button>
    </div>
  );
}
