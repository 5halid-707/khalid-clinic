// scripts/seed-neon.ts — seed Neon PostgreSQL database
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Neon PostgreSQL...");

  const orgCount = await prisma.organization.count();
  if (orgCount > 0) {
    console.log("✅ Database already has data — skipping seed");
    return;
  }

  const org = await prisma.organization.create({
    data: {
      name: "مؤسسة الحربي التجارية",
      legalName: "مؤسسة خالد محمد الحربي التجارية",
      taxNumber: "300123456700003",
      currency: "SAR",
      vatRate: 15.0,
      address: "حي العليا، طريق الملك فهد",
      city: "الرياض",
      phone: "+966112345678",
      email: "info@alharbi-trading.sa",
    },
  });

  const branch = await prisma.branch.create({
    data: { organizationId: org.id, name: "الفرع الرئيسي - الرياض", code: "RUH-01", city: "الرياض" },
  });

  const users = [
    { email: "admin@kmh-erp.sa", name: "خالد الحربي", role: "ADMIN", pw: "admin123", color: "cyan" },
    { email: "cashier@kmh-erp.sa", name: "أحمد العتيبي", role: "CASHIER", pw: "cashier123", color: "emerald" },
    { email: "accountant@kmh-erp.sa", name: "سارة الدوسري", role: "ACCOUNTANT", pw: "acc123", color: "amber" },
    { email: "hr@kmh-erp.sa", name: "نورة العنزي", role: "HR_MANAGER", pw: "hr123", color: "purple" },
    { email: "inventory@kmh-erp.sa", name: "فهد القحطاني", role: "INVENTORY_MANAGER", pw: "inv123", color: "rose" },
  ];
  for (const u of users) {
    await prisma.user.create({
      data: { organizationId: org.id, branchId: branch.id, email: u.email, name: u.name, role: u.role as any, passwordHash: hashPassword(u.pw), avatarColor: u.color },
    });
  }

  const catNames = ["إلكترونيات", "أجهزة منزلية", "هواتف ذكية", "إكسسوارات", "مستلزمات مكتبية", "كابلات وشواحن"];
  const cats: any[] = [];
  for (const name of catNames) {
    cats.push(await prisma.category.create({ data: { organizationId: org.id, name } }));
  }

  const productsData = [
    { sku: "PHN-IP15", barcode: "6291000010015", name: "آيفون 15 برو ماكس 256GB", cat: "هواتف ذكية", cost: 4200, sale: 5499 },
    { sku: "PHN-S24", barcode: "6291000010022", name: "سامسونج جالاكسي S24 الترا", cat: "هواتف ذكية", cost: 3600, sale: 4799 },
    { sku: "LPT-MAC", barcode: "6291000010039", name: "ماك بوك برو 14 إنش M3", cat: "إلكترونيات", cost: 6500, sale: 8499 },
    { sku: "LPT-HP", barcode: "6291000010046", name: "إتش بي بفيليون 15 i7", cat: "إلكترونيات", cost: 2800, sale: 3699 },
    { sku: "TV-LG55", barcode: "6291000010053", name: "إل جي تلفاز 55 إنش OLED", cat: "أجهزة منزلية", cost: 3500, sale: 4499 },
    { sku: "TV-SAM50", barcode: "6291000010060", name: "سامسونج تلفاز 50 إنش QLED", cat: "أجهزة منزلية", cost: 2400, sale: 3199 },
    { sku: "ACC-CHG", barcode: "6291000010077", name: "شاحن سريع 65W USB-C", cat: "كابلات وشواحن", cost: 45, sale: 89 },
    { sku: "ACC-CBL", barcode: "6291000010084", name: "كابل USB-C إلى Lightning أصلي", cat: "كابلات وشواحن", cost: 35, sale: 75 },
    { sku: "ACC-PWB", barcode: "6291000010091", name: "باور بانك 20000mAh", cat: "إكسسوارات", cost: 80, sale: 149 },
    { sku: "ACC-HDP", barcode: "6291000010107", name: "سماعات آبل AirPods Pro 2", cat: "إكسسوارات", cost: 750, sale: 1099 },
    { sku: "ACC-CSE", barcode: "6291000010114", name: "جراب جلد لآيفون 15 برو", cat: "إكسسوارات", cost: 25, sale: 69 },
    { sku: "OFC-PAP", barcode: "6291000010121", name: "كرتون ورق تصوير A4 (5 rim)", cat: "مستلزمات مكتبية", cost: 95, sale: 145 },
    { sku: "OFC-PEN", barcode: "6291000010138", name: "علبة أقلام بيك بلو (50 قطعة)", cat: "مستلزمات مكتبية", cost: 35, sale: 65 },
    { sku: "HOM-VAC", barcode: "6291000010145", name: "مكنسة كهربائية لاسلكية", cat: "أجهزة منزلية", cost: 480, sale: 699 },
    { sku: "HOM-MIC", barcode: "6291000010152", name: "ميكروويف 30 لتر رقمي", cat: "أجهزة منزلية", cost: 380, sale: 549 },
  ];
  for (const p of productsData) {
    const cat = cats.find((c) => c.name === p.cat)!;
    await prisma.product.create({
      data: { organizationId: org.id, branchId: branch.id, categoryId: cat.id, sku: p.sku, barcode: p.barcode, name: p.name, unit: "قطعة", costPrice: p.cost, salePrice: p.sale, vatRate: 15.0, reorderLevel: 10 },
    });
  }

  const suppliersData = [
    { name: "شركة التقنية المتقدمة للتجارة", contact: "محمد القحطاني", city: "الرياض", terms: "آجل 30 يوم" },
    { name: "مؤسسة الإلكترونيات الحديثة", contact: "عبدالله الشهري", city: "جدة", terms: "آجل 45 يوم" },
    { name: "شركة الأجهزة المنزلية العالمية", contact: "فهد المطيري", city: "الدمام", terms: "آجل 60 يوم" },
    { name: "مكتبة العاصمة للمستلزمات المكتبية", contact: "سعود العنزي", city: "الرياض", terms: "نقدي" },
  ];
  for (const s of suppliersData) {
    await prisma.supplier.create({ data: { organizationId: org.id, name: s.name, contactPerson: s.contact, city: s.city, paymentTerms: s.terms } });
  }

  const customersData = [
    { name: "محمد العمري", phone: "+966501234567", city: "الرياض", creditLimit: 10000 },
    { name: "عبدالعزيز السبيعي", phone: "+966502345678", city: "الرياض", creditLimit: 25000 },
    { name: "فيصل الحربي", phone: "+966553456789", city: "جدة", creditLimit: 15000 },
    { name: "بندر الدوسري", phone: "+966564567890", city: "الدمام", creditLimit: 8000 },
    { name: "ماجد القحطاني", phone: "+966575678901", city: "مكة", creditLimit: 20000 },
    { name: "طلال العنزي", phone: "+966586789012", city: "الرياض", creditLimit: 5000 },
  ];
  for (const c of customersData) {
    await prisma.customer.create({ data: { organizationId: org.id, name: c.name, phone: c.phone, city: c.city, creditLimit: c.creditLimit } });
  }

  const employeesData = [
    { code: "EMP-001", name: "أحمد العتيبي", pos: "كاشير", dept: "المبيعات", salary: 4500 },
    { code: "EMP-002", name: "خالد الشمري", pos: "كاشير", dept: "المبيعات", salary: 4500 },
    { code: "EMP-003", name: "سارة الدوسري", pos: "محاسبة", dept: "المالية", salary: 7500 },
    { code: "EMP-004", name: "نورة العنزي", pos: "مدير موارد بشرية", dept: "الموارد البشرية", salary: 9000 },
    { code: "EMP-005", name: "فهد القحطاني", pos: "أمين مخزن", dept: "المخزون", salary: 5500 },
    { code: "EMP-006", name: "عبدالله الحربي", pos: "مندوب مبيعات", dept: "المبيعات", salary: 5000 },
    { code: "EMP-007", name: "ماجد المطيري", pos: "فني صيانة", dept: "الصيانة", salary: 6000 },
    { code: "EMP-008", name: "سعود العتيبي", pos: "مدير فرع جدة", dept: "الإدارة", salary: 12000 },
  ];
  for (const e of employeesData) {
    await prisma.employee.create({
      data: { organizationId: org.id, branchId: branch.id, employeeCode: e.code, fullName: e.name, phone: "+9665" + Math.floor(10000000 + Math.random() * 89999999), email: e.name.split(" ")[0] + "@alharbi-trading.sa", position: e.pos, department: e.dept, baseSalary: e.salary, allowances: Math.round(e.salary * 0.15), status: "ACTIVE" },
    });
  }

  const accounts = [
    { code: "1101", name: "الصندوق - فرع الرياض", type: "ASSET" },
    { code: "4100", name: "إيرادات المبيعات", type: "REVENUE" },
    { code: "2200", name: "ضريبة القيمة المضافة المستحقة", type: "LIABILITY" },
    { code: "5000", name: "تكلفة المبيعات", type: "COST_OF_SALES" },
    { code: "1300", name: "المخزون", type: "ASSET" },
    { code: "3100", name: "رأس المال", type: "EQUITY" },
    { code: "6100", name: "رواتب وأجور", type: "EXPENSE" },
    { code: "2300", name: "الرواتب المستحقة", type: "LIABILITY" },
  ];
  for (const a of accounts) {
    await prisma.account.create({ data: { organizationId: org.id, code: a.code, name: a.name, type: a.type as any, isGroup: false, balance: a.code === "3100" ? 500000 : 0 } });
  }

  console.log("✅ Seed complete on Neon!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🔐 Login: admin@kmh-erp.sa / admin123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
