import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Munrock Enterprises | New & Used Cars for Sale in Kenya",
  description:
    "Find new and used cars for sale in Kenya at Munroc Enterprises. Browse quality vehicles at competitive prices and find your next car with confidence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-800 bg-white">
        <Navbar />
        <main>{children}</main>
        
        {/* Appears on every route floating at the bottom right */}
        <FloatingWhatsApp phoneNumber="254700000000" />
      </body>
    </html>
  );
}
