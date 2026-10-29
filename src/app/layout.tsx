import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BIRGA — Ijtimoiy Tashabbus Platformasi",
  description: "Onlaynda hurmat, hayotda hamjihatlik! O'quvchilar uchun ijtimoiy tashabbuslar platformasi.",
  keywords: "BIRGA, ijtimoiy tashabbus, Kelajak markazlari, o'quvchilar, vebinar, ko'ngillilar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
