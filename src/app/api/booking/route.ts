import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// SMTP credentials — works with Zoho, Gmail, or any SMTP
const SMTP_HOST = process.env.SMTP_HOST || "smtp.zoho.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465");
const SMTP_USER = process.env.SMTP_USER || "khalid-alharbi@zohomail.sa";
const SMTP_PASS = process.env.SMTP_PASS || ""; // Zoho App Password
const TO_EMAIL = "khalid-alharbi@zohomail.sa";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.name || !data.phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const subject = `حجز موعد جديد - ${data.name} | ROSA Clinic Booking`;
    const htmlBody = `
<div dir="rtl" style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; background: #F8F5F0; padding: 32px; border-radius: 16px; border-top: 6px solid #D4A843;">
  <div style="text-align: center; margin-bottom: 24px;">
    <h1 style="color: #2D1E14; font-size: 24px; margin: 0 0 8px;">حجز موعد جديد</h1>
    <p style="color: #8A6D3B; margin: 0; font-size: 14px;">New Booking Request — ROSA Clinic</p>
  </div>
  <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
    <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
      <tr><td style="padding: 10px 0; color: #8A6D3B; width: 140px; font-weight: bold;">👤 الاسم:</td><td style="padding: 10px 0; color: #212121; font-weight: 600;">${data.name}</td></tr>
      <tr style="border-top: 1px solid #F1ECE4;"><td style="padding: 10px 0; color: #8A6D3B; font-weight: bold;">📞 الجوال:</td><td style="padding: 10px 0; color: #212121; font-weight: 600; direction: ltr; text-align: right;">${data.phone}</td></tr>
      ${data.email ? `<tr style="border-top: 1px solid #F1ECE4;"><td style="padding: 10px 0; color: #8A6D3B; font-weight: bold;">📧 البريد:</td><td style="padding: 10px 0; color: #212121; direction: ltr; text-align: right;">${data.email}</td></tr>` : ""}
      ${data.service ? `<tr style="border-top: 1px solid #F1ECE4;"><td style="padding: 10px 0; color: #8A6D3B; font-weight: bold;">🏥 الخدمة:</td><td style="padding: 10px 0; color: #212121;">${data.service}</td></tr>` : ""}
      ${data.doctor ? `<tr style="border-top: 1px solid #F1ECE4;"><td style="padding: 10px 0; color: #8A6D3B; font-weight: bold;">👨‍⚕️ الطبيب:</td><td style="padding: 10px 0; color: #212121;">${data.doctor}</td></tr>` : ""}
      ${data.date ? `<tr style="border-top: 1px solid #F1ECE4;"><td style="padding: 10px 0; color: #8A6D3B; font-weight: bold;">📆 التاريخ:</td><td style="padding: 10px 0; color: #212121; direction: ltr; text-align: right;">${data.date}</td></tr>` : ""}
      ${data.time ? `<tr style="border-top: 1px solid #F1ECE4;"><td style="padding: 10px 0; color: #8A6D3B; font-weight: bold;">⏰ الوقت:</td><td style="padding: 10px 0; color: #212121; direction: ltr; text-align: right;">${data.time}</td></tr>` : ""}
    </table>
    ${data.notes ? `<div style="margin-top: 16px; padding: 14px; background: #F8F5F0; border-radius: 8px; border-right: 4px solid #D4A843;"><div style="color: #8A6D3B; font-weight: bold; margin-bottom: 6px; font-size: 13px;">📝 ملاحظات:</div><div style="color: #212121; font-size: 14px;">${data.notes}</div></div>` : ""}
  </div>
  <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #E8DECE;">
    <p style="color: #8A6D3B; font-size: 13px; margin: 0;">📅 ${new Date().toLocaleString("ar-SA", { timeZone: "Asia/Riyadh" })}</p>
    <p style="color: #212121; font-size: 14px; margin: 8px 0 0;">يرجى التواصل مع العميل خلال 24 ساعة</p>
  </div>
</div>
    `.trim();

    const textBody = `
حجز موعد جديد — ROSA Clinic
═══════════════════════════════════════════
الاسم: ${data.name}
الجوال: ${data.phone}
البريد: ${data.email || "-"}
الخدمة: ${data.service || "-"}
الطبيب: ${data.doctor || "-"}
التاريخ: ${data.date || "-"}
الوقت: ${data.time || "-"}
ملاحظات: ${data.notes || "-"}
═══════════════════════════════════════════
${new Date().toLocaleString("ar-SA", { timeZone: "Asia/Riyadh" })}
    `.trim();

    if (!SMTP_PASS) {
      console.log("⚠️ SMTP_PASS not set — booking logged only:", JSON.stringify(data, null, 2));
      return NextResponse.json({
        success: false,
        error: "Email service not configured. Set SMTP_PASS env var with Zoho App Password.",
      }, { status: 500 });
    }

    // Create Nodemailer transporter with Zoho SMTP
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `ROSA Clinic <${SMTP_USER}>`,
      to: TO_EMAIL,
      subject,
      html: htmlBody,
      text: textBody,
      replyTo: data.email || undefined,
    });

    console.log("✅ Email sent to", TO_EMAIL, "— MessageId:", info.messageId);

    return NextResponse.json({
      success: true,
      message: "Booking received and email sent successfully.",
      bookingId: `BK-${Date.now()}`,
      messageId: info.messageId,
    });
  } catch (error: any) {
    console.error("❌ Booking API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process booking" },
      { status: 500 }
    );
  }
}
