"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, Menu, X, Globe, ChevronLeft,
  Calendar, User, MessageCircle, Send, Star, Award, Users,
  Heart, Sparkles, Activity, Stethoscope, Pill, Bone, CheckCircle2,
  ArrowUp, Facebook, Instagram, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const SITE_URL = "https://khalid-cyber-security.vercel.app/";
const GOLD = "#e0b449";
const DARK = "#1a0f0a";

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [slide, setSlide] = useState(0);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);
  const isRTL = lang === "ar";

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % 3), 5000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    { title: t("متخصصون في التجميل بخبرة طبية", "Specialized in Aesthetic Medicine"), bg: "/clinic/hero-bg.jpg" },
    { title: t("رعاية طبية متكاملة بأيدي خبراء", "Comprehensive Medical Care by Experts"), bg: "/clinic/hero-bg.jpg" },
    { title: t("أحدث التقنيات والأجهزة الطبية", "Latest Medical Technologies & Equipment"), bg: "/clinic/hero-bg.jpg" },
  ];

  const services = [
    { icon: Sparkles, title: t("الجلدية والتجميل", "Dermatology & Aesthetics"), desc: t("علاجات البشرة، البوتوكس، الفيلر، الليزر، التقشير", "Skin treatments, Botox, Fillers, Laser, Peeling"), color: "from-rose-400 to-pink-600" },
    { icon: Activity, title: t("التغذية العلاجية", "Clinical Nutrition"), desc: t("برامج تغذية مخصصة لكل حالة صحية", "Customized nutrition programs for each health condition"), color: "from-green-400 to-emerald-600" },
    { icon: Bone, title: t("العلاج الطبيعي", "Physiotherapy"), desc: t("إعادة تأهيل وعلاج آلام المفاصل والعمود الفقري", "Rehabilitation and treatment of joint and spine pain"), color: "from-blue-400 to-cyan-600" },
    { icon: Heart, title: t("تنسيق القوام", "Body Contouring"), desc: t("تقنيات حديثة لنحت الجسم وإزالة الدهون", "Modern techniques for body sculpting and fat removal"), color: "from-purple-400 to-fuchsia-600" },
    { icon: Stethoscope, title: t("الحجامة", "Hijama"), desc: t("حجامة علاجية بطريقة آمنة ومتخصصة", "Therapeutic cupping in a safe and specialized way"), color: "from-amber-400 to-orange-600" },
    { icon: Sparkles, title: t("الأسنان", "Dental"), desc: t("تبييض، تقويم، زراعة، تجميل الأسنان", "Whitening, braces, implants, cosmetic dentistry"), color: "from-cyan-400 to-teal-600" },
  ];

  const whyChoose = [
    t("استشارات طبية شاملة", "Comprehensive medical consultations"),
    t("أطباء متخصصون وذوو خبرة", "Specialized and experienced doctors"),
    t("أجهزة ليزر دقيقة", "Precise laser devices"),
    t("متابعة دورية ومستمرة", "Regular and continuous follow-up"),
    t("أحدث التقنيات والأجهزة الطبية", "Latest medical technologies and equipment"),
    t("فحوصات مخبرية دقيقة", "Accurate laboratory tests"),
    t("مواعيد مرنة ومناسبة", "Flexible and convenient appointments"),
    t("سجلات طبية إلكترونية", "Electronic medical records"),
    t("بيئة مريحة وداعمة", "Comfortable and supportive environment"),
    t("خصوصية وأمان المعلومات", "Privacy and data security"),
  ];

  const counters = [
    { value: "100%", label: t("كفاءة طبية", "Medical Efficiency") },
    { value: "15+", label: t("سنوات الخبرة", "Years Experience") },
    { value: "7460+", label: t("إرضاء العملاء", "Customer Satisfaction") },
    { value: "25+", label: t("طبيب متخصص", "Specialist Doctors") },
  ];

  const testimonials = [
    { name: t("محمد العمري", "Mohammed Alomari"), text: t("خدمة ممتازة وفريق طبي محترف. النتائج فاقت توقعاتي بمراحل.", "Excellent service and professional team. Results exceeded my expectations."), rating: 5 },
    { name: t("سارة الدوسري", "Sarah Aldosari"), text: t("أفضل عيادة جربتها. النظافة والاحترافية والنتائج رائعة.", "Best clinic I've tried. Cleanliness, professionalism and results are amazing."), rating: 5 },
    { name: t("نورة العنزي", "Noura Alanazi"), text: t("طاقم راقي وأجهزة حديثة. أنصح الجميع بالزيارة.", "Classy staff and modern equipment. I recommend everyone to visit."), rating: 5 },
  ];

  const blogs = [
    { title: t("حقن البوتكس للوجه | الآثار الجانبية", "Botox Injections | Side Effects"), date: t("28 أبريل 2026", "28 April 2026"), img: "from-rose-300 to-pink-400" },
    { title: t("أفضل جلسات تنظيف البشرة | فوائدها", "Best Facial Cleansing Sessions", "Best Facial Cleansing | Benefits"), date: t("28 أبريل 2026", "28 April 2026"), img: "from-amber-300 to-orange-400" },
    { title: t("إزالة الشعر بالليزر | نصائح مهمة", "Laser Hair Removal | Important Tips"), date: t("28 أبريل 2026", "28 April 2026"), img: "from-purple-300 to-fuchsia-400" },
  ];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen bg-white" style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Poppins', sans-serif" }}>
      {/* Top Bar */}
      <div style={{ background: DARK }} className="text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <a href="tel:+966575015019" className="flex items-center gap-1.5 hover:text-amber-400"><Phone className="w-3.5 h-3.5" /> <span dir="ltr">+966 57 501 5019</span></a>
            <a href="mailto:khalid-alharbi@zohomail.sa" className="hidden sm:flex items-center gap-1.5 hover:text-amber-400"><Mail className="w-3.5 h-3.5" /> khalid-alharbi@zohomail.sa</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex gap-2">
              <a href="https://github.com/5halid-707" target="_blank" className="hover:text-amber-400">Facebook</a>
              <a href="https://www.linkedin.com/in/khalid-alharbi-8953a4b3" target="_blank" className="hover:text-amber-400">Instagram</a>
            </div>
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="flex items-center gap-1.5 hover:text-amber-400"><Globe className="w-3.5 h-3.5" /> {lang === "ar" ? "English" : "العربية"}</button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${GOLD}, #c99a2e)` }}>
              <Stethoscope className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: DARK }}>{t("عيادة خالد", "Khalid Clinic")}</h1>
              <p className="text-[10px] text-gray-500">{t("رعاية طبية وتجميلية بأيدي خبراء", "Medical & Aesthetic Care by Experts")}</p>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-5">
            {[{h:"#home",l:t("الرئيسية","Home")},{h:"#about",l:t("من نحن","About")},{h:"#services",l:t("خدماتنا","Services")},{h:"#why",l:t("لماذا نحن","Why Us")},{h:"#booking",l:t("احجز موعد","Booking")},{h:"#blog",l:t("المقالات","Blog")},{h:"#contact",l:t("اتصل بنا","Contact")}].map(item => (
              <a key={item.h} href={item.h} className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors">{item.l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#booking"><Button className="rounded-full px-5 text-sm" style={{ background: GOLD, color: DARK }}>{t("احجز الآن","Book Now")}</Button></a>
            <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>
        <AnimatePresence>{menuOpen && (<motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="lg:hidden overflow-hidden bg-white border-t"><div className="px-4 py-3 space-y-2">{[{h:"#home",l:t("الرئيسية","Home")},{h:"#about",l:t("من نحن","About")},{h:"#services",l:t("خدماتنا","Services")},{h:"#why",l:t("لماذا نحن","Why Us")},{h:"#booking",l:t("احجز موعد","Booking")},{h:"#blog",l:t("المقالات","Blog")},{h:"#contact",l:t("اتصل بنا","Contact")}].map(item => (<a key={item.h} href={item.h} onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium text-gray-700 hover:text-amber-600">{item.l}</a>))}</div></motion.div>)}</AnimatePresence>
      </header>

      {/* Hero Slider */}
      <section id="home" className="relative h-[600px] overflow-hidden" style={{ background: DARK }}>
        <AnimatePresence mode="wait">
          <motion.div key={slide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0">
            <img src={slides[slide].bg} alt="" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-3xl px-4">
                <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-4xl md:text-6xl font-extrabold mb-4">
                  {slides[slide].title}
                </motion.h2>
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6 }} className="w-24 h-1 mx-auto mb-6 rounded-full" style={{ background: GOLD }} />
                <a href="#booking"><Button className="rounded-full px-8 py-3 text-base font-bold" style={{ background: GOLD, color: DARK }}>{t("احجز موعدك","Book Appointment")}</Button></a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (<button key={i} onClick={() => setSlide(i)} className={`h-3 rounded-full transition-all ${i === slide ? "w-8" : "w-3 bg-white/50"}`} style={i === slide ? { background: GOLD } : {}} />))}
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-12 px-4" style={{ background: DARK }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-white mb-2">{t("أحدث العروض","Latest Offers")}</h2>
          <div className="w-16 h-1 mx-auto mb-8 rounded-full" style={{ background: GOLD }} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.slice(0, 4).map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white/5 backdrop-blur rounded-2xl p-5 text-center border border-white/10 hover:border-amber-400/40 transition-colors group cursor-pointer">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}><s.icon className="w-7 h-7 text-white" /></div>
                <h3 className="text-white font-bold text-sm mb-1">{s.title}</h3>
                <p className="text-white/60 text-xs mb-3">{s.desc}</p>
                <a href="#booking" className="text-amber-400 text-xs font-semibold">{t("المزيد من التفاصيل","More Details")} →</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold text-sm">{t("خدماتنا","Our Services")}</span>
            <h2 className="text-3xl font-bold mt-2" style={{ color: DARK }}>{t("خدمات طبية متكاملة","Comprehensive Medical Services")}</h2>
            <div className="w-16 h-1 mx-auto mt-3 rounded-full" style={{ background: GOLD }} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden border border-gray-100">
                <div className={`h-32 bg-gradient-to-br ${s.color} flex items-center justify-center`}><s.icon className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform" /></div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2" style={{ color: DARK }}>{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{s.desc}</p>
                  <a href="#booking" className="text-amber-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">{t("اعرف المزيد","Learn More")} <ChevronLeft className="w-4 h-4 rotate-180" /></a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why" className="py-20 px-4" style={{ background: `linear-gradient(135deg, ${DARK}, #2a1810)` }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-amber-400 font-semibold text-sm">{t("لماذا تختار","Why Choose")}</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-6">{t("لماذا تختار عيادة خالد؟","Why Choose Khalid Clinic?")}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {whyChoose.map((w, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: isRTL ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: GOLD }} />
                  <span className="text-sm text-white/80">{w}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-center mb-8">
              <span className="text-amber-400 font-semibold text-sm">{t("نحن نقدم لك","We Offer You")}</span>
              <h3 className="text-2xl font-bold text-white mt-2">{t("رعاية طبية متميزة","Outstanding Medical Care")}</h3>
              <p className="text-white/60 text-sm mt-1">{t("أفضل عيادة بخبرة تزيد عن 15 عامًا","Best clinic with 15+ years experience")}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {counters.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white/5 backdrop-blur rounded-2xl p-6 text-center border border-white/10">
                  <div className="text-3xl font-extrabold mb-1" style={{ color: GOLD }}>{c.value}</div>
                  <div className="text-xs text-white/60">{c.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-amber-600 font-semibold text-sm">{t("احجز موعد","Book Appointment")}</span>
            <h2 className="text-3xl font-bold mt-2" style={{ color: DARK }}>{t("احجز موعدك الآن","Book Your Appointment Now")}</h2>
            <p className="text-gray-500 text-sm mt-2">{t("مواعيد الرعاية الأولية وبعض التخصصات","Primary care and specialty appointment times")}</p>
          </div>
          <BookingForm lang={lang} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold text-sm">{t("آراء عملائنا","Our Reviews")}</span>
            <h2 className="text-3xl font-bold mt-2" style={{ color: DARK }}>{t("انظر ماذا قال عملاء عيادة خالد","What Khalid Clinic Clients Said")}</h2>
            <div className="w-16 h-1 mx-auto mt-3 rounded-full" style={{ background: GOLD }} />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((rev, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex gap-0.5 mb-3">{Array.from({ length: rev.rating }).map((_, s) => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">"{rev.text}"</p>
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: GOLD }}>{rev.name.charAt(0)}</div><div><div className="text-sm font-bold" style={{ color: DARK }}>{rev.name}</div></div></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold text-sm">{t("المقالات","Blog")}</span>
            <h2 className="text-3xl font-bold mt-2" style={{ color: DARK }}>{t("أحدث المقالات","Latest Articles")}</h2>
            <div className="w-16 h-1 mx-auto mt-3 rounded-full" style={{ background: GOLD }} />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer">
                <div className={`aspect-video bg-gradient-to-br ${b.img} flex items-center justify-center`}><Sparkles className="w-12 h-12 text-white/50 group-hover:scale-110 transition-transform" /></div>
                <div className="p-5">
                  <div className="text-xs text-gray-400 mb-2">📅 {b.date}</div>
                  <h3 className="font-bold text-sm mb-2 group-hover:text-amber-600 transition-colors" style={{ color: DARK }}>{b.title}</h3>
                  <a href="#" className="text-amber-600 text-xs font-semibold">{t("اقرأ المزيد","Read More")} →</a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" style={{ background: DARK }} className="text-white pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: GOLD }}><Stethoscope className="w-5 h-5 text-white" /></div>
                <span className="font-bold text-lg">{t("عيادة خالد","Khalid Clinic")}</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">{t("عيادة خالد، وجهتك الأولى للحصول على الرعاية الصحية المتكاملة والاحترافية.","Khalid Clinic, your first destination for comprehensive and professional healthcare.")}</p>
              <div className="flex gap-2 mt-4">
                <a href="https://github.com/5halid-707" target="_blank" className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 flex items-center justify-center transition-colors"><Facebook className="w-4 h-4" /></a>
                <a href="https://www.linkedin.com/in/khalid-alharbi-8953a4b3" target="_blank" className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 flex items-center justify-center transition-colors"><Instagram className="w-4 h-4" /></a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3" style={{ color: GOLD }}>{t("خدماتنا","Our Services")}</h4>
              <ul className="space-y-1.5 text-sm text-white/60">
                {services.map((s, i) => <li key={i}><a href="#services" className="hover:text-amber-400">{s.title}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3" style={{ color: GOLD }}>{t("روابط سريعة","Quick Links")}</h4>
              <ul className="space-y-1.5 text-sm text-white/60">
                <li><a href="#home" className="hover:text-amber-400">{t("الرئيسية","Home")}</a></li>
                <li><a href="#about" className="hover:text-amber-400">{t("من نحن","About")}</a></li>
                <li><a href="#services" className="hover:text-amber-400">{t("خدماتنا","Services")}</a></li>
                <li><a href="#booking" className="hover:text-amber-400">{t("احجز موعد","Booking")}</a></li>
                <li><a href="#blog" className="hover:text-amber-400">{t("المقالات","Blog")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3" style={{ color: GOLD }}>{t("تواصل معنا","Contact Us")}</h4>
              <div className="space-y-2 text-sm text-white/60">
                <a href="tel:+966575015019" className="flex items-center gap-2 hover:text-amber-400"><Phone className="w-4 h-4" /> <span dir="ltr">+966 57 501 5019</span></a>
                <a href="mailto:khalid-alharbi@zohomail.sa" className="flex items-center gap-2 hover:text-amber-400"><Mail className="w-4 h-4" /> khalid-alharbi@zohomail.sa</a>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {t("المملكة العربية السعودية","Saudi Arabia")}</p>
                <p className="flex items-center gap-2"><Clock className="w-4 h-4" /> {t("السبت - الخميس: 9ص - 9م","Sat - Thu: 9AM - 9PM")}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-xs text-white/50">
            <p>© 2026 {t("عيادة خالد","Khalid Clinic")}. {t("جميع الحقوق محفوظة","All rights reserved")}.{" | "}
              <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="font-bold hover:text-amber-400" style={{ color: GOLD }}>{t("تصميم خالد الحربي","Designed by Khalid Alharbi")}</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll top + WhatsApp */}
      {showScroll && <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-full text-white flex items-center justify-center shadow-lg" style={{ background: GOLD, color: DARK }}><ArrowUp className="w-5 h-5" /></button>}
      
      <button onClick={() => setShowWhatsApp(!showWhatsApp)} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </button>

      {/* WhatsApp Chat Popup */}
      <AnimatePresence>
        {showWhatsApp && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-24 right-6 z-50 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
            <div className="bg-green-500 text-white p-4"><h4 className="font-bold text-sm">{t("مرحبا","Hello")} 👋</h4><p className="text-xs text-white/80">{t("كيف يمكننا مساعدتك؟","How can we help you?")}</p></div>
            <div className="p-4"><a href="https://wa.me/966575015019" target="_blank" className="block w-full bg-green-500 text-white text-center py-2 rounded-full text-sm font-bold hover:bg-green-600">{t("تحدث لنا","Chat with us")}</a></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BookingForm({ lang }: { lang: "ar" | "en" }) {
  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const submit = async (e: React.FormEvent) => { e.preventDefault(); setSubmitting(true); await new Promise(r => setTimeout(r, 1500)); toast.success(t("تم إرسال طلبك! سنتواصل معك قريباً.","Request sent! We will contact you soon.")); setForm({ name: "", email: "", phone: "", service: "", message: "" }); setSubmitting(false); };
  return (
    <form onSubmit={submit} className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><Label className="text-xs">{t("الاسم الكامل","Full Name")}</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="mt-1" placeholder={t("الاسم","Name")} /></div>
        <div><Label className="text-xs">{t("البريد الإلكتروني","Email")}</Label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="mt-1" placeholder="email@example.com" dir="ltr" /></div>
        <div><Label className="text-xs">{t("رقم الهاتف","Phone Number")}</Label><Input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required className="mt-1" placeholder="05xxxxxxxx" dir="ltr" /></div>
        <div><Label className="text-xs">{t("الخدمة","Service")}</Label><select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} required className="w-full mt-1 border rounded-md px-3 py-2 text-sm"><option value="">{t("إختيار الخدمة","Select Service")}</option><option value="derma">{t("الجلدية والتجميل","Dermatology")}</option><option value="nutrition">{t("التغذية العلاجية","Nutrition")}</option><option value="physio">{t("العلاج الطبيعي","Physiotherapy")}</option><option value="body">{t("تنسيق القوام","Body Contouring")}</option><option value="hijama">{t("الحجامة","Hijama")}</option><option value="dental">{t("الأسنان","Dental")}</option></select></div>
      </div>
      <div className="mt-4"><Label className="text-xs">{t("رسالة","Message")}</Label><Textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="mt-1" rows={3} placeholder={t("اكتب رسالتك هنا...","Write your message here...")} /></div>
      <Button type="submit" disabled={submitting} className="w-full mt-4 rounded-full font-bold" style={{ background: "#e0b449", color: "#1a0f0a" }}>{submitting ? t("جارٍ الإرسال...","Sending...") : t("إرسال رسالة","Send Message")}</Button>
    </form>
  );
}
