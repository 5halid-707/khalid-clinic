"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, Menu, X, Globe, ChevronDown,
  Calendar, MessageCircle, Send, Star, CheckCircle2, ArrowUp,
  Sparkles, Activity, Bone, Heart, Stethoscope, Award, Users,
  Smile, TrendingUp, ShieldCheck, Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const SITE_URL = "https://khalid-cyber-security.vercel.app/";
const GOLD = "#e0b449";
const DARK = "#1a0f0a";

// Scroll reveal helper
function Reveal({ children, delay = 0, y = 40, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
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
  const [slide, setSlide] = useState(0);
  const [showWA, setShowWA] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);
  const isRTL = lang === "ar";

  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.scrollY > 500);
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % 3), 6000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    { img: "/clinic/hero1.jpg", title: t("متخصصون في التجميل بخبرة طبية", "Specialized in Aesthetic Medicine"), sub: t("رعاية صحية متكاملة بأحدث التقنيات", "Comprehensive care with latest technology") },
    { img: "/clinic/hero2.jpg", title: t("نحن نهتم بصحتك وجمالك", "We Care About Your Health & Beauty"), sub: t("فريق طبي متخصص بأحدث الأجهزة", "Specialized medical team with modern equipment") },
    { img: "/clinic/hero3.jpg", title: t("أحدث التقنيات الطبية بين يديك", "Latest Medical Technologies at Your Service"), sub: t("خبرة تتجاوز 15 عاماً", "Over 15 years of experience") },
  ];

  const services = [
    { img: "/clinic/derma.jpg", icon: Sparkles, title: t("الجلدية والتجميل", "Dermatology & Aesthetics"), desc: t("علاجات البشرة، البوتوكس، الفيلر، الليزر، التقشير البارد", "Skin treatments, Botox, Fillers, Laser, Cold Peeling") },
    { img: "/clinic/nutrition.jpg", icon: TrendingUp, title: t("التغذية العلاجية", "Clinical Nutrition"), desc: t("برامج تغذية مخصصة لكل حالة صحية", "Customized nutrition programs") },
    { img: "/clinic/physio.jpg", icon: Bone, title: t("العلاج الطبيعي", "Physiotherapy"), desc: t("إعادة تأهيل وعلاج آلام المفاصل والعمود الفقري", "Rehabilitation & joint/spine pain treatment") },
    { img: "/clinic/body.jpg", icon: Heart, title: t("تنسيق القوام", "Body Contouring"), desc: t("تقنيات حديثة لنحت الجسم وإزالة الدهون", "Modern body sculpting techniques") },
    { img: "/clinic/hijama.jpg", icon: Stethoscope, title: t("الحجامة", "Hijama"), desc: t("حجامة علاجية بطريقة آمنة ومتخصصة", "Therapeutic cupping, safe & specialized") },
    { img: "/clinic/dental.jpg", icon: Smile, title: t("الأسنان", "Dental"), desc: t("تبييض، تقويم، زراعة، تجميل الأسنان", "Whitening, braces, implants, cosmetics") },
  ];

  const whyChoose = [
    { icon: CheckCircle2, text: t("استشارات طبية شاملة", "Comprehensive medical consultations") },
    { icon: Users, text: t("أطباء متخصصون وذوو خبرة", "Specialized and experienced doctors") },
    { icon: Sparkles, text: t("أجهزة ليزر دقيقة", "Precise laser devices") },
    { icon: ShieldCheck, text: t("متابعة دورية ومستمرة", "Regular and continuous follow-up") },
    { icon: TrendingUp, text: t("أحدث التقنيات الطبية", "Latest medical technologies") },
    { icon: Activity, text: t("فحوصات مخبرية دقيقة", "Accurate laboratory tests") },
    { icon: Calendar, text: t("مواعيد مرنة ومناسبة", "Flexible and convenient appointments") },
    { icon: Award, text: t("سجلات طبية إلكترونية", "Electronic medical records") },
    { icon: Heart, text: t("بيئة مريحة وداعمة", "Comfortable and supportive environment") },
    { icon: ShieldCheck, text: t("خصوصية وأمان المعلومات", "Privacy and data security") },
  ];

  const counters = [
    { value: "100%", label: t("كفاءة طبية", "Medical Efficiency") },
    { value: "15+", label: t("سنوات خبرة", "Years Experience") },
    { value: "7460+", label: t("عميل سعيد", "Happy Clients") },
    { value: "25+", label: t("طبيب متخصص", "Specialist Doctors") },
  ];

  const doctors = [
    { img: "/clinic/doctor1.jpg", name: t("د. خالد الحربي", "Dr. Khalid Alharbi"), role: t("مدير عام", "General Director") },
    { img: "/clinic/doctor2.jpg", name: t("د. أحمد العتيبي", "Dr. Ahmed Alotaibi"), role: t("استشاري قلب", "Cardiologist") },
    { img: "/clinic/doctor3.jpg", name: t("د. سارة الدوسري", "Dr. Sarah Aldosari"), role: t("جلدية وتجميل", "Dermatologist") },
    { img: "/clinic/doctor4.jpg", name: t("د. محمد القحطاني", "Dr. Mohammed Alqahtani"), role: t("علاج طبيعي", "Physiotherapist") },
  ];

  const testimonials = [
    { name: t("محمد العمري", "Mohammed Alomari"), role: t("عميل", "Client"), text: t("خدمة ممتازة وفريق طبي محترف. النتائج فاقت توقعاتي بمراحل.", "Excellent service. Results exceeded my expectations."), rating: 5, img: "from-blue-400 to-cyan-600" },
    { name: t("سارة الدوسري", "Sarah Aldosari"), role: t("عميلة", "Client"), text: t("أفضل عيادة جربتها. النظافة والاحترافية والنتائج رائعة.", "Best clinic I've tried. Amazing results."), rating: 5, img: "from-rose-400 to-pink-600" },
    { name: t("نورة العنزي", "Noura Alanazi"), role: t("عميلة", "Client"), text: t("طاقم راقي وأجهزة حديثة. أنصح الجميع بالزيارة.", "Classy staff and modern equipment."), rating: 5, img: "from-amber-400 to-orange-600" },
  ];

  const blogs = [
    { img: "/clinic/blog1.jpg", title: t("حقن البوتكس للوجه | الآثار الجانبية", "Botox | Side Effects"), date: t("28 أبريل 2026", "28 April 2026") },
    { img: "/clinic/blog2.jpg", title: t("أفضل جلسات تنظيف البشرة | فوائدها", "Best Facial Cleansing | Benefits"), date: t("28 أبريل 2026", "28 April 2026") },
    { img: "/clinic/blog3.jpg", title: t("إزالة الشعر بالليزر | نصائح مهمة", "Laser Hair Removal | Tips"), date: t("28 أبريل 2026", "28 April 2026") },
  ];

  const navItems = [
    { h: "#home", l: t("الرئيسية", "Home") },
    { h: "#about", l: t("من نحن", "About") },
    { h: "#services", l: t("خدماتنا", "Services") },
    { h: "#why", l: t("لماذا نحن", "Why Us") },
    { h: "#doctors", l: t("الأطباء", "Doctors") },
    { h: "#booking", l: t("احجز موعد", "Booking") },
    { h: "#blog", l: t("المقالات", "Blog") },
    { h: "#contact", l: t("اتصل بنا", "Contact") },
  ];

  return (
    <div ref={containerRef} dir={isRTL ? "rtl" : "ltr"} className="min-h-screen bg-white overflow-x-hidden" style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Poppins', sans-serif" }}>
      {/* Top Bar */}
      <div style={{ background: DARK }} className="text-white text-xs py-2.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a href="tel:+966575015019" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"><Phone className="w-3.5 h-3.5" /><span dir="ltr">+966 57 501 5019</span></a>
            <a href="mailto:khalid-alharbi@zohomail.sa" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"><Mail className="w-3.5 h-3.5" /> khalid-alharbi@zohomail.sa</a>
            <span className="flex items-center gap-1.5 text-white/60"><Clock className="w-3.5 h-3.5" /> {t("السبت - الخميس: 9ص - 9م", "Sat - Thu: 9AM - 9PM")}</span>
          </div>
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"><Globe className="w-3.5 h-3.5" /> {lang === "ar" ? "English" : "العربية"}</button>
        </div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-xl py-2" : "bg-white/95 backdrop-blur py-3"}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${GOLD}, #c99a2e)` }}>
              <Stethoscope className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: DARK }}>{t("عيادة خالد", "Khalid Clinic")}</h1>
              <p className="text-[10px] text-gray-500">{t("رعاية طبية وتجميلية بأيدي خبراء", "Medical & Aesthetic Care")}</p>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <a key={item.h} href={item.h} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all">{item.l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#booking"><Button className="rounded-full px-5 text-sm shadow-md hover:shadow-lg transition-shadow" style={{ background: GOLD, color: DARK }}>{t("احجز الآن", "Book Now")}</Button></a>
            <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>
        <AnimatePresence>{menuOpen && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden bg-white border-t">{navItems.map(item => <a key={item.h} href={item.h} onClick={() => setMenuOpen(false)} className="block px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50">{item.l}</a>)}<button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="block px-6 py-2.5 text-sm font-medium text-amber-600">{lang === "ar" ? "English" : "العربية"}</button></motion.div>)}</AnimatePresence>
      </header>

      {/* Hero Slider */}
      <section id="home" className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={slide} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: "easeInOut" }} className="absolute inset-0">
            <img src={slides[slide].img} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${DARK}cc, ${DARK}99, ${DARK}cc)` }} />
          </motion.div>
        </AnimatePresence>
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white max-w-4xl px-4">
            <AnimatePresence mode="wait">
              <motion.div key={slide} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.8, delay: 0.3 }}>
                <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.6 }} className="block w-20 h-0.5 mx-auto mb-6 origin-center" style={{ background: GOLD }} />
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">{slides[slide].title}</h2>
                <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto">{slides[slide].sub}</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a href="#booking"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3.5 rounded-full font-bold text-base shadow-xl transition-shadow" style={{ background: GOLD, color: DARK }}>{t("احجز موعدك", "Book Appointment")}</motion.button></a>
                  <a href="#services"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3.5 rounded-full font-bold text-base border-2 border-white/30 backdrop-blur hover:bg-white/10 transition-colors">{t("اكتشف خدماتنا", "Our Services")}</motion.button></a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => <button key={i} onClick={() => setSlide(i)} className={`h-2.5 rounded-full transition-all duration-300 ${i === slide ? "w-10" : "w-2.5 bg-white/30"}`} style={i === slide ? { background: GOLD } : {}} />)}
        </div>
        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute bottom-8 right-8 z-20 hidden md:block">
          <ChevronDown className="w-6 h-6 text-white/50" />
        </motion.div>
      </section>

      {/* Counters Bar */}
      <section style={{ background: GOLD }} className="py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {counters.map((c, i) => (
            <Reveal key={i} delay={i * 0.1} className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold" style={{ color: DARK }}>{c.value}</div>
              <div className="text-sm mt-1 font-medium" style={{ color: DARK, opacity: 0.7 }}>{c.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="text-sm font-semibold" style={{ color: GOLD }}>{t("خدماتنا", "Our Services")}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: DARK }}>{t("خدمات طبية متكاملة", "Comprehensive Medical Services")}</h2>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-20 h-1 mx-auto mt-4 rounded-full origin-center" style={{ background: GOLD }} />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -8 }} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
                  <div className="relative h-56 overflow-hidden">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 right-4 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur" style={{ background: `${GOLD}e6` }}>
                      <s.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2" style={{ color: DARK }}>{s.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                    <a href="#booking" className="text-sm font-semibold flex items-center gap-1.5 transition-all hover:gap-3" style={{ color: GOLD }}>{t("اعرف المزيد", "Learn More")} →</a>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About + Why Choose */}
      <section id="why" className="py-24 px-4" style={{ background: `linear-gradient(135deg, ${DARK}, #2a1810)` }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative">
              <img src="/clinic/about.jpg" alt="About" className="w-full rounded-3xl shadow-2xl" />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: GOLD }}>
                    <Award className="w-7 h-7" style={{ color: DARK }} />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold" style={{ color: DARK }}>15+</div>
                    <div className="text-xs text-gray-500">{t("سنوات خبرة", "Years Experience")}</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <span className="text-sm font-semibold" style={{ color: GOLD }}>{t("لماذا تختار", "Why Choose")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">{t("لماذا تختار عيادة خالد؟", "Why Choose Khalid Clinic?")}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {whyChoose.map((w, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform" style={{ background: `${GOLD}20` }}>
                      <w.icon className="w-5 h-5" style={{ color: GOLD }} />
                    </div>
                    <span className="text-sm text-white/80">{w.text}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <a href="#booking" className="inline-block mt-8"><motion.button whileHover={{ scale: 1.05 }} className="px-8 py-3 rounded-full font-bold shadow-lg" style={{ background: GOLD, color: DARK }}>{t("احجز استشارتك", "Book Consultation")}</motion.button></a>
          </Reveal>
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="text-sm font-semibold" style={{ color: GOLD }}>{t("فريقنا", "Our Team")}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: DARK }}>{t("أطباء من ذوي الخبرة", "Experienced Doctors")}</h2>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} className="w-20 h-1 mx-auto mt-4 rounded-full origin-center" style={{ background: GOLD }} />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doc, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -10 }} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <div className="relative h-80 overflow-hidden">
                    <img src={doc.img} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 inset-x-4 text-center">
                      <h3 className="text-white font-bold text-lg">{doc.name}</h3>
                      <p className="text-sm" style={{ color: GOLD }}>{doc.role}</p>
                      <div className="flex justify-center gap-1 mt-1">{[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}</div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20 px-4 overflow-hidden">
        <img src="/clinic/cta.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `${DARK}dd` }} />
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("تحتاج مساعدة؟ نحن هنا لك", "Need Help? We're Here")}</h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">{t("تواصل معنا اليوم واحصل على استشارة طبية مجانية", "Contact us today for a free medical consultation")}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+966575015019"><motion.button whileHover={{ scale: 1.05 }} className="px-8 py-3.5 rounded-full font-bold shadow-xl flex items-center gap-2" style={{ background: GOLD, color: DARK }}><Phone className="w-5 h-5" /> <span dir="ltr">+966 57 501 5019</span></motion.button></a>
              <a href="#booking"><motion.button whileHover={{ scale: 1.05 }} className="px-8 py-3.5 rounded-full font-bold border-2 border-white/30 backdrop-blur hover:bg-white/10">{t("احجز موعد", "Book Now")}</motion.button></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="text-sm font-semibold" style={{ color: GOLD }}>{t("آراء عملائنا", "Testimonials")}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: DARK }}>{t("ماذا قال عملاؤنا", "What Clients Said")}</h2>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} className="w-20 h-1 mx-auto mt-4 rounded-full origin-center" style={{ background: GOLD }} />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((rev, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -5 }} className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 h-full">
                  <div className="flex gap-0.5 mb-4">{Array.from({ length: rev.rating }).map((_, s) => <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />)}</div>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">"{rev.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${rev.img} flex items-center justify-center text-white font-bold`}>{rev.name.charAt(0)}</div>
                    <div><div className="font-bold" style={{ color: DARK }}>{rev.name}</div><div className="text-xs text-gray-400">{rev.role}</div></div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="text-sm font-semibold" style={{ color: GOLD }}>{t("المقالات", "Blog")}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: DARK }}>{t("أحدث المقالات", "Latest Articles")}</h2>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} className="w-20 h-1 mx-auto mt-4 rounded-full origin-center" style={{ background: GOLD }} />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((b, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -8 }} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer">
                  <div className="relative h-52 overflow-hidden">
                    <img src={b.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 text-xs font-medium" style={{ color: DARK }}>📅 {b.date}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-base mb-3 group-hover:text-amber-600 transition-colors" style={{ color: DARK }}>{b.title}</h3>
                    <a href="#" className="text-sm font-semibold flex items-center gap-1 transition-all hover:gap-3" style={{ color: GOLD }}>{t("اقرأ المزيد", "Read More")} →</a>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="py-24 px-4" style={{ background: `linear-gradient(135deg, ${DARK}, #2a1810)` }}>
        <div className="max-w-2xl mx-auto">
          <Reveal className="text-center mb-10">
            <span className="text-sm font-semibold" style={{ color: GOLD }}>{t("احجز موعد", "Book Appointment")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">{t("احجز موعدك الآن", "Book Your Appointment")}</h2>
            <p className="text-white/60 text-sm mt-2">{t("املأ النموذج وسنتواصل معك لتأكيد الموعد", "Fill the form and we'll contact you to confirm")}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <BookingForm lang={lang} />
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" style={{ background: DARK }} className="text-white pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: GOLD }}><Stethoscope className="w-5 h-5 text-white" /></div>
                <span className="font-bold text-lg">{t("عيادة خالد", "Khalid Clinic")}</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-4">{t("وجهتك الأولى للرعاية الصحية المتكاملة والاحترافية.", "Your first destination for comprehensive healthcare.")}</p>
              <div className="flex gap-2">
                <a href="https://github.com/5halid-707" target="_blank" className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 flex items-center justify-center transition-colors text-xs">GitHub</a>
                <a href="https://www.linkedin.com/in/khalid-alharbi-8953a4b3" target="_blank" className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 flex items-center justify-center transition-colors text-xs">LinkedIn</a>
                <a href="https://wa.me/966575015019" target="_blank" className="w-9 h-9 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center transition-colors text-xs">WA</a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h4 className="font-bold mb-3" style={{ color: GOLD }}>{t("خدماتنا", "Services")}</h4>
              <ul className="space-y-2 text-sm text-white/60">{services.map((s, i) => <li key={i}><a href="#services" className="hover:text-amber-400 transition-colors">{s.title}</a></li>)}</ul>
            </Reveal>
            <Reveal delay={0.2}>
              <h4 className="font-bold mb-3" style={{ color: GOLD }}>{t("روابط سريعة", "Quick Links")}</h4>
              <ul className="space-y-2 text-sm text-white/60">{navItems.map(item => <li key={item.h}><a href={item.h} className="hover:text-amber-400 transition-colors">{item.l}</a></li>)}</ul>
            </Reveal>
            <Reveal delay={0.3}>
              <h4 className="font-bold mb-3" style={{ color: GOLD }}>{t("تواصل معنا", "Contact")}</h4>
              <div className="space-y-3 text-sm text-white/60">
                <a href="tel:+966575015019" className="flex items-center gap-2 hover:text-amber-400"><Phone className="w-4 h-4" /> <span dir="ltr">+966 57 501 5019</span></a>
                <a href="mailto:khalid-alharbi@zohomail.sa" className="flex items-center gap-2 hover:text-amber-400"><Mail className="w-4 h-4" /> khalid-alharbi@zohomail.sa</a>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {t("المملكة العربية السعودية", "Saudi Arabia")}</p>
                <p className="flex items-center gap-2"><Clock className="w-4 h-4" /> {t("السبت - الخميس: 9ص - 9م", "Sat - Thu: 9AM - 9PM")}</p>
              </div>
            </Reveal>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-xs text-white/40">
            <p>© 2026 {t("عيادة خالد", "Khalid Clinic")}. {t("جميع الحقوق محفوظة", "All rights reserved")}.{" | "}
              <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="font-bold hover:text-amber-400 transition-colors" style={{ color: GOLD }}>{t("تصميم خالد الحربي", "Designed by Khalid Alharbi")}</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating buttons */}
      {showScroll && <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-full shadow-lg flex items-center justify-center" style={{ background: GOLD, color: DARK }}><ArrowUp className="w-5 h-5" /></motion.button>}

      <button onClick={() => setShowWA(!showWA)} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </button>
      <AnimatePresence>{showWA && (<motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="fixed bottom-24 right-6 z-50 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden"><div className="bg-green-500 text-white p-4"><h4 className="font-bold text-sm">{t("مرحبا 👋", "Hello 👋")}</h4><p className="text-xs text-white/80">{t("كيف يمكننا مساعدتك؟", "How can we help?")}</p></div><div className="p-4"><a href="https://wa.me/966575015019" target="_blank" className="block w-full bg-green-500 text-white text-center py-2.5 rounded-full text-sm font-bold hover:bg-green-600">{t("تحدث معنا", "Chat with us")}</a></div></motion.div>)}</AnimatePresence>
    </div>
  );
}

function BookingForm({ lang }: { lang: "ar" | "en" }) {
  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const submit = async (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); await new Promise(r => setTimeout(r, 1500)); toast.success(t("تم إرسال طلبك! سنتواصل معك قريباً.", "Request sent! We'll contact you.")); setForm({ name: "", email: "", phone: "", service: "", message: "" }); setSubmitting(false); };
  return (
    <form onSubmit={submit} className="bg-white rounded-3xl shadow-2xl p-8">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><Label className="text-xs">{t("الاسم الكامل", "Full Name")}</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="mt-1" placeholder={t("الاسم", "Name")} /></div>
        <div><Label className="text-xs">{t("البريد", "Email")}</Label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-1" placeholder="email@example.com" dir="ltr" /></div>
        <div><Label className="text-xs">{t("الهاتف", "Phone")}</Label><Input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required className="mt-1" placeholder="05xxxxxxxx" dir="ltr" /></div>
        <div><Label className="text-xs">{t("الخدمة", "Service")}</Label><select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} required className="w-full mt-1 border rounded-md px-3 py-2 text-sm"><option value="">{t("اختر الخدمة", "Select")}</option><option value="derma">{t("الجلدية والتجميل", "Dermatology")}</option><option value="nutrition">{t("التغذية", "Nutrition")}</option><option value="physio">{t("العلاج الطبيعي", "Physiotherapy")}</option><option value="body">{t("تنسيق القوام", "Body Contouring")}</option><option value="hijama">{t("الحجامة", "Hijama")}</option><option value="dental">{t("الأسنان", "Dental")}</option></select></div>
      </div>
      <div className="mt-4"><Label className="text-xs">{t("رسالة", "Message")}</Label><Textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="mt-1" rows={3} placeholder={t("اكتب رسالتك...", "Write message...")} /></div>
      <motion.button type="submit" disabled={submitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full mt-5 py-3 rounded-full font-bold shadow-lg transition-shadow" style={{ background: GOLD, color: DARK }}>{submitting ? t("جارٍ الإرسال...", "Sending...") : t("إرسال", "Send")}</motion.button>
    </form>
  );
}
