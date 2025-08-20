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
    const { start, end } = await req.json().catch(() => ({ }));
    const supabase = getClient(req);
    const query = supabase.from('issues').select('id, title, release_date, series_id, story_arc').order('release_date');
    if (start) query.gte('release_date', start);
    if (end) query.lte('release_date', end);
    const { data, error } = await query;
    if (error) throw error;
    const weeks: Record<string, any[]> = {};
    for (const row of data ?? []) {
      const d = new Date(row.release_date);
      const jan4 = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
      const dayOfWeek = (d.getUTCDay() + 6) % 7;
      const week1 = new Date(jan4);
      week1.setUTCDate(jan4.getUTCDate() - ((jan4.getUTCDay() + 6) % 7));
      const week = Math.floor((+d - +week1) / (7 * 24 * 3600 * 1000)) + 1;
      const key = `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
      (weeks[key] ||= []).push(row);
    }
    return new Response(JSON.stringify({ weeks }), { headers: { 'content-type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
});
