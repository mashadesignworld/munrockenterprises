"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, Heart, Menu, X } from "lucide-react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-200">
      {/* ========== UPPER BAR: Logo, Global Search & Auth ========== */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 sm:gap-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="relative w-36 sm:w-44 h-10">
            <Image
              src="/munrocklogo.png"
              alt="Munrock Enterprises Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Middle Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cars, brands, e.g. 'Toyota Prado 2016' or 'Harrier'..."
            className="w-full bg-slate-100 border border-slate-300 text-[#0A2540] placeholder-slate-400 text-xs sm:text-sm font-medium rounded-full py-2.5 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-[#F26522] focus:bg-white transition-all"
          />
          <button
            type="button"
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#F26522] hover:bg-[#d95519] text-white p-2 rounded-full transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Right Action Items: Saved & Login/Register */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <Link
            href="#saved"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#F26522] transition-colors"
          >
            <Heart className="w-4 h-4" />
            <span>Saved Cars</span>
          </Link>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-3 sm:pl-5">
            <Link
              href="#login"
              className="flex items-center gap-2 bg-[#0A2540] hover:bg-[#061729] text-white text-xs font-bold px-4 py-2.5 rounded-full transition-all shadow-sm"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login / Register</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#0A2540]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ========== LOWER BAR: Category Navigation ========== */}
      <div className="bg-[#0A2540] text-white hidden md:block border-t border-[#0A2540]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
          <div className="flex items-center gap-8 py-3">
            <a href="#new-cars" className="hover:text-[#F26522] transition-colors">
              New Cars
            </a>
            <a href="#used-cars" className="hover:text-[#F26522] transition-colors">
              Used Cars
            </a>
            <a href="#import-auction" className="hover:text-[#F26522] transition-colors flex items-center gap-1.5">
              <span>Japan Auctions</span>
              <span className="bg-[#F26522] text-[9px] px-1.5 py-0.5 rounded text-white font-extrabold">LIVE</span>
            </a>
            <a href="#videos" className="hover:text-[#F26522] transition-colors">
              Videos & Reviews
            </a>
            <a href="#parts" className="hover:text-[#F26522] transition-colors">
              Spare Parts
            </a>
            <a href="#calculator" className="hover:text-[#F26522] transition-colors">
              Duty Calculator
            </a>
          </div>

          <div className="py-3 text-[11px] text-slate-300 normal-case font-medium">
            Mombasa Port Imports & Customs Handling
          </div>
        </div>
      </div>

      {/* ========== MOBILE MENU DRAWER ========== */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search vehicles..."
              className="w-full bg-slate-100 border border-slate-300 text-xs rounded-lg py-2.5 pl-4 pr-10"
            />
            <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
          </div>
          <nav className="flex flex-col gap-3 text-sm font-bold text-[#0A2540]">
            <a href="#new-cars">New Cars</a>
            <a href="#used-cars">Used Cars</a>
            <a href="#import-auction">Japan Auctions</a>
            <a href="#videos">Videos & Reviews</a>
            <a href="#parts">Spare Parts</a>
            <a href="#calculator">Duty Calculator</a>
          </nav>
        </div>
      )}
    </header>
  );
}