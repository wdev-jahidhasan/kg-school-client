"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// 5 ta random child education related unsplash images
const carouselImages = [
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=80",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Handlers for manual sliding
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  return (
    <section className="relative overflow-hidden bg-amber-50/30 py-20 dark:bg-slate-950 lg:py-32 w-full min-h-[85vh] flex items-center justify-center">

      {/* Background Carousel Images with Smooth Fade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={carouselImages[currentIndex]}
              alt="Children education background slide"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Reduced Overlay Opacity for Better Image Visibility */}
            <div className="absolute inset-0 bg-amber-50/60 dark:bg-slate-950/70 backdrop-blur-[1px]" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left & Right Navigation Arrows (Responsive & Safe from overlapping text) */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-3 sm:px-6 lg:px-10 pointer-events-none">
        <button
          onClick={handlePrev}
          className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-white/70 dark:bg-slate-900/75 text-slate-800 dark:text-white shadow-lg backdrop-blur-md transition-all hover:bg-white dark:hover:bg-slate-800 focus:outline-none"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <button
          onClick={handleNext}
          className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-white/70 dark:bg-slate-900/75 text-slate-800 dark:text-white shadow-lg backdrop-blur-md transition-all hover:bg-white dark:hover:bg-slate-800 focus:outline-none"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>

      {/* Centered Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-12 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl drop-shadow-sm">
            Nurturing Little Minds for <span className="text-emerald-600 dark:text-emerald-400">Bright Futures</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-800 dark:text-slate-200 max-w-2xl mx-auto font-medium drop-shadow-sm">
            A joyful and engaging learning environment where young learners discover, play, and grow with interactive lessons, caring teachers, and a safe community.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/admission"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-emerald-700 px-7 py-4 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-800"
            >
              Apply for Admission
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/notices"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-amber-300 bg-white/90 dark:border-slate-700 dark:bg-slate-900/90 backdrop-blur px-7 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:bg-amber-50 dark:hover:bg-slate-800"
            >
              See Notices
            </Link>
          </div>

          {/* Carousel Slide Indicators / Dots */}
          <div className="mt-10 flex items-center justify-center gap-2">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-8 bg-emerald-600 dark:bg-emerald-400"
                    : "w-2.5 bg-slate-300/80 dark:bg-slate-700 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}