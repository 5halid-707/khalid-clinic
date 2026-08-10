import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate required fields
    if (!data.name || !data.phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // Compose email content
    const subject = `حجز موعد جديد - عيادة روزا / New Booking - ROSA Clinic`;
    const body = `
═══════════════════════════════════════════
  حجز موعد جديد / NEW BOOKING REQUEST
═══════════════════════════════════════════

📅 ${new Date().toLocaleString("ar-SA", { timeZone: "Asia/Riyadh" })}

👤 الاسم / Name: ${data.name}
📞 الجوال / Phone: ${data.phone}
📧 البريد / Email: ${data.email || "غير محدد"}
🏥 الخدمة / Service: ${data.service || "غير محدد"}
👨‍⚕️ الطبيب / Doctor: ${data.doctor || "غير محدد"}
📆 التاريخ / Date: ${data.date || "غير محدد"}
⏰ الوقت / Time: ${data.time || "غير محدد"}

📝 ملاحظات / Notes:
${data.notes || "لا توجد"}

═══════════════════════════════════════════
يرجى التواصل مع العميل خلال 24 ساعة
Please contact the client within 24 hours
═══════════════════════════════════════════
    `.trim();

    // Log to server (Vercel logs)
    console.log("=== NEW BOOKING ===");
    console.log(body);
    console.log("==================");

    // Send email via Resend if API key is available
    // To enable: add RESEND_API_KEY env var on Vercel
    if (process.env.RESEND_API_KEY) {
      try {
        const { default: Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "ROSA Clinic <onboarding@resend.dev>",
          to: "khalid-alharbi@zohomail.sa",
          subject,
          text: body,
        });
        console.log("Email sent to khalid-alharbi@zohomail.sa");
      } catch (emailErr) {
        console.error("Email send failed (logged to console instead):", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Booking received. We will contact you within 24 hours.",
      bookingId: `BK-${Date.now()}`,
    });
  } catch (error: any) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process booking" },
      { status: 500 }
    );
  }
}
