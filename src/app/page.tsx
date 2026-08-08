"use client";

import { useState, useEffect } from "react";

const SITE_URL = "https://khalid-cyber-security.vercel.app/";

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);
  const isRTL = lang === "ar";

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/clinic/style.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "/clinic/script.js";
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap');
        ${isRTL ? `
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap');
          * { font-family: 'Cairo', sans-serif !important; text-transform: none !important; }
        ` : `
          * { font-family: 'Poppins', sans-serif !important; }
        `}
      `}</style>

      {/* Header */}
      <header className="header" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "#fff", boxShadow: "0 .5rem 1.5rem rgba(0,0,0,.1)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 5%", }}>
        <a href="#home" className="logo" style={{ fontSize: "2.2rem", color: "#16a085", fontWeight: 700, textDecoration: "none" }}>
          <img src="/clinic/heartbeat-solid.svg" alt="" style={{ width: "2.5rem", height: "2.5rem", display: "inline", verticalAlign: "middle", marginLeft: "0.5rem" }} />
          {t("عيادة خالد", "medcare.")}
        </a>
        <nav className={`navbar ${menuOpen ? "nav-toggle" : ""}`} style={{ display: "flex", gap: "1.5rem" }}>
          <a href="#home" style={{ color: "#444", fontSize: "1.5rem", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>{t("الرئيسية", "home")}</a>
          <a href="#services" style={{ color: "#444", fontSize: "1.5rem", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>{t("الخدمات", "services")}</a>
          <a href="#about" style={{ color: "#444", fontSize: "1.5rem", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>{t("من نحن", "about")}</a>
          <a href="#doctors" style={{ color: "#444", fontSize: "1.5rem", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>{t("الأطباء", "doctors")}</a>
          <a href="#book" style={{ color: "#444", fontSize: "1.5rem", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>{t("الحجز", "book")}</a>
          <a href="#review" style={{ color: "#444", fontSize: "1.5rem", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>{t("الآراء", "review")}</a>
          <a href="#blogs" style={{ color: "#444", fontSize: "1.5rem", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>{t("المدونة", "blogs")}</a>
          <a href="#contact" style={{ color: "#444", fontSize: "1.5rem", textDecoration: "none" }} onClick={() => setMenuOpen(false)}>{t("اتصل بنا", "contact")}</a>
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} style={{ background: "#16a085", color: "#fff", padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontSize: "1.2rem" }}>{lang === "ar" ? "EN" : "عربي"}</button>
        </nav>
        <button id="menu-btn" className="fas fa-bars" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", fontSize: "2rem", color: "#16a085", background: "none", border: "none", cursor: "pointer" }}>☰</button>
      </header>

      {/* Home Section */}
      <section className="home" id="home" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "1.5rem", paddingTop: "8rem", minHeight: "100vh", background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)" }}>
        <div className="image" style={{ flex: "1 1 45rem" }}>
          <img src="/clinic/home-img.svg" alt="" style={{ width: "100%" }} />
        </div>
        <div className="content" style={{ flex: "1 1 45rem" }}>
          <h3 style={{ fontSize: "5rem", color: "#444", textShadow: "0.4rem 0.4rem 0 rgba(0,0,0,.2)" }}>{t("ابقَ آمناً، ابقَ بصحة جيدة", "stay safe, stay healthy")}</h3>
          <p style={{ fontSize: "1.7rem", color: "#777", lineHeight: 1.8, margin: "1rem 0" }}>{t("نحن نقدم أفضل الخدمات الطبية لأجلك ولعائلتك. رعاية صحية متكاملة بأحدث الأجهزة وفريق طبي متخصص.",
            "Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Rem Sed Autem Vero? Magnam, Est Laboriosam!")}</p>
          <a href="#contact" style={{ marginTop: "1rem", display: "inline-block", padding: "0.5rem 2rem", border: "0.2rem solid #16a085", borderRadius: "0.5rem", background: "#fff", color: "#16a085", fontSize: "1.7rem", textDecoration: "none", boxShadow: "0.5rem 0.5rem 0 rgba(22,160,133,.2)" }}>{t("اتصل بنا", "contact us")}</a>
        </div>
      </section>

      {/* Counters */}
      <section style={{ padding: "2rem 9%", background: "#16a085", display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "space-around" }}>
        {[{ num: "140+", label: t("طبيب في العمل", "doctors at work") }, { num: "1040+", label: t("مريض راضٍ", "satisfied patients") }, { num: "500+", label: t("سرير متاح", "bed facility") }, { num: "80+", label: t("مستشفى متاح", "available hospitals") }].map((c, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "3rem", color: "#fff" }}>{c.num}</h3>
            <p style={{ fontSize: "1.5rem", color: "#fff", opacity: 0.8 }}>{c.label}</p>
          </div>
        ))}
      </section>

      {/* Services */}
      <section className="services" id="services" style={{ padding: "2rem 9%" }}>
        <h1 className="heading" style={{ textAlign: "center", fontSize: "4rem", color: "#444", marginBottom: "3rem" }}>
          <span style={{ color: "#16a085" }}>{t("خدماتنا", "our")}</span> {t("الطبية", "services")}
        </h1>
        <div className="box-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(30rem, 1fr))", gap: "2rem" }}>
          {[
            { icon: "🩺", title: t("فحوصات مجانية", "free checkups"), desc: t("فحوصات طبية شاملة مجانية لجميع المرضى", "Lorem Ipsum Dolor Sit Amet Consectetur") },
            { icon: "🚑", title: t("إسعاف 24/7", "24/7 ambulance"), desc: t("خدمة إسعاف على مدار الساعة لحالات الطوارئ", "Lorem Ipsum Dolor Sit Amet Consectetur") },
            { icon: "👨‍⚕️", title: t("أطباء خبراء", "expert doctors"), desc: t("نخبة من الأطباء المتخصصين في جميع المجالات", "Lorem Ipsum Dolor Sit Amet Consectetur") },
            { icon: "💊", title: t("أدوية", "medicines"), desc: t("صيدلية متكاملة بجميع الأدوية والمستلزمات", "Lorem Ipsum Dolor Sit Amet Consectetur") },
            { icon: "🛏️", title: t("غرف مجهزة", "bed facility"), desc: t("غرف مجهزة بأحدث المعدات للرعاية المركزة", "Lorem Ipsum Dolor Sit Amet Consectetur") },
            { icon: "❤️", title: t("رعاية شاملة", "total care"), desc: t("رعاية صحية شاملة للمرضى قبل وبعد العلاج", "Lorem Ipsum Dolor Sit Amet Consectetur") },
          ].map((s, i) => (
            <div key={i} className="box" style={{ background: "#fff", border: "0.2rem solid #16a085", borderRadius: "0.5rem", boxShadow: "0.5rem 0.5rem 0 rgba(22,160,133,.2)", padding: "2rem" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{s.icon}</div>
              <h3 style={{ fontSize: "2rem", color: "#444", marginBottom: "0.5rem" }}>{s.title}</h3>
              <p style={{ fontSize: "1.4rem", color: "#777", lineHeight: 1.5 }}>{s.desc}</p>
              <a href="#book" style={{ display: "inline-block", marginTop: "1rem", color: "#16a085", fontSize: "1.4rem", textDecoration: "none" }}>{t("اعرف المزيد", "learn more")} →</a>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="about" id="about" style={{ padding: "2rem 9%", background: "#f5f5f5", display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center" }}>
        <div className="image" style={{ flex: "1 1 45rem" }}>
          <img src="/clinic/about-img.svg" alt="" style={{ width: "100%" }} />
        </div>
        <div className="content" style={{ flex: "1 1 45rem" }}>
          <h3 style={{ fontSize: "4rem", color: "#444", marginBottom: "1rem" }}>{t("نحن نهتم بحياتك الصحية", "we take care of your healthy life")}</h3>
          <p style={{ fontSize: "1.6rem", color: "#777", lineHeight: 1.8, marginBottom: "1rem" }}>{t("عيادة خالد هي مركز طبي متكامل يقدم خدمات صحية احترافية بفريق طبي متخصص وأحدث المعدات الطبية. نحن ملتزمون بتقديم أفضل رعاية لمرضانا.",
            "Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Iure Ducimus, Quod Ex Cupiditate Ullam In Assumenda Maiores Et Culpa Odit Tempora Ipsam Qui, Quisquam Quis Facere Iste Fuga, Minus Nesciunt.")}</p>
          <p style={{ fontSize: "1.6rem", color: "#777", lineHeight: 1.8, marginBottom: "1rem" }}>{t("نوفر بيئة آمنة ومريحة للمرضى مع متابعة دورية للحالات.",
            "Lorem Ipsum Dolor, Sit Amet Consectetur Adipisicing Elit. Natus Vero Ipsam Laborum Porro Voluptates Voluptatibus A Nihil Temporibus Deserunt Vel?")}</p>
          <a href="#book" style={{ display: "inline-block", marginTop: "1rem", padding: "0.5rem 2rem", border: "0.2rem solid #16a085", borderRadius: "0.5rem", background: "#16a085", color: "#fff", fontSize: "1.7rem", textDecoration: "none" }}>{t("اعرف المزيد", "learn more")}</a>
        </div>
      </section>

      {/* Doctors */}
      <section className="doctors" id="doctors" style={{ padding: "2rem 9%" }}>
        <h1 className="heading" style={{ textAlign: "center", fontSize: "4rem", color: "#444", marginBottom: "3rem" }}>
          <span style={{ color: "#16a085" }}>{t("أطباؤنا", "our")}</span> {t("الخبراء", "doctors")}
        </h1>
        <div className="box-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(30rem, 1fr))", gap: "2rem" }}>
          {[
            { img: "/clinic/doc-1.jpg", name: t("د. خالد الحربي", "Dr. Khalid Alharbi"), role: t("مدير عام", "expert doctor") },
            { img: "/clinic/doc-2.jpg", name: t("د. أحمد العتيبي", "Dr. Ahmed Alotaibi"), role: t("استشاري قلب", "cardiologist") },
            { img: "/clinic/doc-3.jpg", name: t("د. سارة الدوسري", "Dr. Sarah Aldosari"), role: t("أسنان", "dentist") },
            { img: "/clinic/doc-4.jpg", name: t("د. محمد القحطاني", "Dr. Mohammed Alqahtani"), role: t("عظام", "orthopedic") },
            { img: "/clinic/doc-5.jpg", name: t("د. نورة العنزي", "Dr. Noura Alanazi"), role: t("أطفال", "pediatrician") },
            { img: "/clinic/doc-6.jpg", name: t("د. فهد المطيري", "Dr. Fahad Almutairi"), role: t("أعصاب", "neurologist") },
          ].map((d, i) => (
            <div key={i} className="box" style={{ background: "#fff", borderRadius: "0.5rem", overflow: "hidden", boxShadow: "0.5rem 0.5rem 0 rgba(22,160,133,.2)", textAlign: "center" }}>
              <img src={d.img} alt={d.name} style={{ width: "100%", height: "25rem", objectFit: "cover" }} />
              <h3 style={{ fontSize: "2rem", color: "#444", margin: "1rem 0 0.5rem" }}>{d.name}</h3>
              <p style={{ fontSize: "1.4rem", color: "#16a085" }}>{d.role}</p>
              <div style={{ padding: "1rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
                <a href="https://github.com/5halid-707" target="_blank" style={{ color: "#16a085", fontSize: "1.8rem" }}>GitHub</a>
                <a href="https://www.linkedin.com/in/khalid-alharbi-8953a4b3" target="_blank" style={{ color: "#16a085", fontSize: "1.8rem" }}>LinkedIn</a>
                <a href="https://wa.me/966575015019" target="_blank" style={{ color: "#16a085", fontSize: "1.8rem" }}>WhatsApp</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Book Appointment */}
      <section className="book" id="book" style={{ padding: "2rem 9%", background: "#f5f5f5", display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center" }}>
        <div className="image" style={{ flex: "1 1 45rem" }}>
          <img src="/clinic/book-img.svg" alt="" style={{ width: "100%" }} />
        </div>
        <div className="form" style={{ flex: "1 1 45rem", background: "#fff", borderRadius: "0.5rem", boxShadow: "0.5rem 0.5rem 0 rgba(22,160,133,.2)", padding: "2rem" }}>
          <h3 style={{ fontSize: "3rem", color: "#444", marginBottom: "1rem", textAlign: "center" }}>{t("احجز موعد", "book appointment")}</h3>
          <input type="text" placeholder={t("الاسم الكامل", "your name")} style={{ width: "100%", padding: "1rem", margin: "0.5rem 0", border: "0.1rem solid #ddd", borderRadius: "0.5rem", fontSize: "1.5rem" }} />
          <input type="tel" placeholder={t("رقم الهاتف", "your number")} style={{ width: "100%", padding: "1rem", margin: "0.5rem 0", border: "0.1rem solid #ddd", borderRadius: "0.5rem", fontSize: "1.5rem" }} />
          <input type="email" placeholder={t("البريد الإلكتروني", "your email")} style={{ width: "100%", padding: "1rem", margin: "0.5rem 0", border: "0.1rem solid #ddd", borderRadius: "0.5rem", fontSize: "1.5rem" }} />
          <input type="date" style={{ width: "100%", padding: "1rem", margin: "0.5rem 0", border: "0.1rem solid #ddd", borderRadius: "0.5rem", fontSize: "1.5rem" }} />
          <button style={{ width: "100%", padding: "1rem", marginTop: "1rem", background: "#16a085", color: "#fff", border: "none", borderRadius: "0.5rem", fontSize: "1.7rem", cursor: "pointer" }}>{t("احجز الآن", "book now")}</button>
        </div>
      </section>

      {/* Reviews */}
      <section className="review" id="review" style={{ padding: "2rem 9%" }}>
        <h1 className="heading" style={{ textAlign: "center", fontSize: "4rem", color: "#444", marginBottom: "3rem" }}>
          <span style={{ color: "#16a085" }}>{t("آراء", "our")}</span> {t("المرضى", "reviews")}
        </h1>
        <div className="box-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(30rem, 1fr))", gap: "2rem" }}>
          {[
            { img: "/clinic/pic-1.png", name: t("محمد العمري", "John Deo"), text: t("خدمة ممتازة وفريق طبي محترف. أنصح الجميع بزيارة العيادة.", "Excellent service and professional medical team.") },
            { img: "/clinic/pic-2.png", name: t("سارة الدوسري", "Sarah Doe"), text: t("عيادة نظيفة ومرتبة والأطباء على مستوى عالٍ من الاحترافية.", "Clean clinic with highly professional doctors.") },
            { img: "/clinic/pic-3.png", name: t("عبدالله الشهري", "Abdullah Doe"), text: t("حجزت موعد بسهولة وكانت المعاملة راقية من الجميع.", "Booked easily and everyone was very professional.") },
          ].map((r, i) => (
            <div key={i} className="box" style={{ background: "#fff", borderRadius: "0.5rem", padding: "2rem", boxShadow: "0.5rem 0.5rem 0 rgba(22,160,133,.2)", textAlign: "center" }}>
              <img src={r.img} alt={r.name} style={{ width: "8rem", height: "8rem", borderRadius: "50%", objectFit: "cover", margin: "0 auto 1rem" }} />
              <h3 style={{ fontSize: "2rem", color: "#444", marginBottom: "0.5rem" }}>{r.name}</h3>
              <div style={{ color: "#f39c12", fontSize: "1.5rem", marginBottom: "0.5rem" }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontSize: "1.4rem", color: "#777", lineHeight: 1.5 }}>"{r.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blogs */}
      <section className="blogs" id="blogs" style={{ padding: "2rem 9%", background: "#f5f5f5" }}>
        <h1 className="heading" style={{ textAlign: "center", fontSize: "4rem", color: "#444", marginBottom: "3rem" }}>
          <span style={{ color: "#16a085" }}>{t("مدونتنا", "our")}</span> {t("المقالات", "blogs")}
        </h1>
        <div className="box-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(30rem, 1fr))", gap: "2rem" }}>
          {[
            { img: "/clinic/blog-1.jpg", title: t("10 نصائح لتحسين صحتك", "10 tips for better health"), date: t("مايو 2026", "May 2026"), by: t("د. خالد الحربي", "Dr. Khalid") },
            { img: "/clinic/blog-2.jpg", title: t("أهمية الفحص الدوري", "Importance of regular checkup"), date: t("مايو 2026", "May 2026"), by: t("د. أحمد العتيبي", "Dr. Ahmed") },
            { img: "/clinic/blog-3.jpg", title: t("كيف تحافظ على قلبك", "How to keep your heart healthy"), date: t("مايو 2026", "May 2026"), by: t("د. سارة الدوسري", "Dr. Sarah") },
          ].map((b, i) => (
            <div key={i} className="box" style={{ background: "#fff", borderRadius: "0.5rem", overflow: "hidden", boxShadow: "0.5rem 0.5rem 0 rgba(22,160,133,.2)" }}>
              <img src={b.img} alt={b.title} style={{ width: "100%", height: "20rem", objectFit: "cover" }} />
              <div style={{ padding: "1.5rem" }}>
                <div style={{ fontSize: "1.3rem", color: "#16a085", marginBottom: "0.5rem" }}>📅 {b.date} | ✍️ {b.by}</div>
                <h3 style={{ fontSize: "1.8rem", color: "#444", marginBottom: "0.5rem" }}>{b.title}</h3>
                <a href="#" style={{ color: "#16a085", fontSize: "1.4rem", textDecoration: "none" }}>{t("اقرأ المزيد", "read more")} →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact / Footer */}
      <section className="footer" id="contact" style={{ background: "#1a1a2e", color: "#fff", padding: "3rem 9%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(25rem, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
          <div>
            <h3 style={{ fontSize: "2rem", color: "#16a085", marginBottom: "1rem" }}>{t("عيادة خالد", "Khalid Clinic")}</h3>
            <p style={{ fontSize: "1.4rem", color: "#aaa", lineHeight: 1.8 }}>{t("رعاية صحية متكاملة بأحدث التقنيات وفريق طبي متخصص.",
              "Comprehensive healthcare with modern technology and specialized team.")}</p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <a href="https://github.com/5halid-707" target="_blank" style={{ color: "#16a085", fontSize: "2rem" }}>GitHub</a>
              <a href="https://www.linkedin.com/in/khalid-alharbi-8953a4b3" target="_blank" style={{ color: "#16a085", fontSize: "2rem" }}>LinkedIn</a>
              <a href="https://wa.me/966575015019" target="_blank" style={{ color: "#16a085", fontSize: "2rem" }}>WhatsApp</a>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: "2rem", color: "#16a085", marginBottom: "1rem" }}>{t("روابط سريعة", "quick links")}</h3>
            <a href="#home" style={{ display: "block", color: "#aaa", fontSize: "1.4rem", marginBottom: "0.5rem", textDecoration: "none" }}>{t("الرئيسية", "home")}</a>
            <a href="#services" style={{ display: "block", color: "#aaa", fontSize: "1.4rem", marginBottom: "0.5rem", textDecoration: "none" }}>{t("الخدمات", "services")}</a>
            <a href="#about" style={{ display: "block", color: "#aaa", fontSize: "1.4rem", marginBottom: "0.5rem", textDecoration: "none" }}>{t("من نحن", "about")}</a>
            <a href="#doctors" style={{ display: "block", color: "#aaa", fontSize: "1.4rem", marginBottom: "0.5rem", textDecoration: "none" }}>{t("الأطباء", "doctors")}</a>
            <a href="#book" style={{ display: "block", color: "#aaa", fontSize: "1.4rem", marginBottom: "0.5rem", textDecoration: "none" }}>{t("الحجز", "book")}</a>
          </div>
          <div>
            <h3 style={{ fontSize: "2rem", color: "#16a085", marginBottom: "1rem" }}>{t("تواصل معنا", "contact us")}</h3>
            <p style={{ fontSize: "1.4rem", color: "#aaa", marginBottom: "0.5rem" }}>📞 <a href="tel:+966575015019" style={{ color: "#aaa", textDecoration: "none" }} dir="ltr">+966 57 501 5019</a></p>
            <p style={{ fontSize: "1.4rem", color: "#aaa", marginBottom: "0.5rem" }}>📧 <a href="mailto:khalid-alharbi@zohomail.sa" style={{ color: "#aaa", textDecoration: "none" }}>khalid-alharbi@zohomail.sa</a></p>
            <p style={{ fontSize: "1.4rem", color: "#aaa", marginBottom: "0.5rem" }}>📍 {t("المملكة العربية السعودية", "Saudi Arabia")}</p>
            <p style={{ fontSize: "1.4rem", color: "#aaa" }}>🕐 {t("السبت - الخميس: 8ص - 6م", "Sat - Thu: 8AM - 6PM")}</p>
          </div>
        </div>
        <div style={{ borderTop: "0.1rem solid #333", paddingTop: "2rem", textAlign: "center", fontSize: "1.4rem", color: "#aaa" }}>
          <p>© 2026 {t("عيادة خالد", "Khalid Clinic")}. {t("جميع الحقوق محفوظة", "All rights reserved")}.{" | "}
            <a href={SITE_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#16a085", fontWeight: 700, textDecoration: "none" }}>
              {t("تصميم خالد الحربي", "Designed by Khalid Alharbi")}
            </a>
          </p>
        </div>
      </section>

      {/* WhatsApp float */}
      <a href="https://wa.me/966575015019" target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 1000, width: "5rem", height: "5rem", borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0.5rem 1rem rgba(0,0,0,.3)" }}>
        <svg className="w-7 h-7" fill="white" viewBox="0 0 24 24" style={{ width: "2.5rem", height: "2.5rem" }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}
