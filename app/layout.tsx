import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumière — Modern Shopping Experience",
  description:
    "Discover curated collections of premium products. Shop the latest trends in fashion, electronics, home décor, and more.",
  keywords: ["e-commerce", "shopping", "fashion", "electronics", "home décor"],
  openGraph: {
    title: "Lumière — Modern Shopping Experience",
    description: "Discover curated collections of premium products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-neutral-900 antialiased font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}