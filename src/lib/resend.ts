import { Resend } from "resend";

const resendApiKey = import.meta.env.RESEND_API_KEY;
export const resend = new Resend(resendApiKey);

export async function sendNewsletterConfirmation(email: string) {
  return await resend.emails.send({
    from: "Madar AI <hello@madarai.co>",
    to: email,
    subject: "You are on the Growth Intelligence Weekly list",
    html: `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;padding:40px;">
        <h2 style="color:#F97316;">You are in.</h2>
        <p>Every Tuesday, you will get one email with the most important mobile growth insights of the week.</p>
        <p style="color:#9CA3AF;font-size:13px;">Unsubscribe anytime. No spam, ever.</p>
      </div>
    `,
  });
}
