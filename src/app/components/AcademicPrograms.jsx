"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import programs, { featuredProgram } from "./ClassesInfo";

export default function AcademicPrograms() {
  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-white dark:bg-slate-950 w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3.5 py-1 rounded-full bg-amber-100 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-slate-800 text-xs sm:text-sm font-semibold mb-2.5 shadow-sm">
              Academic Programs
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Classes Tailored for <span className="text-emerald-600 dark:text-emerald-400">Every Stage</span>
            </h2>
            <p className="mt-2.5 text-xs sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
              Age-appropriate curriculums designed to ignite curiosity and foster holistic development from Play to Class Five.
            </p>
          </motion.div>
        </div>

        {/* Featured Card: Play Group */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className={`mb-6 sm:mb-8 p-5 sm:p-10 rounded-2xl sm:rounded-3xl ${featuredProgram.gradient} shadow-lg relative overflow-hidden`}
        >
          <div className="flex items-center justify-between mb-3 md:hidden">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-200/80 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-200">
              {featuredProgram.age}
            </span>
            <div className="p-1.5 rounded-full bg-emerald-600 text-white shadow-sm">
              <Star className="w-3.5 h-3.5 fill-white" />
            </div>
          </div>

          <div className="hidden md:flex absolute top-6 right-6 p-2 rounded-full bg-emerald-600 text-white shadow-md">
            <Star className="w-4 h-4 fill-white" />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200/60 dark:border-emerald-800/50 shadow-md">
                  {featuredProgram.icon}
                </div>
                <div>
                  <span className="hidden md:inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-200/70 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 mb-1">
                    {featuredProgram.age}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {featuredProgram.title}
                  </h3>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-base leading-relaxed">
                {featuredProgram.description}
              </p>
            </div>

            <div className="w-full md:w-auto flex-shrink-0 pt-2 md:pt-0">
              <Link
                href="/academics"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 w-full md:w-auto rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-emerald-500/20"
              >
                <span>Learn More About Play</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 6 Classes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 items-stretch">
          {programs.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className={`p-3.5 sm:p-6 rounded-xl sm:rounded-3xl border ${item.bg} ${item.border} shadow-sm transition-all duration-300 flex flex-col h-full`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 sm:mb-4">
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm inline-flex items-center justify-center w-fit">
                  {item.icon}
                </div>
                <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800 w-fit">
                  {item.age}
                </span>
              </div>

              <h3 className="text-sm sm:text-xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">
                {item.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-400 text-[11px] sm:text-sm leading-snug sm:leading-relaxed mb-3 sm:mb-6">
                {item.description}
              </p>

              <div className="mt-auto pt-2 sm:pt-4 border-t border-slate-200/40 dark:border-slate-800/60">
                <Link
                  href="/academics"
                  className="inline-flex items-center gap-1 sm:gap-2 text-[11px] sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:gap-2.5 transition-all duration-300"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}