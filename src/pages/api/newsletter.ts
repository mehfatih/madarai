import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";
import { sendNewsletterConfirmation } from "../../lib/resend";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400, headers: { "Content-Type": "application/json" }
      });
    }

    // Upsert to newsletter_subscribers table
    const { error } = await supabase.from("newsletter_subscribers").upsert({
      email,
      status: "active",
      subscribed_at: new Date().toISOString(),
    }, { onConflict: "email" });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400, headers: { "Content-Type": "application/json" }
      });
    }

    // Send confirmation email (non-blocking)
    sendNewsletterConfirmation(email).catch(console.error);

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { "Content-Type": "application/json" }
    });

  } catch {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500, headers: { "Content-Type": "application/json" }
    });
  }
};
