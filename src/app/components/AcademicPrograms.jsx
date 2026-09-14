"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Users, Award, Sparkles, ArrowRight } from "lucide-react";

const programs = [
  {
    id: 1,
    title: "Play Group",
    age: "Ages 2 - 3 Years",
    description: "A joyful introduction to school life where toddlers learn socialization, sharing, and basic motor skills through play.",
    icon: <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-900/50",
  },
  {
    id: 2,
    title: "Nursery",
    age: "Ages 3 - 4 Years",
    description: "Focuses on early language development, pre-math concepts, alphabet exploration, and creative expression.",
    icon: <BookOpen className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
    bg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-900/50",
  },
  {
    id: 3,
    title: "KG - I",
    age: "Ages 4 - 5 Years",
    description: "Builds confidence in reading, writing, basic arithmetic, and problem-solving through structured interactive lessons.",
    icon: <Users className="w-8 h-8 text-sky-600 dark:text-sky-400" />,
    bg: "bg-sky-50 dark:bg-sky-950/20",
    border: "border-sky-200 dark:border-sky-900/50",
  },
  {
    id: 4,
    title: "KG - II",
    age: "Ages 5 - 6 Years",
    description: "Advanced foundational preparation ensuring a seamless transition to primary school with strong academic and social readiness.",
    icon: <Award className="w-8 h-8 text-rose-600 dark:text-rose-400" />,
    bg: "bg-rose-50 dark:bg-rose-950/20",
    border: "border-rose-200 dark:border-rose-900/50",
  },
];

export default function AcademicPrograms() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-slate-950 w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-16">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-slate-800 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
              Academic Programs
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Classes Tailored for <span className="text-emerald-600 dark:text-emerald-400">Every Stage</span>
            </h2>
            <p className="mt-3 text-sm sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
              Age-appropriate curriculums designed to ignite curiosity and foster holistic development for your little ones.
            </p>
          </motion.div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 items-stretch">
          {programs.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`p-4 sm:p-8 rounded-2xl sm:rounded-3xl border ${item.bg} ${item.border} shadow-sm transition-all duration-300 flex flex-col h-full`}
            >
              {/* Icon & Age Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-6">
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm inline-flex items-center justify-center w-fit">
                  {item.icon}
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800 w-fit">
                  {item.age}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                {item.description}
              </p>

              {/* Link / Button */}
              <div className="mt-auto pt-3 sm:pt-4 border-t border-slate-200/40 dark:border-slate-800/60">
                <Link
                  href="/academics"
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:gap-3 transition-all duration-300"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}