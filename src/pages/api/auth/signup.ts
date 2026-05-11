import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import { sendWelcomeEmail } from "../../../lib/resend";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password, name, company } = body;

    if (!email || !password || !name) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400, headers: { "Content-Type": "application/json" }
      });
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, company } }
    });

    if (authError) {
      return new Response(JSON.stringify({ error: authError.message }), {
        status: 400, headers: { "Content-Type": "application/json" }
      });
    }

    // Insert profile
    if (authData.user) {
      await supabase.from("profiles").insert({
        id: authData.user.id,
        email,
        full_name: name,
        company,
        plan_tier: "free",
      });
    }

    // Send welcome email (non-blocking)
    sendWelcomeEmail(email, name).catch(console.error);

    return new Response(JSON.stringify({ success: true, user: authData.user }), {
      status: 200, headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500, headers: { "Content-Type": "application/json" }
    });
  }
};
