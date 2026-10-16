"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Star, Sun, Sunset } from "lucide-react";
import { programs, featuredProgram, curriculumHighlights } from "../components/ClassesInfo";

export default function AcademicsPage() {
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
              Academic Curriculum
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Shaping Foundations Through <span className="text-emerald-600 dark:text-emerald-400">Joyful Learning</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Explore our thoughtfully structured programs from Play Group to Class Five, designed to spark curiosity and confidence in every child.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Programs Section */}
      <section className="py-12 lg:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Classes We Offer
          </h2>
          <p className="mt-2 text-xs sm:text-base text-slate-600 dark:text-slate-400">
            Age-appropriate curricula designed for progressive intellectual and social development.
          </p>
        </div>

        {/* Featured Big Card: Play Group */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className={`mb-6 sm:mb-8 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${featuredProgram.gradient} shadow-lg relative overflow-hidden`}
        >
          <div className="flex items-center justify-between mb-3 md:hidden">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-200/80 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-200">
              {featuredProgram.age}
            </span>
            <div className="p-1.5 rounded-full bg-emerald-600 text-white shadow-sm">
              <Star className="w-3.5 h-3.5 fill-white" />
            </div>
          </div>

          <div className="hidden md:flex absolute top-6 right-6 p-2 rounded-full bg-emerald-600 text-white shadow-md">
            <Star className="w-4 h-4 fill-white" />
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200/60 dark:border-emerald-800/50 shadow-md">
                  {featuredProgram.icon}
                </div>
                <div>
                  <span className="hidden md:inline-block text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-emerald-200/70 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 mb-1">
                    {featuredProgram.age}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {featuredProgram.title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                {featuredProgram.description}
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3 pt-1">
                {featuredProgram.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 px-3 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-800/50">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 6 Classes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {programs.map((prog, index) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className={`rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-gradient-to-br ${prog.gradient} border shadow-sm flex flex-col justify-between h-full`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm border border-slate-200/50 dark:border-slate-800 w-fit">
                    {prog.age}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {prog.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 font-medium leading-relaxed">
                  {prog.description}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-200/40 dark:border-slate-800/60">
                {prog.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Curriculum Highlights Section */}
      <section className="py-16 lg:py-20 bg-amber-50/30 dark:bg-slate-900/40 border-y border-amber-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Why Parents Choose Our Curriculum
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Our approach ensures holistic growth—mind, body, and character.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {curriculumHighlights.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/60 dark:border-slate-800 text-center flex flex-col items-center"
                >
                  <div className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4 shadow-sm">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Shift Timings Section */}
      <section className="py-16 lg:py-24 max-w-4xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1 block">
            School Shifts
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Available Shift Timings
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Flexible learning shifts designed for student convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-amber-200/80 dark:border-slate-800 shadow-sm text-center flex flex-col items-center">
            <div className="p-3.5 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 mb-3">
              <Sun className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Morning Shift</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              Suitable for early learners with focused morning sessions.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-sky-200/80 dark:border-slate-800 shadow-sm text-center flex flex-col items-center">
            <div className="p-3.5 rounded-2xl bg-sky-100 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 mb-3">
              <Sunset className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Day Shift</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              Structured daytime schedule ideal for primary classes.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}