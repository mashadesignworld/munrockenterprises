"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Fuel, SlidersHorizontal, Sparkles, Heart, ArrowRight } from "lucide-react";

type BodyType = "suv" | "sedan" | "muv" | "luxury" | "offroad";

interface Vehicle {
  id: string;
  name: string;
  year: string;
  priceUSD: string;
  priceKES: string;
  image: string;
  engine: string;
  transmission: string;
  grade: string;
}

const CAR_DATA: Record<BodyType, Vehicle[]> = {
  suv: [
    {
      id: "suv-1",
      name: "Toyota Land Cruiser Prado",
      year: "2017",
      priceUSD: "$36,200",
      priceKES: "KES 4.7M",
      image: "/toyota-prado.jpg",
      engine: "2800cc Diesel",
      transmission: "Automatic",
      grade: "Grade 4.5",
    },
    {
      id: "suv-2",
      name: "Toyota Harrier",
      year: "2018",
      priceUSD: "$24,500",
      priceKES: "KES 3.2M",
      image: "/toyotaharrier.jpg",
      engine: "2000cc Petrol",
      transmission: "CVT",
      grade: "Grade 4.0",
    },
    {
      id: "suv-3",
      name: "Subaru Forester",
      year: "2024",
      priceUSD: "$18,900",
      priceKES: "KES 2.45M",
      image: "/subaruforester.jpg",
      engine: "2000cc AWD",
      transmission: "Automatic",
      grade: "Grade 4.5",
    },
  ],
  sedan: [
    {
      id: "sedan-1",
      name: "Toyota Camry",
      year: "2018",
      priceUSD: "$19,800",
      priceKES: "KES 2.58M",
      image: "/toyotacamry.jpg",
      engine: "2500cc Hybrid",
      transmission: "Automatic",
      grade: "Grade 4.5",
    },
    {
      id: "sedan-2",
      name: "Mazda Atenza",
      year: "2023",
      priceUSD: "$15,400",
      priceKES: "KES 2.0M",
      image: "/mazda-atenza.jpg",
      engine: "2200cc Diesel",
      transmission: "Automatic",
      grade: "Grade 4.0",
    },
    {
      id: "sedan-3",
      name: "Honda Grace",
      year: "2018",
      priceUSD: "$12,200",
      priceKES: "KES 1.59M",
      image: "/honda-grace.jpg",
      engine: "1500cc Hybrid",
      transmission: "Automatic",
      grade: "Grade 4.5",
    },
  ],
  muv: [
    {
      id: "muv-1",
      name: "Toyota Alphard",
      year: "2023",
      priceUSD: "$32,000",
      priceKES: "KES 4.15M",
      image: "/toyota-alphard.jpg",
      engine: "2500cc Hybrid",
      transmission: "Automatic",
      grade: "Grade 4.5",
    },
    {
      id: "muv-2",
      name: "Nissan Serena",
      year: "2022",
      priceUSD: "$16,500",
      priceKES: "KES 2.15M",
      image: "/nissan-serena.jpg",
      engine: "2000cc Hybrid",
      transmission: "CVT",
      grade: "Grade 4.0",
    },
    {
      id: "muv-3",
      name: "Toyota Voxy",
      year: "2024",
      priceUSD: "$17,800",
      priceKES: "KES 2.32M",
      image: "/toyota-voxy.jpg",
      engine: "2000cc Petrol",
      transmission: "Automatic",
      grade: "Grade 4.5",
    },
  ],
  luxury: [
    {
      id: "lux-1",
      name: "Mercedes-Benz C200",
      year: "2025",
      priceUSD: "$23,500",
      priceKES: "KES 3.05M",
      image: "/merc-c200.jpg",
      engine: "2000cc Turbo",
      transmission: "Automatic",
      grade: "Grade 4.5",
    },
    {
      id: "lux-2",
      name: "BMW 523i",
      year: "2025",
      priceUSD: "$27,000",
      priceKES: "KES 3.51M",
      image: "/bmw-523i.jpg",
      engine: "2000cc TwinTurbo",
      transmission: "Automatic",
      grade: "Grade 4.5",
    },
    {
      id: "lux-3",
      name: "Audi A4 Avant",
      year: "2023",
      priceUSD: "$21,800",
      priceKES: "KES 2.83M",
      image: "/audi-a4.jpg",
      engine: "2000cc TFSI",
      transmission: "Automatic",
      grade: "Grade 4.0",
    },
  ],
  offroad: [
    {
      id: "off-1",
      name: "Toyota Land Cruiser 76",
      year: "2023",
      priceUSD: "$48,000",
      priceKES: "KES 6.24M",
      image: "/landcruiser-76.jpg",
      engine: "4200cc V8 Diesel",
      transmission: "Manual 4WD",
      grade: "Grade 4.5",
    },
    {
      id: "off-2",
      name: "Toyota Hilux Revo",
      year: "2018",
      priceUSD: "$29,500",
      priceKES: "KES 3.83M",
      image: "/toyotahilux-revo.jpg",
      engine: "2800cc Turbo Diesel",
      transmission: "Automatic 4WD",
      grade: "Grade 4.5",
    },
    {
      id: "off-3",
      name: "Suzuki Jimny Sierra",
      year: "2023",
      priceUSD: "$19,200",
      priceKES: "KES 2.50M",
      image: "/suzuki-jimny.jpg",
      engine: "1500cc Petrol",
      transmission: "Automatic 4WD",
      grade: "Grade 5.0",
    },
  ],
};

export default function MostSearchedCars() {
  const [activeTab, setActiveTab] = useState<BodyType>("suv");

  const tabs: { key: BodyType; label: string }[] = [
    { key: "suv", label: "SUV" },
    { key: "sedan", label: "Sedan" },
    { key: "muv", label: "MUV / Van" },
    { key: "luxury", label: "Luxury" },
    { key: "offroad", label: "Offroad / 4x4" },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 bg-[#E8EEF5]">
      <div className="max-w-[1380px] mx-auto">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A2540] tracking-tight uppercase">
              The Most Searched Cars
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
              Top requested models by buyers & direct import clients
            </p>
          </div>

          <a
            href="#inventory"
            className="inline-flex items-center gap-1.5 text-xs font-black text-[#F26522] hover:text-[#d95519] tracking-wider uppercase transition-colors"
          >
            <span>View All Stock</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-300 overflow-x-auto pb-1 mb-8 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-5 py-3 text-xs sm:text-sm font-bold tracking-wide uppercase transition-all whitespace-nowrap rounded-t-xl ${
                  isActive
                    ? "text-[#0A2540] bg-white border-t-2 border-x border-slate-200 border-t-[#F26522]"
                    : "text-slate-500 hover:text-[#0A2540] hover:bg-white/50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Vehicle Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {CAR_DATA[activeTab].map((car) => (
              <div
                key={car.id}
                className="bg-white/90 backdrop-blur-xl border border-white rounded-3xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Image Container */}
                <div>
                  <div className="relative h-52 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Saved Heart Button */}
                    <button
                      aria-label="Save vehicle"
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-600 hover:text-[#F26522] transition-colors shadow-sm"
                    >
                      <Heart className="w-4 h-4" />
                    </button>

                    {/* Auction Grade Tag */}
                    <div className="absolute bottom-3 left-3 bg-[#0A2540]/90 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-lg tracking-wider">
                      {car.grade}
                    </div>
                  </div>

                  {/* Title and Specs */}
                  <div className="px-1">
                    <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                      {car.year} · Direct Import
                    </span>
                    <h3 className="text-lg font-black text-[#0A2540] mt-0.5 group-hover:text-[#F26522] transition-colors">
                      {car.name}
                    </h3>

                    {/* Quick Features Row */}
                    <div className="text-[11px] font-semibold text-slate-600 mt-3 flex items-center gap-3 py-2 border-y border-slate-100">
                      <div className="flex items-center gap-1">
                        <Fuel className="w-3.5 h-3.5 text-slate-400" />
                        <span>{car.engine}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                        <span>{car.transmission}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price and Action Footer */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between px-1">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      Est. Price (CnF)
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-[#F26522]">
                        {car.priceUSD}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        ({car.priceKES})
                      </span>
                    </div>
                  </div>

                  <button className="bg-[#0A2540] hover:bg-[#F26522] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}