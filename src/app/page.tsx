"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Phone, Mail, MapPin, Calendar, Clock, Stethoscope,
  Heart, Brain, Bone, Eye, Baby, Activity, Pill, Syringe,
  User, Star, ChevronLeft, ChevronRight, Globe, Facebook,
  Twitter, Instagram, Youtube, Send, ArrowUp, ShieldCheck,
  Award, Users, Smile, CheckCircle2, Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const SITE_URL = "https://khalid-cyber-security.vercel.app/";

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);
  const isRTL = lang === "ar";

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className={`min-h-screen bg-white ${isRTL ? "font-cairo" : "font-sans"}`}>
      {/* Top Bar */}
      <div className="bg-teal-700 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <a href="tel:+966575015019" className="flex items-center gap-1 hover:text-teal-200">
              <Phone className="w-3.5 h-3.5" /> +966 57 501 5019
            </a>
            <a href="mailto:khalid-alharbi@zohomail.sa" className="hidden sm:flex items-center gap-1 hover:text-teal-200">
              <Mail className="w-3.5 h-3.5" /> khalid-alharbi@zohomail.sa
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {t("السبت - الخميس: 9ص - 9م", "Sat - Thu: 9AM - 9PM")}</span>
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="flex items-center gap-1 hover:text-teal-200">
              <Globe className="w-3.5 h-3.5" /> {lang === "ar" ? "EN" : "عربي"}
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-700 flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-teal-800">{t("عيادة خالد", "Khalid Clinic")}</h1>
              <p className="text-[10px] text-gray-500">{t("رعاية صحية متكاملة", "Comprehensive Healthcare")}</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {[
              { href: "#home", label: t("الرئيسية", "Home") },
              { href: "#about", label: t("من نحن", "About") },
              { href: "#services", label: t("خدماتنا", "Services") },
              { href: "#doctors", label: t("الأطباء", "Doctors") },
              { href: "#appointment", label: t("حجز موعد", "Appointment") },
              { href: "#contact", label: t("اتصل بنا", "Contact") },
            ].map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#appointment">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-full px-5">
                {t("احجز الآن", "Book Now")}
              </Button>
            </a>
            <button className="lg:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="lg:hidden overflow-hidden bg-white border-t">
              <div className="px-4 py-3 space-y-2">
                {[
                  { href: "#home", label: t("الرئيسية", "Home") },
                  { href: "#about", label: t("من نحن", "About") },
                  { href: "#services", label: t("خدماتنا", "Services") },
                  { href: "#doctors", label: t("الأطباء", "Doctors") },
                  { href: "#appointment", label: t("حجز موعد", "Appointment") },
                  { href: "#contact", label: t("اتصل بنا", "Contact") },
                ].map((item) => (
                  <a key={item.href} href={item.href} onClick={() => setMobileMenu(false)} className="block py-2 text-sm font-medium text-gray-700 hover:text-teal-600">
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section id="home" className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23008080\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative">
          <motion.div initial={{ opacity: 0, x: isRTL ? 30 : -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {t("رعاية صحية متكاملة", "Comprehensive Healthcare")}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
              {t("صحتك أولويتنا", "Your Health is Our Priority")} <span className="text-teal-600">{t("في عيادة خالد", "at Khalid Clinic")}</span>
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("نقدم خدمات طبية متكاملة بأحدث الأجهزة وفريق طبي متخصص. نحن هنا لرعايتك في كل خطوة.",
                "We provide comprehensive medical services with state-of-the-art equipment and specialized medical team. We are here to care for you every step of the way.")}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#appointment">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-7 py-3 text-base">
                  <Calendar className="w-5 h-5 ml-2" /> {t("احجز موعدك", "Book Appointment")}
                </Button>
              </a>
              <a href="#services">
                <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 rounded-full px-7 py-3 text-base">
                  {t("خدماتنا", "Our Services")}
                </Button>
              </a>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: Users, value: "15K+", label: t("مريض سعيد", "Happy Patients") },
                { icon: Award, value: "10+", label: t("سنوات خبرة", "Years Experience") },
                { icon: Stethoscope, value: "8+", label: t("أطباء متخصصون", "Specialist Doctors") },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <s.icon className="w-6 h-6 text-teal-600 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-gray-800">{s.value}</div>
                  <div className="text-[10px] text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center relative overflow-hidden">
              <div className="w-3/4 h-3/4 rounded-full bg-white/50 flex items-center justify-center">
                <Stethoscope className="w-32 h-32 text-teal-600" />
              </div>
              {/* Floating badges */}
              <div className="absolute top-6 right-6 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" />
                <div><div className="text-xs font-bold">24/7</div><div className="text-[9px] text-gray-500">{t("طوارئ", "Emergency")}</div></div>
              </div>
              <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                <div><div className="text-xs font-bold">100%</div><div className="text-[9px] text-gray-500">{t("آمن", "Safe")}</div></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Heart, title: t("طب القلب", "Cardiology"), color: "from-rose-400 to-rose-600" },
              { icon: Brain, title: t("الأعصاب", "Neurology"), color: "from-purple-400 to-purple-600" },
              { icon: Bone, title: t("العظام", "Orthopedics"), color: "from-amber-400 to-amber-600" },
              { icon: Eye, title: t("العيون", "Ophthalmology"), color: "from-cyan-400 to-cyan-600" },
            ].map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`bg-gradient-to-br ${d.color} rounded-2xl p-6 text-white text-center`}>
                <d.icon className="w-10 h-10 mx-auto mb-2" />
                <div className="text-sm font-semibold">{d.title}</div>
              </motion.div>
            ))}
          </div>
          <div>
            <span className="text-teal-600 font-semibold text-sm">{t("من نحن", "About Us")}</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-4">{t("عيادة خالد الطبية المتكاملة", "Khalid Comprehensive Medical Clinic")}</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {t("عيادة خالد هي مركز طبي متكامل يقدم خدمات صحية احترافية بفريق طبي متخصص وأحدث المعدات. نحن ملتزمون بتقديم أفضل رعاية لمرضانا في بيئة آمنة ومريحة.",
                "Khalid Clinic is a comprehensive medical center providing professional healthcare services with a specialized medical team and state-of-the-art equipment. We are committed to providing the best care for our patients in a safe and comfortable environment.")}
            </p>
            <div className="space-y-2 mb-6">
              {[
                t("فريق طبي متخصص وذو خبرة", "Specialized and experienced medical team"),
                t("أحدث المعدات والتقنيات الطبية", "State-of-the-art medical equipment and technology"),
                t("خدمات طوارئ على مدار الساعة", "24/7 emergency services"),
                t("بيئة آمنة ومريحة للمرضى", "Safe and comfortable environment for patients"),
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <a href="#appointment">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6">{t("احجز موعد", "Book Appointment")}</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-teal-600 font-semibold text-sm">{t("خدماتنا", "Our Services")}</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">{t("خدمات طبية متكاملة", "Comprehensive Medical Services")}</h2>
            <p className="text-gray-500 mt-2">{t("نقدم مجموعة واسعة من الخدمات الطبية المتخصصة", "We offer a wide range of specialized medical services")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: t("طب القلب", "Cardiology"), desc: t("تشخيص وعلاج أمراض القلب والشرايين", "Diagnosis and treatment of heart and artery diseases"), color: "text-rose-500 bg-rose-50" },
              { icon: Brain, title: t("طب الأعصاب", "Neurology"), desc: t("علاج اضطرابات الجهاز العصبي", "Treatment of nervous system disorders"), color: "text-purple-500 bg-purple-50" },
              { icon: Bone, title: t("العظام", "Orthopedics"), desc: t("علاج إصابات وأمراض العظام", "Treatment of bone injuries and diseases"), color: "text-amber-500 bg-amber-50" },
              { icon: Eye, title: t("العيون", "Ophthalmology"), desc: t("فحص وعلاج أمراض العيون", "Eye examination and treatment"), color: "text-cyan-500 bg-cyan-50" },
              { icon: Baby, title: t("الأطفال", "Pediatrics"), desc: t("رعاية صحية متكاملة للأطفال", "Comprehensive healthcare for children"), color: "text-green-500 bg-green-50" },
              { icon: Activity, title: t("الطوارئ", "Emergency"), desc: t("خدمات طوارئ على مدار الساعة", "24/7 emergency services"), color: "text-red-500 bg-red-50" },
              { icon: Pill, title: t("الصيدلية", "Pharmacy"), desc: t("صيدلية متكاملة بجميع الأدوية", "Full pharmacy with all medications"), color: "text-teal-500 bg-teal-50" },
              { icon: Syringe, title: t("التطعيمات", "Vaccination"), desc: t("تطعيمات للأطفال والكبار", "Vaccinations for children and adults"), color: "text-indigo-500 bg-indigo-50" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="bg-white hover:shadow-xl transition-shadow group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <s.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1">{s.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-teal-600 font-semibold text-sm">{t("فريقنا", "Our Team")}</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">{t("أطباؤنا المتخصصون", "Our Specialist Doctors")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: t("د. خالد الحربي", "Dr. Khalid Alharbi"), role: t("مدير عام", "General Director"), icon: Stethoscope, color: "from-teal-400 to-cyan-600" },
              { name: t("د. أحمد العتيبي", "Dr. Ahmed Alotaibi"), role: t("استشاري قلب", "Cardiology Consultant"), icon: Heart, color: "from-rose-400 to-rose-600" },
              { name: t("د. سارة الدوسري", "Dr. Sarah Aldosari"), role: t("أطفال", "Pediatrician"), icon: Baby, color: "from-green-400 to-green-600" },
              { name: t("د. محمد القحطاني", "Dr. Mohammed Alqahtani"), role: t("عظام", "Orthopedic Surgeon"), icon: Bone, color: "from-amber-400 to-amber-600" },
            ].map((doc, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-white hover:shadow-xl transition-shadow text-center group">
                  <CardContent className="p-6">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${doc.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform`}>
                      <doc.icon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800">{doc.name}</h3>
                    <p className="text-xs text-teal-600 font-medium mt-1">{doc.role}</p>
                    <div className="flex justify-center gap-1 mt-2">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment */}
      <section id="appointment" className="py-20 px-4 bg-gradient-to-br from-teal-600 to-cyan-700 text-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Calendar className="w-12 h-12 mx-auto mb-2" />
            <h2 className="text-3xl font-bold">{t("احجز موعدك", "Book Your Appointment")}</h2>
            <p className="text-teal-100 mt-2">{t("املأ النموذج وسنتواصل معك لتأكيد الموعد", "Fill the form and we will contact you to confirm")}</p>
          </div>
          <AppointmentForm lang={lang} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-teal-600 font-semibold text-sm">{t("آراء المرضى", "Testimonials")}</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">{t("ماذا يقول مرضانا", "What Our Patients Say")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: t("محمد العمري", "Mohammed Alomari"), text: t("خدمة ممتازة وفريق طبي محترف. أنصح الجميع بزيارة العيادة.", "Excellent service and professional medical team. I recommend everyone to visit the clinic."), rating: 5 },
              { name: t("سارة الدوسري", "Sarah Aldosari"), text: t("عيادة نظيفة ومرتبة والأطباء على مستوى عالٍ من الاحترافية.", "Clean and organized clinic with highly professional doctors."), rating: 5 },
              { name: t("عبدالله الشهري", "Abdullah Alshehri"), text: t("حجزت موعد بسهولة وكانت المعاملة راقية من الجميع. شكراً.", "Booked an appointment easily and everyone was very professional. Thank you."), rating: 5 },
            ].map((rev, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-teal-200 mb-3" />
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{rev.text}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">{rev.name.charAt(0)}</div>
                        <span className="text-sm font-semibold text-gray-800">{rev.name}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: rev.rating }).map((_, s) => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <span className="text-teal-600 font-semibold text-sm">{t("تواصل معنا", "Contact Us")}</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-6">{t("نحن هنا لخدمتك", "We Are Here to Serve You")}</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center"><Phone className="w-5 h-5 text-teal-600" /></div>
                <div><div className="text-xs text-gray-500">{t("الهاتف", "Phone")}</div><a href="tel:+966575015019" className="text-sm font-semibold text-gray-800 hover:text-teal-600" dir="ltr">+966 57 501 5019</a></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center"><Mail className="w-5 h-5 text-teal-600" /></div>
                <div><div className="text-xs text-gray-500">{t("البريد", "Email")}</div><a href="mailto:khalid-alharbi@zohomail.sa" className="text-sm font-semibold text-gray-800 hover:text-teal-600">khalid-alharbi@zohomail.sa</a></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center"><MapPin className="w-5 h-5 text-teal-600" /></div>
                <div><div className="text-xs text-gray-500">{t("العنوان", "Address")}</div><span className="text-sm font-semibold text-gray-800">{t("المملكة العربية السعودية", "Saudi Arabia")}</span></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center"><Clock className="w-5 h-5 text-teal-600" /></div>
                <div><div className="text-xs text-gray-500">{t("ساعات العمل", "Working Hours")}</div><span className="text-sm font-semibold text-gray-800">{t("السبت - الخميس: 9ص - 9م", "Sat - Thu: 9AM - 9PM")}</span></div>
              </div>
            </div>
            {/* Social */}
            <div className="flex gap-2 mt-6">
              {[
                { icon: Facebook, href: "https://github.com/5halid-707" },
                { icon: Twitter, href: "https://www.linkedin.com/in/khalid-alharbi-8953a4b3" },
                { icon: Instagram, href: "https://github.com/5halid-707" },
                { icon: Youtube, href: "https://khalid-cyber-security.vercel.app/" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-teal-600 hover:text-white flex items-center justify-center text-gray-600 transition-colors">
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <Card className="bg-gray-50">
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-800 mb-4">{t("أرسل رسالة", "Send a Message")}</h3>
              <ContactForm lang={lang} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center"><Stethoscope className="w-5 h-5 text-white" /></div>
                <span className="text-white font-bold text-lg">{t("عيادة خالد", "Khalid Clinic")}</span>
              </div>
              <p className="text-sm">{t("رعاية صحية متكاملة بأحدث التقنيات وفريق طبي متخصص.", "Comprehensive healthcare with state-of-the-art technology and specialized medical team.")}</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3">{t("روابط سريعة", "Quick Links")}</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="#home" className="hover:text-teal-400">{t("الرئيسية", "Home")}</a></li>
                <li><a href="#about" className="hover:text-teal-400">{t("من نحن", "About")}</a></li>
                <li><a href="#services" className="hover:text-teal-400">{t("خدماتنا", "Services")}</a></li>
                <li><a href="#appointment" className="hover:text-teal-400">{t("حجز موعد", "Appointment")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3">{t("تواصل معنا", "Contact")}</h4>
              <div className="space-y-1 text-sm">
                <a href="tel:+966575015019" className="flex items-center gap-2 hover:text-teal-400"><Phone className="w-4 h-4" /> +966 57 501 5019</a>
                <a href="mailto:khalid-alharbi@zohomail.sa" className="flex items-center gap-2 hover:text-teal-400"><Mail className="w-4 h-4" /> khalid-alharbi@zohomail.sa</a>
                <a href="https://github.com/5halid-707" target="_blank" className="flex items-center gap-2 hover:text-teal-400">GitHub: 5halid-707</a>
                <a href="https://www.linkedin.com/in/khalid-alharbi-8953a4b3" target="_blank" className="flex items-center gap-2 hover:text-teal-400">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-xs">
            <p>
              © 2026 {t("عيادة خالد", "Khalid Clinic")}. {t("جميع الحقوق محفوظة", "All rights reserved")}.{" | "}
              <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 font-semibold">
                {t("تصميم خالد الحربي", "Designed by Khalid Alharbi")}
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg hover:bg-teal-700 transition-colors">
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* WhatsApp float */}
      <a href="https://wa.me/966575015019" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}

function AppointmentForm({ lang }: { lang: "ar" | "en" }) {
  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);
  const [form, setForm] = useState({ name: "", phone: "", email: "", department: "", date: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    toast.success(t("تم حجز موعدك بنجاح! سنتواصل معك قريباً.", "Appointment booked successfully! We will contact you soon."));
    setForm({ name: "", phone: "", email: "", department: "", date: "", message: "" });
    setSubmitting(false);
  };

  return (
    <form onSubmit={submit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label className="text-white text-xs mb-1">{t("الاسم", "Name")}</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="bg-white/20 border-white/30 text-white placeholder:text-white/50" placeholder={t("الاسم الكامل", "Full name")} /></div>
        <div><Label className="text-white text-xs mb-1">{t("الهاتف", "Phone")}</Label><Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required className="bg-white/20 border-white/30 text-white placeholder:text-white/50" placeholder="05xxxxxxxx" dir="ltr" /></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div><Label className="text-white text-xs mb-1">{t("البريد", "Email")}</Label><Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="bg-white/20 border-white/30 text-white placeholder:text-white/50" placeholder="email@example.com" dir="ltr" /></div>
        <div><Label className="text-white text-xs mb-1">{t("التاريخ", "Date")}</Label><Input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required className="bg-white/20 border-white/30 text-white" /></div>
      </div>
      <div>
        <Label className="text-white text-xs mb-1">{t("القسم", "Department")}</Label>
        <Select value={form.department} onValueChange={v => setForm({...form, department: v})}>
          <SelectTrigger className="bg-white/20 border-white/30 text-white"><SelectValue placeholder={t("اختر القسم", "Select department")} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="cardiology">{t("طب القلب", "Cardiology")}</SelectItem>
            <SelectItem value="neurology">{t("الأعصاب", "Neurology")}</SelectItem>
            <SelectItem value="orthopedics">{t("العظام", "Orthopedics")}</SelectItem>
            <SelectItem value="ophthalmology">{t("العيون", "Ophthalmology")}</SelectItem>
            <SelectItem value="pediatrics">{t("الأطفال", "Pediatrics")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={submitting} className="w-full bg-white text-teal-700 hover:bg-teal-50 font-bold rounded-full">
        {submitting ? t("جارٍ الحجز...", "Booking...") : t("تأكيد الحجز", "Confirm Booking")}
      </Button>
    </form>
  );
}

function ContactForm({ lang }: { lang: "ar" | "en" }) {
  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success(t("تم إرسال رسالتك بنجاح!", "Message sent successfully!"));
    setForm({ name: "", email: "", message: "" });
    setSubmitting(false);
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div><Label className="text-xs">{t("الاسم", "Name")}</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="bg-white" placeholder={t("الاسم", "Name")} /></div>
      <div><Label className="text-xs">{t("البريد", "Email")}</Label><Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required className="bg-white" placeholder="email@example.com" dir="ltr" /></div>
      <div><Label className="text-xs">{t("الرسالة", "Message")}</Label><Textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} required className="bg-white" rows={3} placeholder={t("اكتب رسالتك هنا...", "Write your message here...")} /></div>
      <Button type="submit" disabled={submitting} className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-full">
        {submitting ? t("جارٍ الإرسال...", "Sending...") : <><Send className="w-4 h-4 ml-2" /> {t("إرسال", "Send")}</>}
      </Button>
    </form>
  );
}
