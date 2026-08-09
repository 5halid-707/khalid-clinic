import type { Metadata } from "next";
import { Cairo, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "عيادة روزا | ROSA Clinic — التجميل والبشرة",
  description: "عيادة روزا للتجميل والبشرة - أحدث علاجات التجميل والجلدية بأيدي نخبة الاستشاريين في أجواء فاخرة. ROSA Aesthetic & Dermatology Clinic.",
  keywords: ["عيادة روزا", "ROSA Clinic", "تجميل", "بشرة", "جلدية", "aesthetic", "dermatology", "laser", "filler", "botox"],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} ${inter.variable} ${cormorant.variable} antialiased`}>
        {children}
        <SonnerToaster position="top-center" richColors />
      </body>
    </html>
  );
}
