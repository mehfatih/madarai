import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 401, headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ success: true, session: data.session }), {
      status: 200, headers: { "Content-Type": "application/json" }
    });

  } catch {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500, headers: { "Content-Type": "application/json" }
    });
  }
};
