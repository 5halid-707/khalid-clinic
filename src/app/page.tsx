"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useInView, useReducedMotion } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, Menu, X, Globe, ChevronDown,
  Calendar, MessageCircle, Send, Star, CheckCircle2, ArrowUp,
  Sparkles, Activity, Bone, Heart, Stethoscope, Award, Users,
  Smile, TrendingUp, ShieldCheck, Play, User, FileText,
  Microscope, Baby, Eye, Brain, Syringe, Ambulance,
  ArrowRight, ArrowLeft, Quote, ChevronLeft, ChevronRight,
  Search, Zap, Lock, Hospital, Plus, Minus,
  Tag, Newspaper, Instagram, Facebook, Twitter, Youtube,
  ChevronUp, MessageSquare, XCircle, ArrowRight as ArrowRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// World-class design system
const C = {
  ink: "#0a0e1a",         // near-black
  inkSoft: "#1a2030",     // dark slate
  paper: "#fafaf7",       // warm off-white
  paperSoft: "#f4f1eb",   // cream
  line: "rgba(10,14,26,0.08)",
  primary: "#0a4d68",     // deep clinical teal
  primarySoft: "#088395", // teal
  accent: "#d4a574",      // warm gold (luxury)
  accentSoft: "#e8c8a0",
  sage: "#7a8b6f",        // calming green
  white: "#ffffff",
};

// ============ Translations ============
const T = {
  ar: {
    dir: "rtl",
    nav: { home: "الرئيسية", about: "عن العيادة", services: "خدماتنا", doctors: "أطباؤنا", booking: "احجز موعد", contact: "تواصل" },
    utility: { appt: "حجز موعد", doctor: "البحث عن طبيب", portal: "بوابة المريض", contact: "اتصل بنا" },
    hero: {
      tag: "عيادة خالد الطبية • منذ 1998",
      title1: "رعاية صحية",
      title2: "بمعايير عالمية",
      desc: "فريق من نخبة الاستشاريين الحاصلين على شهادات عالمية، أحدث التقنيات التشخيصية، ورعاية مخصصة لكل مريض — تجربة علاجية تستحقها.",
      cta1: "احجز موعدك الآن",
      cta2: "استكشف خدماتنا",
      trust: ["+25 سنة خبرة", "+50 استشاري", "+100 ألف حالة شفاء", "معتمد دولياً"],
    },
    stats: [
      { v: 25, suffix: "+", l: "سنة من التميز" },
      { v: 50, suffix: "+", l: "استشاري متخصص" },
      { v: 100, suffix: "K+", l: "حالة شفاء" },
      { v: 98, suffix: "%", l: "رضا المرضى" },
    ],
    about: {
      tag: "عن العيادة",
      title: "أكثر من مجرد عيادة، وجهتك للرعاية الصحية المتكاملة",
      p1: "تأسست عيادة خالد الطبية عام 1998 برؤية واضحة: تقديم رعاية صحية بمعايير عالمية في قلب الرياض. نجمع بين الخبرة الطبية العميقة وأحدث التقنيات التشخيصية لنمنح كل مريض خطة علاج مخصصة تناسب حالته الفريدة.",
      p2: "فريقنا يضم نخبة من الاستشاريين الحاصلين على شهادات من أرقى الجامعات الطبية في أمريكا وأوروبا، مع التزام كامل بأعلى معايير الجودة والسلامة المعتمدة دولياً (JCI).",
      features: [
        { icon: Award, t: "استشاريون معتمدون", d: "شهادات من أفضل الجامعات العالمية" },
        { icon: Zap, t: "تقنيات حديثة", d: "أحدث الأجهزة التشخيصية والعلاجية" },
        { icon: Heart, t: "رعاية إنسانية", d: "خطة علاج مخصصة لكل حالة" },
        { icon: ShieldCheck, t: "بيئة آمنة", d: "معايير تعقيم صارمة معتمدة" },
      ],
    },
    services: {
      tag: "خدماتنا الطبية",
      title: "رعاية متكاملة تحت سقف واحد",
      desc: "ثمانية تخصصات طبية متفرعة يقدمها نخبة من الاستشاريين بأحدث التقنيات",
      items: [
        { icon: Heart, t: "أمراض القلب", d: "تشخيص وعلاج أمراض القلب والشرايين بالتقنيات المتقدمة", img: "cardio" },
        { icon: Bone, t: "الجراحة العظمية", d: "إصابات المفاصل والعمليات الجراحية المتقدمة", img: "ortho" },
        { icon: Smile, t: "طب الأسنان", d: "علاج وتجميل الأسنان بالتقنيات الرقمية", img: "dental" },
        { icon: Eye, t: "العيون والليزك", d: "فحوصات وعلاجات أمراض العيون وعمليات الليزك", img: "eye" },
        { icon: Baby, t: "طب الأطفال", d: "رعاية شاملة للأطفال وحديثي الولادة", img: "pediatric" },
        { icon: Brain, t: "الأعصاب", d: "تشخيص وعلاج اضطرابات الجهاز العصبي", img: "neuro" },
        { icon: Microscope, t: "المختبرات", d: "تحاليل طبية دقيقة بنتائج سريعة موثوقة", img: "lab" },
        { icon: Syringe, t: "الجلدية والتجميل", d: "علاج الأمراض الجلدية والتجميل غير الجراحي", img: "derma" },
      ],
    },
    doctors: {
      tag: "فريقنا الطبي",
      title: "نخبة من الاستشاريين",
      desc: "أطباء حاصلون على شهادات عالمية بخبرات تمتد لعقود",
      bookWith: "احجز مع الطبيب",
      items: [
        { name: "د. أحمد المالكي", spec: "استشاري أمراض القلب", exp: "+20 سنة", edu: "Harvard Medical School", img: "doc1" },
        { name: "د. سارة العتيبي", spec: "استشارية طب الأسنان", exp: "+15 سنة", edu: "King's College London", img: "doc2" },
        { name: "د. خالد الشهري", spec: "استشاري جراحة العظام", exp: "+18 سنة", edu: "Johns Hopkins", img: "doc3" },
        { name: "د. نورة القحطاني", spec: "استشارية الأطفال", exp: "+12 سنة", edu: "Mayo Clinic", img: "doc4" },
      ],
    },
    booking: {
      tag: "احجز موعدك",
      title: "تجربة حجز سهلة وآمنة",
      desc: "أربع خطوات بسيطة تفصلك عن موعدك مع أفضل الأطباء",
      steps: ["اختر الخدمة", "اختر الطبيب", "التاريخ والوقت", "بياناتك"],
      step: "خطوة",
      of: "من",
      fields: {
        name: "الاسم الكامل",
        namePh: "الاسم الثلاثي",
        phone: "رقم الجوال",
        phonePh: "05xxxxxxxx",
        email: "البريد الإلكتروني",
        emailPh: "example@email.com",
        notes: "ملاحظات إضافية",
        notesPh: "أخبرنا عن حالتك أو أي ملاحظات",
      },
      next: "التالي",
      back: "السابق",
      submit: "تأكيد الحجز",
      success: "تم حجز موعدك بنجاح!",
      successDesc: "سيتواصل معك فريقنا خلال 24 ساعة لتأكيد الموعد",
      newBooking: "حجز موعد آخر",
    },
    testimonials: {
      tag: "آراء مرضانا",
      title: "قصص حقيقية، نتائج حقيقية",
      items: [
        { name: "محمد العمري", role: "مريض أمراض قلب", text: "تجربة فاقت توقعاتي. الدكتور أحمد شرح حالتي بصبر، والطاقم الطبي محترف جداً. أنصح بها بشدة." },
        { name: "فاطمة الزهراني", role: "مريضة أسنان", text: "أحدث الأجهزة ونظافة فائقة. الدكتورة سارة أعطتني خيارات علاج متعددة قبل البدء. تجربة راقية." },
        { name: "عبدالله الحربي", role: "مريض جراحة عظام", text: "حجزت عبر الموقع بسهولة. الموعد كان دقيقاً، لم أنتظر. نتيجة الجراحة كانت ممتازة." },
        { name: "نورة السبيعي", role: "كشف شامل", text: "فريق التمريض رحيم جداً. البيئة مريحة وغير مرهقة. شعرت أنني في أيدٍ أمينة من اللحظة الأولى." },
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
      hoursV: "السبت - الخميس: 9 ص - 11 م",
      hoursFri: "الجمعة: 4 م - 11 م",
    },
    footer: { rights: "جميع الحقوق محفوظة", quick: "روابط سريعة", services: "خدماتنا", contact: "تواصل" },
    faq: {
      tag: "أسئلة شائعة",
      title: "إجابات على أكثر ما يُسأل",
      items: [
        { q: "كيف أحجز موعداً؟", a: "يمكنك الحجز عبر النموذج في موقعنا أو الاتصال على +966 57 501 5019. سنؤكد موعدك خلال 24 ساعة." },
        { q: "هل تقبلون التأمين الصحي؟", a: "نعم، نتعامل مع جميع شركات التأمين الرئيسية. يرجى إحضار بطاقة التأمين عند الزيارة." },
        { q: "ما هي مدة الاستشارة؟", a: "تستغرق الاستشارة الأولى عادةً 30-45 دقيقة لتشمل الفحص الشامل ومناقشة خطة العلاج." },
        { q: "هل يوجد كشف طوارئ؟", a: "نعم، نقدم خدمة الطوارئ 24/7. اتصل على الرقم الموحد في حالات الطوارئ." },
      ],
    },
    offers: {
      tag: "أحدث العروض",
      title: "عروض وباقات حصرية",
      desc: "باقات طبية متكاملة بأسعار خاصة لفترة محدودة",
      badge: "عرض خاص",
      book: "احصل على العرض",
      items: [
        { t: "باقة العناية بالقلب الشاملة", d: "فحص شامل + تخطيط قلب + استشارة", p: "899 ر.س", oldP: "1500 ر.س", img: "offer1" },
        { t: "تبييض الأسنان بالليزر", d: "جلسة تبييض كاملة + تنظيف", p: "599 ر.س", oldP: "900 ر.س", img: "offer2" },
        { t: "باقة الفحص الشامل للعائلة", d: "فحص شامل لـ 4 أفراد من العائلة", p: "1299 ر.س", oldP: "2000 ر.س", img: "offer3" },
        { t: "استشارة جلدية + جلسة علاج", d: "استشارة + جلسة تنظيف بشرة عميقة", p: "449 ر.س", oldP: "700 ر.س", img: "offer4" },
        { t: "فحص العيون + استشارة الليزك", d: "فحص شامل + تقييم لعملية الليزك", p: "349 ر.س", oldP: "550 ر.س", img: "offer5" },
        { t: "باقة ما بعد العمليات", d: "متابعة + علاج طبيعي 5 جلسات", p: "1099 ر.س", oldP: "1800 ر.س", img: "offer6" },
      ],
    },
    whyus: {
      tag: "لماذا تختارنا",
      title: "لماذا تختار عيادة خالد الطبية؟",
      desc: "نقدم تجربة طبية متكاملة تضع راحتك وشفاءك في المقام الأول",
      items: [
        "استشارات طبية متخصصة مع نخبة من الأطباء",
        "أطباء استشاريون حاصلون على شهادات عالمية",
        "أحدث الأجهزة الطبية والتشخيصية",
        "متابعة مستمرة للحالة بعد العلاج",
        "تقنيات تشخيص دقيقة وعالية الجودة",
        "تحاليل ومختبرات بنتائج سريعة وموثوقة",
        "مواعيد مرنة تناسب جدولك",
        "ملفات طبية إلكترونية آمنة",
        "بيئة مريحة وودودة لجميع المرضى",
        "خصوصية تامة وسرية تامة للمعلومات",
      ],
    },
    results: {
      tag: "نتائج حقيقية",
      title: "انظر ماذا قال عملاؤنا",
      desc: "آراء حقيقية من مرضى عالجتهم عيادتنا",
    },
    blog: {
      tag: "أحدث المقالات",
      title: "مقالات طبية مفيدة",
      desc: "نصائح ومعلومات طبية من نخبة أطبائنا",
      readMore: "اقرأ المزيد",
      items: [
        { t: "10 نصائح للحفاظ على صحة القلب", d: "اكتشف أهم العادات اليومية التي تحافظ على صحة قلبك وتقي من أمراض القلب والشرايين.", date: "15 أغسطس 2025", cat: "أمراض القلب", img: "blog1" },
        { t: "أهمية الفحص الدوري للأسنان", d: "لماذا يجب عليك زيارة طبيب الأسنان كل 6 أشهر؟ وكيف تحافظ على صحة أسنانك؟", date: "10 أغسطس 2025", cat: "الأسنان", img: "blog2" },
        { t: "تغذية صحية للأطفال في الصيف", d: "دليل شامل لتغذية أطفالك خلال فصل الصيف للحفاظ على صحتهم ونشاطهم.", date: "5 أغسطس 2025", cat: "الأطفال", img: "blog3" },
        { t: "كيف تحمي عينيك من الشاشات؟", d: "نصائح عملية لحماية عينيك من إجهاد الشاشات في عصر التكنولوجيا.", date: "1 أغسطس 2025", cat: "العيون", img: "blog4" },
      ],
    },
    social: { follow: "تابعنا على", },
    contactPopup: {
      title: "أرسل رسالة سريعة",
      desc: "نحن هنا للإجابة على استفساراتك",
      name: "الاسم", namePh: "اسمك",
      phone: "الجوال", phonePh: "05xxxxxxxx",
      message: "الرسالة", messagePh: "اكتب رسالتك هنا...",
      send: "إرسال", sent: "تم إرسال رسالتك بنجاح!",
    },
    legal: {
      company: "عيادة خالد الطبية المحدودة",
      companyEn: "Khalid Medical Clinic Ltd.",
      reg: "س.ت: 1010xxxxxx",
      vat: "ض.ق: 3000xxxxxx",
    },
  },
  en: {
    dir: "ltr",
    nav: { home: "Home", about: "About", services: "Services", doctors: "Doctors", booking: "Book Now", contact: "Contact" },
    utility: { appt: "Book Appointment", doctor: "Find a Doctor", portal: "Patient Portal", contact: "Contact" },
    hero: {
      tag: "Khalid Medical Clinic • Since 1998",
      title1: "Healthcare",
      title2: "World-Class Standards",
      desc: "Elite consultants with international credentials, cutting-edge diagnostic technology, and personalized care for every patient — a healthcare experience you deserve.",
      cta1: "Book Appointment",
      cta2: "Explore Services",
      trust: ["+25 years", "+50 specialists", "+100K cases", "Internationally accredited"],
    },
    stats: [
      { v: 25, suffix: "+", l: "Years of Excellence" },
      { v: 50, suffix: "+", l: "Specialist Doctors" },
      { v: 100, suffix: "K+", l: "Recovered Cases" },
      { v: 98, suffix: "%", l: "Patient Satisfaction" },
    ],
    about: {
      tag: "About Us",
      title: "More than a clinic — your destination for integrated healthcare",
      p1: "Established in 1998 with a clear vision: world-class healthcare in the heart of Riyadh. We combine deep medical expertise with the latest diagnostic technology to give every patient a personalized treatment plan for their unique case.",
      p2: "Our team includes elite consultants holding degrees from top medical universities in America and Europe, with full commitment to the highest internationally accredited quality and safety standards (JCI).",
      features: [
        { icon: Award, t: "Certified Consultants", d: "Degrees from top global universities" },
        { icon: Zap, t: "Modern Technology", d: "Latest diagnostic and treatment equipment" },
        { icon: Heart, t: "Human-Centered Care", d: "Custom treatment plan for each case" },
        { icon: ShieldCheck, t: "Safe Environment", d: "Strict accredited sterilization standards" },
      ],
    },
    services: {
      tag: "Our Services",
      title: "Integrated care under one roof",
      desc: "Eight specialized medical departments delivered by elite consultants with cutting-edge technology",
      items: [
        { icon: Heart, t: "Cardiology", d: "Advanced diagnosis and treatment of heart and vascular diseases", img: "cardio" },
        { icon: Bone, t: "Orthopedic Surgery", d: "Joint injuries and advanced surgical operations", img: "ortho" },
        { icon: Smile, t: "Dentistry", d: "Dental treatment and cosmetics with digital technology", img: "dental" },
        { icon: Eye, t: "Ophthalmology & LASIK", d: "Eye examinations, treatments and LASIK operations", img: "eye" },
        { icon: Baby, t: "Pediatrics", d: "Comprehensive care for children and newborns", img: "pediatric" },
        { icon: Brain, t: "Neurology", d: "Diagnosis and treatment of nervous system disorders", img: "neuro" },
        { icon: Microscope, t: "Laboratory", d: "Accurate medical tests with fast, reliable results", img: "lab" },
        { icon: Syringe, t: "Dermatology & Aesthetics", d: "Skin disease treatment and non-surgical cosmetics", img: "derma" },
      ],
    },
    doctors: {
      tag: "Our Team",
      title: "Elite Consultants",
      desc: "Doctors with international degrees and decades of experience",
      bookWith: "Book with Doctor",
      items: [
        { name: "Dr. Ahmed Al-Maliki", spec: "Cardiology Consultant", exp: "+20 years", edu: "Harvard Medical School", img: "doc1" },
        { name: "Dr. Sarah Al-Otaibi", spec: "Dental Consultant", exp: "+15 years", edu: "King's College London", img: "doc2" },
        { name: "Dr. Khalid Al-Shehri", spec: "Orthopedic Surgeon", exp: "+18 years", edu: "Johns Hopkins", img: "doc3" },
        { name: "Dr. Noura Al-Qahtani", spec: "Pediatric Consultant", exp: "+12 years", edu: "Mayo Clinic", img: "doc4" },
      ],
    },
    booking: {
      tag: "Book Appointment",
      title: "Easy and secure booking",
      desc: "Four simple steps separate you from your appointment with top doctors",
      steps: ["Select Service", "Choose Doctor", "Date & Time", "Your Details"],
      step: "Step",
      of: "of",
      fields: {
        name: "Full Name",
        namePh: "Your full name",
        phone: "Phone Number",
        phonePh: "05xxxxxxxx",
        email: "Email Address",
        emailPh: "example@email.com",
        notes: "Additional Notes",
        notesPh: "Tell us about your condition",
      },
      next: "Next",
      back: "Back",
      submit: "Confirm Booking",
      success: "Booking successful!",
      successDesc: "Our team will contact you within 24 hours to confirm",
      newBooking: "New Booking",
    },
    testimonials: {
      tag: "Patient Stories",
      title: "Real stories, real results",
      items: [
        { name: "Mohammed Al-Amri", role: "Cardiology Patient", text: "An experience that exceeded my expectations. Dr. Ahmed explained my condition patiently, and the medical staff is highly professional. Highly recommended." },
        { name: "Fatima Al-Zahrani", role: "Dental Patient", text: "Latest equipment and excellent hygiene. Dr. Sarah gave me multiple treatment options before starting. A premium experience." },
        { name: "Abdullah Al-Harbi", role: "Orthopedic Patient", text: "Booked online easily. Appointment was on time, no waiting. Surgery results were excellent." },
        { name: "Noura Al-Subaei", role: "Full Checkup", text: "The nursing team is very compassionate. The environment is comfortable and stress-free. I felt in safe hands from the first moment." },
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
      hoursV: "Sat - Thu: 9 AM - 11 PM",
      hoursFri: "Friday: 4 PM - 11 PM",
    },
    footer: { rights: "All Rights Reserved", quick: "Quick Links", services: "Services", contact: "Contact" },
    faq: {
      tag: "FAQ",
      title: "Answers to common questions",
      items: [
        { q: "How do I book an appointment?", a: "You can book via the form on our website or call +966 57 501 5019. We'll confirm within 24 hours." },
        { q: "Do you accept insurance?", a: "Yes, we work with all major insurance providers. Please bring your insurance card at visit." },
        { q: "How long is the consultation?", a: "First consultation typically takes 30-45 minutes including comprehensive examination and treatment plan discussion." },
        { q: "Is there emergency service?", a: "Yes, we provide 24/7 emergency service. Call our hotline for emergencies." },
      ],
    },
    offers: {
      tag: "Latest Offers",
      title: "Exclusive Packages",
      desc: "Comprehensive medical packages at special prices for a limited time",
      badge: "Special Offer",
      book: "Get Offer",
      items: [
        { t: "Complete Cardiac Care Package", d: "Full checkup + ECG + consultation", p: "899 SAR", oldP: "1500 SAR", img: "offer1" },
        { t: "Laser Teeth Whitening", d: "Full whitening session + cleaning", p: "599 SAR", oldP: "900 SAR", img: "offer2" },
        { t: "Family Checkup Package", d: "Comprehensive checkup for 4 family members", p: "1299 SAR", oldP: "2000 SAR", img: "offer3" },
        { t: "Dermatology Consultation + Treatment", d: "Consultation + deep facial session", p: "449 SAR", oldP: "700 SAR", img: "offer4" },
        { t: "Eye Exam + LASIK Consultation", d: "Comprehensive exam + LASIK evaluation", p: "349 SAR", oldP: "550 SAR", img: "offer5" },
        { t: "Post-Op Recovery Package", d: "Follow-up + 5 physiotherapy sessions", p: "1099 SAR", oldP: "1800 SAR", img: "offer6" },
      ],
    },
    whyus: {
      tag: "Why Choose Us",
      title: "Why Choose Khalid Medical Clinic?",
      desc: "We provide an integrated medical experience that puts your comfort and recovery first",
      items: [
        "Specialized medical consultations with elite doctors",
        "Consultant doctors with international degrees",
        "Latest medical and diagnostic equipment",
        "Continuous follow-up after treatment",
        "Accurate high-quality diagnostic technology",
        "Fast and reliable lab tests",
        "Flexible appointments to fit your schedule",
        "Secure electronic medical records",
        "Comfortable and friendly environment for all patients",
        "Complete privacy and confidentiality",
      ],
    },
    results: {
      tag: "Real Results",
      title: "See What Our Clients Said",
      desc: "Real reviews from patients treated at our clinic",
    },
    blog: {
      tag: "Latest Articles",
      title: "Useful Medical Articles",
      desc: "Medical tips and information from our elite doctors",
      readMore: "Read More",
      items: [
        { t: "10 Tips to Maintain Heart Health", d: "Discover the daily habits that protect your heart and prevent cardiovascular disease.", date: "Aug 15, 2025", cat: "Cardiology", img: "blog1" },
        { t: "Importance of Regular Dental Checkups", d: "Why should you visit the dentist every 6 months? How to maintain your dental health?", date: "Aug 10, 2025", cat: "Dental", img: "blog2" },
        { t: "Healthy Summer Nutrition for Kids", d: "Comprehensive guide to feeding your children during summer.", date: "Aug 5, 2025", cat: "Pediatrics", img: "blog3" },
        { t: "How to Protect Your Eyes from Screens", d: "Practical tips to protect your eyes from screen strain in the tech era.", date: "Aug 1, 2025", cat: "Ophthalmology", img: "blog4" },
      ],
    },
    social: { follow: "Follow Us" },
    contactPopup: {
      title: "Send a Quick Message",
      desc: "We're here to answer your questions",
      name: "Name", namePh: "Your name",
      phone: "Phone", phonePh: "05xxxxxxxx",
      message: "Message", messagePh: "Write your message here...",
      send: "Send", sent: "Message sent successfully!",
    },
    legal: {
      company: "Khalid Medical Clinic Ltd.",
      companyEn: "Khalid Medical Clinic Ltd.",
      reg: "CR: 1010xxxxxx",
      vat: "VAT: 3000xxxxxx",
    },
  },
};

// High-quality Unsplash images
const IMG = {
  hero: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920&q=85",
  hero2: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=1920&q=85",
  hero3: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920&q=85",
  about: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1400&q=85",
  about2: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=900&q=85",
  facility: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=85",
  cardio: "https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0?w=900&q=85",
  ortho: "https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0?w=900&q=85",
  dental: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&q=85",
  eye: "https://images.unsplash.com/photo-1579165466949-3180a3d056d5?w=900&q=85",
  pediatric: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=900&q=85",
  neuro: "https://images.unsplash.com/photo-1559757175-08f51794ccc3?w=900&q=85",
  lab: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=900&q=85",
  derma: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&q=85",
  doc1: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=85",
  doc2: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=85",
  doc3: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=85",
  doc4: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=85",
  // Offers (portrait 4:5)
  offer1: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=85",
  offer2: "https://images.unsplash.com/photo-1616396019462-8280cf4b9b41?w=900&q=85",
  offer3: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=85",
  offer4: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=85",
  offer5: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=900&q=85",
  offer6: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=900&q=85",
  // Blog
  blog1: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=85",
  blog2: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=85",
  blog3: "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?w=800&q=85",
  blog4: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=85",
  // Why-us side image
  whyus: "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=1000&q=85",
};

// ============ Animated Counter ============
function Counter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(start + (value - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(value);
    };
    requestAnimationFrame(tick);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ============ Reveal animation ============
function Reveal({ children, delay = 0, y = 30, className = "", once = true }: { children: React.ReactNode; delay?: number; y?: number; className?: string; once?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger container
function StaggerGroup({ children, className = "", stagger = 0.08 }: { children: React.ReactNode; className?: string; stagger?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : stagger } },
      }}
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
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============ Main Component ============
export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [showWA, setShowWA] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [bookingStep, setBookingStep] = useState(0);
  const [booking, setBooking] = useState({ service: "", doctor: "", date: "", time: "", name: "", phone: "", email: "", notes: "" });
  const [bookingDone, setBookingDone] = useState(false);
  const [offerSlide, setOfferSlide] = useState(0);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [resultsSlide, setResultsSlide] = useState(0);

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
    const interval = setInterval(() => setHeroSlide((p) => (p + 1) % 3), 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveTestimonial((p) => (p + 1) % t.testimonials.items.length), 7000);
    return () => clearInterval(interval);
  }, [t.testimonials.items.length]);

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroScroll, [0, 0.85], [1, 0]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  const navLinks = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "services", label: t.nav.services },
    { id: "offers", label: t.offers.tag },
    { id: "doctors", label: t.nav.doctors },
    { id: "blog", label: t.blog.tag },
    { id: "booking", label: t.nav.booking },
    { id: "contact", label: t.nav.contact },
  ];

  const bookingSteps = [
    {
      title: t.booking.steps[0],
      content: (
        <div className="grid sm:grid-cols-2 gap-3">
          {t.services.items.map((s) => (
            <button
              key={s.t}
              onClick={() => setBooking({ ...booking, service: s.t })}
              className={`text-right p-4 rounded-2xl border-2 transition-all ${booking.service === s.t ? "border-[#0a4d68] bg-[#0a4d68]/5" : "border-[#0a0e1a]/10 hover:border-[#0a4d68]/40"}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${booking.service === s.t ? "bg-[#0a4d68] text-white" : "bg-[#0a4d68]/10 text-[#0a4d68]"}`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div className="font-semibold text-[#0a0e1a]">{s.t}</div>
              </div>
            </button>
          ))}
        </div>
      ),
      valid: !!booking.service,
    },
    {
      title: t.booking.steps[1],
      content: (
        <div className="grid sm:grid-cols-2 gap-3">
          {t.doctors.items.map((d) => (
            <button
              key={d.name}
              onClick={() => setBooking({ ...booking, doctor: d.name })}
              className={`text-right p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${booking.doctor === d.name ? "border-[#0a4d68] bg-[#0a4d68]/5" : "border-[#0a0e1a]/10 hover:border-[#0a4d68]/40"}`}
            >
              <img src={(IMG as any)[d.img]} alt={d.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-[#0a0e1a]">{d.name}</div>
                <div className="text-xs text-[#0a0e1a]/60">{d.spec}</div>
              </div>
            </button>
          ))}
        </div>
      ),
      valid: !!booking.doctor,
    },
    {
      title: t.booking.steps[2],
      content: (
        <div className="space-y-5">
          <div>
            <Label className="font-semibold text-[#0a0e1a] mb-2 block flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0a4d68]" /> {t.booking.fields.name && ""} {isAR ? "التاريخ" : "Date"} <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={booking.date}
              onChange={(e) => setBooking({ ...booking, date: e.target.value })}
              className="bg-[#fafaf7] border-2 border-[#0a0e1a]/10 focus:border-[#0a4d68] rounded-xl py-3 h-12 text-[#0a0e1a] focus-visible:ring-0"
              style={{ color: "#0a0e1a" }}
            />
          </div>
          <div>
            <Label className="font-semibold text-[#0a0e1a] mb-2 block flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0a4d68]" /> {isAR ? "الوقت" : "Time"} <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {["09:00", "10:00", "11:00", "12:00", "16:00", "17:00", "18:00", "19:00", "20:00"].map((time) => (
                <button
                  key={time}
                  onClick={() => setBooking({ ...booking, time })}
                  className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition ${booking.time === time ? "border-[#0a4d68] bg-[#0a4d68] text-white" : "border-[#0a0e1a]/10 hover:border-[#0a4d68]/40 text-[#0a0e1a]"}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
      valid: !!booking.date && !!booking.time,
    },
    {
      title: t.booking.steps[3],
      content: (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-semibold text-[#0a0e1a] mb-2 block flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#0a4d68]" /> {t.booking.fields.name} <span className="text-red-500">*</span>
              </Label>
              <Input
                value={booking.name}
                onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                placeholder={t.booking.fields.namePh}
                className="bg-[#fafaf7] border-2 border-[#0a0e1a]/10 focus:border-[#0a4d68] rounded-xl py-3 h-12 text-[#0a0e1a] placeholder:text-[#0a0e1a]/40 focus-visible:ring-0"
                style={{ color: "#0a0e1a", caretColor: "#0a4d68" }}
              />
            </div>
            <div>
              <Label className="font-semibold text-[#0a0e1a] mb-2 block flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#0a4d68]" /> {t.booking.fields.phone} <span className="text-red-500">*</span>
              </Label>
              <Input
                type="tel"
                value={booking.phone}
                onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                placeholder={t.booking.fields.phonePh}
                className="bg-[#fafaf7] border-2 border-[#0a0e1a]/10 focus:border-[#0a4d68] rounded-xl py-3 h-12 text-[#0a0e1a] placeholder:text-[#0a0e1a]/40 focus-visible:ring-0"
                style={{ color: "#0a0e1a", caretColor: "#0a4d68" }}
                dir="ltr"
              />
            </div>
          </div>
          <div>
            <Label className="font-semibold text-[#0a0e1a] mb-2 block flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-[#0a4d68]" /> {t.booking.fields.email}
            </Label>
            <Input
              type="email"
              value={booking.email}
              onChange={(e) => setBooking({ ...booking, email: e.target.value })}
              placeholder={t.booking.fields.emailPh}
              className="bg-[#fafaf7] border-2 border-[#0a0e1a]/10 focus:border-[#0a4d68] rounded-xl py-3 h-12 text-[#0a0e1a] placeholder:text-[#0a0e1a]/40 focus-visible:ring-0"
              style={{ color: "#0a0e1a", caretColor: "#0a4d68" }}
              dir="ltr"
            />
          </div>
          <div>
            <Label className="font-semibold text-[#0a0e1a] mb-2 block flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#0a4d68]" /> {t.booking.fields.notes}
            </Label>
            <Textarea
              value={booking.notes}
              onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
              placeholder={t.booking.fields.notesPh}
              rows={3}
              className="bg-[#fafaf7] border-2 border-[#0a0e1a]/10 focus:border-[#0a4d68] rounded-xl py-3 text-[#0a0e1a] placeholder:text-[#0a0e1a]/40 focus-visible:ring-0 resize-none"
              style={{ color: "#0a0e1a", caretColor: "#0a4d68" }}
            />
          </div>
          {/* Summary */}
          <div className="bg-[#0a4d68]/5 border border-[#0a4d68]/20 rounded-2xl p-4">
            <div className="text-xs text-[#0a0e1a]/60 mb-2 font-semibold">{isAR ? "ملخص الحجز" : "Booking Summary"}</div>
            <div className="text-sm text-[#0a0e1a] space-y-1">
              <div><span className="text-[#0a0e1a]/60">{isAR ? "الخدمة:" : "Service:"}</span> {booking.service}</div>
              <div><span className="text-[#0a0e1a]/60">{isAR ? "الطبيب:" : "Doctor:"}</span> {booking.doctor}</div>
              <div><span className="text-[#0a0e1a]/60">{isAR ? "الموعد:" : "When:"}</span> {booking.date} {booking.time}</div>
            </div>
          </div>
        </div>
      ),
      valid: !!booking.name && !!booking.phone,
    },
  ];

  const submitBooking = async () => {
    setBookingDone(true);
    toast.success(t.booking.success);
  };

  const resetBooking = () => {
    setBooking({ service: "", doctor: "", date: "", time: "", name: "", phone: "", email: "", notes: "" });
    setBookingStep(0);
    setBookingDone(false);
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] overflow-x-hidden" dir={t.dir}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { -webkit-font-smoothing: antialiased; }
        body { font-family: ${isAR ? "'Cairo', sans-serif" : "'Inter', sans-serif"}; background: ${C.paper}; color: ${C.ink}; }
        .font-display { font-family: ${isAR ? "'Cairo', sans-serif" : "'Playfair Display', serif"}; }
        .font-cairo { font-family: 'Cairo', sans-serif; }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes blob { 0%,100%{border-radius:60% 40% 30% 70% / 60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40% / 50% 60% 30% 60%} }
        @keyframes pulse-ring { 0%{transform:scale(0.8);opacity:1} 100%{transform:scale(2);opacity:0} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes shine { 0%{background-position:-200% center} 100%{background-position:200% center} }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-blob { animation: blob 8s ease-in-out infinite; }
        .animate-marquee { animation: marquee 40s linear infinite; }
        .pulse-ring::after {
          content:''; position:absolute; inset:0; border-radius:inherit;
          background:inherit; animation: pulse-ring 2s ease-out infinite;
        }

        .glass { background: rgba(255,255,255,0.7); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .glass-dark { background: rgba(10,14,26,0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }

        .text-gradient-gold {
          background: linear-gradient(135deg, ${C.accent}, ${C.accentSoft}, ${C.accent});
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .text-gradient-primary {
          background: linear-gradient(135deg, ${C.primary}, ${C.primarySoft});
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }

        .shine-text {
          background: linear-gradient(90deg, ${C.accent}, #fff, ${C.accent});
          background-size: 200% auto; -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; animation: shine 3s linear infinite;
        }

        select option { color: ${C.ink} !important; background: ${C.paper} !important; }
        input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; }

        .card-hover { transition: all 0.4s cubic-bezier(0.22,1,0.36,1); }
        .card-hover:hover { transform: translateY(-8px); box-shadow: 0 30px 60px -15px rgba(10,14,26,0.15); }
      `}</style>

      {/* ===== Utility Bar ===== */}
      <div className="bg-[#0a0e1a] text-white/80 text-xs py-2.5 px-4 hidden md:block border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a href="tel:+966575015019" className="flex items-center gap-1.5 hover:text-[#d4a574] transition">
              <Phone className="w-3.5 h-3.5" /> <span dir="ltr">+966 57 501 5019</span>
            </a>
            <a href="mailto:khalid-alharbi@zohomail.sa" className="flex items-center gap-1.5 hover:text-[#d4a574] transition">
              <Mail className="w-3.5 h-3.5" /> khalid-alharbi@zohomail.sa
            </a>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {isAR ? "سبت-خميس 9ص-11م" : "Sat-Thu 9AM-11PM"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => scrollTo("doctors")} className="hover:text-[#d4a574] transition flex items-center gap-1">
              <Search className="w-3.5 h-3.5" /> {t.utility.doctor}
            </button>
            <span className="text-white/20">|</span>
            <button className="hover:text-[#d4a574] transition flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> {t.utility.portal}
            </button>
            <span className="text-white/20">|</span>
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="hover:text-[#d4a574] transition flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> {lang === "ar" ? "EN" : "عربي"}
            </button>
          </div>
        </div>
      </div>

      {/* ===== Navbar (scroll-aware) ===== */}
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(250,250,247,0.95)" : "rgba(250,250,247,1)",
          boxShadow: scrolled ? "0 10px 40px -10px rgba(10,14,26,0.1)" : "0 0 0 rgba(0,0,0,0)",
          paddingTop: scrolled ? 12 : 20,
          paddingBottom: scrolled ? 12 : 20,
        }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => scrollTo("home")}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#0a4d68] to-[#088395] flex items-center justify-center shadow-lg">
              <Stethoscope className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#d4a574]" />
            </div>
            <div className="text-right">
              <div className={`font-bold text-[#0a0e1a] leading-tight ${isAR ? "text-lg" : "text-base font-display"}`}>{isAR ? "عيادة خالد الطبية" : "Khalid Medical"}</div>
              <div className="text-[10px] text-[#0a4d68] tracking-[0.2em] uppercase font-semibold">{isAR ? "رعاية صحية متكاملة" : "Healthcare Excellence"}</div>
            </div>
          </motion.button>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((l, i) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="relative px-4 py-2 text-[#0a0e1a] hover:text-[#0a4d68] font-medium text-sm transition group"
              >
                {l.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#0a4d68] group-hover:w-2/3 transition-all duration-300" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo("booking")}
              className="hidden md:flex items-center gap-2 bg-[#0a4d68] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#088395] transition shadow-lg shadow-[#0a4d68]/20"
            >
              <Calendar className="w-4 h-4" /> {t.utility.appt}
            </motion.button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-[#0a0e1a]">
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
              <div className="px-4 py-3 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className="text-right py-3 px-4 rounded-lg hover:bg-[#fafaf7] text-[#0a0e1a] hover:text-[#0a4d68] font-medium transition"
                  >
                    {l.label}
                  </button>
                ))}
                <button
                  onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                  className="text-right py-3 px-4 rounded-lg hover:bg-[#fafaf7] text-[#0a0e1a] font-medium flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" /> {lang === "ar" ? "English" : "العربية"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ===== Hero (full-bleed image carousel + dual CTA) ===== */}
      <section id="home" ref={heroRef} className="relative min-h-[90vh] overflow-hidden bg-[#0a0e1a]">
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          {[IMG.hero, IMG.hero2, IMG.hero3].map((src, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: heroSlide === i ? 1 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <img src={src} alt="Clinic" className="w-full h-full object-cover" />
            </motion.div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a] via-[#0a0e1a]/85 to-[#0a0e1a]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-[#0a0e1a]/40" />
        </motion.div>

        {/* Floating decorative shapes */}
        <div className="absolute top-32 right-10 w-72 h-72 rounded-full bg-[#0a4d68]/20 blur-3xl animate-float" />
        <div className="absolute bottom-32 left-20 w-96 h-96 bg-[#d4a574]/10 blur-3xl animate-blob" />

        <motion.div style={{ opacity: heroOpacity }} className="relative max-w-7xl mx-auto px-4 min-h-[90vh] flex items-center py-20">
          <div className={`max-w-3xl ${isAR ? "text-right" : "text-left"}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 glass-dark border border-white/15 text-white/90 px-5 py-2.5 rounded-full text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#d4a574] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4a574]" />
              </span>
              {t.hero.tag}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className={`text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.05] mb-6 ${isAR ? "font-cairo" : "font-display"}`}
            >
              {t.hero.title1}
              <br />
              <span className="text-gradient-gold">{t.hero.title2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-white/75 mb-10 leading-relaxed max-w-2xl"
            >
              {t.hero.desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("booking")}
                className="group bg-[#0a4d68] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl shadow-[#0a4d68]/40 hover:bg-[#088395] transition flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" /> {t.hero.cta1}
                {isAR ? <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("services")}
                className="glass-dark border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition flex items-center gap-2"
              >
                <Play className="w-5 h-5" /> {t.hero.cta2}
              </motion.button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-x-6 gap-y-2 pt-6 border-t border-white/10"
            >
              {t.hero.trust.map((tr, i) => (
                <div key={i} className="flex items-center gap-2 text-white/60 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#d4a574]" /> {tr}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              className={`h-1.5 rounded-full transition-all ${heroSlide === i ? "w-12 bg-[#d4a574]" : "w-5 bg-white/30"}`}
            />
          ))}
        </div>
      </section>

      {/* ===== Marquee strip ===== */}
      <div className="bg-[#0a0e1a] border-y border-white/5 py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-12 px-6">
              {[
                { icon: ShieldCheck, t: isAR ? "معتمد دولياً JCI" : "JCI Accredited" },
                { icon: Award, t: isAR ? "+25 سنة خبرة" : "+25 Years Experience" },
                { icon: Users, t: isAR ? "+50 استشاري" : "+50 Specialists" },
                { icon: Zap, t: isAR ? "أحدث التقنيات" : "Latest Technology" },
                { icon: Heart, t: isAR ? "رعاية إنسانية" : "Human-Centered Care" },
                { icon: Clock, t: isAR ? "طوارئ 24/7" : "24/7 Emergency" },
                { icon: Stethoscope, t: isAR ? "8 تخصصات" : "8 Specialties" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[#d4a574]">
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-semibold tracking-wide">{item.t}</span>
                  <span className="text-white/20">•</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ===== Stats band (animated counters) ===== */}
      <section className="py-20 bg-[#fafaf7] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-full bg-gradient-to-b from-[#0a4d68]/5 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4">
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-8" stagger={0.12}>
            {t.stats.map((s, i) => (
              <StaggerItem key={i}>
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-bold text-gradient-primary mb-2 font-display">
                    <Counter value={s.v} suffix={s.suffix} />
                  </div>
                  <div className="text-[#0a0e1a]/60 text-sm md:text-base">{s.l}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ===== Offers Carousel (Rosa-style) ===== */}
      <section id="offers" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 right-0 w-80 h-80 bg-[#d4a574]/8 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-[#d4a574]/15 text-[#b88a4f] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Tag className="w-4 h-4" /> {t.offers.tag}
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a0e1a] mb-4 ${isAR ? "font-cairo" : "font-display"}`}>{t.offers.title}</h2>
            <p className="text-[#0a0e1a]/60 text-lg">{t.offers.desc}</p>
          </Reveal>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <motion.div
                className="flex"
                animate={{ x: `calc(-${offerSlide} * (100% / 3))` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {t.offers.items.map((offer, i) => {
                  const img = (IMG as any)[offer.img];
                  return (
                    <div key={i} className="w-full md:w-1/3 flex-shrink-0 px-2">
                      <motion.div
                        whileHover={{ y: -8 }}
                        className="group bg-[#fafaf7] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow h-full"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <motion.img
                            src={img}
                            alt={offer.t}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/80 via-transparent to-transparent" />
                          <div className="absolute top-4 right-4 bg-[#d4a574] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                            <Tag className="w-3 h-3" /> {t.offers.badge}
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold text-white">{offer.p}</span>
                              <span className="text-sm text-white/60 line-through">{offer.oldP}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-[#0a0e1a] mb-2">{offer.t}</h3>
                          <p className="text-[#0a0e1a]/60 text-sm mb-4">{offer.d}</p>
                          <button
                            onClick={() => scrollTo("booking")}
                            className="w-full bg-gradient-to-r from-[#0a4d68] to-[#088395] text-white py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#0a4d68]/30 transition flex items-center justify-center gap-1.5"
                          >
                            <Calendar className="w-4 h-4" /> {t.offers.book}
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Arrows */}
            <button
              onClick={() => setOfferSlide(Math.max(0, offerSlide - 1))}
              disabled={offerSlide === 0}
              className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-4 z-10 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[#0a4d68] hover:bg-[#0a4d68] hover:text-white transition disabled:opacity-30"
            >
              {isAR ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setOfferSlide(Math.min(t.offers.items.length - 3, offerSlide + 1))}
              disabled={offerSlide >= t.offers.items.length - 3}
              className="absolute top-1/2 -translate-y-1/2 -left-2 md:-left-4 z-10 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[#0a4d68] hover:bg-[#0a4d68] hover:text-white transition disabled:opacity-30"
            >
              {isAR ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: Math.max(1, t.offers.items.length - 2) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setOfferSlide(i)}
                  className={`h-2 rounded-full transition-all ${offerSlide === i ? "w-8 bg-[#d4a574]" : "w-2 bg-[#0a0e1a]/15"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section id="about" className="py-24 bg-[#fafaf7] relative overflow-hidden">
        <div className="absolute top-40 right-0 w-72 h-72 rounded-full bg-[#d4a574]/8 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-[#0a4d68]/20 rounded-3xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#0a4d68]/15 to-transparent rounded-3xl" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img src={IMG.about} alt="Clinic" className="w-full h-[560px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/50 to-transparent" />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-8 right-8 bg-white p-6 rounded-2xl shadow-2xl flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0a4d68] to-[#088395] flex items-center justify-center">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0a0e1a]">JCI</div>
                    <div className="text-sm text-[#0a0e1a]/60">{isAR ? "معتمد دولياً" : "Accredited"}</div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-6 -left-6 w-36 h-36 rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden lg:block"
                >
                  <img src={IMG.facility} alt="Facility" className="w-full h-full object-cover" />
                </motion.div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="inline-flex items-center gap-2 bg-[#0a4d68]/8 text-[#0a4d68] px-4 py-2 rounded-full text-sm font-medium mb-5">
                <Sparkles className="w-4 h-4" /> {t.about.tag}
              </div>
              <h2 className={`text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#0a0e1a] leading-tight mb-6 ${isAR ? "font-cairo" : "font-display"}`}>
                {t.about.title}
              </h2>
              <p className="text-[#0a0e1a]/70 text-lg leading-relaxed mb-4">{t.about.p1}</p>
              <p className="text-[#0a0e1a]/70 text-lg leading-relaxed mb-8">{t.about.p2}</p>

              <StaggerGroup className="grid sm:grid-cols-2 gap-4" stagger={0.08}>
                {t.about.features.map((f, i) => (
                  <StaggerItem key={i}>
                    <motion.div
                      whileHover={{ scale: 1.03, y: -3 }}
                      className="flex items-start gap-3 p-5 rounded-2xl bg-white shadow-sm hover:shadow-xl transition group cursor-default"
                    >
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0a4d68]/15 to-[#0a4d68]/5 flex items-center justify-center flex-shrink-0 group-hover:from-[#0a4d68] group-hover:to-[#088395] transition">
                        <f.icon className="w-5 h-5 text-[#0a4d68] group-hover:text-white transition" />
                      </div>
                      <div>
                        <div className="font-bold text-[#0a0e1a] mb-1">{f.t}</div>
                        <div className="text-sm text-[#0a0e1a]/60">{f.d}</div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Why Choose Us (Rosa-style 10-point checklist) ===== */}
      <section id="why-us" className="py-24 bg-[#fafaf7] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d4a574]/8 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-[#0a4d68]/8 text-[#0a4d68] px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Heart className="w-4 h-4" /> {t.whyus.tag}
              </div>
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a0e1a] mb-4 ${isAR ? "font-cairo" : "font-display"}`}>{t.whyus.title}</h2>
              <p className="text-[#0a0e1a]/60 text-lg mb-8">{t.whyus.desc}</p>

              <div className="grid sm:grid-cols-2 gap-3">
                {t.whyus.items.map((item, i) => (
                  <Reveal key={i} delay={0.04 * i} y={16}>
                    <motion.div
                      whileHover={{ x: isAR ? -4 : 4 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0a4d68] to-[#088395] flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-[#0a0e1a] font-medium">{item}</span>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-[#d4a574]/30 rounded-3xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#0a4d68]/15 to-transparent rounded-3xl" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img src={IMG.whyus} alt="Why Choose Us" className="w-full h-[520px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/50 to-transparent" />
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-2xl flex items-center gap-3"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4a574] to-[#b88a4f] flex items-center justify-center">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0a0e1a]">100%</div>
                    <div className="text-sm text-[#0a0e1a]/60">{isAR ? "رضا المرضى" : "Satisfaction"}</div>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Services (staggered grid) ===== */}
      <section id="services" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 right-0 w-80 h-80 bg-[#0a4d68]/5 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#0a4d68]/8 text-[#0a4d68] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" /> {t.services.tag}
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a0e1a] mb-4 ${isAR ? "font-cairo" : "font-display"}`}>{t.services.title}</h2>
            <p className="text-[#0a0e1a]/60 text-lg">{t.services.desc}</p>
          </Reveal>

          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.07}>
            {t.services.items.map((s) => {
              const Icon = s.icon;
              const img = (IMG as any)[s.img];
              return (
                <StaggerItem key={s.t}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group bg-[#fafaf7] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow cursor-pointer h-full card-hover"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={img}
                        alt={s.t}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.12 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/90 via-[#0a0e1a]/30 to-transparent" />
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white/95 flex items-center justify-center shadow-lg group-hover:bg-[#0a4d68] transition-all duration-300">
                        <Icon className="w-6 h-6 text-[#0a4d68] group-hover:text-white transition" />
                      </div>
                      <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white">{s.t}</h3>
                    </div>
                    <div className="p-5">
                      <p className="text-[#0a0e1a]/60 text-sm leading-relaxed mb-4">{s.d}</p>
                      <button
                        onClick={() => {
                          setBooking({ ...booking, service: s.t });
                          scrollTo("booking");
                        }}
                        className="text-[#0a4d68] text-sm font-semibold flex items-center gap-1 group-hover:gap-3 transition-all"
                      >
                        {isAR ? "احجز الآن" : "Book Now"} {isAR ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
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
      <section className="relative py-24 overflow-hidden bg-[#0a0e1a]">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 10 }}
          className="absolute inset-0"
        >
          <img src={IMG.facility} alt="Facility" className="w-full h-full object-cover opacity-30" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a] via-[#0a0e1a]/80 to-[#0a0e1a]/60" />
        <Reveal className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="inline-flex w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d4a574] to-[#b88a4f] items-center justify-center mb-6 shadow-2xl"
          >
            <ShieldCheck className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight ${isAR ? "font-cairo" : "font-display"}`}>
            {isAR ? "صحتك تستحق الأفضل" : "Your Health Deserves the Best"}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {isAR ? "احجز موعدك اليوم واحصل على استشارة طبية متخصصة مع نخبة من أمهر الأطباء" : "Book your appointment today for specialized medical consultation with elite doctors"}
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("booking")}
            className="bg-[#d4a574] text-white px-10 py-4 rounded-full font-semibold text-lg shadow-2xl hover:bg-[#c19560] transition inline-flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" /> {t.utility.appt}
          </motion.button>
        </Reveal>
      </section>

      {/* ===== Doctors ===== */}
      <section id="doctors" className="py-24 bg-[#fafaf7] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0a4d68]/5 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#0a4d68]/8 text-[#0a4d68] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" /> {t.doctors.tag}
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a0e1a] mb-4 ${isAR ? "font-cairo" : "font-display"}`}>{t.doctors.title}</h2>
            <p className="text-[#0a0e1a]/60 text-lg">{t.doctors.desc}</p>
          </Reveal>

          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.08}>
            {t.doctors.items.map((d) => {
              const img = (IMG as any)[d.img];
              return (
                <StaggerItem key={d.name}>
                  <motion.div whileHover={{ y: -8 }} className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow cursor-pointer h-full">
                    <div className="relative h-72 overflow-hidden">
                      <img src={img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/95 via-[#0a0e1a]/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-gradient-to-r from-[#0a4d68] to-[#088395] text-white text-xs font-medium px-3 py-1.5 rounded-full inline-block shadow-lg">{d.exp}</div>
                      </div>
                      <div className="absolute inset-0 bg-[#0a0e1a]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <motion.button
                          onClick={() => {
                            setBooking({ ...booking, doctor: d.name });
                            scrollTo("booking");
                          }}
                          className="bg-white text-[#0a0e1a] px-6 py-3 rounded-full font-semibold shadow-xl transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2"
                        >
                          <Calendar className="w-4 h-4" /> {t.doctors.bookWith}
                        </motion.button>
                      </div>
                    </div>
                    <div className="p-5 text-center">
                      <h3 className="text-lg font-bold text-[#0a0e1a] mb-1">{d.name}</h3>
                      <p className="text-[#0a4d68] text-sm font-medium mb-2">{d.spec}</p>
                      <p className="text-[#0a0e1a]/50 text-xs flex items-center justify-center gap-1.5">
                        <Award className="w-3 h-3" /> {d.edu}
                      </p>
                      <div className="flex items-center justify-center gap-1 mt-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-3.5 h-3.5 fill-[#d4a574] text-[#d4a574]" />
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

      {/* ===== Booking — Multi-step with progress ===== */}
      <section id="booking" className="py-24 bg-[#0a0e1a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#0a4d68]/20 blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#d4a574]/10 blur-3xl animate-blob" />

        <div className="relative max-w-5xl mx-auto px-4">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 glass-dark border border-white/15 text-[#d4a574] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Calendar className="w-4 h-4" /> {t.booking.tag}
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 ${isAR ? "font-cairo" : "font-display"}`}>{t.booking.title}</h2>
            <p className="text-white/70 text-lg">{t.booking.desc}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10" style={{ direction: isAR ? "rtl" : "ltr" }}>
              {bookingDone ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="w-20 h-20 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#0a0e1a] mb-2">{t.booking.success}</h3>
                  <p className="text-[#0a0e1a]/60 mb-6">{t.booking.successDesc}</p>
                  <div className="bg-[#0a4d68]/5 rounded-2xl p-5 mb-6 text-right max-w-md mx-auto">
                    <div className="text-sm space-y-2 text-[#0a0e1a]">
                      <div className="flex justify-between"><span className="text-[#0a0e1a]/60">{isAR ? "الخدمة:" : "Service:"}</span> <span className="font-semibold">{booking.service}</span></div>
                      <div className="flex justify-between"><span className="text-[#0a0e1a]/60">{isAR ? "الطبيب:" : "Doctor:"}</span> <span className="font-semibold">{booking.doctor}</span></div>
                      <div className="flex justify-between"><span className="text-[#0a0e1a]/60">{isAR ? "الموعد:" : "When:"}</span> <span className="font-semibold" dir="ltr">{booking.date} {booking.time}</span></div>
                      <div className="flex justify-between"><span className="text-[#0a0e1a]/60">{isAR ? "الاسم:" : "Name:"}</span> <span className="font-semibold">{booking.name}</span></div>
                      <div className="flex justify-between"><span className="text-[#0a0e1a]/60">{isAR ? "الجوال:" : "Phone:"}</span> <span className="font-semibold" dir="ltr">{booking.phone}</span></div>
                    </div>
                  </div>
                  <button onClick={resetBooking} className="bg-[#0a4d68] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#088395] transition">
                    {t.booking.newBooking}
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Progress bar */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-semibold text-[#0a0e1a]/60">
                        {t.booking.step} {bookingStep + 1} {t.booking.of} {bookingSteps.length}
                      </div>
                      <div className="text-sm font-bold text-[#0a4d68]">{bookingSteps[bookingStep].title}</div>
                    </div>
                    <div className="relative h-2 bg-[#0a0e1a]/8 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ width: `${((bookingStep + 1) / bookingSteps.length) * 100}%` }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0a4d68] to-[#088395] rounded-full"
                      />
                    </div>
                    <div className="flex justify-between mt-3">
                      {bookingSteps.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => i < bookingStep && setBookingStep(i)}
                          className={`text-xs font-semibold transition ${i <= bookingStep ? "text-[#0a4d68]" : "text-[#0a0e1a]/40"} ${i < bookingStep ? "cursor-pointer" : "cursor-default"}`}
                        >
                          {i < bookingStep && <CheckCircle2 className="w-3 h-3 inline ml-1" />}
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={bookingStep}
                      initial={{ opacity: 0, x: isAR ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isAR ? 20 : -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {bookingSteps[bookingStep].content}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#0a0e1a]/8">
                    <button
                      onClick={() => setBookingStep(Math.max(0, bookingStep - 1))}
                      disabled={bookingStep === 0}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-full font-semibold text-sm text-[#0a0e1a]/60 hover:text-[#0a0e1a] disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      {isAR ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />} {t.booking.back}
                    </button>
                    {bookingStep < bookingSteps.length - 1 ? (
                      <button
                        onClick={() => setBookingStep(bookingStep + 1)}
                        disabled={!bookingSteps[bookingStep].valid}
                        className="flex items-center gap-1.5 bg-[#0a4d68] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#088395] disabled:opacity-30 disabled:cursor-not-allowed transition"
                      >
                        {t.booking.next} {isAR ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </button>
                    ) : (
                      <button
                        onClick={submitBooking}
                        disabled={!bookingSteps[bookingStep].valid}
                        className="flex items-center gap-1.5 bg-green-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-green-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                      >
                        <CheckCircle2 className="w-4 h-4" /> {t.booking.submit}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Testimonials slider ===== */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#d4a574]/8 blur-3xl rounded-full" />
        <div className="max-w-4xl mx-auto px-4 relative">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#0a4d68]/8 text-[#0a4d68] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" /> {t.testimonials.tag}
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a0e1a] ${isAR ? "font-cairo" : "font-display"}`}>{t.testimonials.title}</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative bg-[#fafaf7] rounded-3xl p-8 md:p-12 shadow-lg">
              <Quote className="absolute top-6 left-6 w-16 h-16 text-[#0a4d68]/10" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <div className="flex items-center gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-5 h-5 fill-[#d4a574] text-[#d4a574]" />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl text-[#0a0e1a] leading-relaxed mb-8 font-medium">
                    "{t.testimonials.items[activeTestimonial].text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0a4d68] to-[#088395] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {t.testimonials.items[activeTestimonial].name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-[#0a0e1a] text-lg">{t.testimonials.items[activeTestimonial].name}</div>
                      <div className="text-sm text-[#0a4d68]">{t.testimonials.items[activeTestimonial].role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-center gap-2 mt-8">
                {t.testimonials.items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2 rounded-full transition-all ${activeTestimonial === i ? "w-8 bg-[#0a4d68]" : "w-2 bg-[#0a0e1a]/15"}`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Results Gallery (review screenshots, Rosa-style) ===== */}
      <section id="results" className="py-24 bg-[#fafaf7] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0a4d68]/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-[#d4a574]/15 text-[#b88a4f] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" /> {t.results.tag}
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a0e1a] mb-4 ${isAR ? "font-cairo" : "font-display"}`}>{t.results.title}</h2>
            <p className="text-[#0a0e1a]/60 text-lg">{t.results.desc}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <motion.div
                  className="flex"
                  animate={{ x: `calc(-${resultsSlide} * 100%)` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t.testimonials.items.map((tt, i) => (
                    <div key={i} className="w-full flex-shrink-0 px-2">
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mx-auto max-w-3xl"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                            <MessageCircle className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-[#0a0e1a]">{tt.name}</span>
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            </div>
                            <div className="text-xs text-[#0a0e1a]/60">{isAR ? "عميل موثّق" : "Verified Patient"}</div>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className="w-4 h-4 fill-[#d4a574] text-[#d4a574]" />
                            ))}
                          </div>
                        </div>
                        <p className="text-lg text-[#0a0e1a]/80 leading-relaxed mb-4">{tt.text}</p>
                        <div className="text-xs text-[#0a0e1a]/40">{tt.role} • {isAR ? "عبر واتساب" : "via WhatsApp"}</div>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <button
                onClick={() => setResultsSlide(Math.max(0, resultsSlide - 1))}
                disabled={resultsSlide === 0}
                className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-4 z-10 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[#0a4d68] hover:bg-[#0a4d68] hover:text-white transition disabled:opacity-30"
              >
                {isAR ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setResultsSlide(Math.min(t.testimonials.items.length - 1, resultsSlide + 1))}
                disabled={resultsSlide >= t.testimonials.items.length - 1}
                className="absolute top-1/2 -translate-y-1/2 -left-2 md:-left-4 z-10 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[#0a4d68] hover:bg-[#0a4d68] hover:text-white transition disabled:opacity-30"
              >
                {isAR ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>

              <div className="flex justify-center gap-2 mt-6">
                {t.testimonials.items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setResultsSlide(i)}
                    className={`h-2 rounded-full transition-all ${resultsSlide === i ? "w-8 bg-[#d4a574]" : "w-2 bg-[#0a0e1a]/15"}`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Blog / Articles (SEO content, Rosa-style) ===== */}
      <section id="blog" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-0 w-80 h-80 bg-[#0a4d68]/5 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-[#0a4d68]/8 text-[#0a4d68] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Newspaper className="w-4 h-4" /> {t.blog.tag}
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a0e1a] mb-4 ${isAR ? "font-cairo" : "font-display"}`}>{t.blog.title}</h2>
            <p className="text-[#0a0e1a]/60 text-lg">{t.blog.desc}</p>
          </Reveal>

          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.08}>
            {t.blog.items.map((article, i) => {
              const img = (IMG as any)[article.img];
              return (
                <StaggerItem key={i}>
                  <motion.article
                    whileHover={{ y: -8 }}
                    className="group bg-[#fafaf7] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow cursor-pointer h-full"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={img}
                        alt={article.t}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute top-3 right-3 bg-[#0a4d68] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        {article.cat}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-xs text-[#0a0e1a]/50 mb-2 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" /> {article.date}
                      </div>
                      <h3 className="font-bold text-[#0a0e1a] mb-2 line-clamp-2">{article.t}</h3>
                      <p className="text-sm text-[#0a0e1a]/60 mb-4 line-clamp-2">{article.d}</p>
                      <button className="text-[#0a4d68] text-sm font-semibold flex items-center gap-1 group-hover:gap-3 transition-all">
                        {t.blog.readMore} {isAR ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </motion.article>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-24 bg-[#fafaf7]">
        <div className="max-w-3xl mx-auto px-4">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#0a4d68]/8 text-[#0a4d68] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <FileText className="w-4 h-4" /> {t.faq.tag}
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold text-[#0a0e1a] ${isAR ? "font-cairo" : "font-display"}`}>{t.faq.title}</h2>
          </Reveal>

          <div className="space-y-3">
            {t.faq.items.map((item, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-5 flex items-center justify-between text-right hover:bg-[#fafaf7] transition"
                  >
                    <span className="font-semibold text-[#0a0e1a]">{item.q}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition ${openFaq === i ? "bg-[#0a4d68] text-white" : "bg-[#0a4d68]/10 text-[#0a4d68]"}`}>
                      {openFaq === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 text-[#0a0e1a]/70 leading-relaxed">{item.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#0a4d68]/8 text-[#0a4d68] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MapPin className="w-4 h-4" /> {t.contact.tag}
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a0e1a] mb-4 ${isAR ? "font-cairo" : "font-display"}`}>{t.contact.title}</h2>
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
                    <a href={item.href || "#"} className="flex items-start gap-4 p-5 bg-[#fafaf7] rounded-2xl shadow-sm hover:shadow-lg transition group block">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0a4d68] to-[#088395] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-[#0a0e1a]/60 text-sm mb-1">{item.t}</div>
                        <div className="text-[#0a0e1a] font-bold" dir={item.icon === Phone || item.icon === Mail ? "ltr" : "auto"}>{item.v}</div>
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-3xl overflow-hidden shadow-2xl h-full min-h-[450px] bg-[#fafaf7]">
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
      <footer className="bg-[#0a0e1a] text-white pt-16 pb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4a574]/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0a4d68] to-[#088395] flex items-center justify-center shadow-lg">
                  <Stethoscope className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-bold text-xl">{isAR ? "عيادة خالد" : "Khalid Clinic"}</div>
                  <div className="text-xs text-[#d4a574] tracking-[0.2em] uppercase font-semibold">{isAR ? "رعاية صحية" : "Healthcare"}</div>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                {isAR ? "رعاية صحية متكاملة بأحدث التقنيات وفريق طبي متخصص منذ 1998" : "Comprehensive healthcare with modern technology and specialized medical team since 1998"}
              </p>
              {/* Social links */}
              <div>
                <div className="text-xs text-white/50 mb-3 font-semibold">{t.social.follow}</div>
                <div className="flex items-center gap-2">
                  {[
                    { icon: Instagram, url: "https://instagram.com/khalid-alharbi", color: "#E1306C" },
                    { icon: Facebook, url: "https://facebook.com/khalid-alharbi", color: "#1877F2" },
                    { icon: Twitter, url: "https://twitter.com/khalid-alharbi", color: "#1DA1F2" },
                    { icon: Youtube, url: "https://youtube.com/@khalid-alharbi", color: "#FF0000" },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition group"
                      style={{ ["--hover-color" as any]: s.color }}
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
              <h4 className="font-bold text-[#d4a574] mb-4">{t.footer.quick}</h4>
              <div className="space-y-2">
                {navLinks.map((l) => (
                  <button key={l.id} onClick={() => scrollTo(l.id)} className="block text-white/60 hover:text-[#d4a574] text-sm transition text-right">
                    {l.label}
                  </button>
                ))}
                <button onClick={() => scrollTo("blog")} className="block text-white/60 hover:text-[#d4a574] text-sm transition text-right">
                  {t.blog.tag}
                </button>
                <button onClick={() => scrollTo("offers")} className="block text-white/60 hover:text-[#d4a574] text-sm transition text-right">
                  {t.offers.tag}
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#d4a574] mb-4">{t.footer.services}</h4>
              <div className="space-y-2">
                {t.services.items.slice(0, 5).map((s, i) => (
                  <button key={i} onClick={() => scrollTo("services")} className="block text-white/60 hover:text-[#d4a574] text-sm transition text-right">
                    {s.t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#d4a574] mb-4">{t.footer.contact}</h4>
              <div className="space-y-3">
                <a href="tel:+966575015019" className="flex items-center gap-2 text-white/60 hover:text-[#d4a574] text-sm transition group" dir="ltr">
                  <Phone className="w-4 h-4 group-hover:scale-110 transition" /> +966 57 501 5019
                </a>
                <a href="mailto:khalid-alharbi@zohomail.sa" className="flex items-center gap-2 text-white/60 hover:text-[#d4a574] text-sm transition group" dir="ltr">
                  <Mail className="w-4 h-4 group-hover:scale-110 transition" /> khalid-alharbi@zohomail.sa
                </a>
                <div className="flex items-start gap-2 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> {t.contact.addressV}
                </div>
              </div>
            </div>
          </div>

          {/* Legal info (Rosa-style) */}
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
              © {new Date().getFullYear()} {isAR ? "عيادة خالد الطبية" : "Khalid Medical Clinic"} — {t.footer.rights}
            </div>
          </div>
        </div>
      </footer>

      {/* ===== Contact Popup Modal (Rosa-style) ===== */}
      <AnimatePresence>
        {showContactPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContactPopup(false)}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowContactPopup(false)}
                className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#fafaf7] hover:bg-[#0a0e1a] hover:text-white text-[#0a0e1a] flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>

              {contactSent ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="w-16 h-16 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-4"
                  >
                    <CheckCircle2 className="w-9 h-9 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#0a0e1a] mb-2">{t.contactPopup.sent}</h3>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0a4d68] to-[#088395] flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0a0e1a]">{t.contactPopup.title}</h3>
                      <p className="text-sm text-[#0a0e1a]/60">{t.contactPopup.desc}</p>
                    </div>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setContactSent(true);
                      setTimeout(() => {
                        setShowContactPopup(false);
                        setContactSent(false);
                        setContactForm({ name: "", phone: "", message: "" });
                      }, 2500);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <Label className="text-[#0a0e1a] font-semibold text-sm mb-2 block">{t.contactPopup.name}</Label>
                      <Input
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder={t.contactPopup.namePh}
                        className="bg-[#fafaf7] border-2 border-[#0a0e1a]/10 focus:border-[#0a4d68] rounded-xl py-3 h-12 text-[#0a0e1a] placeholder:text-[#0a0e1a]/40 focus-visible:ring-0"
                        style={{ color: "#0a0e1a", caretColor: "#0a4d68" }}
                      />
                    </div>
                    <div>
                      <Label className="text-[#0a0e1a] font-semibold text-sm mb-2 block">{t.contactPopup.phone}</Label>
                      <Input
                        required
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder={t.contactPopup.phonePh}
                        className="bg-[#fafaf7] border-2 border-[#0a0e1a]/10 focus:border-[#0a4d68] rounded-xl py-3 h-12 text-[#0a0e1a] placeholder:text-[#0a0e1a]/40 focus-visible:ring-0"
                        style={{ color: "#0a0e1a", caretColor: "#0a4d68" }}
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <Label className="text-[#0a0e1a] font-semibold text-sm mb-2 block">{t.contactPopup.message}</Label>
                      <Textarea
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder={t.contactPopup.messagePh}
                        rows={3}
                        className="bg-[#fafaf7] border-2 border-[#0a0e1a]/10 focus:border-[#0a4d68] rounded-xl py-3 text-[#0a0e1a] placeholder:text-[#0a0e1a]/40 focus-visible:ring-0 resize-none"
                        style={{ color: "#0a0e1a", caretColor: "#0a4d68" }}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-[#0a4d68] hover:bg-[#088395] text-white py-3 h-12 rounded-xl font-semibold">
                      <Send className="w-4 h-4 ml-2" /> {t.contactPopup.send}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="w-12 h-12 rounded-full bg-[#0a0e1a] text-[#d4a574] shadow-xl flex items-center justify-center"
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
                  <div className="font-bold text-[#0a0e1a] text-sm">{isAR ? "واتساب" : "WhatsApp"}</div>
                  <div className="text-xs text-green-600">● Online</div>
                </div>
              </div>
              <p className="text-sm text-[#0a0e1a]/70 mb-4">
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

      {/* Contact popup button (left side, Rosa-style envelope) */}
      <button
        onClick={() => setShowContactPopup(true)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#0a4d68] to-[#088395] text-white shadow-2xl flex items-center justify-center hover:scale-110 transition group"
        aria-label={t.contactPopup.title}
      >
        <MessageSquare className="w-7 h-7" />
        <span className="absolute inset-0 rounded-full bg-[#0a4d68] animate-ping opacity-20" />
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#d4a574] text-white text-[10px] font-bold flex items-center justify-center">
          !
        </span>
      </button>
    </div>
  );
}
