"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trophy, GraduationCap, Quote } from "lucide-react";

export default function SuccessStories() {
  const featuredStudents = [
    {
      id: 1,
      name: "Rafid Al Islam",
      achievement: "Cadet College Admission (Sylhet Cadet)",
      batch: "Batch 2024",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
      quote: "The special Cadet preparation classes and mock tests gave me winning confidence.",
    },
    {
      id: 2,
      name: "Ayesha Siddika",
      achievement: "Junior Scholarship (Talentpool)",
      batch: "Batch 2024",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
      quote: "Our teachers cleared every single concept from the basic textbooks.",
    },
    {
      id: 3,
      name: "Tanvir Hossain",
      achievement: "Govt. Laboratory High School Admission",
      batch: "Batch 2024",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
      quote: "Regular discipline and daily study hours helped me secure top rank.",
    },
    {
      id: 4,
      name: "Lamia Tabassum",
      achievement: "Viqarunnisa Noon School & College",
      batch: "Batch 2024",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800",
      quote: "The friendly environment and continuous mentoring built my academic strength.",
    },
    {
      id: 5,
      name: "Fahim Faisal",
      achievement: "Mirzadpur Cadet College Selection",
      batch: "Batch 2023",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
      quote: "Hard work combined with the proper institutional roadmap led to success.",
    },
    {
      id: 6,
      name: "Nusrat Jahan",
      achievement: "Primary Scholarship (General Grade)",
      batch: "Batch 2023",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
      quote: "Daily math practice and spelling tests made all the difference.",
    },
    {
      id: 7,
      name: "Saadman Sakib",
      achievement: "Top Position in District Scholarship",
      batch: "Batch 2023",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800",
      quote: "Never give up when solving tricky mental ability problems.",
    },
    {
      id: 8,
      name: "Zerin Tasnim",
      achievement: "Ideal School & College Admission",
      batch: "Batch 2024",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800",
      quote: "Reading textbooks thoroughly instead of guides helped me excel.",
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
              Hall of Fame
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Our Successful <span className="text-emerald-600 dark:text-emerald-400">Students</span>
            </h2>
            <p className="mt-3 text-sm sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
              Brilliant minds who cracked Cadet Colleges, Scholarships, and Top Schools from our foundation.
            </p>
          </motion.div>
        </div>

        {/* 8 Students Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden p-5 flex flex-col justify-between group hover:border-emerald-500/50 transition-all duration-300"
            >
              <div>
                {/* Student Image & Batch Tag */}
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

                {/* Info */}
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

        {/* View All Success Stories Redirect Button */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/success"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <span>View All Success</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}