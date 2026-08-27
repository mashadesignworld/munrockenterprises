"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  ShieldCheck,
  Calendar,
  Gauge,
  Fuel,
  Compass,
  Zap,
  CheckCircle2,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

export interface CarViewImage {
  label: string;
  src: string;
}

export interface CarDetails {
  id: string | number;
  title: string;
  subtitle?: string;
  price: string;
  badge?: string;
  year: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  engineSize: string;
  drivetrain: string;
  portClearance: string;
  images: CarViewImage[];
  features: string[];
  description?: string;
}

interface CarDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: CarDetails | null;
}

export default function CarDetailsModal({
  isOpen,
  onClose,
  car,
}: CarDetailsModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [prevCarId, setPrevCarId] = useState<string | number | null>(null);

  // Reset image selection during render when switching vehicles without extra side-effects
  if (car && car.id !== prevCarId) {
    setPrevCarId(car.id);
    setActiveImageIndex(0);
  }

  // Manage body scroll lock cleanly with fixed dependencies
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key listener cleanly with fixed dependencies
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !car) return null;

  const currentImage = car.images[activeImageIndex] || {
    src: car.images[0]?.src || "/placeholder.jpg",
    label: "Vehicle View",
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + car.images.length) % car.images.length
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* 1. Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* 2. Main Modal Card */}
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#F26522]/10 border border-[#F26522]/20 text-[#F26522] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />{" "}
              {car.badge || "Verified Import"}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              ID: #{car.id}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-200/60 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: Interactive View Gallery */}
            <div className="lg:col-span-7 space-y-4">
              {/* Main Featured View */}
              <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden bg-slate-900 shadow-md group">
                <Image
                  src={currentImage.src}
                  alt={`${car.title} - ${currentImage.label}`}
                  fill
                  className="object-cover transition-all duration-300"
                  priority
                />

                {/* View Overlay Tag */}
                <div className="absolute top-4 left-4 bg-slate-950/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-white/20">
                  <Eye className="w-3.5 h-3.5 text-[#F26522]" />
                  <span>{currentImage.label} View</span>
                </div>

                {/* Arrow Controls */}
                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      aria-label="Previous view"
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/60 text-white hover:bg-[#F26522] backdrop-blur-md transition-all border border-white/20 opacity-90 sm:opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      aria-label="Next view"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/60 text-white hover:bg-[#F26522] backdrop-blur-md transition-all border border-white/20 opacity-90 sm:opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Angle View Selector Thumbnails */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                {car.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all group ${
                      idx === activeImageIndex
                        ? "border-[#F26522] ring-2 ring-[#F26522]/30 scale-[0.98]"
                        : "border-slate-200 opacity-75 hover:opacity-100 hover:border-slate-400"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 text-white text-[10px] font-bold py-0.5 text-center truncate px-1">
                      {img.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: Vehicle Specifications & Price */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {car.title}
                </h2>
                {car.subtitle && (
                  <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                    {car.subtitle}
                  </p>
                )}

                <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-baseline justify-between">
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                      Import Clearance Cost
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-[#F26522]">
                      {car.price}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-sm">
                    {car.portClearance}
                  </span>
                </div>
              </div>

              {/* Spec Grid Icons */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 text-[#F26522]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-400">
                      Year
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {car.year}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 text-[#F26522]">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-400">
                      Mileage
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {car.mileage}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 text-[#F26522]">
                    <Fuel className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-400">
                      Fuel
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {car.fuelType}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 text-[#F26522]">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-400">
                      Drivetrain
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {car.drivetrain}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Features List */}
              {car.features && car.features.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                    Featured Highlights
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {car.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-slate-600"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Actions */}
              <div className="pt-2 space-y-3">
                <a
                  href="tel:+254754043080"
                  className="w-full bg-[#0A2540] hover:bg-[#F26522] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-[0.98]"
                >
                  <PhoneCall className="w-4 h-4" />
                  Inquire Import Duty & Shipping
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}