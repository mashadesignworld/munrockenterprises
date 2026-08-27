"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Fuel, SlidersHorizontal, ShieldCheck, Heart, ArrowRight, Clock } from "lucide-react";

interface LatestVehicle {
  id: string;
  name: string;
  year: string;
  priceUSD: string;
  priceKES: string;
  image: string;
  engine: string;
  transmission: string;
  mileage: string;
  grade: string;
  addedTime: string;
}

const LATEST_VEHICLES: LatestVehicle[] = [
  {
    id: "latest-1",
    name: "2019 Toyota Rav4 G-Selection",
    year: "2019",
    priceUSD: "$28,500",
    priceKES: "KES 3.70M",
    image: "/toyotaprado.jpg",
    engine: "2000cc Petrol",
    transmission: "Automatic",
    mileage: "42,000 km",
    grade: "Grade 4.5",
    addedTime: "2 hours ago",
  },
  {
    id: "latest-2",
    name: "2018 Mazda CX-5 L Package",
    year: "2018",
    priceUSD: "$21,800",
    priceKES: "KES 2.83M",
    image: "/toyotaprado.jpg",
    engine: "2200cc Diesel",
    transmission: "Automatic",
    mileage: "58,000 km",
    grade: "Grade 4.0",
    addedTime: "5 hours ago",
  },
  {
    id: "latest-3",
    name: "2017 Nissan X-Trail 20X 4WD",
    year: "2017",
    priceUSD: "$17,400",
    priceKES: "KES 2.26M",
    image: "/toyotaprado.jpg",
    engine: "2000cc Hybrid",
    transmission: "CVT",
    mileage: "65,000 km",
    grade: "Grade 4.0",
    addedTime: "1 day ago",
  },
  {
    id: "latest-4",
    name: "2019 Subaru Outback Limited",
    year: "2019",
    priceUSD: "$25,200",
    priceKES: "KES 3.27M",
    image: "/toyotaprado.jpg",
    engine: "2500cc AWD",
    transmission: "Automatic",
    mileage: "38,000 km",
    grade: "Grade 4.5",
    addedTime: "1 day ago",
  },
];

export default function LatestCars() {
  return (
    <section className="py-12 px-4 sm:px-6 bg-white">
      <div className="max-w-[1380px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#F26522]/10 text-[#F26522] text-[10px] font-extrabold uppercase px-3 py-1 rounded-full mb-2">
              <Clock className="w-3 h-3" /> Fresh Inventory
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A2540] tracking-tight uppercase">
              Latest Arrivals
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
              Recently listed vehicles available for direct import and clearing
            </p>
          </div>

          <a
            href="#all-latest"
            className="inline-flex items-center gap-1.5 text-xs font-black text-[#F26522] hover:text-[#d95519] tracking-wider uppercase transition-colors"
          >
            <span>View All Latest Cars</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LATEST_VEHICLES.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-slate-50 border border-slate-200/80 rounded-3xl p-4 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 bg-slate-200">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* New Badge */}
                  <span className="absolute top-3 left-3 bg-[#F26522] text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-md shadow-md">
                    NEW ARRIVAL
                  </span>

                  {/* Save Heart Button */}
                  <button
                    aria-label="Save car"
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-600 hover:text-[#F26522] transition-colors shadow-sm"
                  >
                    <Heart className="w-4 h-4" />
                  </button>

                  {/* Bottom Tags */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="bg-[#0A2540]/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md">
                      {car.grade}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                      {car.addedTime}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="px-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {car.year} • {car.mileage}
                  </span>
                  <h3 className="text-base font-black text-[#0A2540] mt-0.5 group-hover:text-[#F26522] transition-colors line-clamp-1">
                    {car.name}
                  </h3>

                  {/* Specs */}
                  <div className="text-[11px] font-semibold text-slate-600 mt-3 flex items-center justify-between py-2 border-y border-slate-200/60">
                    <div className="flex items-center gap-1">
                      <Fuel className="w-3.5 h-3.5 text-slate-400" />
                      <span>{car.engine}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                      <span>{car.transmission}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between px-1">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">
                    CnF Price
                  </span>
                  <div className="text-base font-black text-[#F26522]">
                    {car.priceUSD}
                    <span className="text-[10px] font-bold text-slate-500 ml-1">
                      ({car.priceKES})
                    </span>
                  </div>
                </div>

                <button className="bg-[#0A2540] hover:bg-[#F26522] text-white text-[11px] font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm">
                  Inspect
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}