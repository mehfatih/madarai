import { Resend } from "resend";

const resendApiKey = import.meta.env.RESEND_API_KEY;
export const resend = new Resend(resendApiKey);

export async function sendWelcomeEmail(email: string, name: string) {
  return await resend.emails.send({
    from: "Madar AI <hello@madarai.co>",
    to: email,
    subject: "Welcome to Madar AI — Your AI Growth Brain is Ready",
    html: `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#0F1117;color:#F8FAFC;padding:40px;border-radius:16px;">
        <div style="text-align:center;margin-bottom:32px;">
          <div style="width:48px;height:48px;background:linear-gradient(135deg,#F97316,#EF4444);border-radius:10px;display:inline-flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:white;margin-bottom:16px;">M</div>
          <h1 style="font-size:24px;font-weight:800;margin:0;color:white;">Welcome to Madar AI</h1>
        </div>
        <p style="font-size:16px;line-height:1.6;color:rgba(255,255,255,0.7);">Hi ${name},</p>
        <p style="font-size:16px;line-height:1.6;color:rgba(255,255,255,0.7);">You have just joined 2,400+ mobile app founders using AI to grow smarter. Your Growth Command Center is ready.</p>
        <div style="text-align:center;margin:32px 0;">
          <a href="https://madarai.co/dashboard" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#F97316,#EF4444);color:white;text-decoration:none;font-weight:700;border-radius:999px;font-size:15px;">Open Your Dashboard →</a>
        </div>
        <div style="background:#161B26;border:1px solid #2A3650;border-radius:12px;padding:24px;margin-bottom:24px;">
          <p style="font-size:14px;font-weight:700;color:#F97316;margin:0 0 12px;">Your next 3 steps:</p>
          <p style="font-size:14px;color:rgba(255,255,255,0.6);margin:0 0 8px;">1. Connect your first ad account (takes 2 minutes)</p>
          <p style="font-size:14px;color:rgba(255,255,255,0.6);margin:0 0 8px;">2. Link your RevenueCat or Adapty account</p>
          <p style="font-size:14px;color:rgba(255,255,255,0.6);margin:0;">3. Watch your first AI insight appear within 24 hours</p>
        </div>
        <p style="font-size:13px;color:rgba(255,255,255,0.3);text-align:center;">Madar AI · A product of Zyrix Global Technologies<br/>You can unsubscribe at any time.</p>
      </div>
    `,
  });
}

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
