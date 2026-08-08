"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Phone, Mail, MapPin, Clock, Stethoscope, Thermometer,
  Eye, Heart, Baby, Activity, Brain, Bone, Pill, Syringe, Tooth,
  Microscope, Flask, ShieldPlus, Ear, Droplet, Cells, Footprints,
  User, Star, ChevronLeft, ChevronRight, Globe, Facebook, Twitter,
  Instagram, Linkedin, Youtube, Send, ArrowUp, ShieldCheck, Award,
  Users, Smile, CheckCircle2, Quote, Play, Calendar, MessageCircle,
  TrendingUp, Scissors, FileText, Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const SITE_URL = "https://khalid-cyber-security.vercel.app/";

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [slide, setSlide] = useState(0);

  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);
  const isRTL = lang === "ar";

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % 3), 5000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    { title1: t("نحن نهتم بك", "We Care About You"), title2: t("رعاية صحية", "Health Care"), desc: t("نقدم أفضل الخدمات الطبية بأحدث الأجهزة وفريق متخصص", "We provide the best medical services with modern equipment") },
    { title1: t("نحن نوفر الأفضل", "We Provide The Best"), title2: t("خدمات", "Services"), desc: t("خدمات طبية متكاملة بأعلى معايير الجودة العالمية", "Comprehensive medical services with highest global standards") },
    { title1: t("صحتك هي", "Your Health Is"), title2: t("أولويتنا", "Our Priority"), desc: t("نحن ملتزمون بتقديم أفضل رعاية لك ولعائلتك", "We are committed to providing the best care for you") },
  ];

  const services = [
    { icon: Brain, title: t("جراحة الأعصاب", "Neuro Surgery"), desc: t("نقدم أحدث تقنيات جراحة المخ والأعصاب بفريق متخصص", "We offer the latest neurosurgery techniques with specialized team") },
    { icon: Tooth, title: t("جراحة الأسنان", "Dental Surgery"), desc: t("علاجات أسنان متكاملة بأسعار مناسبة وأحدث التقنيات", "Comprehensive dental treatments at affordable prices") },
    { icon: Eye, title: t("جراحة العيون", "Cataract Surgery"), desc: t("جراحة الساد والمياه البيضاء بأحدث الأجهزة", "Cataract surgery with latest equipment") },
    { icon: Heart, title: t("جراحة القلب", "Heart Surgery"), desc: t("جراحات القلب المفتوح والقسطرة بأيدي خبراء", "Open heart surgery and catheterization by experts") },
  ];

  const features = [
    { icon: Brain, name: t("الأعصاب", "Neurology") },
    { icon: Bone, name: t("العظام", "Orthopaedics") },
    { icon: Eye, name: t("العيون", "Eyecare") },
    { icon: Flask, name: t("الغدد", "Endocrinology") },
    { icon: ShieldPlus, name: t("المناعة", "Immunology") },
    { icon: Ear, name: t("الأنف والأذن", "Otolaryngology") },
    { icon: Droplet, name: t("أمراض الدم", "Hematology") },
    { icon: Activity, name: t("القلب", "Cardiology") },
    { icon: Tooth, name: t("الأسنان", "Dental Care") },
    { icon: Footprints, name: t("القدم", "Podiatry") },
  ];

  const pricingPlans = [
    { name: t("فحص شامل للجسم", "Full Body Check Up"), price: "95", off: "40%", features: [t("جمع عينات من المنزل", "Home Sample Collection"), t("مظهر", "Appearance"), t("تحليل البول", "Urine Routine"), t("صورة دم كاملة", "Hemogram (CBC)"), t("حمض اليوريك", "Uric Acid"), t("الكوليسترول", "Total Cholestrol")], featured: true },
    { name: t("رعاية الغدة الدرقية", "Thyroid Care"), price: "65", off: "20%", features: [t("جمع عينات من المنزل", "Home Sample Collection"), t("كرات حمراء", "Erythrocyte (RBC)"), t("خلايا أحادية", "Monocyte"), t("حمضات", "Eosinophils"), t("خلايا لمفاوية", "Lymphocytes"), t("كرياتينين", "Creatinine")], featured: false },
    { name: t("فحص الفيتامينات", "Vitamin Checkup"), price: "45", off: "20%", features: [t("جمع عينات من المنزل", "Home Sample Collection"), t("فيتامين C", "Vitamin C"), t("فيتامين D", "Vitamin D"), t("فيتامين D3", "Vitamin D3"), t("فيتامين E", "Vitamin E"), t("فيتامين B12", "Vitamin B12")], featured: false },
    { name: t("رعاية الغدة الدرقية", "Thyroid Care"), price: "200", off: "40%", features: [t("جمع عينات من المنزل", "Home Sample Collection"), t("كرات حمراء", "Erythrocyte (RBC)"), t("خلايا أحادية", "Monocyte"), t("حمضات", "Eosinophils"), t("خلايا لمفاوية", "Lymphocytes"), t("كرياتينين", "Creatinine")], featured: false },
  ];

  const funfacts = [
    { value: 250, label: t("مريض راضٍ", "Satisfied Patients"), icon: Smile },
    { value: 315, label: t("قسم صحي", "Health Section"), icon: Stethoscope },
    { value: 180, label: t("نوع بحث", "Kinds of Research"), icon: Microscope },
    { value: 250, label: t("جائزة فوز", "Awards Winning"), icon: Award },
  ];

  const doctors = [
    { name: t("د. خالد الحربي", "Dr. Khalid Alharbi"), role: t("مدير عام", "General Doctor"), icon: Stethoscope },
    { name: t("د. أحمد العتيبي", "Dr. Ahmed Alotaibi"), role: t("استشاري قلب", "Cardiology"), icon: Heart },
    { name: t("د. سارة الدوسري", "Dr. Sarah Aldosari"), role: t("أسنان", "Dentist"), icon: Tooth },
    { name: t("د. محمد القحطاني", "Dr. Mohammed Alqahtani"), role: t("نساء وولادة", "Gynecology"), icon: Baby },
  ];

  const testimonials = [
    { name: t("ليلى أحمد", "Leela Rogers"), role: t("معالجة", "Therapist"), text: t("خدمة ممتازة وفريق طبي محترف. أنصح الجميع بزيارة العيادة.", "Excellent service and professional medical team.") },
    { name: t("عبدالله سعد", "Allie Grater"), role: t("جراح", "Surgeon"), text: t("عيادة نظيفة ومرتبة والأطباء على مستوى عالٍ من الاحترافية.", "Clean clinic with highly professional doctors.") },
    { name: t("نورة فهد", "Jordi Parker"), role: t("مسؤولة طبية", "Chief Medical Officer"), text: t("حجزت موعد بسهولة وكانت المعاملة راقية من الجميع.", "Booked easily and everyone was very professional.") },
    { name: t("ماجد خالد", "Lincoln Talbot"), role: t("رئيس قسم", "HOD"), text: t("أفضل عيادة زرتها، الرعاية والمتابعة بعد العلاج ممتازة.", "Best clinic I visited, excellent post-treatment care.") },
  ];

  const processes = [
    { icon: Activity, title: t("حالة طارئة", "Emergency Case"), desc: t("استقبال حالات الطوارئ 24/7", "Emergency reception 24/7") },
    { icon: Stethoscope, title: t("غرفة العمليات", "Operation Theatre"), desc: t("غرف عمليات مجهزة بأحدث التقنيات", "Equipped operation rooms") },
    { icon: Droplet, title: t("تحاليل الدم", "Blood Test"), desc: t("مختبر متكامل لجميع التحاليل", "Full lab for all tests") },
    { icon: ShieldCheck, title: t("فحص خارجي", "Outdoor Checkup"), desc: t("فحوصات دورية شاملة", "Comprehensive checkups") },
  ];

  const blogs = [
    { category: t("صحة", "Health"), date: t("مايو 2026", "May 2026"), author: t("د. خالد الحربي", "Dr. Khalid Alharbi"), title: t("10 نصائح لتحسين صحتك بشكل أفضل", "10 Tips for Making a Good Health Even Better"), desc: t("نصائح عملية للحفاظ على صحتك العامة والوقاية من الأمراض.", "Practical tips for maintaining your general health.") },
    { category: t("صحة", "Health"), date: t("مايو 2026", "May 2026"), author: t("د. خالد الحربي", "Dr. Khalid Alharbi"), title: t("ماذا يفعل أفضل خبراء الصحة (وأنت也应该)", "What the Best Health Pros Do"), desc: t("تعرف على أفضل الممارسات الصحية من خبراء متخصصين.", "Learn best health practices from specialists.") },
    { category: t("صحة", "Health"), date: t("مايو 2026", "May 2026"), author: t("د. خالد الحربي", "Dr. Khalid Alharbi"), title: t("11 خطأ شائع في الصحة وكيفية تجنبها", "11 Health Faux Pas to Avoid"), desc: t("أخطاء يومية تؤثر على صحتك وكيفية تجنبها بسهولة.", "Daily mistakes affecting your health and how to avoid them.") },
  ];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen bg-white" style={{ fontFamily: isRTL ? "var(--font-cairo), sans-serif" : "var(--font-sans), sans-serif" }}>
      {/* Top Bar */}
      <div className="bg-[#1e1b4b] text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <a href="tel:+966575015019" className="flex items-center gap-1.5 hover:text-indigo-300"><Phone className="w-3.5 h-3.5" /> +966 57 501 5019</a>
            <a href="mailto:khalid-alharbi@zohomail.sa" className="hidden sm:flex items-center gap-1.5 hover:text-indigo-300"><Mail className="w-3.5 h-3.5" /> khalid-alharbi@zohomail.sa</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {t("08:00 - 18:00", "08:00 to 06:00")}</span>
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="flex items-center gap-1.5 hover:text-indigo-300"><Globe className="w-3.5 h-3.5" /> {lang === "ar" ? "English" : "العربية"}</button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center"><Heart className="w-6 h-6 text-white" /></div>
            <div><h1 className="text-xl font-bold text-indigo-900">{t("عيادة خالد", "Khalid Clinic")}</h1><p className="text-[10px] text-gray-500">{t("رعاية صحية متكاملة", "Comprehensive Healthcare")}</p></div>
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            {[{ href: "#home", l: t("الرئيسية", "Home") }, { href: "#about", l: t("من نحن", "About") }, { href: "#services", l: t("الخدمات", "Services") }, { href: "#features", l: t("المميزات", "Features") }, { href: "#doctors", l: t("الأطباء", "Doctors") }, { href: "#pricing", l: t("الأسعار", "Pricing") }, { href: "#blog", l: t("المدونة", "Blog") }, { href: "#contact", l: t("اتصل بنا", "Contact") }].map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">{item.l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#appointment"><Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-full px-5">{t("احجز موعد", "Make Appointment")}</Button></a>
            <button className="lg:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>
        <AnimatePresence>{mobileMenu && (<motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="lg:hidden overflow-hidden bg-white border-t"><div className="px-4 py-3 space-y-2">{[{ href: "#home", l: t("الرئيسية", "Home") }, { href: "#about", l: t("من نحن", "About") }, { href: "#services", l: t("الخدمات", "Services") }, { href: "#features", l: t("المميزات", "Features") }, { href: "#doctors", l: t("الأطباء", "Doctors") }, { href: "#pricing", l: t("الأسعار", "Pricing") }, { href: "#blog", l: t("المدونة", "Blog") }, { href: "#contact", l: t("اتصل بنا", "Contact") }].map((item) => (<a key={item.href} href={item.href} onClick={() => setMobileMenu(false)} className="block py-2 text-sm font-medium text-gray-700 hover:text-indigo-600">{item.l}</a>))}</div></motion.div>)}</AnimatePresence>
      </header>

      {/* Main Slider */}
      <section id="home" className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"80\" height=\"80\" viewBox=\"0 0 80 80\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23A78BFA\" fill-opacity=\"0.15\"%3E%3Cpath d=\"M40 40c0-13.3 0-26.7 0-40C26.7 0 13.3 0 0 0c0 13.3 0 26.7 0 40c13.3 0 26.7 0 40 0zm0 40c0-13.3 0-26.7 0-40-13.3 0-26.7 0-40 0 0 13.3 0 26.7 0 40 13.3 0 26.7 0 40 0z\"/%3E%3C/g%3E%3C/svg%3E')" }} />
        <div className="max-w-7xl mx-auto px-4 py-20 relative min-h-[500px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div key={slide} initial={{ opacity: 0, x: isRTL ? -50 : 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: isRTL ? 50 : -50 }} transition={{ duration: 0.5 }} className="max-w-2xl">
              <span className="inline-block bg-indigo-500/30 text-indigo-200 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">{slides[slide].title1}</span>
              <h2 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">{slides[slide].title2}</h2>
              <p className="text-indigo-200 mb-8 text-lg max-w-lg">{slides[slide].desc}</p>
              <div className="flex flex-wrap gap-3">
                <a href="#appointment"><Button className="bg-indigo-500 hover:bg-indigo-400 text-white rounded-full px-7 py-3 text-base">{t("ابدأ الآن", "Get Started")}</Button></a>
                <a href="#services"><Button variant="outline" className="border-indigo-400 text-white hover:bg-indigo-500/20 rounded-full px-7 py-3 text-base">{t("اقرأ المزيد", "Read More")}</Button></a>
                <a href="#contact" className="flex items-center gap-2 text-indigo-200 hover:text-white ml-2"><Play className="w-5 h-5" /> {t("فحص مجاني", "Get Free Checkup")}</a>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (<button key={i} onClick={() => setSlide(i)} className={`w-3 h-3 rounded-full transition-all ${i === slide ? "bg-white w-8" : "bg-white/30"}`} />))}
          </div>
        </div>
      </section>

      {/* Info Section - Department icons */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-4">
          {[{ icon: Stethoscope, l: t("فحص", "Checkup") }, { icon: Thermometer, l: t("حرارة", "Thermometer") }, { icon: Eye, l: t("عيون", "Eyedropper") }, { icon: Baby, l: t("أطفال", "Child") }, { icon: Heart, l: t("قلب", "Heartbeat") }, { icon: Activity, l: t("نشاط", "Activity") }].map((d, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors group">
              <d.icon className="w-8 h-8 text-indigo-600 group-hover:scale-110 transition-transform" /><span className="text-xs font-medium text-gray-600">{d.l}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle={t("الخدمات", "Service")} title={t("خدمات متميزة", "Out Standing Service")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-white hover:shadow-xl transition-shadow group cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><s.icon className="w-7 h-7 text-white" /></div>
                    <h3 className="font-bold text-gray-800 mb-2">{s.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">{s.desc}</p>
                    <a href="#appointment" className="text-indigo-600 text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">{t("اقرأ المزيد", "Read More")} <ChevronLeft className="w-3 h-3 rotate-180" /></a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle={t("المميزات", "Feature")} title={t("ما هي مميزاتنا", "What's Our Speciality")} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-gray-100 hover:border-indigo-300 hover:bg-indigo-50 transition-all group">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 transition-colors"><f.icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" /></div>
                <span className="text-sm font-medium text-gray-700 text-center">{f.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section id="appointment" className="py-20 px-4 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-indigo-200 font-semibold text-sm">{t("حجز موعد", "Appointment")}</span>
            <h2 className="text-3xl font-bold mt-2">{t("احجز موعدك الآن", "Book Appointment")}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <a href="tel:+966575015019" className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-colors"><Phone className="w-6 h-6" /><div><div className="text-xs text-indigo-200">{t("اتصل بنا", "Call Us")}</div><div className="font-bold" dir="ltr">+966 57 501 5019</div></div></a>
              <a href="https://wa.me/966575015019" target="_blank" className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-colors"><MessageCircle className="w-6 h-6" /><div><div className="text-xs text-indigo-200">{t("دردشة مباشرة", "Live Chat")}</div><div className="font-bold">{t("واتساب", "WhatsApp")}</div></div></a>
              <p className="text-indigo-200 text-sm">{t("نحن هنا لمساعدتك. تواصل معنا في أي وقت للحصول على استشارة طبية أو حجز موعد.", "We are here to help. Contact us anytime for medical consultation or appointment.")}</p>
            </div>
            <AppointmentForm lang={lang} />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle={t("الأسعار", "Pricing")} title={t("خططنا وأسعارنا", "Our Plan Pricing")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className={`h-full ${p.featured ? "ring-2 ring-indigo-500 shadow-xl" : ""}`}>
                  <CardContent className="p-6 text-center">
                    {p.off && <span className="inline-block bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-3">{t("خصم", "SAVE")} {p.off}</span>}
                    <h3 className="font-bold text-gray-800 mb-1 text-sm">{p.name}</h3>
                    <div className="mb-4"><span className="text-3xl font-extrabold text-indigo-600">${p.price}</span><span className="text-xs text-gray-500">/{t("شهر", "mo")}</span></div>
                    <ul className="space-y-2 text-right mb-4">
                      {p.features.map((f, j) => (<li key={j} className="flex items-center gap-2 text-xs text-gray-600"><CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" /> {f}</li>))}
                    </ul>
                    <Button className={`w-full rounded-full ${p.featured ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}`}>{t("اشترِ الآن", "Buy Now")}</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Funfact Section */}
      <section className="py-16 px-4 bg-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 relative">
          {funfacts.map((f, i) => (<motion.div key={i} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center"><f.icon className="w-10 h-10 mx-auto mb-2 text-indigo-300" /><div className="text-4xl font-extrabold">{f.value}+</div><div className="text-xs text-indigo-200 mt-1">{f.label}</div></motion.div>))}
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle={t("الأطباء", "Doctors")} title={t("أطباؤنا", "Our Doctors")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doc, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-white hover:shadow-xl transition-shadow text-center group overflow-hidden">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 py-8"><doc.icon className="w-20 h-20 text-white mx-auto group-hover:scale-110 transition-transform" /></div>
                  <CardContent className="p-5">
                    <h3 className="font-bold text-gray-800">{doc.name}</h3>
                    <p className="text-xs text-indigo-600 font-medium mt-1">{doc.role}</p>
                    <div className="flex justify-center gap-0.5 mt-2">{[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}</div>
                    <div className="mt-3 text-xs text-gray-500">{t("50+ استشارة", "50+ Consultation Done")}</div>
                    <a href="#appointment" className="text-indigo-600 text-xs font-semibold mt-3 inline-block hover:underline">{t("اقرأ المزيد", "Read More")}</a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
          <div><h2 className="text-2xl font-bold mb-1">{t("تحتاج مساعدة طارئة؟", "Need An Emergency Help?")}</h2><p className="text-white/80 text-sm">{t("نحن نهتم بصحتك!", "We Care About Your Health!")}</p></div>
          <div className="flex flex-col sm:flex-row gap-3 items-center"><a href="tel:+966575015019" className="text-2xl font-bold" dir="ltr">+966 57 501 5019</a><a href="#appointment"><Button className="bg-white text-rose-600 hover:bg-rose-50 rounded-full px-6 font-bold">{t("احجز موعد", "Make Appointment")}</Button></a></div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle={t("آراء المرضى", "Testimonial")} title={t("آراء مرضانا", "Our Testimonial")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((rev, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-white h-full"><CardContent className="p-6">
                  <Quote className="w-8 h-8 text-indigo-200 mb-3" />
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{rev.text}</p>
                  <div className="flex items-center gap-2"><div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">{rev.name.charAt(0)}</div><div><div className="text-sm font-semibold text-gray-800">{rev.name}</div><div className="text-[10px] text-indigo-600">{rev.role}</div></div></div>
                </CardContent></Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle={t("العملية", "Process")} title={t("طريقة عملنا", "Our Work Process")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processes.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-indigo-100" />
                  <div className="absolute inset-0 flex items-center justify-center"><p.icon className="w-8 h-8 text-indigo-600" /></div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-1 text-sm">{p.title}</h3>
                <p className="text-xs text-gray-500">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle={t("المدونة", "Blog")} title={t("مدونتنا", "Our Blog")} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-white hover:shadow-xl transition-shadow group overflow-hidden h-full">
                  <div className="aspect-video bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center"><FileText className="w-12 h-12 text-white/50" /></div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2"><span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-medium">{b.category}</span><span>{b.date}</span></div>
                    <h3 className="font-bold text-gray-800 mb-2 text-sm group-hover:text-indigo-600 transition-colors">{b.title}</h3>
                    <p className="text-xs text-gray-500 mb-3 leading-relaxed">{b.desc}</p>
                    <div className="flex items-center justify-between"><span className="text-xs text-gray-400">{b.author}</span><a href="#" className="text-indigo-600 text-xs font-semibold">{t("اقرأ المزيد", "Read More")} →</a></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <SectionTitle align="start" subtitle={t("تواصل معنا", "Contact")} title={t("نحن هنا لخدمتك", "We Are Here to Serve You")} />
            <div className="space-y-4 mt-6">
              {[{ icon: Phone, label: t("الهاتف", "Phone"), value: "+966 57 501 5019", href: "tel:+966575015019", dir: "ltr" }, { icon: Mail, label: t("البريد", "Email"), value: "khalid-alharbi@zohomail.sa", href: "mailto:khalid-alharbi@zohomail.sa", dir: "ltr" }, { icon: MapPin, label: t("العنوان", "Address"), value: t("المملكة العربية السعودية", "Saudi Arabia"), href: "#", dir: isRTL ? "rtl" : "ltr" }, { icon: Clock, label: t("ساعات العمل", "Working Hours"), value: t("السبت - الخميس: 8ص - 6م", "Sat - Thu: 8AM - 6PM"), href: "#", dir: isRTL ? "rtl" : "ltr" }].map((c, i) => (
                <a key={i} href={c.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0"><c.icon className="w-5 h-5 text-indigo-600" /></div>
                  <div><div className="text-xs text-gray-400">{c.label}</div><div className="text-sm font-semibold text-gray-800" dir={c.dir}>{c.value}</div></div>
                </a>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              {[{ icon: Facebook, href: "https://github.com/5halid-707" }, { icon: Twitter, href: "https://www.linkedin.com/in/khalid-alharbi-8953a4b3" }, { icon: Instagram, href: "https://github.com/5halid-707" }, { icon: Linkedin, href: "https://www.linkedin.com/in/khalid-alharbi-8953a4b3" }, { icon: Youtube, href: SITE_URL }].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-600 hover:text-white flex items-center justify-center text-gray-600 transition-colors"><s.icon className="w-4 h-4" /></a>
              ))}
            </div>
          </div>
          <Card className="bg-gray-50"><CardContent className="p-6"><h3 className="font-bold text-gray-800 mb-4">{t("أرسل رسالة", "Send a Message")}</h3><ContactForm lang={lang} /></CardContent></Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3"><div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center"><Heart className="w-5 h-5 text-white" /></div><span className="text-white font-bold text-lg">{t("عيادة خالد", "Khalid Clinic")}</span></div>
              <p className="text-sm">{t("رعاية صحية متكاملة بأحدث التقنيات وفريق طبي متخصص.", "Comprehensive healthcare with modern technology and specialized team.")}</p>
              <div className="flex gap-2 mt-4">{[{ icon: Facebook, href: "https://github.com/5halid-707" }, { icon: Twitter, href: "https://www.linkedin.com/in/khalid-alharbi-8953a4b3" }, { icon: Instagram, href: "https://github.com/5halid-707" }, { icon: Linkedin, href: "https://www.linkedin.com/in/khalid-alharbi-8953a4b3" }].map((s, i) => (<a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-colors"><s.icon className="w-3.5 h-3.5 text-white" /></a>))}</div>
            </div>
            <div><h4 className="text-white font-bold mb-3">{t("روابط سريعة", "Quick Links")}</h4><ul className="space-y-1.5 text-sm">{[{ href: "#home", l: t("الرئيسية", "Home") }, { href: "#about", l: t("من نحن", "About") }, { href: "#services", l: t("الخدمات", "Services") }, { href: "#doctors", l: t("الأطباء", "Doctors") }, { href: "#pricing", l: t("الأسعار", "Pricing") }, { href: "#blog", l: t("المدونة", "Blog") }].map(item => (<li key={item.href}><a href={item.href} className="hover:text-indigo-400">{item.l}</a></li>))}</ul></div>
            <div><h4 className="text-white font-bold mb-3">{t("خدماتنا", "Our Services")}</h4><ul className="space-y-1.5 text-sm">{[t("جراحة الأعصاب", "Neuro Surgery"), t("جراحة الأسنان", "Dental Surgery"), t("جراحة العيون", "Cataract Surgery"), t("جراحة القلب", "Heart Surgery"), t("فحص شامل", "Full Body Check"), t("فيتامينات", "Vitamin Checkup")].map((s, i) => (<li key={i}><a href="#services" className="hover:text-indigo-400">{s}</a></li>))}</ul></div>
            <div><h4 className="text-white font-bold mb-3">{t("تواصل معنا", "Contact")}</h4><div className="space-y-2 text-sm"><a href="tel:+966575015019" className="flex items-center gap-2 hover:text-indigo-400"><Phone className="w-4 h-4" /> <span dir="ltr">+966 57 501 5019</span></a><a href="mailto:khalid-alharbi@zohomail.sa" className="flex items-center gap-2 hover:text-indigo-400"><Mail className="w-4 h-4" /> khalid-alharbi@zohomail.sa</a><a href="https://github.com/5halid-707" target="_blank" className="flex items-center gap-2 hover:text-indigo-400"><User className="w-4 h-4" /> GitHub: 5halid-707</a><a href="https://www.linkedin.com/in/khalid-alharbi-8953a4b3" target="_blank" className="flex items-center gap-2 hover:text-indigo-400"><Linkedin className="w-4 h-4" /> LinkedIn</a></div></div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-xs">
            <p>© 2026 {t("عيادة خالد", "Khalid Clinic")}. {t("جميع الحقوق محفوظة", "All rights reserved")}.{" | "}<a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 font-semibold">{t("تصميم خالد الحربي", "Designed by Khalid Alharbi")}</a></p>
          </div>
        </div>
      </footer>

      {showScrollTop && (<button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors"><ArrowUp className="w-5 h-5" /></button>)}
      <a href="https://wa.me/966575015019" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"><svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
    </div>
  );
}

function SectionTitle({ subtitle, title, align = "center" }: { subtitle: string; title: string; align?: "center" | "start" }) {
  return (
    <div className={`mb-10 ${align === "center" ? "text-center" : ""}`}>
      <span className="text-indigo-600 font-semibold text-sm">{subtitle}</span>
      <h2 className="text-3xl font-bold text-gray-800 mt-2">{title}</h2>
      <div className={`w-16 h-1 bg-indigo-600 rounded-full mt-3 ${align === "center" ? "mx-auto" : ""}`} />
    </div>
  );
}

function AppointmentForm({ lang }: { lang: "ar" | "en" }) {
  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);
  const [form, setForm] = useState({ name: "", phone: "", email: "", department: "", date: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const submit = async (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); await new Promise(r => setTimeout(r, 1500)); toast.success(t("تم حجز موعدك! سنتواصل معك قريباً.", "Appointment booked! We will contact you soon.")); setForm({ name: "", phone: "", email: "", department: "", date: "", message: "" }); setSubmitting(false); };
  return (
    <form onSubmit={submit} className="bg-white/10 backdrop-blur rounded-2xl p-6 space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label className="text-white text-xs mb-1">{t("الاسم", "Name")}</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="bg-white/20 border-white/30 text-white placeholder:text-white/50" placeholder={t("الاسم الكامل", "Full name")} /></div>
        <div><Label className="text-white text-xs mb-1">{t("الهاتف", "Phone")}</Label><Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required className="bg-white/20 border-white/30 text-white placeholder:text-white/50" placeholder="05xxxxxxxx" dir="ltr" /></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label className="text-white text-xs mb-1">{t("البريد", "Email")}</Label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="bg-white/20 border-white/30 text-white placeholder:text-white/50" placeholder="email@example.com" dir="ltr" /></div>
        <div><Label className="text-white text-xs mb-1">{t("التاريخ", "Date")}</Label><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required className="bg-white/20 border-white/30 text-white" /></div>
      </div>
      <div><Label className="text-white text-xs mb-1">{t("القسم", "Department")}</Label><select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className="w-full bg-white/20 border border-white/30 text-white rounded-md px-3 py-2 text-sm"><option value="" className="text-gray-800">{t("اختر القسم", "Select department")}</option><option value="neuro" className="text-gray-800">{t("الأعصاب", "Neurology")}</option><option value="dental" className="text-gray-800">{t("الأسنان", "Dental")}</option><option value="eye" className="text-gray-800">{t("العيون", "Ophthalmology")}</option><option value="heart" className="text-gray-800">{t("القلب", "Cardiology")}</option></select></div>
      <Button type="submit" disabled={submitting} className="w-full bg-white text-indigo-700 hover:bg-indigo-50 font-bold rounded-full">{submitting ? t("جارٍ الحجز...", "Booking...") : t("تأكيد الحجز", "Confirm Booking")}</Button>
    </form>
  );
}

function ContactForm({ lang }: { lang: "ar" | "en" }) {
  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const submit = async (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); await new Promise(r => setTimeout(r, 1000)); toast.success(t("تم إرسال رسالتك!", "Message sent!")); setForm({ name: "", email: "", message: "" }); setSubmitting(false); };
  return (
    <form onSubmit={submit} className="space-y-3">
      <div><Label className="text-xs">{t("الاسم", "Name")}</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="bg-white" placeholder={t("الاسم", "Name")} /></div>
      <div><Label className="text-xs">{t("البريد", "Email")}</Label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="bg-white" placeholder="email@example.com" dir="ltr" /></div>
      <div><Label className="text-xs">{t("الرسالة", "Message")}</Label><Textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required className="bg-white" rows={3} placeholder={t("اكتب رسالتك...", "Write your message...")} /></div>
      <Button type="submit" disabled={submitting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">{submitting ? t("جارٍ الإرسال...", "Sending...") : <><Send className="w-4 h-4 ml-2" /> {t("إرسال", "Send")}</>}</Button>
    </form>
  );
}
