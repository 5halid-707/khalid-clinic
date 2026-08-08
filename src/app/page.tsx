"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, Menu, X, Globe, ChevronDown,
  Calendar, MessageCircle, Send, Star, CheckCircle2, ArrowUp,
  Sparkles, Activity, Bone, Heart, Stethoscope, Award, Users,
  Smile, TrendingUp, ShieldCheck, Play, User, FileText,
  Microscope, Baby, Eye, Brain, Syringe, Ambulance,
  ArrowRight, ArrowLeft, Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const GOLD = "#c9a55a";
const GOLD_LIGHT = "#e6c885";
const GOLD_DEEP = "#8a6d2e";
const DARK = "#0f0a07";
const DARK_SOFT = "#1a1410";
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
  hero: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920&q=85",
  hero2: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=1920&q=85",
  about: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1400&q=85",
  about2: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=900&q=85",
  cardio: "https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0?w=900&q=85",
  ortho: "https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0?w=900&q=85",
  dental: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&q=85",
  eye: "https://images.unsplash.com/photo-1579165466949-3180a3d056d5?w=900&q=85",
  pediatric: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=900&q=85",
  neuro: "https://images.unsplash.com/photo-1559757175-08f51794ccc3?w=900&q=85",
  lab: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=900&q=85",
  derma: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&q=85",
  doc1: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&q=85",
  doc2: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=85",
  doc3: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=700&q=85",
  doc4: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=700&q=85",
  cta: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1920&q=85",
};

// ============ 3D Tilt Card Component ============
function TiltCard({ children, className = "", intensity = 12 }: { children: React.ReactNode; className?: string; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-50, 50], [intensity, -intensity]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-intensity, intensity]), { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set(((e.clientX - cx) / rect.width) * 50);
    y.set(((e.clientY - cy) / rect.height) * 50);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============ Reveal animation ============
function Reveal({ children, delay = 0, y = 40, className = "", once = true }: { children: React.ReactNode; delay?: number; y?: number; className?: string; once?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax hero
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setHeroSlide((p) => (p + 1) % 2), 7000);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for hero glow
  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

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
    <div ref={containerRef} className="min-h-screen bg-[#faf6f0] overflow-x-hidden" dir={t.dir}>
      {/* Global CSS for 3D effects */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        * { -webkit-font-smoothing: antialiased; }
        body { font-family: ${isAR ? "'Cairo', sans-serif" : "'Poppins', sans-serif"}; }
        
        .font-serif-display { font-family: 'Playfair Display', serif; }
        .font-cairo { font-family: 'Cairo', sans-serif; }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-15px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(201,165,90,0.3), 0 0 40px rgba(201,165,90,0.1); }
          50% { box-shadow: 0 0 30px rgba(201,165,90,0.5), 0 0 60px rgba(201,165,90,0.2); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 8s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-blob { animation: blob 8s ease-in-out infinite; }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
        
        .glass {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.15);
        }
        .glass-dark {
          background: rgba(15,10,7,0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(201,165,90,0.2);
        }
        
        .text-gold-gradient {
          background: linear-gradient(135deg, #c9a55a 0%, #e6c885 30%, #f4e4b0 50%, #e6c885 70%, #c9a55a 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .shimmer-bg {
          background: linear-gradient(90deg, transparent, rgba(201,165,90,0.15), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite linear;
        }
        
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        .text-shadow-gold { text-shadow: 0 0 30px rgba(201,165,90,0.5), 0 0 60px rgba(201,165,90,0.3); }
        
        .card-3d {
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
          transform-style: preserve-3d;
        }
        .card-3d:hover {
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25), 0 0 30px rgba(201,165,90,0.15);
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          filter: invert(0.5) sepia(1) saturate(2) hue-rotate(15deg);
        }
        
        select option { color: #1a1410 !important; background: #faf6f0 !important; }
      `}</style>

      {/* Mouse-following glow */}
      <div
        className="fixed pointer-events-none z-0 w-96 h-96 rounded-full opacity-30 blur-3xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, rgba(201,165,90,0.4), transparent 70%)`,
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
      />

      {/* ===== Top Bar ===== */}
      <div className="bg-[#0f0a07] text-[#c9a55a] text-xs md:text-sm py-2.5 px-4 hidden md:block relative z-40 border-b border-[#c9a55a]/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+966575015019" className="flex items-center gap-2 hover:text-[#e6c885] transition group">
              <Phone className="w-3.5 h-3.5 group-hover:scale-110 transition" /> +966 57 501 5019
            </a>
            <a href="mailto:khalid-alharbi@zohomail.sa" className="flex items-center gap-2 hover:text-[#e6c885] transition group">
              <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition" /> khalid-alharbi@zohomail.sa
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
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-2xl shadow-[#c9a55a]/5 py-3" : "bg-white/80 backdrop-blur-md py-5"}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, x: isAR ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => scrollTo("home")}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a55a] to-[#8a6d2e] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <Stethoscope className="w-7 h-7 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="text-right">
              <div className={`font-bold text-[#0f0a07] leading-tight ${isAR ? "text-xl font-cairo" : "text-lg"}`}>{isAR ? "عيادة خالد" : "Khalid Clinic"}</div>
              <div className="text-[10px] text-[#c9a55a] tracking-[0.25em] uppercase font-semibold">{isAR ? "للرعاية الطبية" : "Medical Care"}</div>
            </div>
          </motion.button>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((l, i) => (
              <motion.button
                key={l.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                onClick={() => scrollTo(l.id)}
                className="relative px-4 py-2 text-[#0f0a07] hover:text-[#c9a55a] font-medium text-sm transition group"
              >
                {l.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#c9a55a] to-[#e6c885] group-hover:w-3/4 transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("booking")}
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#c9a55a] to-[#a8853a] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-[#c9a55a]/30 hover:shadow-xl hover:shadow-[#c9a55a]/50 transition-all"
            >
              <Calendar className="w-4 h-4" /> {t.nav.booking}
            </motion.button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-[#0f0a07]">
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
                    className="text-right py-3 px-4 rounded-lg hover:bg-[#faf6f0] text-[#0f0a07] hover:text-[#c9a55a] font-medium transition"
                  >
                    {l.label}
                  </button>
                ))}
                <button
                  onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                  className="text-right py-3 px-4 rounded-lg hover:bg-[#faf6f0] text-[#0f0a07] font-medium flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" /> {lang === "ar" ? "English" : "العربية"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ===== Hero with 3D Parallax ===== */}
      <section id="home" ref={heroRef} className="relative min-h-[92vh] overflow-hidden bg-[#0f0a07]">
        {/* Background images with parallax */}
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          {[IMG.hero, IMG.hero2].map((src, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: heroSlide === i ? 1 : 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <img src={src} alt="Clinic" className="w-full h-full object-cover" />
            </motion.div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0a07] via-[#0f0a07]/85 to-[#0f0a07]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a07] via-transparent to-[#0f0a07]/50" />
        </motion.div>

        {/* Animated decorative blobs */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#c9a55a]/15 blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#c9a55a]/10 blur-3xl animate-float-medium" />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-[#c9a55a]/5 blur-3xl animate-blob" />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#c9a55a]/30"
            style={{
              left: `${10 + i * 11}%`,
              top: `${20 + (i % 4) * 20}%`,
              animation: `float-slow ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative max-w-7xl mx-auto px-4 min-h-[92vh] flex items-center py-20"
        >
          <div className={`max-w-2xl ${isAR ? "text-right" : "text-left"}`}>
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 glass-dark text-[#e6c885] px-5 py-2.5 rounded-full text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#c9a55a] animate-pulse" />
              <Sparkles className="w-4 h-4" /> {t.hero.tag}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6 ${isAR ? "font-cairo" : "font-serif-display"}`}
            >
              {t.hero.title1}
              <br />
              <span className="text-gold-gradient text-shadow-gold gradient-animate inline-block">
                {t.hero.title2}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-xl"
            >
              {t.hero.desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("booking")}
                className="group relative bg-gradient-to-r from-[#c9a55a] to-[#a8853a] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl shadow-[#c9a55a]/30 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#e6c885] to-[#c9a55a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-2">
                  <Calendar className="w-5 h-5" /> {t.hero.cta1}
                  {isAR ? <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />}
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("services")}
                className="glass text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition flex items-center gap-2"
              >
                <Play className="w-5 h-5" /> {t.hero.cta2}
              </motion.button>
            </motion.div>

            {/* Stats with 3D hover */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10"
            >
              {t.hero.stats.map((s, i) => (
                <TiltCard key={i} intensity={15} className="cursor-default">
                  <div className="text-center p-2">
                    <div className="text-3xl md:text-4xl font-bold text-gold-gradient">{s.v}</div>
                    <div className="text-white/60 text-sm mt-1">{s.l}</div>
                  </div>
                </TiltCard>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {[0, 1].map((i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${heroSlide === i ? "w-12 bg-[#c9a55a] shadow-[0_0_10px_#c9a55a]" : "w-5 bg-white/30 hover:bg-white/50"}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 z-20"
        >
          <span className="text-white/40 text-xs tracking-widest rotate-180" style={{ writingMode: "vertical-rl" }}>SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#c9a55a] to-transparent" />
        </motion.div>
      </section>

      {/* ===== Marquee strip ===== */}
      <div className="bg-[#0f0a07] border-y border-[#c9a55a]/20 py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-12 px-6">
              {[
                { icon: ShieldCheck, t: isAR ? "معايير سلامة عالمية" : "Global Safety Standards" },
                { icon: Award, t: isAR ? "+25 سنة خبرة" : "+25 Years Experience" },
                { icon: Users, t: isAR ? "+50 استشاري" : "+50 Specialists" },
                { icon: Activity, t: isAR ? "أحدث التقنيات" : "Latest Technology" },
                { icon: Stethoscope, t: isAR ? "رعاية متكاملة" : "Comprehensive Care" },
                { icon: Clock, t: isAR ? "خدمة 24/7" : "24/7 Service" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-[#c9a55a]">
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-semibold tracking-wide">{item.t}</span>
                  <span className="text-[#c9a55a]/30">•</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ===== About with 3D cards ===== */}
      <section id="about" className="py-24 bg-[#faf6f0] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#c9a55a]/8 to-transparent" />
        <div className="absolute top-40 left-0 w-72 h-72 rounded-full bg-[#c9a55a]/5 blur-3xl animate-float-slow" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="relative perspective-1000">
                {/* Floating decorative shapes */}
                <div className="absolute -top-8 -right-8 w-32 h-32 border-2 border-[#c9a55a]/30 rounded-3xl animate-float-slow" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-[#c9a55a]/20 to-transparent rounded-3xl animate-float-medium" />

                <TiltCard intensity={8} className="relative">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img src={IMG.about} alt="Clinic" className="w-full h-[520px] object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a07]/50 via-transparent to-transparent" />
                  </div>
                </TiltCard>

                {/* Floating badge card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-8 left-8 bg-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 max-w-xs animate-pulse-glow"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c9a55a] to-[#8a6d2e] flex items-center justify-center">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0f0a07]">+25</div>
                    <div className="text-sm text-[#0f0a07]/60">{isAR ? "سنة من التميز" : "Years of Excellence"}</div>
                  </div>
                </motion.div>

                {/* Small floating image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-6 -left-6 w-32 h-32 rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden lg:block animate-float-medium"
                >
                  <img src={IMG.about2} alt="Clinic detail" className="w-full h-full object-cover" />
                </motion.div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="inline-flex items-center gap-2 bg-[#c9a55a]/10 text-[#a8853a] px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" /> {t.about.tag}
              </div>
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f0a07] leading-tight mb-6 ${isAR ? "font-cairo" : "font-serif-display"}`}>
                {t.about.title}
              </h2>
              <p className="text-[#0f0a07]/70 text-lg leading-relaxed mb-4">{t.about.p1}</p>
              <p className="text-[#0f0a07]/70 text-lg leading-relaxed mb-8">{t.about.p2}</p>

              <div className="grid sm:grid-cols-2 gap-5">
                {t.about.features.map((f, i) => (
                  <Reveal key={i} delay={0.1 * i} y={20}>
                    <motion.div
                      whileHover={{ scale: 1.03, y: -4 }}
                      className="flex items-start gap-3 p-5 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all group cursor-default"
                    >
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#c9a55a]/20 to-[#c9a55a]/5 flex items-center justify-center flex-shrink-0 group-hover:from-[#c9a55a] group-hover:to-[#a8853a] transition">
                        <CheckCircle2 className="w-6 h-6 text-[#a8853a] group-hover:text-white transition" />
                      </div>
                      <div>
                        <div className="font-bold text-[#0f0a07] mb-1">{f.t}</div>
                        <div className="text-sm text-[#0f0a07]/60">{f.d}</div>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Services with 3D flip cards ===== */}
      <section id="services" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 right-0 w-80 h-80 bg-[#c9a55a]/5 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#c9a55a]/10 text-[#a8853a] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" /> {t.services.tag}
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f0a07] mb-4 ${isAR ? "font-cairo" : "font-serif-display"}`}>{t.services.title}</h2>
            <p className="text-[#0f0a07]/60 text-lg">{t.services.desc}</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.services.items.map((s, i) => {
              const Icon = s.icon;
              const img = (IMG as any)[s.img];
              return (
                <Reveal key={i} delay={0.05 * i}>
                  <motion.div
                    whileHover={{ y: -12, rotateX: 5, rotateY: 5 }}
                    style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                    className="group relative bg-[#faf6f0] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow cursor-pointer h-full"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <motion.img
                        src={img}
                        alt={s.t}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a07]/90 via-[#0f0a07]/30 to-transparent" />
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:bg-gradient-to-br group-hover:from-[#c9a55a] group-hover:to-[#a8853a] transition-all duration-300 group-hover:rotate-12">
                        <Icon className="w-6 h-6 text-[#a8853a] group-hover:text-white transition" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold text-white">{s.t}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-[#0f0a07]/60 text-sm leading-relaxed mb-4">{s.d}</p>
                      <button
                        onClick={() => scrollTo("booking")}
                        className="text-[#a8853a] text-sm font-semibold flex items-center gap-1 group-hover:gap-3 transition-all"
                      >
                        {isAR ? "احجز الآن" : "Book Now"} {isAR ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA Banner with parallax ===== */}
      <section className="relative py-24 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 8, ease: "linear" }}
          className="absolute inset-0"
        >
          <img src={IMG.cta} alt="CTA" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0f0a07]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0a07] via-transparent to-[#0f0a07]" />
        </motion.div>

        <Reveal className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="inline-flex w-20 h-20 rounded-2xl bg-gradient-to-br from-[#c9a55a] to-[#8a6d2e] items-center justify-center mb-6 shadow-2xl shadow-[#c9a55a]/40 animate-pulse-glow"
          >
            <ShieldCheck className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight ${isAR ? "font-cairo" : "font-serif-display"}`}>
            {isAR ? "صحتك تستحق الأفضل" : "Your Health Deserves the Best"}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {isAR ? "احجز موعدك اليوم واحصل على استشارة طبية متخصصة مع نخبة من أمهر الأطباء" : "Book your appointment today for specialized medical consultation with elite doctors"}
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("booking")}
            className="bg-gradient-to-r from-[#c9a55a] to-[#a8853a] text-white px-10 py-4 rounded-full font-semibold text-lg shadow-2xl shadow-[#c9a55a]/40 hover:shadow-[#c9a55a]/60 transition-all inline-flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" /> {t.nav.booking}
          </motion.button>
        </Reveal>
      </section>

      {/* ===== Doctors with 3D tilt ===== */}
      <section id="doctors" className="py-24 bg-[#faf6f0] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c9a55a]/5 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#c9a55a]/10 text-[#a8853a] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" /> {t.doctors.tag}
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f0a07] mb-4 ${isAR ? "font-cairo" : "font-serif-display"}`}>{t.doctors.title}</h2>
            <p className="text-[#0f0a07]/60 text-lg">{t.doctors.desc}</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.doctors.items.map((d, i) => {
              const img = (IMG as any)[d.img];
              return (
                <Reveal key={i} delay={0.05 * i}>
                  <TiltCard intensity={10} className="card-3d group bg-white rounded-3xl overflow-hidden shadow-md cursor-pointer h-full">
                    <div className="relative h-80 overflow-hidden">
                      <img src={img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a07]/95 via-[#0f0a07]/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-gradient-to-r from-[#c9a55a] to-[#a8853a] text-white text-xs font-medium px-3 py-1.5 rounded-full inline-block shadow-lg">{d.exp}</div>
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-[#0f0a07]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <motion.button
                          onClick={() => scrollTo("booking")}
                          className="bg-white text-[#0f0a07] px-6 py-3 rounded-full font-semibold shadow-xl transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500"
                        >
                          {isAR ? "احجز موعد" : "Book Now"}
                        </motion.button>
                      </div>
                    </div>
                    <div className="p-6 text-center" style={{ transform: "translateZ(40px)" }}>
                      <h3 className="text-xl font-bold text-[#0f0a07] mb-1">{d.name}</h3>
                      <p className="text-[#a8853a] text-sm font-medium">{d.spec}</p>
                      <div className="flex items-center justify-center gap-1 mt-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-4 h-4 fill-[#c9a55a] text-[#c9a55a]" />
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Booking (FIXED — visible text + date/time pickers) ===== */}
      <section id="booking" className="py-24 bg-[#0f0a07] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#c9a55a]/10 blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#c9a55a]/5 blur-3xl animate-float-medium" />

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <div className="inline-flex items-center gap-2 glass-dark text-[#e6c885] px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Calendar className="w-4 h-4" /> {t.booking.tag}
              </div>
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight ${isAR ? "font-cairo" : "font-serif-display"}`}>{t.booking.title}</h2>
              <p className="text-white/70 text-lg mb-10">{t.booking.desc}</p>

              <div className="space-y-5">
                {[
                  { icon: Phone, v: "+966 57 501 5019", l: isAR ? "اتصل بنا" : "Call Us", href: "tel:+966575015019" },
                  { icon: Mail, v: "khalid-alharbi@zohomail.sa", l: isAR ? "راسلنا" : "Email Us", href: "mailto:khalid-alharbi@zohomail.sa" },
                  { icon: MessageCircle, v: "+966 57 501 5019", l: isAR ? "واتساب" : "WhatsApp", href: "https://wa.me/966575015019" },
                  { icon: Clock, v: t.contact.hoursV, l: isAR ? "ساعات العمل" : "Working Hours" },
                ].map((item, i) => (
                  <Reveal key={i} delay={0.1 * i}>
                    <a href={item.href || "#"} className="flex items-center gap-4 p-4 glass-dark rounded-2xl hover:bg-white/10 hover:border-[#c9a55a]/40 transition group">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a55a] to-[#8a6d2e] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white/50 text-xs">{item.l}</div>
                        <div className="text-white font-medium" dir="ltr">{item.v}</div>
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <TiltCard intensity={3} className="bg-white rounded-3xl shadow-2xl">
                <form
                  onSubmit={handleSubmit}
                  className="p-8"
                  style={{ direction: isAR ? "rtl" : "ltr" }}
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-[#0f0a07] font-semibold text-sm flex items-center gap-1.5">
                        <User className="w-4 h-4 text-[#a8853a]" /> {t.booking.name} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={t.booking.namePh}
                        className="bg-[#faf6f0] border-2 border-[#0f0a07]/10 focus:border-[#c9a55a] rounded-xl py-3 h-12 text-[#0f0a07] placeholder:text-[#0f0a07]/40 focus-visible:ring-0 transition-colors"
                        style={{ color: "#0f0a07", caretColor: "#c9a55a" }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#0f0a07] font-semibold text-sm flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-[#a8853a]" /> {t.booking.phone} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder={t.booking.phonePh}
                        className="bg-[#faf6f0] border-2 border-[#0f0a07]/10 focus:border-[#c9a55a] rounded-xl py-3 h-12 text-[#0f0a07] placeholder:text-[#0f0a07]/40 focus-visible:ring-0 transition-colors"
                        style={{ color: "#0f0a07", caretColor: "#c9a55a" }}
                        dir="ltr"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#0f0a07] font-semibold text-sm flex items-center gap-1.5">
                        <Mail className="w-4 h-4 text-[#a8853a]" /> {t.booking.email}
                      </Label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder={t.booking.emailPh}
                        className="bg-[#faf6f0] border-2 border-[#0f0a07]/10 focus:border-[#c9a55a] rounded-xl py-3 h-12 text-[#0f0a07] placeholder:text-[#0f0a07]/40 focus-visible:ring-0 transition-colors"
                        style={{ color: "#0f0a07", caretColor: "#c9a55a" }}
                        dir="ltr"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#0f0a07] font-semibold text-sm flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[#a8853a]" /> {t.booking.service} <span className="text-red-500">*</span>
                      </Label>
                      <select
                        required
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full bg-[#faf6f0] border-2 border-[#0f0a07]/10 focus:border-[#c9a55a] text-[#0f0a07] rounded-xl py-3 px-3 h-12 focus:outline-none focus:ring-0 font-medium cursor-pointer transition-colors"
                        style={{ color: "#0f0a07" }}
                      >
                        <option value="">{isAR ? "اختر الخدمة" : "Select Service"}</option>
                        {t.services.items.map((s, i) => (
                          <option key={i} value={s.t}>{s.t}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#0f0a07] font-semibold text-sm flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#a8853a]" /> {t.booking.date} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="bg-[#faf6f0] border-2 border-[#0f0a07]/10 focus:border-[#c9a55a] rounded-xl py-3 h-12 text-[#0f0a07] focus-visible:ring-0 transition-colors"
                        style={{ color: "#0f0a07" }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#0f0a07] font-semibold text-sm flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#a8853a]" /> {t.booking.time}
                      </Label>
                      <select
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="w-full bg-[#faf6f0] border-2 border-[#0f0a07]/10 focus:border-[#c9a55a] text-[#0f0a07] rounded-xl py-3 px-3 h-12 focus:outline-none focus:ring-0 font-medium cursor-pointer transition-colors"
                        style={{ color: "#0f0a07" }}
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
                    <Label className="text-[#0f0a07] font-semibold text-sm flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#a8853a]" /> {t.booking.notes}
                    </Label>
                    <Textarea
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder={t.booking.notesPh}
                      rows={3}
                      className="bg-[#faf6f0] border-2 border-[#0f0a07]/10 focus:border-[#c9a55a] rounded-xl py-3 text-[#0f0a07] placeholder:text-[#0f0a07]/40 focus-visible:ring-0 resize-none transition-colors"
                      style={{ color: "#0f0a07", caretColor: "#c9a55a" }}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-6 bg-gradient-to-r from-[#c9a55a] to-[#a8853a] hover:from-[#a8853a] hover:to-[#8a6d2e] text-white py-4 h-14 rounded-xl text-lg font-semibold shadow-lg shadow-[#c9a55a]/30 transition-all hover:shadow-xl hover:shadow-[#c9a55a]/40 disabled:opacity-60"
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
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#c9a55a]/5 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#c9a55a]/10 text-[#a8853a] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" /> {t.testimonials.tag}
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f0a07] mb-4 ${isAR ? "font-cairo" : "font-serif-display"}`}>{t.testimonials.title}</h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.items.map((tt, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <TiltCard intensity={6} className="bg-[#faf6f0] p-8 rounded-3xl h-full relative card-3d cursor-default">
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-[#c9a55a]/15" />
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-5 h-5 fill-[#c9a55a] text-[#c9a55a]" />
                    ))}
                  </div>
                  <p className="text-[#0f0a07]/70 leading-relaxed mb-6 relative">{tt.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a55a] to-[#8a6d2e] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {tt.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-[#0f0a07]">{tt.name}</div>
                      <div className="text-sm text-[#0f0a07]/60">{tt.role}</div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" className="py-24 bg-[#faf6f0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#c9a55a]/10 text-[#a8853a] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MapPin className="w-4 h-4" /> {t.contact.tag}
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f0a07] mb-4 ${isAR ? "font-cairo" : "font-serif-display"}`}>{t.contact.title}</h2>
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
                    <a href={item.href || "#"} className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition group block">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a55a] to-[#8a6d2e] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-[#0f0a07]/60 text-sm mb-1">{item.t}</div>
                        <div className="text-[#0f0a07] font-bold" dir={item.icon === Phone || item.icon === Mail ? "ltr" : "auto"}>{item.v}</div>
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <TiltCard intensity={3} className="rounded-3xl overflow-hidden shadow-2xl h-full min-h-[400px] bg-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.6!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMCJF!5e0!3m2!1sar!2ssa!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-[#0f0a07] text-white pt-16 pb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a55a]/50 to-transparent" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#c9a55a]/5 blur-3xl rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a55a] to-[#8a6d2e] flex items-center justify-center shadow-lg">
                  <Stethoscope className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-bold text-xl">{isAR ? "عيادة خالد" : "Khalid Clinic"}</div>
                  <div className="text-xs text-[#c9a55a] tracking-[0.25em] uppercase font-semibold">{isAR ? "للرعاية الطبية" : "Medical Care"}</div>
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
                  <button key={l.id} onClick={() => scrollTo(l.id)} className="block text-white/60 hover:text-[#c9a55a] text-sm transition text-right hover:translate-x-2" style={{ transform: isAR ? "" : "translateX(0)" }}>
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
                <a href="tel:+966575015019" className="flex items-center gap-2 text-white/60 hover:text-[#c9a55a] text-sm transition group" dir="ltr">
                  <Phone className="w-4 h-4 group-hover:scale-110 transition" /> +966 57 501 5019
                </a>
                <a href="mailto:khalid-alharbi@zohomail.sa" className="flex items-center gap-2 text-white/60 hover:text-[#c9a55a] text-sm transition group" dir="ltr">
                  <Mail className="w-4 h-4 group-hover:scale-110 transition" /> khalid-alharbi@zohomail.sa
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-12 h-12 rounded-full bg-[#0f0a07] text-[#c9a55a] shadow-xl flex items-center justify-center hover:shadow-2xl transition"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <button
          onClick={() => setShowWA(!showWA)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
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
                  <div className="font-bold text-[#0f0a07] text-sm">{isAR ? "واتساب" : "WhatsApp"}</div>
                  <div className="text-xs text-green-600">● Online</div>
                </div>
              </div>
              <p className="text-sm text-[#0f0a07]/70 mb-4">
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
