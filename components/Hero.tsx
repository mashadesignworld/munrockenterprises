"use client";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const featuredCars = [
  {
    id: 1,
    title: "2016 Ford Raptor",
    specs: "2000cc | Auto | 4wd | Diesel ",
    price: "US$ 31,400",
    image: "/ford-raptor2.jpg",
  },
  {
    id: 2,
    title: "2018 GMC YUKON",
    specs: "Full Options | Sunroof | Leather | Low Mileage | Grade 4.5",
    price: "US$ 35,550",
    image: "/GMC.jpg",
  },
  {
    id: 3,
    title: "2017 TOYOTA HILUX REVO",
    specs: "2400cc | Manual | 2wd | Diesel",
    price: "US$ 13,700",
    image: "/toyota-hilux-revo3.jpg",
  },
];

// Animation variants for smooth horizontal sliding without opacity shifts
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    x: 0,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
  }),
};

export default function CompactHero() {
  const [activeTab, setActiveTab] = useState<"budget" | "body" | "brand">("budget");
  const [[page, direction], setPage] = useState([0, 0]);

  const currentSlide = Math.abs(page % featuredCars.length);

  const paginate = useCallback((newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  return (
<section className="relative bg-[#0A2540] bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden py-24">      <div className="max-w-[1380px] mx-auto grid lg:grid-cols-12 gap-6 items-center">
        
        {/* LEFT: Compact Search Card */}
        <div className="lg:col-span-4 xl:col-span-4">
          <div className="bg-white/95 backdrop-blur-2xl border border-white/90 rounded-2xl p-4 sm:p-5 shadow-2xl">
            <h1 className="text-xl font-black text-[#0A2540] tracking-tight mb-0.5">
              Find Your Import
            </h1>
            <p className="text-[11px] font-semibold text-slate-500 mb-3">
              Direct imports cleared at Mombasa
            </p>

            {/* Filter Tabs */}
            <div className="flex border-b border-slate-200 mb-3 text-[11px] font-bold text-slate-500">
              {(["budget", "body", "brand"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-1.5 px-2 transition-all border-b-2 capitalize ${
                    activeTab === tab
                      ? "border-[#F26522] text-[#0A2540]"
                      : "border-transparent hover:text-slate-800"
                  }`}
                >
                  By {tab}
                </button>
              ))}
            </div>

            {/* Form Fields */}
            <div className="space-y-2.5">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-0.5">
                  Make & Model
                </label>
                <select className="w-full bg-slate-50 border border-slate-200 text-[#0A2540] text-xs font-semibold rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#F26522]">
                  <option value="">All Makes (Toyota, Nissan...)</option>
                  <option value="prado">Toyota Prado</option>
                  <option value="harrier">Toyota Harrier</option>
                  <option value="forester">Subaru Forester</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-0.5">
                    Max Price
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-200 text-[#0A2540] text-xs font-semibold rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#F26522]">
                    <option value="">Under $20k</option>
                    <option value="">$20k - $35k</option>
                    <option value="">$35k - $50k</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-0.5">
                    Min Year
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-200 text-[#0A2540] text-xs font-semibold rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#F26522]">
                    <option value="">2017+</option>
                    <option value="">2018+</option>
                    <option value="">2019+</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-[#F26522] hover:bg-[#d95519] text-white font-black py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-1.5 mt-1">
                <Search className="w-3.5 h-3.5" />
                SEARCH STOCK
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Smooth Sliding Car Showcase */}
        <div className="lg:col-span-8 xl:col-span-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden">
            
            {/* Sliding Image Container */}
            <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-4 shadow-inner">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={featuredCars[currentSlide].image}
                    alt={featuredCars[currentSlide].title}
                    fill
                    priority
                    className="object-cover object-center"
                  />
                </motion.div>
              </AnimatePresence>

              <span className="absolute top-3 left-3 z-10 bg-[#F26522] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                Featured Import
              </span>
            </div>

            {/* Vehicle Specs & Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {featuredCars[currentSlide].title}
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  {featuredCars[currentSlide].specs}
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">
                    CnF Mombasa
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-[#F26522]">
                    {featuredCars[currentSlide].price}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => paginate(-1)}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95"
                    aria-label="Previous Car"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => paginate(1)}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95"
                    aria-label="Next Car"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button className="bg-[#F26522] hover:bg-[#d95519] text-white font-black px-4 py-2.5 rounded-xl text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-md">
                    INVOICE <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}  