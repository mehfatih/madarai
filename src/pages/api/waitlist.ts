import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, name, company, monthly_spend } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email required" }), {
        status: 400, headers: { "Content-Type": "application/json" }
      });
    }

    const { error } = await supabase.from("waitlist").insert({
      email,
      name: name || null,
      company_size: company || null,
      monthly_spend: monthly_spend || null,
      referral_source: request.headers.get("referer") || "direct",
      status: "pending",
    });

    if (error && error.code !== "23505") {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400, headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { "Content-Type": "application/json" }
    });

  } catch {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500, headers: { "Content-Type": "application/json" }
    });
  }
};
