"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, Menu, X, Globe, ChevronDown,
  Calendar, MessageCircle, Send, Star, CheckCircle2, ArrowUp,
  Sparkles, Stethoscope, Award, Users, Play, User, FileText,
  ArrowRight, ArrowLeft, Quote, ChevronLeft, ChevronRight,
  Search, Zap, Heart, ShieldCheck, Plus, Minus,
  Tag, Newspaper, Instagram, Facebook, Twitter, Youtube,
  MessageSquare, Eye, Syringe, Waves, Scissors, Flower2,
  Crown, Gem, Diamond,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Medical-Luxury palette (per spec)
const C = {
  white: "#FFFFFF",        // pure white
  cream: "#F8F5F0",        // soft warm cream/beige (per spec)
  creamSoft: "#F1ECE4",    // lighter cream
  beige: "#E8DECE",        // light beige
  ink: "#212121",          // deep charcoal text (per spec)
  inkSoft: "#333333",      // charcoal
  inkMute: "#7A7A7A",      // muted gray
  gold: "#B8965A",         // soft matte gold
  goldSoft: "#D4B888",     // light gold
  goldDeep: "#8A6D3B",     // deep bronze
  rose: "#C9A0A0",         // rose gold hint
};

// ============ Translations ============
const T = {
  ar: {
    dir: "rtl",
    brand: { name: "روزا", en: "ROSA", sub: "عيادة التجميل والبشرة" },
    nav: { home: "الرئيسية", about: "من نحن", services: "الخدمات", doctors: "الأطباء", reviews: "آراء العملاء", contact: "تواصل معنا" },
    utility: { appt: "احجز موعدك", phone: "اتصل بنا" },
    hero: {
      tag: "عيادة تجميل وجراحة جلدية راقية",
      title1: "حيث يلتقي الجمال",
      title2: "بالخبرة الطبية",
      desc: "نقدم أحدث علاجات التجميل والبشرة بأيدٍ نخبة من الاستشاريين، في أجواء فاخرة تليق بك. تجربة جمالية متكاملة تبدأ من هنا.",
      cta1: "احجز الآن",
      cta2: "استكشف الخدمات",
      stats: [
        { v: "+15", l: "سنة خبرة" },
        { v: "+50", l: "إجراء تجميلي" },
        { v: "+12K", l: "عميلة سعيدة" },
        { v: "98%", l: "نسبة الرضا" },
      ],
    },
    about: {
      tag: "من نحن",
      title: "الشمولية في العناية بالجمال",
      p1: "في عيادة روزا، نؤمن أن الجمال فنٌّ وعلم. نجمع بين أحدث التقنيات الطبية العالمية وخبرة نخبة من استشاريي التجميل والجلدية لنمنحك تجربة علاجية متكاملة ترتقي بتوقعاتك.",
      p2: "بيئتنا الفاخرة مصممة لراحتك التامة، من اللحظة التي تطأ فيها قدمك العيادة وحتى تحقيق نتائج تفوق تطلعاتك. نضع أمانتك وثقتك في المقام الأول، مع التزام تام بأعلى معايير السلامة والجودة.",
      features: [
        { icon: Award, t: "استشاريون معتمدون", d: "خبرة دولية في الطب التجميلي" },
        { icon: Zap, t: "تقنيات حديثة", d: "أحدث الأجهزة المعتمدة عالمياً" },
        { icon: Heart, t: "رعاية مخصصة", d: "خطة علاج مصممة خصيصاً لكِ" },
        { icon: ShieldCheck, t: "أمان وخصوصية", d: "سرية تامة ومعايير تعقيم صارمة" },
      ],
    },
    services: {
      tag: "خدماتنا",
      title: "علاجات تجميلية متكاملة",
      desc: "باقة شاملة من أحدث العلاجات التجميلية والجلدية بأيدي نخبة الاستشاريين",
      items: [
        { icon: Zap, t: "الليزر وإزالة الشعر", d: "تقنيات ليزر متقدمة لإزالة الشعر بأمان وفعالية لجميع أنواع البشرة", img: "laser" },
        { icon: Syringe, t: "الفيلر والبوتكس", d: "حقن تجميلية طبيعية لإعادة الشباب والنضارة للوجه", img: "filler" },
        { icon: Sparkles, t: "العناية بالبشرة", d: "جلسات تنظيف عميق ونضارة وحلول لمشاكل البشرة", img: "skincare" },
        { icon: Waves, t: "نحت القوام", d: "أحدث تقنيات نحت الجسم وإذابة الدهون الموضعية", img: "body" },
        { icon: Scissors, t: "الجراحة التجميلية", d: "إجراءات تجميلية دقيقة بأيدي استشاريين متخصصين", img: "surgery" },
        { icon: Flower2, t: "علاج التساقط", d: "حلول متكاملة لعلاج تساقط الشعر وتنشيط البصيلات", img: "hair" },
      ],
    },
    doctors: {
      tag: "نخبة الأطباء",
      title: "استشاريون يثق بهم الجميع",
      desc: "فريق طبي من نخبة الاستشاريين الحاصلين على شهادات عالمية",
      bookWith: "حجز سريع",
      items: [
        { name: "د. ريم العتيبي", spec: "استشارية الجلدية والتجميل", exp: "+15 سنة", edu: "Board Certified", img: "doc1" },
        { name: "د. نورة الزهراني", spec: "أخصائية الليزر والبشرة", exp: "+10 سنوات", edu: "Aesthetic Medicine", img: "doc2" },
        { name: "د. سارة القحطاني", spec: "استشارية جراحة تجميلية", exp: "+18 سنة", edu: "ISAPS Member", img: "doc3" },
        { name: "د. منيرة الدوسري", spec: "أخصائية العناية بالبشرة", exp: "+8 سنوات", edu: "Dermatology", img: "doc4" },
      ],
    },
    reviews: {
      tag: "آراء العملاء",
      title: "تجارب حقيقية، نتائج استثنائية",
      items: [
        { name: "أمل السبيعي", role: "علاج ليزر", text: "تجربة فاقت توقعاتي بمراحل! النتائج رائعة والطاقم محترف للغاية. الدكتورة ريم شرحت كل تفصيل بصبر. أنصح بشدة." },
        { name: "نورة الحربي", role: "فيلر وبوتكس", text: "نتيجة طبيعية جداً ومظهر شبابي دون مبالغة. الأجواء فاخرة والخدمة راقية من اللحظة الأولى. شكراً روزا." },
        { name: "ريم الشمري", role: "عناية بالبشرة", text: "بشرتي تغيرت بشكل ملحوظ بعد الجلسات. الجلسات مريحة والمنتجات عالية الجودة. أفضل عيادة تجميل جربتها." },
        { name: "سارة المطيري", role: "نحت قوام", text: "نتائج النحت ظاهرة من الجلسة الثالثة. المتابعة دورية والطاقم متعاون. تجربة تستحق كل ريال." },
        { name: "العنود القحطاني", role: "تبييض أسنان", text: "ابتسامتي تغيرت بالكامل! النتائج فاقت توقعاتي والطاقم كان محترف وحنون. شكراً روزا على هذه التجربة الراقية." },
        { name: "مها العنزي", role: "علاج تساقط الشعر", text: "بعد 6 جلسات لاحظت فرق كبير في كثافة شعري. الدكتورة متابعة دقيقة وخطة علاج واضحة. أنصى كل من تعاني من نفس المشكلة." },
      ],
    },
    booking: {
      tag: "احجزي موعدك",
      title: "ابدئي رحلتك نحو الجمال",
      desc: "املئي النموذج وسيتواصل معكِ فريقنا خلال 24 ساعة",
      fields: {
        name: "الاسم الكامل",
        namePh: "الاسم الثلاثي",
        phone: "رقم الجوال",
        phonePh: "05xxxxxxxx",
        email: "البريد الإلكتروني",
        emailPh: "example@email.com",
        service: "الخدمة المطلوبة",
        date: "التاريخ المفضل",
        time: "الوقت المفضل",
        notes: "ملاحظات إضافية",
        notesPh: "أخبرينا عن أهدافك التجميلية",
      },
      submit: "تأكيد الحجز",
      success: "تم استلام طلبكِ! سنتواصل معكِ قريباً",
    },
    contact: {
      tag: "تواصلي معنا",
      title: "نحن هنا لخدمتك",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      address: "العنوان",
      addressV: "حي العليا، شارع التحلية، الرياض",
      hours: "أوقات العمل",
      hoursV: "السبت - الخميس: 10 ص - 10 م",
      hoursFri: "الجمعة: 4 م - 10 م",
    },
    footer: { rights: "جميع الحقوق محفوظة", quick: "روابط سريعة", services: "خدماتنا", contact: "تواصل", follow: "تابعينا" },
    legal: {
      company: "عيادة روزا للتجميل والبشرة",
      companyEn: "ROSA Aesthetic & Dermatology Clinic",
      reg: "جوال: +966 57 501 5019",
      vat: "khalid-alharbi@zohomail.sa",
    },
  },
  en: {
    dir: "ltr",
    brand: { name: "ROSA", en: "ROSA", sub: "Aesthetic & Skin Clinic" },
    nav: { home: "Home", about: "About", services: "Services", doctors: "Doctors", reviews: "Reviews", contact: "Contact" },
    utility: { appt: "Book Now", phone: "Call Us" },
    hero: {
      tag: "Premium Aesthetic & Dermatology Clinic",
      title1: "Where Beauty Meets",
      title2: "Medical Expertise",
      desc: "Cutting-edge aesthetic and skin treatments by elite consultants, in a luxurious atmosphere worthy of you. A complete beauty journey starts here.",
      cta1: "Book Now",
      cta2: "Explore Services",
      stats: [
        { v: "+15", l: "Years Experience" },
        { v: "+50", l: "Aesthetic Procedures" },
        { v: "+12K", l: "Happy Clients" },
        { v: "98%", l: "Satisfaction Rate" },
      ],
    },
    about: {
      tag: "About Us",
      title: "Comprehensive Beauty Care",
      p1: "At ROSA Clinic, we believe beauty is art and science. We combine the latest global medical technologies with the expertise of elite aesthetic and dermatology consultants to give you an integrated treatment experience that exceeds your expectations.",
      p2: "Our luxurious environment is designed for your complete comfort, from the moment you step in until results surpass your aspirations. Your safety and trust come first, with full commitment to the highest safety and quality standards.",
      features: [
        { icon: Award, t: "Certified Consultants", d: "International expertise in aesthetic medicine" },
        { icon: Zap, t: "Modern Technology", d: "Latest globally certified equipment" },
        { icon: Heart, t: "Personalized Care", d: "Treatment plan designed just for you" },
        { icon: ShieldCheck, t: "Safety & Privacy", d: "Full confidentiality and strict sterilization" },
      ],
    },
    services: {
      tag: "Our Services",
      title: "Comprehensive Aesthetic Treatments",
      desc: "A full range of the latest aesthetic and dermatology treatments by elite consultants",
      items: [
        { icon: Zap, t: "Laser & Hair Removal", d: "Advanced laser technologies for safe and effective hair removal for all skin types", img: "laser" },
        { icon: Syringe, t: "Filler & Botox", d: "Natural cosmetic injections to restore youth and freshness to your face", img: "filler" },
        { icon: Sparkles, t: "Skin Care", d: "Deep cleansing sessions, glow treatments, and skin problem solutions", img: "skincare" },
        { icon: Waves, t: "Body Contouring", d: "Latest body sculpting and targeted fat reduction technologies", img: "body" },
        { icon: Scissors, t: "Plastic Surgery", d: "Precise cosmetic procedures by specialized consultants", img: "surgery" },
        { icon: Flower2, t: "Hair Loss Treatment", d: "Comprehensive solutions for hair loss and follicle stimulation", img: "hair" },
      ],
    },
    doctors: {
      tag: "Elite Doctors",
      title: "Trusted Consultants",
      desc: "A medical team of elite consultants with international degrees",
      bookWith: "Quick Book",
      items: [
        { name: "Dr. Reem Al-Otaibi", spec: "Dermatology & Aesthetics Consultant", exp: "+15 years", edu: "Board Certified", img: "doc1" },
        { name: "Dr. Noura Al-Zahrani", spec: "Laser & Skin Specialist", exp: "+10 years", edu: "Aesthetic Medicine", img: "doc2" },
        { name: "Dr. Sarah Al-Qahtani", spec: "Plastic Surgery Consultant", exp: "+18 years", edu: "ISAPS Member", img: "doc3" },
        { name: "Dr. Muneera Al-Dosari", spec: "Skincare Specialist", exp: "+8 years", edu: "Dermatology", img: "doc4" },
      ],
    },
    reviews: {
      tag: "Client Reviews",
      title: "Real Experiences, Exceptional Results",
      items: [
        { name: "Amal Al-Subaei", role: "Laser Treatment", text: "An experience that exceeded my expectations! The results are amazing and the staff is highly professional. Dr. Reem explained every detail patiently. Highly recommended." },
        { name: "Noura Al-Harbi", role: "Filler & Botox", text: "Very natural results and a youthful look without exaggeration. Luxurious atmosphere and refined service from the first moment. Thank you ROSA." },
        { name: "Reem Al-Shammari", role: "Skin Care", text: "My skin changed noticeably after the sessions. The sessions are comfortable and the products are high quality. The best aesthetic clinic I've tried." },
        { name: "Sarah Al-Mutairi", role: "Body Contouring", text: "Contouring results visible from the third session. Periodic follow-up and cooperative staff. An experience worth every riyal." },
        { name: "AlAnoud Al-Qahtani", role: "Teeth Whitening", text: "My smile completely changed! Results exceeded expectations and the staff was professional and caring. Thank you ROSA for this premium experience." },
        { name: "Maha Al-Anzi", role: "Hair Loss Treatment", text: "After 6 sessions I noticed a big difference in hair density. The doctor provided precise follow-up and a clear treatment plan. I recommend it to anyone with the same issue." },
      ],
    },
    booking: {
      tag: "Book Appointment",
      title: "Begin Your Beauty Journey",
      desc: "Fill the form and our team will contact you within 24 hours",
      fields: {
        name: "Full Name",
        namePh: "Your full name",
        phone: "Phone Number",
        phonePh: "05xxxxxxxx",
        email: "Email Address",
        emailPh: "example@email.com",
        service: "Required Service",
        date: "Preferred Date",
        time: "Preferred Time",
        notes: "Additional Notes",
        notesPh: "Tell us about your aesthetic goals",
      },
      submit: "Confirm Booking",
      success: "Request received! We'll contact you soon",
    },
    contact: {
      tag: "Contact Us",
      title: "We're Here To Serve You",
      phone: "Phone",
      email: "Email",
      address: "Address",
      addressV: "Al-Olaya District, Tahlia Street, Riyadh",
      hours: "Working Hours",
      hoursV: "Sat - Thu: 10 AM - 10 PM",
      hoursFri: "Friday: 4 PM - 10 PM",
    },
    footer: { rights: "All Rights Reserved", quick: "Quick Links", services: "Services", contact: "Contact", follow: "Follow Us" },
    legal: {
      company: "ROSA Aesthetic & Dermatology Clinic",
      companyEn: "ROSA Aesthetic & Dermatology Clinic",
      reg: "Phone: +966 57 501 5019",
      vat: "khalid-alharbi@zohomail.sa",
    },
  },
};

// Premium Unsplash images
const IMG = {
  hero: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=85",
  hero2: "https://images.unsplash.com/photo-1616396019462-8280cf4b9b41?w=1920&q=85",
  // Hero model (split layout) — premium beauty model with clear glowing skin
  heroModel: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1400&q=90",
  about: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1400&q=85",
  about2: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=85",
  laser: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=85",
  filler: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=85",
  skincare: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=900&q=85",
  body: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=85",
  surgery: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=900&q=85",
  hair: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=900&q=85",
  doc1: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=85",
  doc2: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=85",
  doc3: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=85",
  doc4: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=85",
  cta: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=85",
  // Booking section background — beautiful Gulf woman
  bookingBg: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1600&q=85",
};

// ============ Animated Counter ============
function Counter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return <span ref={ref}>{inView ? value : "0"}{suffix}</span>;
}

// ============ Reveal animation ============
function Reveal({ children, delay = 0, y = 30, className = "", once = true }: { children: React.ReactNode; delay?: number; y?: number; className?: string; once?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerGroup({ children, className = "", stagger = 0.08 }: { children: React.ReactNode; className?: string; stagger?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : stagger } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "", y = 24 }: { children: React.ReactNode; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============ Main ============
export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [showWA, setShowWA] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", date: "", time: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const t = T[lang];
  const isAR = lang === "ar";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      setShowScroll(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setHeroSlide((p) => (p + 1) % 2), 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveReview((p) => (p + 1) % t.reviews.items.length), 7000);
    return () => clearInterval(interval);
  }, [t.reviews.items.length]);

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroScroll, [0, 0.85], [1, 0]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error(isAR ? "يرجى ملء الحقول المطلوبة" : "Please fill required fields");
      return;
    }
    setSubmitting(true);
    try {
      // Send to API endpoint (logs to Vercel + sends email if RESEND_API_KEY set)
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).catch(() => null); // Non-blocking — fallback to mailto below

      // Open mailto as a guaranteed fallback so the booking reaches the email
      const subject = `حجز موعد جديد - ${form.name}`;
      const body = `الاسم: ${form.name}%0D%0Aالجوال: ${form.phone}%0D%0Aالبريد: ${form.email || "-"}%0D%0Aالخدمة: ${form.service || "-"}%0D%0Aالتاريخ: ${form.date || "-"}%0D%0Aالوقت: ${form.time || "-"}%0D%0Aملاحظات: ${form.notes || "-"}`;
      // Trigger mailto in a hidden iframe so it doesn't navigate away
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = `mailto:khalid-alharbi@zohomail.sa?subject=${encodeURIComponent(subject)}&body=${body}`;
      document.body.appendChild(iframe);
      setTimeout(() => document.body.removeChild(iframe), 1000);
    } catch (err) {
      console.error("Booking submission error:", err);
    }
    setSubmitting(false);
    toast.success(t.booking.success);
    setForm({ name: "", phone: "", email: "", service: "", date: "", time: "", notes: "" });
  };

  const navLinks = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "services", label: t.nav.services },
    { id: "doctors", label: t.nav.doctors },
    { id: "reviews", label: t.nav.reviews },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F0] overflow-x-hidden" dir={t.dir}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800&family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@200;300;400;500;600;700&display=swap');
        * { -webkit-font-smoothing: antialiased; }
        body { font-family: ${isAR ? "'Tajawal', sans-serif" : "'Inter', sans-serif"}; background: ${C.cream}; color: ${C.ink}; font-weight: 300; }
        .font-display { font-family: ${isAR ? "'Tajawal', sans-serif" : "'Cormorant Garamond', serif"}; font-weight: 700; }
        .font-tajawal { font-family: 'Tajawal', sans-serif; }
        .font-serif-en { font-family: 'Cormorant Garamond', serif; }
        .body-thin { font-weight: 300; }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-15px)} }
        @keyframes blob { 0%,100%{border-radius:60% 40% 30% 70% / 60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40% / 50% 60% 30% 60%} }
        @keyframes pulse-ring { 0%{transform:scale(0.95);opacity:1} 100%{transform:scale(1.4);opacity:0} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes shine-sweep { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px rgba(184,150,90,0.3)} 50%{box-shadow:0 0 40px rgba(184,150,90,0.6)} }
        @keyframes fade-in-up { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes zoom-fade { from{opacity:0;transform:scale(1.1)} to{opacity:1;transform:scale(1)} }
        @keyframes slide-in-right { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes bounce-subtle { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes gradient-shift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-blob { animation: blob 10s ease-in-out infinite; }
        .animate-marquee { animation: marquee 40s linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-zoom-fade { animation: zoom-fade 1s ease-out forwards; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .gradient-animate { background-size: 200% 200%; animation: gradient-shift 4s ease infinite; }

        /* Shimmer sweep overlay on images */
        .img-shimmer { position: relative; overflow: hidden; }
        .img-shimmer::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.8s ease;
        }
        .img-shimmer:hover::after { transform: translateX(100%); }

        .glass { background: rgba(255,255,255,0.75); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .glass-cream { background: rgba(248,245,240,0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .glass-dark { background: rgba(33,33,33,0.55); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }

        .text-gradient-gold {
          background: linear-gradient(135deg, ${C.gold}, ${C.goldSoft}, ${C.gold});
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .text-gradient-rose {
          background: linear-gradient(135deg, ${C.gold}, ${C.rose});
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .shimmer-text {
          background: linear-gradient(90deg, ${C.gold}, ${C.goldSoft}, ${C.gold});
          background-size: 200% auto; -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; animation: shimmer 4s linear infinite;
        }

        .card-luxury {
          transition: all 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .card-luxury:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px -15px rgba(184,150,90,0.2), 0 0 0 1px rgba(184,150,90,0.1);
        }

        .btn-gold {
          background: linear-gradient(135deg, ${C.gold}, ${C.goldDeep});
          color: white;
          transition: all 0.3s;
        }
        .btn-gold:hover {
          background: linear-gradient(135deg, ${C.goldSoft}, ${C.gold});
          box-shadow: 0 15px 30px -8px rgba(184,150,90,0.4);
        }
        .btn-ghost {
          background: transparent;
          color: ${C.ink};
          border: 1px solid ${C.gold};
          transition: all 0.3s;
        }
        .btn-ghost:hover {
          background: ${C.gold};
          color: white;
        }

        .divider-gold {
          background: linear-gradient(90deg, transparent, ${C.gold}, transparent);
        }

        select option { color: ${C.ink} !important; background: ${C.cream} !important; }
        input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; }

        /* Smooth scrolling */
        html { scroll-behavior: smooth; }

        /* Image fade-in */
        img { transition: opacity 0.4s ease; }
      `}</style>

      {/* ===== Utility Bar — Darker brown ===== */}
      <div className="bg-[#1A0F08] text-[#D4A843]/90 text-xs py-2.5 px-4 hidden md:block border-b border-[#b8965a]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a href="tel:+966575015019" className="flex items-center gap-1.5 hover:text-[#D4A843] transition">
              <Phone className="w-3.5 h-3.5" /> <span dir="ltr">+966 57 501 5019</span>
            </a>
            <a href="mailto:khalid-alharbi@zohomail.sa" className="flex items-center gap-1.5 hover:text-[#D4A843] transition">
              <Mail className="w-3.5 h-3.5" /> khalid-alharbi@zohomail.sa
            </a>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {isAR ? "سبت-خميس 10ص-10م" : "Sat-Thu 10AM-10PM"}
            </span>
          </div>
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="hover:text-[#D4A843] transition flex items-center gap-1 font-bold">
            <Globe className="w-3.5 h-3.5" /> {lang === "ar" ? "EN" : "عربي"}
          </button>
        </div>
      </div>

      {/* ===== Navbar — Dark brown header with bold white nav text ===== */}
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: "rgba(45, 30, 20, 0.98)",
          boxShadow: scrolled ? "0 8px 32px -8px rgba(0,0,0,0.4)" : "0 4px 20px -4px rgba(0,0,0,0.2)",
          paddingTop: scrolled ? 14 : 20,
          paddingBottom: scrolled ? 14 : 20,
        }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-3 items-center">
          {/* Logo — far right in RTL */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollTo("home")}
            className={`flex items-center gap-2 group ${isAR ? "justify-start" : "justify-start"}`}
          >
            <motion.img
              src="/logo.png"
              alt="ROSA Clinic Logo"
              className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-lg"
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>

          {/* Nav links — centered, bold white text */}
          <div className="hidden lg:flex items-center justify-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="relative text-white hover:text-[#D4A843] font-bold text-sm tracking-wide transition group py-1"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#D4A843] group-hover:w-full transition-all duration-400" />
              </button>
            ))}
          </div>

          {/* CTA button — far left in RTL */}
          <div className={`flex items-center ${isAR ? "justify-end" : "justify-end"}`}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo("booking")}
              className="btn-gold hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold tracking-wide shadow-md shadow-[#b8965a]/30"
            >
              <Calendar className="w-4 h-4" /> {t.utility.appt}
            </motion.button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-white">
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
              className="lg:hidden bg-[#2D1E14] border-t border-[#b8965a]/20 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className="text-right py-3 px-4 rounded-2xl hover:bg-[#b8965a]/20 text-white hover:text-[#D4A843] font-bold transition"
                  >
                    {l.label}
                  </button>
                ))}
                <button
                  onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                  className="text-right py-3 px-4 rounded-2xl hover:bg-[#b8965a]/20 text-white hover:text-[#D4A843] font-bold flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" /> {lang === "ar" ? "English" : "العربية"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ===== Hero — Split layout (text + model image) ===== */}
      <section id="home" ref={heroRef} className="relative min-h-[92vh] overflow-hidden bg-[#F8F5F0]">
        {/* Soft decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8F5F0] via-[#f1ebe0] to-[#e8dcc8]" />
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-[#b8965a]/10 blur-3xl animate-float" />
        <div className="absolute bottom-32 left-32 w-80 h-80 rounded-full bg-[#c9a0a0]/12 blur-3xl animate-blob" />

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#b8965a]/40"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${5 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}

        <motion.div style={{ opacity: heroOpacity }} className="relative max-w-7xl mx-auto px-6 lg:px-8 min-h-[92vh] grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20">
          {/* Right column (text) — visually right in RTL = text side */}
          <div className={`order-1 ${isAR ? "text-right lg:order-1" : "text-left lg:order-1"}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-[#b8965a]/30 text-[#8a6d3b] px-5 py-2.5 rounded-full text-sm font-medium mb-6 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#b8965a] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b8965a]" />
              </span>
              <Sparkles className="w-4 h-4" /> {t.hero.tag}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className={`text-5xl md:text-6xl lg:text-7xl font-bold text-[#212121] leading-[1.1] mb-6 ${isAR ? "font-tajawal" : "font-display"}`}
            >
              {t.hero.title1}
              <br />
              <span className="shimmer-text">{t.hero.title2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-[#333333]/75 mb-10 leading-[1.8] font-light max-w-xl"
            >
              {t.hero.desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("booking")}
                className="btn-gold text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl shadow-[#b8965a]/30 flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" /> {t.hero.cta1}
                {isAR ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("services")}
                className="btn-ghost px-8 py-4 rounded-2xl font-medium text-lg flex items-center gap-2"
              >
                <Play className="w-5 h-5" /> {t.hero.cta2}
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-6 border-t border-[#b8965a]/20"
            >
              {t.hero.stats.map((s, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-bold shimmer-text mb-1">
                    <Counter value={s.v} />
                  </div>
                  <div className="text-[#7a6f63] text-xs md:text-sm">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Left column (model image) — visually left in RTL = image side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: isAR ? 30 : -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Decorative frame */}
              <div className="absolute -top-5 -right-5 w-32 h-32 border border-[#b8965a]/40 rounded-3xl" />
              <div className="absolute -bottom-5 -left-5 w-40 h-40 bg-gradient-to-br from-[#b8965a]/15 to-[#c9a0a0]/10 rounded-3xl" />

              {/* Main image */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5]">
                <motion.img
                  src={IMG.heroModel}
                  alt="Beauty Model"
                  className="w-full h-full object-cover"
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/30 via-transparent to-transparent" />
              </div>

              {/* Floating badge card — top */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-[180px] animate-float"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#b8965a] to-[#8a6d3b] flex items-center justify-center">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-[#212121]">4.9/5</div>
                  <div className="text-xs text-[#7a6f63]">{isAR ? "+2000 تقييم" : "+2000 Reviews"}</div>
                </div>
              </motion.div>

              {/* Floating badge card — bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-3"
                style={{ animation: "float 6s ease-in-out infinite", animationDelay: "1s" }}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#c9a0a0] to-[#b8965a] flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#212121]">{isAR ? "خبرة معتمدة" : "Certified"}</div>
                  <div className="text-xs text-[#7a6f63]">{isAR ? "+15 سنة" : "+15 Years"}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-20"
        >
          <div className="w-6 h-10 rounded-full border-2 border-[#b8965a]/40 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[#b8965a]"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== Marquee strip ===== */}
      <div className="bg-[#212121] border-y border-[#b8965a]/15 py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-12 px-6">
              {[
                { icon: Crown, t: isAR ? "فخامة بمعايير عالمية" : "World-Class Luxury" },
                { icon: Award, t: isAR ? "+15 سنة خبرة" : "+15 Years Experience" },
                { icon: Sparkles, t: isAR ? "أحدث التقنيات" : "Latest Technologies" },
                { icon: Heart, t: isAR ? "رعاية مخصصة" : "Personalized Care" },
                { icon: ShieldCheck, t: isAR ? "خصوصية تامة" : "Full Privacy" },
                { icon: Gem, t: isAR ? "نتائج استثنائية" : "Exceptional Results" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[#d4b888]">
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-semibold tracking-wide">{item.t}</span>
                  <span className="text-white/20">•</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ===== About ===== */}
      <section id="about" className="py-32 lg:py-40 bg-[#F8F5F0] relative overflow-hidden">
        {/* Watermark logo */}
        <img src="/logo.png" alt="" aria-hidden className="absolute top-10 left-10 w-16 h-16 opacity-10 pointer-events-none rotate-12" />
        <div className="absolute top-40 right-0 w-72 h-72 rounded-full bg-[#b8965a]/8 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c9a0a0]/8 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-32 h-32 border border-[#b8965a]/30 rounded-3xl animate-float" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#b8965a]/15 to-transparent rounded-3xl animate-blob" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-[2.5rem] overflow-hidden shadow-2xl img-shimmer group"
                >
                  <motion.img
                    loading="lazy"
                    src="/whyus-hijab.png"
                    alt={isAR ? "لماذا تختارين عيادة روزا" : "Why choose ROSA Clinic"}
                    className="w-full h-[560px] object-cover"
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/50 via-transparent to-transparent" />
                  {/* Shimmer sweep */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute -bottom-8 right-8 bg-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 animate-float"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#b8965a] to-[#8a6d3b] flex items-center justify-center">
                    <Crown className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#212121]">+15</div>
                    <div className="text-sm text-[#212121]/60">{isAR ? "سنة من التميز" : "Years of Excellence"}</div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-6 -left-6 w-36 h-36 rounded-3xl overflow-hidden shadow-2xl border-4 border-white hidden lg:block animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <img loading="lazy" src={IMG.about2} alt="Detail" className="w-full h-full object-cover" />
                </motion.div>
                {/* Floating badge — top left */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, type: "spring" }}
                  className="absolute top-6 left-6 glass border border-white/40 text-[#212121] px-4 py-2 rounded-full text-sm font-semibold shadow-md"
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#b8965a]" /> {isAR ? "كادر طبي محترم" : "Respectful Staff"}
                  </span>
                </motion.div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="inline-flex items-center gap-2 bg-[#b8965a]/10 text-[#8a6d3b] px-4 py-2 rounded-full text-sm font-medium mb-5">
                <Sparkles className="w-4 h-4" /> {t.about.tag}
              </div>
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#212121] leading-[1.15] mb-8 ${isAR ? "font-tajawal" : "font-display"}`}>
                {t.about.title}
              </h2>
              <p className="text-[#333333]/80 text-lg leading-[1.9] font-light mb-4">{t.about.p1}</p>
              <p className="text-[#333333]/80 text-lg leading-[1.9] font-light mb-8">{t.about.p2}</p>

              <StaggerGroup className="grid sm:grid-cols-2 gap-4" stagger={0.08}>
                {t.about.features.map((f, i) => (
                  <StaggerItem key={i}>
                    <motion.div
                      whileHover={{ scale: 1.03, y: -3 }}
                      className="flex items-start gap-3 p-5 rounded-2xl bg-white shadow-sm hover:shadow-xl transition group cursor-default"
                    >
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#b8965a]/15 to-[#b8965a]/5 flex items-center justify-center flex-shrink-0 group-hover:from-[#b8965a] group-hover:to-[#8a6d3b] transition">
                        <f.icon className="w-5 h-5 text-[#8a6d3b] group-hover:text-white transition" />
                      </div>
                      <div>
                        <div className="font-bold text-[#212121] mb-1">{f.t}</div>
                        <div className="text-sm text-[#7a6f63]">{f.d}</div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Specialties / متخصصون في التجميل بخبرة طبية ===== */}
      <section id="specialties" className="py-32 lg:py-40 relative overflow-hidden bg-gradient-to-br from-[#D4A843] via-[#C9A227] to-[#B8965A]">
        {/* Watermark logo */}
        <img src="/logo.png" alt="" aria-hidden className="absolute top-10 right-10 w-20 h-20 opacity-15 pointer-events-none -rotate-12" />
        {/* Decorative animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-white/10 blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#8A6D3B]/30 blur-3xl animate-blob" />
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/40"
            style={{
              left: `${8 + i * 11}%`,
              top: `${15 + (i % 4) * 22}%`,
              animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}

        <div className="relative max-w-7xl mx-auto px-4">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 glass border border-white/40 text-[#212121] px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-md">
              <Sparkles className="w-4 h-4" /> {isAR ? "متخصصون في التجميل" : "Aesthetic Specialists"}
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#212121] mb-4 leading-tight ${isAR ? "font-tajawal" : "font-display"}`}>
              {isAR ? "متخصصون في التجميل بخبرة طبية" : "Specialists in Medical Aesthetics"}
            </h2>
            <div className="w-20 h-px divider-gold mx-auto mb-4" />
            <p className="text-[#212121]/80 text-lg font-light">
              {isAR ? "فريق طبي متخصص يقدم أحدث العلاجات التجميلية والجلدية بأعلى معايير الجودة والأمان" : "A specialized medical team offering the latest aesthetic and dermatology treatments with the highest quality and safety standards"}
            </p>
          </Reveal>

          <StaggerGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" stagger={0.1}>
            {[
              { img: "/service-derma.png", t: isAR ? "الجلدية والتجميل" : "Dermatology & Aesthetics", d: isAR ? "علاج جميع مشاكل البشرة" : "Treat all skin issues" },
              { img: "/service-body.png", t: isAR ? "تنسيق القوام" : "Body Contouring", d: isAR ? "نحت الجسم وإذابة الدهون" : "Body sculpting & fat reduction" },
              { img: "/service-nutrition.png", t: isAR ? "التغذية العلاجية" : "Clinical Nutrition", d: isAR ? "خطط غذائية مخصصة" : "Customized nutrition plans" },
              { img: "/service-physio.png", t: isAR ? "العلاج الطبيعي" : "Physical Therapy", d: isAR ? "تأهيل وعلاج الآلام" : "Rehabilitation & pain relief" },
              { img: "/service-hijama.png", t: isAR ? "الحجامة" : "Cupping Therapy", d: isAR ? "علاج بالطب النبوي" : "Prophetic medicine therapy" },
            ].map((s, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="group bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl card-luxury cursor-pointer h-full border border-white/60"
                >
                  <div className="relative aspect-square overflow-hidden img-shimmer">
                    <motion.img
                      src={s.img}
                      alt={s.t}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.15 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      whileHover={{ scale: 1.18 }}
                    />
                    {/* Golden glow overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D4A843]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Shimmer sweep */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-[#212121] text-sm md:text-base mb-1">{s.t}</h3>
                    <p className="text-[#7a6f63] text-xs">{s.d}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section id="services" className="py-32 lg:py-40 bg-white relative overflow-hidden">
        {/* Watermark logo */}
        <img src="/logo.png" alt="" aria-hidden className="absolute top-10 left-10 w-16 h-16 opacity-10 pointer-events-none rotate-12" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-[#b8965a]/5 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#b8965a]/10 text-[#8a6d3b] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Gem className="w-4 h-4" /> {t.services.tag}
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#212121] mb-4 ${isAR ? "font-tajawal" : "font-display"}`}>{t.services.title}</h2>
            <div className="w-20 h-px divider-gold mx-auto mb-4" />
            <p className="text-[#7a6f63] text-lg">{t.services.desc}</p>
          </Reveal>

          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
            {t.services.items.map((s) => {
              const Icon = s.icon;
              const img = (IMG as any)[s.img];
              return (
                <StaggerItem key={s.t}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl card-luxury cursor-pointer h-full border border-[#b8965a]/8"
                  >
                    <div className="relative h-56 overflow-hidden img-shimmer">
                      <motion.img
                        src={img}
                        alt={s.t}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        whileHover={{ scale: 1.15 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/85 via-[#212121]/25 to-transparent" />
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:bg-gradient-to-br group-hover:from-[#b8965a] group-hover:to-[#8a6d3b] transition-all duration-300">
                        <Icon className="w-6 h-6 text-[#8a6d3b] group-hover:text-white transition" />
                      </div>
                      <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white">{s.t}</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-[#7a6f63] text-sm leading-relaxed mb-4">{s.d}</p>
                      <button
                        onClick={() => scrollTo("booking")}
                        className="text-[#8a6d3b] text-sm font-semibold flex items-center gap-1 group-hover:gap-3 transition-all"
                      >
                        {isAR ? "احجزي الآن" : "Book Now"} {isAR ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="relative py-32 lg:py-40 overflow-hidden bg-[#212121]">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 10 }}
          className="absolute inset-0"
        >
          <img loading="lazy" src={IMG.cta} alt="CTA" className="w-full h-full object-cover opacity-25" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#212121] via-[#212121]/80 to-[#212121]/60" />
        <Reveal className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="inline-flex w-20 h-20 rounded-full bg-gradient-to-br from-[#b8965a] to-[#8a6d3b] items-center justify-center mb-6 shadow-2xl"
          >
            <Crown className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight ${isAR ? "font-tajawal" : "font-display"}`}>
            {isAR ? "استثمري في جمالكِ" : "Invest in Your Beauty"}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {isAR ? "احجزي استشارتكِ الأولى مع نخبة من استشاريي التجميل واكتشفي خيارات العناية المثالية لكِ" : "Book your first consultation with elite aesthetic consultants and discover your perfect care options"}
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("booking")}
            className="btn-gold text-white px-10 py-4 rounded-full font-semibold text-lg shadow-2xl inline-flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" /> {t.utility.appt}
          </motion.button>
        </Reveal>
      </section>

      {/* ===== Doctors ===== */}
      <section id="doctors" className="py-32 lg:py-40 bg-[#F8F5F0] relative overflow-hidden">
        {/* Watermark logo */}
        <img src="/logo.png" alt="" aria-hidden className="absolute top-10 right-10 w-16 h-16 opacity-10 pointer-events-none -rotate-12" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#b8965a]/5 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#b8965a]/10 text-[#8a6d3b] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" /> {t.doctors.tag}
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#212121] mb-4 ${isAR ? "font-tajawal" : "font-display"}`}>{t.doctors.title}</h2>
            <div className="w-20 h-px divider-gold mx-auto mb-4" />
            <p className="text-[#7a6f63] text-lg">{t.doctors.desc}</p>
          </Reveal>

          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.08}>
            {t.doctors.items.map((d) => {
              const img = (IMG as any)[d.img];
              return (
                <StaggerItem key={d.name}>
                  <motion.div whileHover={{ y: -8 }} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl card-luxury cursor-pointer h-full border border-[#b8965a]/8">
                    <div className="relative h-80 overflow-hidden img-shimmer">
                      <motion.img
                        loading="lazy"
                        src={img}
                        alt={d.name}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        whileHover={{ scale: 1.12 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/90 via-[#212121]/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-gradient-to-r from-[#b8965a] to-[#8a6d3b] text-white text-xs font-medium px-3 py-1.5 rounded-full inline-block shadow-lg">{d.exp}</div>
                      </div>
                      <div className="absolute inset-0 bg-[#212121]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <motion.button
                          onClick={() => scrollTo("booking")}
                          className="bg-white text-[#212121] px-6 py-3 rounded-full font-semibold shadow-xl transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2"
                        >
                          <Calendar className="w-4 h-4" /> {isAR ? `احجزي مع ${d.name.split(" ")[1]}` : `Book with ${d.name.split(" ")[1]}`}
                        </motion.button>
                      </div>
                    </div>
                    <div className="p-5 text-center">
                      <h3 className="text-lg font-bold text-[#212121] mb-1">{d.name}</h3>
                      <p className="text-[#b8965a] text-sm font-medium mb-2">{d.spec}</p>
                      <p className="text-[#7a6f63] text-xs flex items-center justify-center gap-1.5">
                        <Award className="w-3 h-3" /> {d.edu}
                      </p>
                      <div className="flex items-center justify-center gap-1 mt-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-3.5 h-3.5 fill-[#b8965a] text-[#b8965a]" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* ===== Reviews ===== */}
      <section id="reviews" className="py-32 lg:py-40 bg-white relative overflow-hidden">
        {/* Watermark logo */}
        <img src="/logo.png" alt="" aria-hidden className="absolute top-10 left-10 w-16 h-16 opacity-10 pointer-events-none rotate-12" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#c9a0a0]/10 blur-3xl rounded-full" />
        <div className="max-w-4xl mx-auto px-4 relative">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#b8965a]/10 text-[#8a6d3b] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" /> {t.reviews.tag}
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#212121] mb-4 ${isAR ? "font-tajawal" : "font-display"}`}>{t.reviews.title}</h2>
            <div className="w-20 h-px divider-gold mx-auto" />
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative bg-[#F8F5F0] rounded-3xl p-8 md:p-12 shadow-lg">
              <Quote className="absolute top-6 left-6 w-16 h-16 text-[#b8965a]/15" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReview}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="flex items-center gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-5 h-5 fill-[#b8965a] text-[#b8965a]" />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl text-[#212121] leading-relaxed mb-8 font-medium">
                    "{t.reviews.items[activeReview].text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#b8965a] to-[#8a6d3b] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {t.reviews.items[activeReview].name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-[#212121] text-lg">{t.reviews.items[activeReview].name}</div>
                      <div className="text-sm text-[#b8965a]">{t.reviews.items[activeReview].role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-center gap-2 mt-8">
                {t.reviews.items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveReview(i)}
                    className={`h-2 rounded-full transition-all ${activeReview === i ? "w-8 bg-[#b8965a]" : "w-2 bg-[#212121]/15"}`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Booking — Split layout: model image + form, golden luxury bg ===== */}
      <section id="booking" className="py-32 lg:py-40 relative overflow-hidden bg-gradient-to-br from-[#D4A843] via-[#C9A227] to-[#B8965A]">
        {/* Watermark logo */}
        <img src="/logo.png" alt="" aria-hidden className="absolute top-10 right-10 w-20 h-20 opacity-20 pointer-events-none -rotate-12" />
        {/* Decorative animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-white/10 blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#8A6D3B]/30 blur-3xl animate-blob" />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-[#F8F5F0]/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/40"
            style={{
              left: `${8 + i * 11}%`,
              top: `${15 + (i % 4) * 22}%`,
              animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column — Form */}
            <div className="order-2 lg:order-1">
              <Reveal>
                <div className="inline-flex items-center gap-2 glass border border-white/40 text-[#212121] px-4 py-2 rounded-full text-sm font-semibold mb-5 shadow-md">
                  <Calendar className="w-4 h-4" /> {t.booking.tag}
                </div>
                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#212121] mb-3 leading-tight ${isAR ? "font-tajawal" : "font-display"}`}>{t.booking.title}</h2>
                <p className="text-[#212121]/75 text-lg mb-8 font-light">{t.booking.desc}</p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl p-6 md:p-8 border border-white/60" style={{ direction: isAR ? "rtl" : "ltr" }}>
                  <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label className="font-semibold text-[#212121] mb-2 block flex items-center gap-1.5 text-sm">
                      <User className="w-4 h-4 text-[#b8965a]" /> {t.booking.fields.name} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      required
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t.booking.fields.namePh}
                      className="bg-[#F8F5F0] border-2 border-[#b8965a]/15 focus:border-[#b8965a] rounded-xl py-3 h-12 text-[#212121] placeholder:text-[#7a6f63] focus-visible:ring-0"
                      style={{ color: "#212121", caretColor: "#b8965a" }}
                    />
                  </div>
                  <div>
                    <Label className="font-semibold text-[#212121] mb-2 block flex items-center gap-1.5 text-sm">
                      <Phone className="w-4 h-4 text-[#b8965a]" /> {t.booking.fields.phone} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="tel"
                      required
                      name="phone"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder={t.booking.fields.phonePh}
                      className="bg-[#F8F5F0] border-2 border-[#b8965a]/15 focus:border-[#b8965a] rounded-xl py-3 h-12 text-[#212121] placeholder:text-[#7a6f63] focus-visible:ring-0"
                      style={{ color: "#212121", caretColor: "#b8965a" }}
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <Label className="font-semibold text-[#212121] mb-2 block flex items-center gap-1.5 text-sm">
                      <Mail className="w-4 h-4 text-[#b8965a]" /> {t.booking.fields.email}
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder={t.booking.fields.emailPh}
                      className="bg-[#F8F5F0] border-2 border-[#b8965a]/15 focus:border-[#b8965a] rounded-xl py-3 h-12 text-[#212121] placeholder:text-[#7a6f63] focus-visible:ring-0"
                      style={{ color: "#212121", caretColor: "#b8965a" }}
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <Label className="font-semibold text-[#212121] mb-2 block flex items-center gap-1.5 text-sm">
                      <FileText className="w-4 h-4 text-[#b8965a]" /> {t.booking.fields.service}
                    </Label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-[#F8F5F0] border-2 border-[#b8965a]/15 focus:border-[#b8965a] text-[#212121] rounded-xl py-3 px-3 h-12 focus:outline-none focus:ring-0 font-medium cursor-pointer"
                      style={{ color: "#212121" }}
                    >
                      <option value="">{isAR ? "اختاري الخدمة" : "Select Service"}</option>
                      {t.services.items.map((s, i) => (
                        <option key={i} value={s.t}>{s.t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label className="font-semibold text-[#212121] mb-2 block flex items-center gap-1.5 text-sm">
                      <Calendar className="w-4 h-4 text-[#b8965a]" /> {t.booking.fields.date}
                    </Label>
                    <Input
                      type="date"
                      name="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="bg-[#F8F5F0] border-2 border-[#b8965a]/15 focus:border-[#b8965a] rounded-xl py-3 h-12 text-[#212121] focus-visible:ring-0"
                      style={{ color: "#212121" }}
                    />
                  </div>
                  <div>
                    <Label className="font-semibold text-[#212121] mb-2 block flex items-center gap-1.5 text-sm">
                      <Clock className="w-4 h-4 text-[#b8965a]" /> {t.booking.fields.time}
                    </Label>
                    <select
                      name="time"
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      className="w-full bg-[#F8F5F0] border-2 border-[#b8965a]/15 focus:border-[#b8965a] text-[#212121] rounded-xl py-3 px-3 h-12 focus:outline-none focus:ring-0 font-medium cursor-pointer"
                      style={{ color: "#212121" }}
                    >
                      <option value="">{isAR ? "اختاري الوقت" : "Select Time"}</option>
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

                <div>
                  <Label className="font-semibold text-[#212121] mb-2 block flex items-center gap-1.5 text-sm">
                    <FileText className="w-4 h-4 text-[#b8965a]" /> {t.booking.fields.notes}
                  </Label>
                  <Textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder={t.booking.fields.notesPh}
                    rows={3}
                    className="bg-[#F8F5F0] border-2 border-[#b8965a]/15 focus:border-[#b8965a] rounded-xl py-3 text-[#212121] placeholder:text-[#7a6f63] focus-visible:ring-0 resize-none"
                    style={{ color: "#212121", caretColor: "#b8965a" }}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-gold border-0 py-4 h-14 rounded-xl text-lg font-semibold shadow-lg shadow-[#b8965a]/30 disabled:opacity-60 hover:shadow-xl"
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
            </div>
          </Reveal>
        </div>

            {/* Right column — Model image with animations */}
            <div className="order-1 lg:order-2 relative">
              <Reveal delay={0.3}>
                <div className="relative">
                  {/* Decorative frame */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="absolute -top-6 -right-6 w-32 h-32 border-2 border-white/40 rounded-3xl"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="absolute -bottom-6 -left-6 w-40 h-40 bg-white/20 backdrop-blur-sm rounded-3xl"
                  />

                  {/* Main image with shimmer effect */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] group"
                  >
                    <motion.img
                      src="/booking-model.jpg"
                      alt={isAR ? "ابدئي رحلتك نحو الجمال" : "Begin your beauty journey"}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/40 via-transparent to-transparent" />
                    {/* Shimmer sweep */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                    />
                  </motion.div>

                  {/* Floating badge — top */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -top-4 -left-4 bg-white p-3 rounded-2xl shadow-2xl flex items-center gap-2.5"
                    style={{ animation: "float 5s ease-in-out infinite" }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#b8965a] to-[#8a6d3b] flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#212121]">{isAR ? "نتائج فورية" : "Instant Results"}</div>
                      <div className="text-xs text-[#7a6f63]">{isAR ? "مضمونة" : "Guaranteed"}</div>
                    </div>
                  </motion.div>

                  {/* Floating badge — bottom */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, type: "spring" }}
                    className="absolute -bottom-4 -right-4 bg-white p-3 rounded-2xl shadow-2xl flex items-center gap-2.5"
                    style={{ animation: "float 6s ease-in-out infinite", animationDelay: "1s" }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c9a0a0] to-[#b8965a] flex items-center justify-center">
                      <Crown className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#212121]">{isAR ? "خبرة +15 سنة" : "+15 Years"}</div>
                      <div className="text-xs text-[#7a6f63]">{isAR ? "استشاريون" : "Consultants"}</div>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" className="py-32 lg:py-40 bg-[#F8F5F0] relative overflow-hidden">
        {/* Watermark logo */}
        <img src="/logo.png" alt="" aria-hidden className="absolute top-10 left-10 w-16 h-16 opacity-10 pointer-events-none rotate-12" />
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#b8965a]/10 text-[#8a6d3b] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MapPin className="w-4 h-4" /> {t.contact.tag}
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#212121] mb-4 ${isAR ? "font-tajawal" : "font-display"}`}>{t.contact.title}</h2>
            <div className="w-20 h-px divider-gold mx-auto" />
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12">
            <Reveal>
              <div className="space-y-4">
                {[
                  { icon: Phone, t: t.contact.phone, v: "+966 57 501 5019", href: "tel:+966575015019" },
                  { icon: Mail, t: t.contact.email, v: "khalid-alharbi@zohomail.sa", href: "mailto:khalid-alharbi@zohomail.sa" },
                  { icon: MapPin, t: t.contact.address, v: t.contact.addressV },
                  { icon: Clock, t: t.contact.hours, v: t.contact.hoursV },
                  { icon: Clock, t: t.contact.hours, v: t.contact.hoursFri },
                ].map((item, i) => (
                  <Reveal key={i} delay={0.08 * i}>
                    <a href={item.href || "#"} className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-lg transition group block">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#b8965a] to-[#8a6d3b] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-[#7a6f63] text-sm mb-1">{item.t}</div>
                        <div className="text-[#212121] font-bold" dir={item.icon === Phone || item.icon === Mail ? "ltr" : "auto"}>{item.v}</div>
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-3xl overflow-hidden shadow-2xl h-full min-h-[450px] bg-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.6!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMCJF!5e0!3m2!1sar!2ssa!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "450px" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-[#212121] text-white pt-16 pb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px divider-gold" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-1">
              <motion.img
                src="/logo.png"
                alt="ROSA Clinic Logo"
                className="w-20 h-20 object-contain drop-shadow-lg mb-3"
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ duration: 0.4 }}
              />
              <div className="text-xs text-[#b8965a] tracking-[0.25em] uppercase mb-3">{t.brand.sub}</div>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                {isAR ? "عيادة تجميل وجراحة جلدية راقية، نقدم أحدث العلاجات بأيدي نخبة الاستشاريين في أجواء فاخرة" : "Premium aesthetic and dermatology clinic, offering the latest treatments by elite consultants in a luxurious atmosphere"}
              </p>
              <div>
                <div className="text-xs text-white/50 mb-3 font-semibold">{t.footer.follow}</div>
                <div className="flex items-center gap-2">
                  {[
                    { icon: Instagram, url: "https://instagram.com/rosa_clinic", color: "#E1306C" },
                    { icon: Facebook, url: "https://facebook.com/rosaclinic", color: "#1877F2" },
                    { icon: Twitter, url: "https://twitter.com/rosa_clinic", color: "#1DA1F2" },
                    { icon: Youtube, url: "https://youtube.com/@rosaclinic", color: "#FF0000" },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Social media link"
                      className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition"
                      onMouseEnter={(e) => (e.currentTarget.style.color = s.color)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                    >
                      <s.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#b8965a] mb-4">{t.footer.quick}</h4>
              <div className="space-y-2">
                {navLinks.map((l) => (
                  <button key={l.id} onClick={() => scrollTo(l.id)} className="block text-white/60 hover:text-[#d4b888] text-sm transition text-right">
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#b8965a] mb-4">{t.footer.services}</h4>
              <div className="space-y-2">
                {t.services.items.slice(0, 5).map((s, i) => (
                  <button key={i} onClick={() => scrollTo("services")} className="block text-white/60 hover:text-[#d4b888] text-sm transition text-right">
                    {s.t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#b8965a] mb-4">{t.footer.contact}</h4>
              <div className="space-y-3">
                <a href="tel:+966575015019" className="flex items-center gap-2 text-white/60 hover:text-[#d4b888] text-sm transition group" dir="ltr">
                  <Phone className="w-4 h-4 group-hover:scale-110 transition" /> +966 57 501 5019
                </a>
                <a href="mailto:khalid-alharbi@zohomail.sa" className="flex items-center gap-2 text-white/60 hover:text-[#d4b888] text-sm transition group" dir="ltr">
                  <Mail className="w-4 h-4 group-hover:scale-110 transition" /> khalid-alharbi@zohomail.sa
                </a>
                <div className="flex items-start gap-2 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> {t.contact.addressV}
                </div>
                <div className="flex items-start gap-2 text-white/60 text-sm">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" /> {t.contact.hoursV}
                </div>
                <div className="flex items-start gap-2 text-white/60 text-sm">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" /> {t.contact.hoursFri}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 pb-4">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/50 mb-3">
              <span className="font-semibold text-white/70">{t.legal.company}</span>
              <span className="text-white/30">•</span>
              <span dir="ltr">{t.legal.companyEn}</span>
              <span className="text-white/30">•</span>
              <span>{t.legal.reg}</span>
              <span className="text-white/30">•</span>
              <span>{t.legal.vat}</span>
            </div>
            <div className="text-center text-white/40 text-sm">
              © {new Date().getFullYear()} {isAR ? "عيادة روزا" : "ROSA Clinic"} — {t.footer.rights}
            </div>
          </div>
        </div>
      </footer>

      {/* ===== Floating buttons ===== */}
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
              className="w-12 h-12 rounded-full bg-[#212121] text-[#d4b888] shadow-xl flex items-center justify-center"
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
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
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
                  <div className="font-bold text-[#212121] text-sm">{isAR ? "واتساب" : "WhatsApp"}</div>
                  <div className="text-xs text-green-600">● Online</div>
                </div>
              </div>
              <p className="text-sm text-[#212121]/70 mb-4">
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
