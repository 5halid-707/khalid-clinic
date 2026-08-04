"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield, ShieldCheck, AlertTriangle, CheckCircle2, XCircle,
  ExternalLink, Github, ShoppingCart, Calculator, Users, Package,
  TrendingUp, FileText, Lock, Search, Bell, Crown, Activity,
  Database, Eye, EyeOff, Download, RefreshCw, ChevronLeft,
} from "lucide-react";

const SITE_URL = "https://khalid-cyber-security.vercel.app";
const ERP_URL = "https://kmh-erp-suite.vercel.app";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"before" | "after" | "comparison">("comparison");

  return (
    <div dir="rtl" className="min-h-screen bg-[#05080f] text-white cyber-grid">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 z-30 bg-[#05080f]/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center font-extrabold text-white glow-primary">
              K
            </div>
            <div>
              <h1 className="text-sm font-bold">معاينة تحسينات موقع خالد الحربي</h1>
              <p className="text-[10px] text-white/50">قبل النشر على GitHub و Vercel</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs hover:bg-white/10 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              الموقع الحالي
            </a>
            <a
              href={ERP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 text-xs hover:bg-cyan-500/25 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              ERP
            </a>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <h2 className="text-2xl sm:text-3xl font-bold">
            تحسينات مقترحة لموقع خالد الحربي
          </h2>
          <p className="text-sm text-white/60 max-w-2xl mx-auto">
            هذه معاينة حية لكل التحسينات قبل رفعها على GitHub و Vercel.
            جرّب التبويبات أدناه لمقارنة الحالة الحالية بالتحسينات المقترحة.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex bg-white/5 border border-white/10 rounded-lg p-1 gap-1">
            <TabButton active={activeTab === "comparison"} onClick={() => setActiveTab("comparison")}>
              مقارنة
            </TabButton>
            <TabButton active={activeTab === "before"} onClick={() => setActiveTab("before")}>
              الحالة الحالية
            </TabButton>
            <TabButton active={activeTab === "after"} onClick={() => setActiveTab("after")}>
              بعد التحسين
            </TabButton>
          </div>
        </div>

        {/* Content */}
        {activeTab === "comparison" && <ComparisonView />}
        {activeTab === "before" && <BeforeView />}
        {activeTab === "after" && <AfterView />}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-8 border-t border-white/10">
          <button
            onClick={() => alert("سيتم رفع التحسينات على GitHub و Vercel بعد موافقتك")}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm glow-primary hover:scale-105 transition-transform"
          >
            ✓ أعجبني — ارفع على GitHub و Vercel
          </button>
          <button
            onClick={() => alert("سنعدّل حسب ملاحظاتك")}
            className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors"
          >
            يحتاج تعديل
          </button>
        </div>
      </main>

      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-[10px] text-white/40">
          معاينة تحسينات — خالد الحربي | خبير أمن سيبراني معتمد
        </div>
      </footer>

      <style jsx global>{`
        .cyber-grid {
          background-image:
            linear-gradient(rgba(0, 168, 232, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 168, 232, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .glow-primary {
          box-shadow: 0 0 20px rgba(0, 168, 232, 0.4);
        }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #0c1119; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #00a8e8; }
      `}</style>
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-xs font-medium transition-colors ${
        active ? "bg-cyan-500/20 text-cyan-400" : "text-white/60 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

// ============================================================
// COMPARISON VIEW — side by side before/after
// ============================================================
function ComparisonView() {
  const improvements = [
    {
      title: "النص الغريب في الفوتر",
      before: '"أغاني R&B رايقة موظف" يظهر في آخر الصفحة',
      after: "تم الحذف — فوتر نظيف واحترافي",
      status: "fix",
      icon: AlertTriangle,
    },
    {
      title: "KMH ERP Suite في البورتفوليو",
      before: "غير موجود — 9 مشاريع فقط",
      after: "تمت الإضافة كب مشروع رقم 10 — مع رابط مباشر + GitHub",
      status: "add",
      icon: Package,
    },
    {
      title: "روابط مكسورة (5halid)",
      before: "bright-5halid-amazon.netlify.app\nwhatsapp-web-clone-5halid-707s...",
      after: "تم تصحيح الروابط أو إخفاؤها",
      status: "fix",
      icon: XCircle,
    },
    {
      title: "sitemap.xml",
      before: "404 — غير موجود",
      after: "تم إنشاؤه تلقائياً مع 9 مسارات",
      status: "add",
      icon: FileText,
    },
    {
      title: "robots.txt",
      before: "موجود لكن بدون رابط sitemap",
      after: "محدّث مع رابط sitemap.xml",
      status: "fix",
      icon: Search,
    },
    {
      title: "Open Graph tags",
      before: "مفقود — لا معاينة عند المشاركة",
      after: "OG image + title + description — معاينة احترافية",
      status: "add",
      icon: Eye,
    },
    {
      title: "Twitter Card",
      before: "مفقود",
      after: "summary_large_image card",
      status: "add",
      icon: Bell,
    },
    {
      title: "Canonical URL",
      before: "مفقود",
      after: "<link rel='canonical'> مضبوط",
      status: "add",
      icon: ShieldCheck,
    },
    {
      title: "JSON-LD Schema.org",
      before: "مفقود — لا نتائج غنية في Google",
      after: "Person + ProfessionalService + FAQ + Breadcrumb",
      status: "add",
      icon: Database,
    },
    {
      title: "سياسة الخصوصية (PDPL)",
      before: "مفقود — مخالف للنظام السعودي",
      after: "صفحة كاملة متوافقة مع PDPL (14 قسم)",
      status: "add",
      icon: Lock,
    },
    {
      title: "favicon.ico",
      before: "404 — غير موجود",
      after: "SVG favicon بشعار K",
      status: "fix",
      icon: Crown,
    },
    {
      title: "Meta description",
      before: "موجودة لكن قصيرة",
      after: "محسّنة + keywords محدّثة",
      status: "fix",
      icon: FileText,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <SummaryCard icon={CheckCircle2} label="تحسينات" value="12" color="emerald" />
        <SummaryCard icon={AlertTriangle} label="إصلاحات" value="6" color="amber" />
        <SummaryCard icon={Package} label="إضافات جديدة" value="6" color="cyan" />
      </div>

      {/* Improvements list */}
      <div className="space-y-3">
        {improvements.map((imp, i) => {
          const Icon = imp.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-cyan-400/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  imp.status === "fix" ? "bg-amber-500/15 text-amber-400" : "bg-cyan-500/15 text-cyan-400"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-semibold">{imp.title}</h3>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                      imp.status === "fix" ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
                    }`}>
                      {imp.status === "fix" ? "إصلاح" : "إضافة"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-start gap-2 text-rose-400/80">
                      <XCircle className="w-3 h-3 mt-0.5 shrink-0" />
                      <pre className="whitespace-pre-wrap font-sans">{imp.before}</pre>
                    </div>
                    <div className="flex items-start gap-2 text-emerald-400/80">
                      <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" />
                      <span>{imp.after}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, color }: any) {
  const colorMap: any = {
    emerald: "text-emerald-400 bg-emerald-400/10",
    amber: "text-amber-400 bg-amber-400/10",
    cyan: "text-cyan-400 bg-cyan-400/10",
  };
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xl font-bold">{value}</div>
        <div className="text-[10px] text-white/50">{label}</div>
      </div>
    </div>
  );
}

// ============================================================
// BEFORE VIEW — current state
// ============================================================
function BeforeView() {
  return (
    <div className="space-y-4">
      <div className="bg-rose-500/10 border border-rose-400/30 rounded-xl p-4 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
        <div>
          <h3 className="text-sm font-semibold text-rose-400">الحالة الحالية للموقع</h3>
          <p className="text-xs text-white/60 mt-1">هذه المشاكل موجودة الآن في khalid-cyber-security.vercel.app</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <IssueCard
          icon={AlertTriangle}
          title="نص غريب في الفوتر"
          severity="critical"
          description='النص "أغاني R&B رايقة موظف" يظهر في آخر الصفحة — يضرّ بمصداقية خبير أمن سيبراني.'
        />
        <IssueCard
          icon={XCircle}
          title="KMH ERP غير مضاف"
          severity="high"
          description="مشروع ERP الاحترافي الذي بنيناه غير موجود في قسم الأعمال المنجزة."
        />
        <IssueCard
          icon={XCircle}
          title="sitemap.xml مفقود"
          severity="high"
          description="يرجع 404 — Google لا يكتشف صفحات الموقع."
        />
        <IssueCard
          icon={XCircle}
          title="OG tags مفقودة"
          severity="high"
          description="عند مشاركة الرابط في WhatsApp/Twitter — لا تظهر معاينة."
        />
        <IssueCard
          icon={XCircle}
          title="JSON-LD مفقود"
          severity="medium"
          description="لا تظهر نتائج غنية في Google (Rich Results)."
        />
        <IssueCard
          icon={Lock}
          title="لا سياسة خصوصية"
          severity="high"
          description="مخالف لنظام حماية البيانات الشخصية السعودي (PDPL)."
        />
        <IssueCard
          icon={XCircle}
          title="روابط مكسورة"
          severity="medium"
          description="روابط بـ '5halid' بدلاً من 'khalid' في بعض المشاريع."
        />
        <IssueCard
          icon={Crown}
          title="favicon.ico مفقود"
          severity="low"
          description="يرجع 404 في تبويب المتصفح."
        />
      </div>
    </div>
  );
}

function IssueCard({ icon: Icon, title, severity, description }: any) {
  const severityMap: any = {
    critical: "text-rose-400 bg-rose-500/10 border-rose-400/30",
    high: "text-amber-400 bg-amber-500/10 border-amber-400/30",
    medium: "text-yellow-400 bg-yellow-500/10 border-yellow-400/30",
    low: "text-blue-400 bg-blue-500/10 border-blue-400/30",
  };
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${severityMap[severity]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      <p className="text-xs text-white/60 leading-relaxed">{description}</p>
    </div>
  );
}

// ============================================================
// AFTER VIEW — improved state
// ============================================================
function AfterView() {
  return (
    <div className="space-y-4">
      <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-xl p-4 flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <div>
          <h3 className="text-sm font-semibold text-emerald-400">بعد تطبيق التحسينات</h3>
          <p className="text-xs text-white/60 mt-1">الموقع سيكون متوافقاً مع معايير SEO العالمية + PDPL السعودي</p>
        </div>
      </div>

      {/* KMH ERP Card Preview */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-white/80 flex items-center gap-2">
          <Package className="w-4 h-4 text-cyan-400" />
          معاينة: KMH ERP Suite في البورتفوليو
        </h4>
        <KmhErpCardPreview />
      </div>

      {/* OG Preview */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-white/80 flex items-center gap-2">
          <Eye className="w-4 h-4 text-cyan-400" />
          معاينة: Open Graph (عند المشاركة في WhatsApp/Twitter)
        </h4>
        <OgPreviewCard />
      </div>

      {/* JSON-LD Preview */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-white/80 flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          معاينة: JSON-LD Schema.org (لنتائج Google الغنية)
        </h4>
        <JsonLdPreview />
      </div>

      {/* Privacy Policy Preview */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-white/80 flex items-center gap-2">
          <Lock className="w-4 h-4 text-cyan-400" />
          معاينة: صفحة سياسة الخصوصية (PDPL)
        </h4>
        <PrivacyPreview />
      </div>

      {/* Fixed footer */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-white/80 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          معاينة: الفوتر بعد إزالة النص الغريب
        </h4>
        <FixedFooterPreview />
      </div>
    </div>
  );
}

function KmhErpCardPreview() {
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl overflow-hidden">
      <div className="aspect-video relative bg-gradient-to-br from-[#05080f] to-[#0c1119] flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "linear-gradient(rgba(0,168,232,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,168,232,0.15) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="text-center relative z-10">
          <div className="w-16 h-16 mx-auto mb-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center font-extrabold text-white text-2xl shadow-lg shadow-cyan-500/30">
            K
          </div>
          <div className="text-sm font-bold">KMH ERP Suite</div>
          <div className="text-[10px] text-cyan-400">نظام الإدارة المتكامل</div>
        </div>
        <div className="absolute top-2 right-2 flex gap-1">
          <div className="w-7 h-7 rounded bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
            <ShoppingCart className="w-3 h-3 text-emerald-400" />
          </div>
          <div className="w-7 h-7 rounded bg-amber-500/20 border border-amber-400/30 flex items-center justify-center">
            <Calculator className="w-3 h-3 text-amber-400" />
          </div>
          <div className="w-7 h-7 rounded bg-purple-500/20 border border-purple-400/30 flex items-center justify-center">
            <Users className="w-3 h-3 text-purple-400" />
          </div>
          <div className="w-7 h-7 rounded bg-rose-500/20 border border-rose-400/30 flex items-center justify-center">
            <Package className="w-3 h-3 text-rose-400" />
          </div>
        </div>
        <div className="absolute top-2 left-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[9px] text-emerald-400">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            مباشر
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-bold mb-1">KMH ERP Suite — نظام إدارة متكامل</h3>
        <p className="text-[11px] text-white/60 leading-relaxed mb-2">
          نظام إدارة أعمال احترافي يحاكي SAP و Odoo بـ 8 وحدات: نقطة بيع، محاسبة، موارد بشرية، مخزون، عملاء، تقارير. مع مصادقة JWT و6 أدوار صلاحيات.
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {["Next.js 16", "TypeScript", "PostgreSQL", "Prisma", "Tailwind 4"].map((t) => (
            <span key={t} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-white/50 font-mono">{t}</span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1 mb-3 text-center">
          <div className="p-1.5 rounded bg-white/5">
            <div className="text-xs font-bold text-cyan-400">8</div>
            <div className="text-[8px] text-white/40">وحدات</div>
          </div>
          <div className="p-1.5 rounded bg-white/5">
            <div className="text-xs font-bold text-emerald-400">18+</div>
            <div className="text-[8px] text-white/40">API</div>
          </div>
          <div className="p-1.5 rounded bg-white/5">
            <div className="text-xs font-bold text-amber-400">6</div>
            <div className="text-[8px] text-white/40">أدوار</div>
          </div>
        </div>
        <div className="flex gap-1.5">
          <a href={ERP_URL} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-400/30 text-[10px] font-medium hover:bg-cyan-500/25">
            <ExternalLink className="w-3 h-3" /> معاينة
          </a>
          <a href="https://github.com/5halid-707/kmh-erp-suite" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded bg-white/5 text-white/60 border border-white/10 text-[10px] hover:bg-white/10">
            <Github className="w-3 h-3" /> الكود
          </a>
        </div>
      </div>
    </div>
  );
}

function OgPreviewCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-white/10">
        <div className="aspect-[1.91/1] bg-gradient-to-br from-[#05080f] to-[#0c1119] flex items-center justify-center relative">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center font-extrabold text-white text-3xl">
              K
            </div>
            <div className="text-sm font-bold text-white">خالد الحربي</div>
            <div className="text-[10px] text-cyan-400">خبير أمن سيبراني معتمد CPD</div>
          </div>
        </div>
        <div className="p-3">
          <div className="text-[10px] text-white/40 mb-1">khalid-cyber-security.vercel.app</div>
          <div className="text-sm font-semibold text-white mb-1">خالد الحربي | خبير أمن سيبراني معتمد</div>
          <div className="text-[11px] text-white/60">خالد محمد الحربي — خبير أمن سيبراني معتمد CPD. خدمات اختبار اختراق، حماية الشبكات، تأمين المواقع...</div>
        </div>
      </div>
      <p className="text-[10px] text-white/40 mt-2">هكذا ستظهر المعاينة عند مشاركة الرابط في WhatsApp / Twitter / LinkedIn / Telegram</p>
    </div>
  );
}

function JsonLdPreview() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex flex-wrap gap-2 mb-3">
        {["Person", "ProfessionalService", "FAQPage", "BreadcrumbList"].map((type) => (
          <span key={type} className="px-2 py-1 rounded bg-cyan-500/15 border border-cyan-400/30 text-[10px] text-cyan-400 font-mono">
            {type}
          </span>
        ))}
      </div>
      <pre className="bg-[#0a0e14] rounded-lg p-3 text-[10px] text-emerald-400 font-mono overflow-x-auto" dir="ltr">
{`{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "خالد محمد عودة الحربي",
  "jobTitle": "Cyber Security Expert",
  "url": "https://khalid-cyber-security.vercel.app",
  "telephone": "+966575015019",
  "hasCredential": [
    { "@type": "EducationalOccupationalCredential",
      "name": "CPD Certified (250 hours)" },
    { "@type": "EducationalOccupationalCredential",
      "name": "Cisco Network Technician" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "6"
  }
}`}
      </pre>
      <p className="text-[10px] text-white/40 mt-2">يساعد Google على عرض معلوماتك في نتائج البحث الغنية (Rich Results)</p>
    </div>
  );
}

function PrivacyPreview() {
  const sections = [
    "مقدمة + نظام PDPL السعودي",
    "البيانات الشخصية المجموعة",
    "الأغراض القانونية للمعالجة",
    "الأساس القانوني",
    "مشاركة البيانات مع أطراف ثالثة",
    "الإجراءات الأمنية",
    "مدة الاحتفاظ بالبيانات",
    "حقوقك (8 حقوق)",
    "نقل البيانات خارج المملكة",
    "ملفات تعريف الارتباط",
    "خصوصية الأطفال",
    "إشعارات خراب البيانات",
    "التعديلات على السياسة",
    "التواصل معنا",
  ];
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-sm font-semibold">سياسة الخصوصية</h4>
          <p className="text-[10px] text-white/50">14 قسم — متوافقة مع PDPL السعودي</p>
        </div>
        <span className="px-2 py-1 rounded bg-emerald-500/15 border border-emerald-400/30 text-[10px] text-emerald-400">
          ✓ متوافق
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {sections.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[10px] text-white/60 p-1.5 rounded bg-white/5">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>{i + 1}. {s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FixedFooterPreview() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="bg-[#0a0e14] rounded-lg p-4 border border-white/10">
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <div className="text-xs font-bold mb-2">K.Al-harbi</div>
            <p className="text-[10px] text-white/60">خبير أمن سيبراني معتمد CPD</p>
          </div>
          <div className="text-left">
            <div className="text-[10px] text-white/50 mb-1">روابط سريعة</div>
            <div className="text-[10px] text-cyan-400 space-y-0.5">
              <div>نبذة عني</div>
              <div>خدماتي</div>
              <div>أعمالي</div>
              <div className="text-emerald-400">سياسة الخصوصية ← جديدة</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-2 text-[9px] text-white/40 text-center">
          © 2026 خالد الحربي — Cyber Security Services. جميع الحقوق محفوظة.
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 text-[10px] text-emerald-400">
        <CheckCircle2 className="w-3 h-3" />
        <span>تم حذف "أغاني R&B رايقة موظف" — فوتر نظيف</span>
      </div>
    </div>
  );
}
