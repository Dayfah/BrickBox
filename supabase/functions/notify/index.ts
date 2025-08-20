import { serve } from "https://deno.land/std@0.223.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function getClient(req: Request) {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
    auth: { persistSession: false },
  });
}

serve(async (req) => {
  try {
    const { user_id, kind, payload } = await req.json();
    if (!user_id || !kind) return new Response("Missing user_id or kind", { status: 400 });
    const supabase = getClient(req);
    const { error } = await supabase.from('notifications').insert({ user_id, kind, payload });
    if (error) throw error;
    return new Response("ok");
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
});
