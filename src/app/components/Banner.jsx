"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const floatingItems = [
  { id: 1, emoji: "🎈", size: "text-3xl sm:text-4xl", top: "15%", left: "10%", speed: 25 },
  { id: 2, emoji: "🧸", size: "text-3xl sm:text-4xl", top: "70%", left: "15%", speed: 30 },
  { id: 3, emoji: "🎨", size: "text-3xl sm:text-4xl", top: "20%", left: "80%", speed: 28 },
  { id: 4, emoji: "🎓", size: "text-3xl sm:text-4xl", top: "75%", left: "85%", speed: 32 },
  { id: 5, emoji: "⭐", size: "text-2xl sm:text-3xl", top: "45%", left: "5%", speed: 22 },
  { id: 6, emoji: "💖", size: "text-2xl sm:text-3xl", top: "35%", left: "90%", speed: 26 },
  { id: 7, emoji: "🚀", size: "text-3xl sm:text-4xl", top: "85%", left: "45%", speed: 35 },
  { id: 8, emoji: "✏️", size: "text-2xl sm:text-3xl", top: "10%", left: "50%", speed: 24 },
];

export default function Banner() {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 700 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-sky-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16 lg:py-24 w-full min-h-[75vh] flex items-center justify-center">

      {/* --- Scattered Slow-Moving Background Elements --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {floatingItems.map((item) => {
          return (
            <motion.div
              key={item.id}
              className={`absolute ${item.size} opacity-70 dark:opacity-40`}
              initial={{
                top: item.top,
                left: item.left,
              }}
              animate={{
                x: [0, 80, -60, 40, 0],
                y: [0, -60, 50, -40, 0],
                rotate: [0, 10, -10, 5, 0],
              }}
              transition={{
                duration: item.speed,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {item.emoji}
            </motion.div>
          );
        })}

        {/* Soft Decorative Ambient Blobs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-amber-200/40 dark:bg-amber-900/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-200/40 dark:bg-emerald-900/10 rounded-full blur-3xl" />
      </div>

      {/* --- Main Centered Content --- */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-12 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Top Playful Badge */}
          <motion.div
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 dark:bg-amber-950/50 border border-amber-300/60 dark:border-amber-700/50 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-semibold mb-5 shadow-sm"
          >
            <span>🎈 Welcome to Our Happy Wonderland ✨</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl leading-tight"
          >
            Nurturing Little Minds for{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600 bg-clip-text text-transparent inline-block drop-shadow-sm">
              Bright Futures
            </span>
          </motion.h1>

          {/* Description Paragraph */}
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-4 text-sm sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            A joyful, safe, and engaging learning environment where young learners discover, play, and grow with interactive lessons and caring teachers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link
                href="/admission"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-emerald-600 hover:bg-emerald-700 px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-emerald-600/25 transition-all"
              >
                Apply for Admission
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link
                href="/notices"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border-2 border-amber-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900/85 backdrop-blur px-7 py-3.5 text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 shadow-sm hover:bg-amber-50 dark:hover:bg-slate-800 transition-all"
              >
                See Notices
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>

    </section>
  );
}