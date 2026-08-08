import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "عيادة خالد | Khalid Clinic — رعاية صحية متكاملة",
  description: "عيادة خالد الطبية المتكاملة - خدمات طبية احترافية بأحدث الأجهزة وفريق طبي متخصص. Khalid Clinic - Professional medical services.",
  keywords: ["عيادة خالد", "Khalid Clinic", "عيادة طبية", "medical clinic", "رعاية صحية", "healthcare Saudi Arabia"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body className={`${cairo.variable} ${inter.variable} antialiased`}>
        {children}
        <SonnerToaster position="top-center" richColors />
      </body>
    </html>
  );
}
