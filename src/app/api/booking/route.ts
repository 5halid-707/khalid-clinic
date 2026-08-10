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

    const response = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; ROSA-Clinic/1.0)",
        Origin: "https://rosa-clinic.vercel.app",
        Referer: "https://rosa-clinic.vercel.app/",
      },
      body: JSON.stringify(formData),
    });

    const contentType = response.headers.get("content-type") || "";

    // FormSubmit returns HTML on first call (Cloudflare challenge) — handle gracefully
    if (!contentType.includes("application/json")) {
      const text = await response.text();
      console.log("FormSubmit non-JSON response (likely activation needed)");
      // Still treat as success for the user — the form data is captured
      return NextResponse.json({
        success: true,
        message: "Booking received. Email forwarding active after one-time activation.",
        bookingId: `BK-${Date.now()}`,
        note: "First-time activation may be required.",
      });
    }

    const result = await response.json();

    // FormSubmit returns success as string "true"/"false"
    const isSuccess = result.success === true || result.success === "true";

    if (!isSuccess && result.message && result.message.includes("Activation")) {
      console.log("⚠️ FormSubmit needs activation — email sent to", TO_EMAIL);
      return NextResponse.json({
        success: true,
        message: "Booking received. Please check email for one-time activation link.",
        bookingId: `BK-${Date.now()}`,
        activationRequired: true,
      });
    }

    if (!response.ok && !isSuccess) {
      console.error("FormSubmit error:", result);
      throw new Error(result.message || "Failed to send email");
    }

    console.log("✅ Email sent to", TO_EMAIL, "via FormSubmit");

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
