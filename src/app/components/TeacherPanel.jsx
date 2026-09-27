"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Phone, Award } from "lucide-react";

export default function TeachersPanel() {
  const leadershipTeachers = [
    {
      id: 1,
      name: "Syeda Sabiha Sultana",
      designation: "Principal",
      qualification: "M.A. & B.Ed, DU",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
      email: "sabiha123@gmail.com",
      phone: "017000000001",
    },
    {
      id: 2,
      name: "Md. Aminul Islam",
      designation: "Head Teacher / Vice Principal",
      qualification: "M.Sc. in Physics, RU",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
      email: "aminul123@gmail.com",
      phone: "018000000002",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-slate-950 w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-16">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-slate-800 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
              Meet Our Teachers
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Our Respected <span className="text-emerald-600 dark:text-emerald-400">Teachers</span>
            </h2>
            <p className="mt-3 text-sm sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
              Guiding our institution with experience, dedication, and a vision for excellence.
            </p>
          </motion.div>
        </div>

        {/* Principal & Head Teacher Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {leadershipTeachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden p-6 flex flex-col sm:flex-row items-center gap-6 group hover:border-emerald-500/50 transition-all duration-300"
            >
              {/* Teacher/Principal Image */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-emerald-500/30 dark:border-emerald-500/20 shrink-0 shadow-md">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="space-y-1.5 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {teacher.name}
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm flex items-center justify-center sm:justify-start gap-1.5">
                  <Award className="w-4 h-4 shrink-0" />
                  {teacher.designation}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  {teacher.qualification}
                </p>
                <div className="pt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate max-w-[170px] sm:max-w-[190px]">{teacher.email}</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{teacher.phone}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Teachers Redirect Button */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/teachers"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <span>View All Teachers</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}