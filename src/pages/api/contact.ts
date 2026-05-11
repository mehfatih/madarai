import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, company, topic, message } = await request.json();

    if (!name || !email || !topic || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_KEY
    );

    const { error: dbError } = await supabase.from("contact_submissions").insert({
      name,
      email,
      company: company || null,
      topic,
      message
    });

    if (dbError) {
      console.error("Supabase error:", dbError);
    }

    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Madar AI <noreply@madarai.co>",
      to: ["hello@madarai.co"],
      replyTo: email,
      subject: `[Contact - ${topic}] ${name}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #0F1117; margin-bottom: 16px;">New contact submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 120px;">Name</td><td style="padding: 8px 0;"><strong>${name}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Company</td><td style="padding: 8px 0;">${company || "—"}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Topic</td><td style="padding: 8px 0;"><strong>${topic}</strong></td></tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #f6f6f6; border-radius: 8px; border-left: 3px solid #F97316;">
            <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">Message</div>
            <div style="white-space: pre-wrap; line-height: 1.6;">${message}</div>
          </div>
        </div>
      `
    });

    await resend.emails.send({
      from: "Madar AI <hello@madarai.co>",
      to: [email],
      subject: "We got your message",
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #0F1117;">Thanks for reaching out, ${name}.</h2>
          <p style="color: #444; line-height: 1.7;">
            Your message just landed on our desk. A human from the Madar team will get back to you within 24 hours, Monday through Friday.
          </p>
          <p style="color: #444; line-height: 1.7;">
            In the meantime, feel free to browse our <a href="https://madarai.co/resources/blog" style="color: #F97316;">latest insights</a> or check out the <a href="https://madarai.co/product" style="color: #F97316;">product</a>.
          </p>
          <p style="color: #888; font-size: 13px; margin-top: 32px;">
            Madar AI — A product of Zyrix Global Technologies<br/>
            <a href="https://madarai.co" style="color: #F97316;">madarai.co</a>
          </p>
        </div>
      `
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e: any) {
    console.error("Contact error:", e);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};