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
    const { q } = await req.json();
    if (!q || String(q).length < 2) return new Response("Query too short", { status: 400 });
    const supabase = getClient(req);
    const { data: s } = await supabase
      .from('series')
      .select('id, title, publisher')
      .ilike('title', `%${q}%`)
      .limit(10);
    const { data: i } = await supabase
      .from('issues')
      .select('id, title, issue_number, series_id')
      .ilike('title', `%${q}%`)
      .limit(10);
    return new Response(JSON.stringify({ series: s ?? [], issues: i ?? [] }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
});
