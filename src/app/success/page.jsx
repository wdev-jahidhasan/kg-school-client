"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Trophy, GraduationCap, Quote } from "lucide-react";

export default function AllSuccessStoriesPage() {
  const allStudents = [
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
      achievement: "Mymensingh Cadet College Selection",
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
    {
      id: 9,
      name: "Mahbubur Rahman",
      achievement: "Rajshahi Cadet College Selection",
      batch: "Batch 2024",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
      quote: "Mock viva sessions at the institution prepared me for the final board.",
    },
    {
      id: 10,
      name: "Sadia Afrin",
      achievement: "Comilla Cadet College (Girls)",
      batch: "Batch 2024",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
      quote: "Consistency in English and Mathematics was my core strategy.",
    },
    {
      id: 11,
      name: "Adib Al Hasan",
      achievement: "Dhaka Collegiate School Admission",
      batch: "Batch 2023",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
      quote: "Teachers always stayed back after class to clear my doubts.",
    },
    {
      id: 12,
      name: "Tasfia Islam",
      achievement: "Junior Scholarship (Talentpool)",
      batch: "Batch 2023",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800",
      quote: "Believing in my teachers' notes was the best decision I made.",
    },
    {
      id: 13,
      name: "Raihan Kabir",
      achievement: "Faujdarhat Cadet College",
      batch: "Batch 2024",
      image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=800",
      quote: "Physical fitness training and written test practice went hand in hand.",
    },
    {
      id: 14,
      name: "Maliha Tabassum",
      achievement: "Holiddays School Top Scorer",
      batch: "Batch 2024",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
      quote: "The competitive classroom environment pushed me to work harder.",
    },
    {
      id: 15,
      name: "Shahriar Ahmed",
      achievement: "Mirzapur Cadet College Selection",
      batch: "Batch 2023",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=800",
      quote: "Guidance on time management during exams changed everything.",
    },
    {
      id: 16,
      name: "Farhana Akter",
      achievement: "Govt. Girls' High School Admission",
      batch: "Batch 2023",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800",
      quote: "Supportive mentors made learning fun and stress-free.",
    },
    {
      id: 17,
      name: "Najmul Hossain",
      achievement: "Primary Scholarship (Talentpool)",
      batch: "Batch 2024",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
      quote: "Daily class tests helped me track my own progress easily.",
    },
    {
      id: 18,
      name: "Bristy Rani",
      achievement: "District Merit List Position",
      batch: "Batch 2023",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800",
      quote: "My parents and teachers constant motivation brought me here.",
    },
    {
      id: 19,
      name: "Zubair Al Mahmud",
      achievement: "Joypurhat Cadet College",
      batch: "Batch 2024",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
      quote: "The systematic question bank solving was a game changer.",
    },
    {
      id: 20,
      name: "Sabrina Sultana",
      achievement: "Viqarunnisa Noon School Selection",
      batch: "Batch 2023",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
      quote: "Focusing on fundamentals built a rock-solid foundation for my career.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-slate-800 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
            Complete Hall of Fame
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            All Success <span className="text-emerald-600 dark:text-emerald-400">Stories</span>
          </h1>
          <p className="mt-3 text-sm sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
            Explore all brilliant students who made us proud through Cadet selections, scholarships, and top school achievements.
          </p>
        </div>

        {/* Grid of 20 Students */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
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

      </div>
    </div>
  );
}