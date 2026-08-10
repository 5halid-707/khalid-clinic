import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// FormSubmit.co — free email forwarding, no signup, no SMTP needed
const TO_EMAIL = "grouthhacker@gmail.com";
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${TO_EMAIL}`;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.name || !data.phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // Build email content for FormSubmit
    const formData = {
      _subject: `حجز موعد جديد - ${data.name} | ROSA Clinic Booking`,
      _template: "table",
      _captcha: "false",
      "الاسم / Name": data.name,
      "الجوال / Phone": data.phone,
      "البريد / Email": data.email || "-",
      "الخدمة / Service": data.service || "-",
      "الطبيب / Doctor": data.doctor || "-",
      "التاريخ / Date": data.date || "-",
      "الوقت / Time": data.time || "-",
      "ملاحظات / Notes": data.notes || "-",
      "وقت الإرسال / Submitted": new Date().toLocaleString("ar-SA", { timeZone: "Asia/Riyadh" }),
    };

    // Send via FormSubmit.co (server-side, hides email from client)
    const response = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("FormSubmit error:", result);
      throw new Error(result.message || "Failed to send email");
    }

    console.log("✅ Email sent to", TO_EMAIL, "via FormSubmit — success:", result.success);

    return NextResponse.json({
      success: true,
      message: "Booking received and email sent successfully.",
      bookingId: `BK-${Date.now()}`,
    });
  } catch (error: any) {
    console.error("❌ Booking API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process booking" },
      { status: 500 }
    );
  }
}
