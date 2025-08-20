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
    const { series_id, owner } = await req.json();
    if (!series_id || !owner) {
      return new Response("Missing series_id or owner", { status: 400 });
    }
    const supabase = getClient(req);
    const { data: allIssues, error: issuesErr } = await supabase
      .from('issues')
      .select('id, issue_number')
      .eq('series_id', series_id)
      .order('id');
    if (issuesErr) throw issuesErr;
    const { data: mine, error: mineErr } = await supabase
      .from('user_issues')
      .select('issue_id')
      .eq('owner', owner);
    if (mineErr) throw mineErr;
    const owned = new Set((mine ?? []).map((r) => r.issue_id));
    const missing = (allIssues ?? []).filter((i) => !owned.has(i.id));
    return new Response(
      JSON.stringify({
        total: allIssues?.length ?? 0,
        owned: owned.size,
        missing_count: missing.length,
        missing_issue_ids: missing.map((m) => m.id),
      }),
      { headers: { 'content-type': 'application/json' } },
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
});
