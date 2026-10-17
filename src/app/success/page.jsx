"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Trophy, GraduationCap, Quote } from "lucide-react";
import { allStudents } from "../components/SuccessInfo";
export default function AllSuccessStoriesPage() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">

      {/* 1. Hero Section */}
      <section className="relative py-16 lg:py-24 bg-amber-50/40 dark:bg-slate-900/50 border-b border-amber-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-slate-800 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
              Complete Hall of Fame
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              All Success <span className="text-emerald-600 dark:text-emerald-400">Stories</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Explore all brilliant students who made us proud through Cadet selections, scholarships, and top school achievements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Grid Section */}
      <section className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden p-5 flex flex-col justify-between group hover:border-emerald-500/50 transition-all duration-300"
            >
              <div>
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 border border-emerald-500/20 shadow-inner">
                  <Image
                    src={student.image}
                    alt={student.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                    {student.batch}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  {student.name}
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs flex items-center gap-1.5 mb-3">
                  <Trophy className="w-3.5 h-3.5 shrink-0" />
                  {student.achievement}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs italic flex items-start gap-1">
                  <Quote className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                  <span>&quot;{student.quote}&quot;</span>
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-500" /> Proud Star
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}