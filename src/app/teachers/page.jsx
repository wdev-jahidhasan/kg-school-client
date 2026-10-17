"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, Award, Users } from "lucide-react";
import { allTeachers, allStaff } from "../components/TeachersInfo";

export default function AllTeachersPage() {
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
              Our People
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Teachers & <span className="text-emerald-600 dark:text-emerald-400">Staff Directory</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Meet our respected faculty members and dedicated staff who keep our institution running smoothly every day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">

        {/* SECTION 1: Teachers */}
        <div className="mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
            <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Our Teachers
            </h2>
          </div>

          {/* Teachers Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {allTeachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden p-4 sm:p-5 flex flex-col items-center text-center group hover:border-emerald-500/50 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-emerald-500/30 dark:border-emerald-500/20 shadow-md mb-3">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="space-y-1 w-full">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                    {teacher.name}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs flex items-center justify-center gap-1">
                    <Award className="w-3 h-3 shrink-0" />
                    <span className="truncate">{teacher.designation}</span>
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs truncate">
                    {teacher.qualification}
                  </p>
                  <div className="pt-2 mt-1 border-t border-slate-200 dark:border-slate-800 space-y-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center justify-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[130px] sm:max-w-[160px]">{teacher.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{teacher.phone}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Staff Members */}
        <div>
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
            <Users className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Our Staff Members
            </h2>
          </div>

          {/* Staff Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {allStaff.map((staff, index) => (
              <motion.div
                key={staff.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden p-4 sm:p-5 flex flex-col items-center text-center group hover:border-amber-500/50 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-amber-500/30 dark:border-amber-500/20 shadow-md mb-3">
                  <Image
                    src={staff.image}
                    alt={staff.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="space-y-1 w-full">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                    {staff.name}
                  </h3>
                  <p className="text-amber-600 dark:text-amber-400 font-semibold text-xs flex items-center justify-center gap-1">
                    <Users className="w-3 h-3 shrink-0" />
                    <span className="truncate">{staff.designation}</span>
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs truncate">
                    Dept: {staff.department}
                  </p>
                  <div className="pt-2 mt-1 border-t border-slate-200 dark:border-slate-800 space-y-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center justify-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[130px] sm:max-w-[160px]">{staff.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{staff.phone}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}