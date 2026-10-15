"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function SpecialEvent() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-amber-100/90 via-orange-100/80 to-sky-100/90 dark:from-slate-900 dark:via-amber-950/40 dark:to-slate-900 py-3 px-3 sm:px-8 border-b border-amber-200/70 dark:border-amber-500/20 shadow-sm transition-colors duration-300">

      {/* Subtle Background Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <div className="absolute -top-10 left-1/4 w-48 h-48 bg-amber-300/30 dark:bg-amber-500/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute -bottom-10 right-1/4 w-48 h-48 bg-sky-300/30 dark:bg-sky-500/10 rounded-full blur-2xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-6 relative z-10">

        {/* Left Side: Animated Badge & Highlight Text */}
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-hidden text-center sm:text-left">

          {/* Playful Floating Emoji / Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="hidden xs:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-200/80 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-200 text-xs font-bold shrink-0 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-spin" style={{ animationDuration: "4s" }} />
            <span>SPECIAL</span>
          </motion.div>

          {/* Main Announcement Line */}
          <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 tracking-wide">
            🎉 <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 dark:from-emerald-400 dark:via-teal-300 dark:to-green-400 bg-clip-text text-transparent font-extrabold">
              Admission Fair 2027
            </span>{" "}
            is Live! Enjoy up to <span className="underline decoration-amber-400 underline-offset-2 font-bold text-amber-800 dark:text-amber-300">20% Early Bird Waiver</span>.
          </p>
        </div>

        {/* Right Side: Attractive Glow CTA Button */}
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="shrink-0">
          <Link
            href="/admission"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 dark:shadow-emerald-900/40 transition-all duration-300 active:scale-95"
          >
            <span>Claim Discount</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}