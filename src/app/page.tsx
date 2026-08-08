"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, Menu, X, Globe, ChevronDown,
  Calendar, MessageCircle, Send, Star, CheckCircle2, ArrowUp,
  Sparkles, Activity, Bone, Heart, Stethoscope, Award, Users,
  Smile, TrendingUp, ShieldCheck, Play, User, FileText,
  Microscope, Baby, Eye, Brain, Syringe, Ambulance,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const GOLD = "#c9a55a";
const GOLD_LIGHT = "#e6c885";
const DARK = "#1a1410";
const DARK_SOFT = "#2a2218";
const CREAM = "#faf6f0";

// ============ Translations ============
const T = {
  ar: {
    dir: "rtl",
    nav: { home: "الرئيسية", about: "من نحن", services: "خدماتنا", doctors: "الأطباء", booking: "احجز موعدك", contact: "تواصل معنا" },
    hero: {
      tag: "عيادة خالد الطبية",
      title1: "رعاية صحية",
      title2: "بمعايير عالمية",
      desc: "نقدم خدمات طبية متكاملة بأحدث التقنيات وفريق من أمهر الأطباء الاستشاريين لنمنحك تجربة علاجية مريحة وآمنة",
      cta1: "احجز موعدك الآن",
      cta2: "تعرف على خدماتنا",
      stats: [
        { v: "+25", l: "سنة خبرة" },
        { v: "+50", l: "استشاري متخصص" },
        { v: "+100K", l: "حالة شفاء" },
        { v: "24/7", l: "خدمة طوارئ" },
      ],
    },
    about: {
      tag: "من نحن",
      title: "نحن أكثر من مجرد عيادة طبية",
      p1: "تأسست عيادة خالد الطبية عام 1998 لتكون منصة طبية متكاملة تجمع بين الخبرة الطبية العميقة والتقنيات التشخيصية الحديثة. نؤمن أن كل مريض يستحق رعاية مخصصة تناسب حالته الصحية الفريدة.",
      p2: "فريقنا يضم نخبة من الاستشاريين والأخصائيين الحاصلين على شهادات عالمية من أرقى الجامعات الطبية في أوروبا وأمريكا، مع التزام كامل بأعلى معايير الجودة والسلامة المعتمدة دولياً.",
      features: [
        { t: "أطباء استشاريون", d: "نخبة من أمهر الاستشاريين بخبرات دولية" },
        { t: "تقنيات حديثة", d: "أحدث الأجهزة الطبية والتشخيصية" },
        { t: "رعاية مخصصة", d: "خطة علاج مصممة خصيصاً لكل حالة" },
        { t: "بيئة آمنة", d: "معقمات ومعايير تعقيم صارمة" },
      ],
    },
    services: {
      tag: "خدماتنا",
      title: "خدمات طبية متكاملة",
      desc: "نقدم باقة شاملة من الخدمات الطبية المتخصصة تحت سقف واحد",
      items: [
        { icon: Heart, t: "أمراض القلب", d: "تشخيص وعلاج جميع أمراض القلب والأوعية الدموية باستخدام أحدث التقنيات", img: "cardio" },
        { icon: Bone, t: "العظام والمفاصل", d: "علاج إصابات العظام والمفاصل والعمليات الجراحية المتقدمة", img: "ortho" },
        { icon: Smile, t: "طب الأسنان", d: "خدمات طب وتجميل الأسنان بالتقنيات الرقمية الحديثة", img: "dental" },
        { icon: Eye, t: "العيون", d: "فحوصات وعلاجات أمراض العيون وعمليات الليزك", img: "eye" },
        { icon: Baby, t: "الأطفال", d: "رعاية صحية شاملة للأطفال وحديثي الولادة", img: "pediatric" },
        { icon: Brain, t: "الأعصاب", d: "تشخيص وعلاج اضطرابات الجهاز العصبي والعمود الفقري", img: "neuro" },
        { icon: Microscope, t: "المختبرات", d: "تحاليل طبية دقيقة بنتائج سريعة وموثوقة", img: "lab" },
        { icon: Syringe, t: "الجلدية", d: "علاج الأمراض الجلدية والتجميل غير الجراحي", img: "derma" },
      ],
    },
    doctors: {
      tag: "فريقنا الطبي",
      title: "نخبة من الاستشاريين",
      desc: "أطباء حاصلون على شهادات عالمية بخبرات تمتد لعقود",
      items: [
        { name: "د. أحمد المالكي", spec: "استشاري أمراض القلب", exp: "+20 سنة خبرة", img: "doc1" },
        { name: "د. سارة العتيبي", spec: "استشارية طب الأسنان", exp: "+15 سنة خبرة", img: "doc2" },
        { name: "د. خالد الشهري", spec: "استشاري جراحة العظام", exp: "+18 سنة خبرة", img: "doc3" },
        { name: "د. نورة القحطاني", spec: "استشارية الأطفال", exp: "+12 سنة خبرة", img: "doc4" },
      ],
    },
    booking: {
      tag: "احجز موعدك",
      title: "احجز موعدك الآن",
      desc: "املأ النموذج وسيتواصل معك فريقنا خلال 24 ساعة",
      name: "الاسم الكامل",
      namePh: "أدخل اسمك",
      phone: "رقم الجوال",
      phonePh: "05xxxxxxxx",
      email: "البريد الإلكتروني",
      emailPh: "example@email.com",
      service: "الخدمة المطلوبة",
      date: "التاريخ المفضل",
      time: "الوقت المفضل",
      notes: "ملاحظات إضافية",
      notesPh: "اكتب أي ملاحظات تود إضافتها",
      submit: "تأكيد الحجز",
      success: "تم استلام طلبك! سنتواصل معك قريباً",
    },
    testimonials: {
      tag: "آراء مرضانا",
      title: "ماذا يقول مرضانا",
      items: [
        { name: "محمد العمري", role: "مريض", text: "تجربة رائعة من البداية للنهاية. الطاقم الطبي محترف والتعامل راقٍ جداً. أنصح الجميع بالعيادة." },
        { name: "فاطمة الزهراني", role: "مريضة", text: "أحدث الأجهزة ونظافة فائقة. الدكتور شرح لي حالتي بالتفصيل وأعطاني خيارات علاج متعددة." },
        { name: "عبدالله الحربي", role: "مريض", text: "حجزت موعد عبر الموقع وكانت العملية سهلة جداً. الموعد كان دقيقاً ولم أنتظر طويلاً." },
      ],
    },
    contact: {
      tag: "تواصل معنا",
      title: "نحن هنا لخدمتك",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      address: "العنوان",
      addressV: "حي العليا، شارع الملك فهد، الرياض",
      hours: "ساعات العمل",
      hoursV: "السبت - الخميس: 9 ص - 11 م | الجمعة: 4 م - 11 م",
    },
    footer: { rights: "جميع الحقوق محفوظة", quick: "روابط سريعة", services: "خدماتنا", contact: "تواصل معنا" },
  },
  en: {
    dir: "ltr",
    nav: { home: "Home", about: "About", services: "Services", doctors: "Doctors", booking: "Book Now", contact: "Contact" },
    hero: {
      tag: "Khalid Medical Clinic",
      title1: "Healthcare",
      title2: "World-Class Standards",
      desc: "We provide comprehensive medical services with cutting-edge technology and a team of expert consultants for a comfortable, safe healing experience",
      cta1: "Book Appointment",
      cta2: "Our Services",
      stats: [
        { v: "+25", l: "Years Experience" },
        { v: "+50", l: "Specialist Doctors" },
        { v: "+100K", l: "Recovered Cases" },
        { v: "24/7", l: "Emergency Service" },
      ],
    },
    about: {
      tag: "About Us",
      title: "We Are More Than Just a Medical Clinic",
      p1: "Established in 1998, Khalid Medical Clinic is an integrated medical platform combining deep medical expertise with modern diagnostic technology. We believe every patient deserves personalized care tailored to their unique health condition.",
      p2: "Our team includes elite consultants and specialists holding international degrees from top medical universities in Europe and America, with full commitment to the highest internationally accredited quality and safety standards.",
      features: [
        { t: "Consultant Doctors", d: "Elite consultants with international expertise" },
        { t: "Modern Technology", d: "Latest medical and diagnostic equipment" },
        { t: "Personalized Care", d: "Treatment plan designed for each case" },
        { t: "Safe Environment", d: "Strict sterilization standards" },
      ],
    },
    services: {
      tag: "Our Services",
      title: "Comprehensive Medical Services",
      desc: "A full range of specialized medical services under one roof",
      items: [
        { icon: Heart, t: "Cardiology", d: "Diagnosis and treatment of all heart and vascular diseases using the latest technology", img: "cardio" },
        { icon: Bone, t: "Orthopedics", d: "Treatment of bone and joint injuries and advanced surgical operations", img: "ortho" },
        { icon: Smile, t: "Dentistry", d: "Dental and cosmetic services with modern digital technology", img: "dental" },
        { icon: Eye, t: "Ophthalmology", d: "Eye disease examinations, treatments and LASIK operations", img: "eye" },
        { icon: Baby, t: "Pediatrics", d: "Comprehensive healthcare for children and newborns", img: "pediatric" },
        { icon: Brain, t: "Neurology", d: "Diagnosis and treatment of nervous system and spine disorders", img: "neuro" },
        { icon: Microscope, t: "Laboratory", d: "Accurate medical tests with fast and reliable results", img: "lab" },
        { icon: Syringe, t: "Dermatology", d: "Treatment of skin diseases and non-surgical cosmetics", img: "derma" },
      ],
    },
    doctors: {
      tag: "Our Team",
      title: "Elite Consultants",
      desc: "Doctors with international degrees and decades of experience",
      items: [
        { name: "Dr. Ahmed Al-Maliki", spec: "Cardiology Consultant", exp: "+20 years", img: "doc1" },
        { name: "Dr. Sarah Al-Otaibi", spec: "Dental Consultant", exp: "+15 years", img: "doc2" },
        { name: "Dr. Khalid Al-Shehri", spec: "Orthopedic Surgeon", exp: "+18 years", img: "doc3" },
        { name: "Dr. Noura Al-Qahtani", spec: "Pediatric Consultant", exp: "+12 years", img: "doc4" },
      ],
    },
    booking: {
      tag: "Book Now",
      title: "Book Your Appointment",
      desc: "Fill the form and our team will contact you within 24 hours",
      name: "Full Name",
      namePh: "Enter your name",
      phone: "Phone Number",
      phonePh: "05xxxxxxxx",
      email: "Email Address",
      emailPh: "example@email.com",
      service: "Required Service",
      date: "Preferred Date",
      time: "Preferred Time",
      notes: "Additional Notes",
      notesPh: "Write any notes you want to add",
      submit: "Confirm Booking",
      success: "Request received! We'll contact you soon",
    },
    testimonials: {
      tag: "Patient Reviews",
      title: "What Our Patients Say",
      items: [
        { name: "Mohammed Al-Amri", role: "Patient", text: "Wonderful experience from start to finish. The medical staff is professional and very courteous. I recommend the clinic to everyone." },
        { name: "Fatima Al-Zahrani", role: "Patient", text: "Latest equipment and excellent hygiene. The doctor explained my condition in detail and gave me multiple treatment options." },
        { name: "Abdullah Al-Harbi", role: "Patient", text: "I booked an appointment through the website and the process was very easy. The appointment was on time and I didn't wait long." },
      ],
    },
    contact: {
      tag: "Contact Us",
      title: "We're Here To Serve You",
      phone: "Phone",
      email: "Email",
      address: "Address",
      addressV: "Al-Olaya District, King Fahd Road, Riyadh",
      hours: "Working Hours",
      hoursV: "Sat - Thu: 9 AM - 11 PM | Fri: 4 PM - 11 PM",
    },
    footer: { rights: "All Rights Reserved", quick: "Quick Links", services: "Services", contact: "Contact" },
  },
};

// ============ Image URLs (Unsplash) ============
const IMG = {
  hero: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&q=80",
  hero2: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=1600&q=80",
  about: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80",
  about2: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80",
  cardio: "https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0?w=800&q=80",
  ortho: "https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0?w=800&q=80",
  dental: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
  eye: "https://images.unsplash.com/photo-1579165466949-3180a3d056d5?w=800&q=80",
  pediatric: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80",
  neuro: "https://images.unsplash.com/photo-1559757175-08f51794ccc3?w=800&q=80",
  lab: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&q=80",
  derma: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
  doc1: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
  doc2: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
  doc3: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80",
  doc4: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80",
  cta: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1600&q=80",
};

// ============ Reveal animation ============
function Reveal({ children, delay = 0, y = 40, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [showWA, setShowWA] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", date: "", time: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const t = T[lang];
  const isAR = lang === "ar";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowScroll(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setHeroSlide((p) => (p + 1) % 2), 6000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service || !form.date) {
      toast.error(isAR ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    toast.success(t.booking.success);
    setForm({ name: "", phone: "", email: "", service: "", date: "", time: "", notes: "" });
  };

  const navLinks = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "services", label: t.nav.services },
    { id: "doctors", label: t.nav.doctors },
    { id: "booking", label: t.nav.booking },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#faf6f0]" dir={t.dir}>
      {/* ===== Top Bar ===== */}
      <div className="bg-[#1a1410] text-[#c9a55a] text-xs md:text-sm py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+966575015019" className="flex items-center gap-2 hover:text-[#e6c885] transition">
              <Phone className="w-3.5 h-3.5" /> +966 57 501 5019
            </a>
            <a href="mailto:khalid-alharbi@zohomail.sa" className="flex items-center gap-2 hover:text-[#e6c885] transition">
              <Mail className="w-3.5 h-3.5" /> khalid-alharbi@zohomail.sa
            </a>
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" /> {isAR ? "سبت - خميس: 9ص - 11م" : "Sat - Thu: 9AM - 11PM"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="flex items-center gap-1.5 hover:text-[#e6c885] transition">
              <Globe className="w-3.5 h-3.5" /> {lang === "ar" ? "English" : "العربية"}
            </button>
          </div>
        </div>
      </div>

      {/* ===== Navbar ===== */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-3" : "bg-white py-5"}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a55a] to-[#8a6d2e] flex items-center justify-center shadow-lg group-hover:scale-105 transition">
              <Stethoscope className="w-7 h-7 text-white" />
            </div>
            <div className="text-right">
              <div className={`font-bold text-[#1a1410] leading-tight ${isAR ? "text-xl" : "text-lg"}`}>{isAR ? "عيادة خالد" : "Khalid Clinic"}</div>
              <div className="text-[10px] text-[#c9a55a] tracking-widest uppercase">{isAR ? "للرعاية الطبية" : "Medical Care"}</div>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="relative px-4 py-2 text-[#1a1410] hover:text-[#c9a55a] font-medium text-sm transition group"
              >
                {l.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#c9a55a] group-hover:w-3/4 transition-all duration-300" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => scrollTo("booking")} className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#c9a55a] to-[#a8853a] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-xl hover:shadow-[#c9a55a]/30 transition-all hover:-translate-y-0.5">
              <Calendar className="w-4 h-4" /> {t.nav.booking}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-[#1a1410]">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className="text-right py-3 px-4 rounded-lg hover:bg-[#faf6f0] text-[#1a1410] hover:text-[#c9a55a] font-medium transition"
                  >
                    {l.label}
                  </button>
                ))}
                <button
                  onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                  className="text-right py-3 px-4 rounded-lg hover:bg-[#faf6f0] text-[#1a1410] font-medium flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" /> {lang === "ar" ? "English" : "العربية"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ===== Hero ===== */}
      <section id="home" className="relative min-h-[92vh] overflow-hidden bg-[#1a1410]">
        {/* Background images */}
        <div className="absolute inset-0">
          {[IMG.hero, IMG.hero2].map((src, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: heroSlide === i ? 1 : 0 }}
              transition={{ duration: 1.5 }}
            >
              <img src={src} alt="Clinic" className="w-full h-full object-cover" />
            </motion.div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1410] via-[#1a1410]/85 to-[#1a1410]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410] via-transparent to-transparent" />
        </div>

        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#c9a55a]/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#c9a55a]/5 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 min-h-[92vh] flex items-center py-20">
          <div className={`max-w-2xl ${isAR ? "text-right" : "text-left"}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-[#c9a55a]/15 border border-[#c9a55a]/40 text-[#e6c885] px-5 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4" /> {t.hero.tag}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 ${isAR ? "" : ""}`}
            >
              {t.hero.title1}
              <br />
              <span className="bg-gradient-to-r from-[#c9a55a] via-[#e6c885] to-[#c9a55a] bg-clip-text text-transparent">
                {t.hero.title2}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-xl"
            >
              {t.hero.desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <button
                onClick={() => scrollTo("booking")}
                className="group bg-gradient-to-r from-[#c9a55a] to-[#a8853a] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl shadow-[#c9a55a]/30 hover:shadow-[#c9a55a]/50 hover:-translate-y-1 transition-all flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" /> {t.hero.cta1}
                <ArrowUp className="w-4 h-4 rotate-45 group-hover:translate-x-1 transition" />
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition flex items-center gap-2"
              >
                <Play className="w-5 h-5" /> {t.hero.cta2}
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10"
            >
              {t.hero.stats.map((s, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#c9a55a] to-[#e6c885] bg-clip-text text-transparent">{s.v}</div>
                  <div className="text-white/60 text-sm mt-1">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1].map((i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              className={`h-1.5 rounded-full transition-all ${heroSlide === i ? "w-10 bg-[#c9a55a]" : "w-4 bg-white/30"}`}
            />
          ))}
        </div>
      </section>

      {/* ===== About ===== */}
      <section id="about" className="py-24 bg-[#faf6f0] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#c9a55a]/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-[#c9a55a]/30 rounded-3xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#c9a55a]/10 rounded-3xl" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img src={IMG.about} alt="Clinic" className="w-full h-[500px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/40 to-transparent" />
                </div>
                <div className="absolute -bottom-8 left-8 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 max-w-xs">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c9a55a] to-[#8a6d2e] flex items-center justify-center">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1a1410]">+25</div>
                    <div className="text-sm text-[#1a1410]/60">{isAR ? "سنة من التميز" : "Years of Excellence"}</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className={`inline-flex items-center gap-2 bg-[#c9a55a]/10 text-[#a8853a] px-4 py-2 rounded-full text-sm font-medium mb-4 ${isAR ? "" : ""}`}>
                <Sparkles className="w-4 h-4" /> {t.about.tag}
              </div>
              <h2 className={`text-4xl md:text-5xl font-bold text-[#1a1410] leading-tight mb-6 ${isAR ? "" : ""}`}>
                {t.about.title}
              </h2>
              <p className="text-[#1a1410]/70 text-lg leading-relaxed mb-4">{t.about.p1}</p>
              <p className="text-[#1a1410]/70 text-lg leading-relaxed mb-8">{t.about.p2}</p>

              <div className="grid sm:grid-cols-2 gap-5">
                {t.about.features.map((f, i) => (
                  <Reveal key={i} delay={0.1 * i} y={20}>
                    <div className="flex items-start gap-3 p-4 rounded-2xl hover:bg-white transition group">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c9a55a]/20 to-[#c9a55a]/5 flex items-center justify-center flex-shrink-0 group-hover:from-[#c9a55a] group-hover:to-[#a8853a] transition">
                        <CheckCircle2 className="w-5 h-5 text-[#a8853a] group-hover:text-white transition" />
                      </div>
                      <div>
                        <div className="font-bold text-[#1a1410] mb-1">{f.t}</div>
                        <div className="text-sm text-[#1a1410]/60">{f.d}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section id="services" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#c9a55a]/10 text-[#a8853a] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" /> {t.services.tag}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1410] mb-4">{t.services.title}</h2>
            <p className="text-[#1a1410]/60 text-lg">{t.services.desc}</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.services.items.map((s, i) => {
              const Icon = s.icon;
              const img = (IMG as any)[s.img];
              return (
                <Reveal key={i} delay={0.05 * i}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group relative bg-[#faf6f0] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow cursor-pointer h-full"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img src={img} alt={s.t} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/80 via-[#1a1410]/20 to-transparent" />
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:bg-[#c9a55a] transition">
                        <Icon className="w-6 h-6 text-[#a8853a] group-hover:text-white transition" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#1a1410] mb-2">{s.t}</h3>
                      <p className="text-[#1a1410]/60 text-sm leading-relaxed mb-4">{s.d}</p>
                      <button onClick={() => scrollTo("booking")} className="text-[#a8853a] text-sm font-semibold flex items-center gap-1 group-hover:gap-3 transition-all">
                        {isAR ? "احجز الآن" : "Book Now"} <ArrowUp className="w-4 h-4 rotate-45" />
                      </button>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.cta} alt="CTA" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1a1410]/85" />
        </div>
        <Reveal className="relative max-w-4xl mx-auto px-4 text-center">
          <ShieldCheck className="w-16 h-16 text-[#c9a55a] mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {isAR ? "صحتك تستحق الأفضل" : "Your Health Deserves the Best"}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {isAR ? "احجز موعدك اليوم واحصل على استشارة طبية متخصصة مع نخبة من أمهر الأطباء" : "Book your appointment today for specialized medical consultation with elite doctors"}
          </p>
          <button
            onClick={() => scrollTo("booking")}
            className="bg-gradient-to-r from-[#c9a55a] to-[#a8853a] text-white px-10 py-4 rounded-full font-semibold text-lg shadow-2xl shadow-[#c9a55a]/30 hover:shadow-[#c9a55a]/50 hover:-translate-y-1 transition-all inline-flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" /> {t.booking.cta1 || t.nav.booking}
          </button>
        </Reveal>
      </section>

      {/* ===== Doctors ===== */}
      <section id="doctors" className="py-24 bg-[#faf6f0]">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#c9a55a]/10 text-[#a8853a] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" /> {t.doctors.tag}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1410] mb-4">{t.doctors.title}</h2>
            <p className="text-[#1a1410]/60 text-lg">{t.doctors.desc}</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.doctors.items.map((d, i) => {
              const img = (IMG as any)[d.img];
              return (
                <Reveal key={i} delay={0.05 * i}>
                  <motion.div whileHover={{ y: -8 }} className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow">
                    <div className="relative h-72 overflow-hidden">
                      <img src={img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/90 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-[#c9a55a] text-white text-xs font-medium px-3 py-1.5 rounded-full inline-block">{d.exp}</div>
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-[#1a1410] mb-1">{d.name}</h3>
                      <p className="text-[#a8853a] text-sm font-medium">{d.spec}</p>
                      <div className="flex items-center justify-center gap-1 mt-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-4 h-4 fill-[#c9a55a] text-[#c9a55a]" />
                        ))}
                      </div>
                      <button
                        onClick={() => scrollTo("booking")}
                        className="mt-4 w-full bg-[#faf6f0] text-[#1a1410] hover:bg-gradient-to-r hover:from-[#c9a55a] hover:to-[#a8853a] hover:text-white py-2.5 rounded-xl text-sm font-semibold transition-all"
                      >
                        {isAR ? "احجز موعد" : "Book Now"}
                      </button>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Booking ===== */}
      <section id="booking" className="py-24 bg-[#1a1410] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#c9a55a]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#c9a55a]/5 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-[#c9a55a]/15 border border-[#c9a55a]/30 text-[#e6c885] px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Calendar className="w-4 h-4" /> {t.booking.tag}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{t.booking.title}</h2>
              <p className="text-white/70 text-lg mb-10">{t.booking.desc}</p>

              <div className="space-y-5">
                {[
                  { icon: Phone, v: "+966 57 501 5019", l: isAR ? "اتصل بنا" : "Call Us" },
                  { icon: Mail, v: "khalid-alharbi@zohomail.sa", l: isAR ? "راسلنا" : "Email Us" },
                  { icon: MessageCircle, v: "+966 57 501 5019", l: isAR ? "واتساب" : "WhatsApp" },
                  { icon: Clock, v: t.contact.hoursV, l: isAR ? "ساعات العمل" : "Working Hours" },
                ].map((item, i) => (
                  <Reveal key={i} delay={0.1 * i}>
                    <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-[#c9a55a]/40 transition">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a55a] to-[#8a6d2e] flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white/50 text-xs">{item.l}</div>
                        <div className="text-white font-medium" dir="ltr">{item.v}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 shadow-2xl"
                style={{ direction: isAR ? "rtl" : "ltr" }}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-[#1a1410] font-semibold text-sm flex items-center gap-1.5">
                      <User className="w-4 h-4 text-[#a8853a]" /> {t.booking.name} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t.booking.namePh}
                      className="bg-[#faf6f0] border-2 border-[#1a1410]/10 focus:border-[#c9a55a] text-[#1a1410] placeholder:text-[#1a1410]/40 rounded-xl py-3 focus-visible:ring-0"
                      style={{ color: "#1a1410", WebkitTextFillColor: "#1a1410" }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#1a1410] font-semibold text-sm flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-[#a8853a]" /> {t.booking.phone} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder={t.booking.phonePh}
                      className="bg-[#faf6f0] border-2 border-[#1a1410]/10 focus:border-[#c9a55a] text-[#1a1410] placeholder:text-[#1a1410]/40 rounded-xl py-3 focus-visible:ring-0"
                      style={{ color: "#1a1410", WebkitTextFillColor: "#1a1410" }}
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#1a1410] font-semibold text-sm flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-[#a8853a]" /> {t.booking.email}
                    </Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder={t.booking.emailPh}
                      className="bg-[#faf6f0] border-2 border-[#1a1410]/10 focus:border-[#c9a55a] text-[#1a1410] placeholder:text-[#1a1410]/40 rounded-xl py-3 focus-visible:ring-0"
                      style={{ color: "#1a1410", WebkitTextFillColor: "#1a1410" }}
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#1a1410] font-semibold text-sm flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#a8853a]" /> {t.booking.service} <span className="text-red-500">*</span>
                    </Label>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-[#faf6f0] border-2 border-[#1a1410]/10 focus:border-[#c9a55a] text-[#1a1410] rounded-xl py-3 px-3 focus:outline-none focus:ring-0 font-medium cursor-pointer"
                      style={{ color: "#1a1410", WebkitTextFillColor: "#1a1410" }}
                    >
                      <option value="">{isAR ? "اختر الخدمة" : "Select Service"}</option>
                      {t.services.items.map((s, i) => (
                        <option key={i} value={s.t}>{s.t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#1a1410] font-semibold text-sm flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#a8853a]" /> {t.booking.date} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="bg-[#faf6f0] border-2 border-[#1a1410]/10 focus:border-[#c9a55a] text-[#1a1410] rounded-xl py-3 focus-visible:ring-0"
                      style={{ color: "#1a1410", WebkitTextFillColor: "#1a1410" }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#1a1410] font-semibold text-sm flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#a8853a]" /> {t.booking.time}
                    </Label>
                    <select
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      className="w-full bg-[#faf6f0] border-2 border-[#1a1410]/10 focus:border-[#c9a55a] text-[#1a1410] rounded-xl py-3 px-3 focus:outline-none focus:ring-0 font-medium cursor-pointer"
                      style={{ color: "#1a1410", WebkitTextFillColor: "#1a1410" }}
                    >
                      <option value="">{isAR ? "اختر الوقت" : "Select Time"}</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                      <option value="19:00">07:00 PM</option>
                      <option value="20:00">08:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 mt-5">
                  <Label className="text-[#1a1410] font-semibold text-sm flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#a8853a]" /> {t.booking.notes}
                  </Label>
                  <Textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder={t.booking.notesPh}
                    rows={3}
                    className="bg-[#faf6f0] border-2 border-[#1a1410]/10 focus:border-[#c9a55a] text-[#1a1410] placeholder:text-[#1a1410]/40 rounded-xl py-3 focus-visible:ring-0 resize-none"
                    style={{ color: "#1a1410", WebkitTextFillColor: "#1a1410" }}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-6 bg-gradient-to-r from-[#c9a55a] to-[#a8853a] hover:from-[#a8853a] hover:to-[#8a6d2e] text-white py-4 rounded-xl text-lg font-semibold shadow-lg shadow-[#c9a55a]/30 transition-all hover:shadow-xl hover:shadow-[#c9a55a]/40 disabled:opacity-60"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {isAR ? "جاري الإرسال..." : "Sending..."}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" /> {t.booking.submit}
                    </span>
                  )}
                </Button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#c9a55a]/10 text-[#a8853a] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" /> {t.testimonials.tag}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1410] mb-4">{t.testimonials.title}</h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.items.map((tt, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div className="bg-[#faf6f0] p-8 rounded-3xl h-full hover:shadow-2xl transition-shadow relative">
                  <div className="absolute top-6 left-6 text-6xl text-[#c9a55a]/20 font-serif">"</div>
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-[#c9a55a] text-[#c9a55a]" />
                    ))}
                  </div>
                  <p className="text-[#1a1410]/70 leading-relaxed mb-6 relative">{tt.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a55a] to-[#8a6d2e] flex items-center justify-center text-white font-bold">
                      {tt.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-[#1a1410]">{tt.name}</div>
                      <div className="text-sm text-[#1a1410]/60">{tt.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" className="py-24 bg-[#faf6f0]">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#c9a55a]/10 text-[#a8853a] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MapPin className="w-4 h-4" /> {t.contact.tag}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1410] mb-4">{t.contact.title}</h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12">
            <Reveal>
              <div className="space-y-5">
                {[
                  { icon: Phone, t: t.contact.phone, v: "+966 57 501 5019", href: "tel:+966575015019" },
                  { icon: Mail, t: t.contact.email, v: "khalid-alharbi@zohomail.sa", href: "mailto:khalid-alharbi@zohomail.sa" },
                  { icon: MapPin, t: t.contact.address, v: t.contact.addressV },
                  { icon: Clock, t: t.contact.hours, v: t.contact.hoursV },
                ].map((item, i) => (
                  <Reveal key={i} delay={0.1 * i}>
                    <a href={item.href || "#"} className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition group block">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a55a] to-[#8a6d2e] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-[#1a1410]/60 text-sm mb-1">{item.t}</div>
                        <div className="text-[#1a1410] font-bold" dir={item.icon === Phone || item.icon === Mail ? "ltr" : "auto"}>{item.v}</div>
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-3xl overflow-hidden shadow-2xl h-full min-h-[400px] bg-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.6!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMCJF!5e0!3m2!1sar!2ssa!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-[#1a1410] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a55a] to-[#8a6d2e] flex items-center justify-center">
                  <Stethoscope className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-bold text-xl">{isAR ? "عيادة خالد" : "Khalid Clinic"}</div>
                  <div className="text-xs text-[#c9a55a] tracking-widest">{isAR ? "للرعاية الطبية" : "Medical Care"}</div>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                {isAR ? "نقدم رعاية صحية متكاملة بأحدث التقنيات وفريق طبي متخصص" : "We provide comprehensive healthcare with modern technology and specialized medical team"}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-[#c9a55a] mb-4">{t.footer.quick}</h4>
              <div className="space-y-2">
                {navLinks.map((l) => (
                  <button key={l.id} onClick={() => scrollTo(l.id)} className="block text-white/60 hover:text-[#c9a55a] text-sm transition text-right">
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#c9a55a] mb-4">{t.footer.services}</h4>
              <div className="space-y-2">
                {t.services.items.slice(0, 5).map((s, i) => (
                  <button key={i} onClick={() => scrollTo("services")} className="block text-white/60 hover:text-[#c9a55a] text-sm transition text-right">
                    {s.t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#c9a55a] mb-4">{t.footer.contact}</h4>
              <div className="space-y-3">
                <a href="tel:+966575015019" className="flex items-center gap-2 text-white/60 hover:text-[#c9a55a] text-sm transition" dir="ltr">
                  <Phone className="w-4 h-4" /> +966 57 501 5019
                </a>
                <a href="mailto:khalid-alharbi@zohomail.sa" className="flex items-center gap-2 text-white/60 hover:text-[#c9a55a] text-sm transition" dir="ltr">
                  <Mail className="w-4 h-4" /> khalid-alharbi@zohomail.sa
                </a>
                <div className="flex items-start gap-2 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> {t.contact.addressV}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center text-white/40 text-sm">
            © {new Date().getFullYear()} {isAR ? "عيادة خالد الطبية" : "Khalid Medical Clinic"} — {t.footer.rights}
          </div>
        </div>
      </footer>

      {/* ===== Floating Buttons ===== */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <AnimatePresence>
          {showScroll && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-12 h-12 rounded-full bg-[#1a1410] text-[#c9a55a] shadow-xl flex items-center justify-center hover:scale-110 transition"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <button
          onClick={() => setShowWA(!showWA)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition"
        >
          <MessageCircle className="w-7 h-7" />
        </button>

        <AnimatePresence>
          {showWA && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-5 w-72"
            >
              <div className="flex items-center gap-3 mb-3 pb-3 border-b">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#1a1410] text-sm">{isAR ? "واتساب" : "WhatsApp"}</div>
                  <div className="text-xs text-green-600">● Online</div>
                </div>
              </div>
              <p className="text-sm text-[#1a1410]/70 mb-4">
                {isAR ? "مرحباً! كيف يمكننا مساعدتك؟" : "Hello! How can we help you?"}
              </p>
              <a
                href="https://wa.me/966575015019"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg transition"
              >
                {isAR ? "ابدأ المحادثة" : "Start Chat"}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
