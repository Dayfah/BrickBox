import { createClient } from '@supabase/supabase-js';
import 'server-only';

export function supabaseServer(){
  const supa = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return supa;
}
