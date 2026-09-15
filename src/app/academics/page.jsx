"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, Users, Award, Sparkles, CheckCircle2 } from "lucide-react";

const programs = [
  {
    id: 1,
    title: "Play Group",
    age: "Ages 2 - 3 Years",
    description: "An introduction to the school environment through sensory play, rhymes, social interaction, and basic motor skill development.",
    schedule: "9:00 AM - 11:30 AM",
    features: ["Sensory & Motor Play", "Basic Speech & Rhymes", "Safe Socialization"],
    color: "from-amber-500/10 to-amber-500/5 border-amber-200 dark:border-amber-900/50",
  },
  {
    id: 2,
    title: "Nursery",
    age: "Ages 3 - 4 Years",
    description: "Focusing on early literacy, numeracy concepts, alphabet recognition, and creative expression through colors and crafts.",
    schedule: "9:00 AM - 12:30 PM",
    features: ["Alphabet & Number Intro", "Art & Craft Sessions", "Interactive Storytelling"],
    color: "from-emerald-500/10 to-emerald-500/5 border-emerald-200 dark:border-emerald-900/50",
  },
  {
    id: 3,
    title: "Kindergarten One (KG-I)",
    age: "Ages 4 - 5 Years",
    description: "Building confidence in reading, writing simple words, basic mathematics, and encouraging curiosity through science exploration.",
    schedule: "9:00 AM - 1:00 PM",
    features: ["Reading & Writing Basics", "Basic Math & Logic", "Science Discovery Labs"],
    color: "from-sky-500/10 to-sky-500/5 border-sky-200 dark:border-sky-900/50",
  },
  {
    id: 4,
    title: "Kindergarten Two (KG-II)",
    age: "Ages 5 - 6 Years",
    description: "Advanced preparation for primary school with fluent reading, sentence structuring, problem-solving, and leadership skills.",
    schedule: "9:00 AM - 1:30 PM",
    features: ["Primary School Prep", "Independent Problem Solving", "Group Leadership"],
    color: "from-purple-500/10 to-purple-500/5 border-purple-200 dark:border-purple-900/50",
  },
];

const curriculumHighlights = [
  {
    title: "Play-Based Learning",
    description: "We combine fun games with educational lessons so children learn naturally without academic pressure.",
    icon: Sparkles,
  },
  {
    title: "Experienced Teachers",
    description: "Caring, trained, and certified educators who provide personalized attention and emotional safety.",
    icon: Users,
  },
  {
    title: "Moral & Ethical Values",
    description: "Teaching kindness, sharing, respect, and discipline from their very first steps in school.",
    icon: Award,
  },
  {
    title: "Interactive Classrooms",
    description: "Equipped with modern visual aids, storytelling corners, and engaging learning toolkits.",
    icon: BookOpen,
  },
];

const dailyRoutine = [
  { time: "09:00 AM - 09:30 AM", activity: "Morning Assembly & Free Play" },
  { time: "09:30 AM - 10:15 AM", activity: "Circle Time & Rhymes Session" },
  { time: "10:15 AM - 11:00 AM", activity: "Early Literacy & Numeracy" },
  { time: "11:00 AM - 11:30 AM", activity: "Healthy Snack & Outdoor Recess" },
  { time: "11:30 AM - 12:15 PM", activity: "Art, Craft, or Music Activity" },
  { time: "12:15 PM - 01:00 PM", activity: "Storytelling & Wrap-up Session" },
];

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
              Academic Programs
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Shaping Foundations Through <span className="text-emerald-600 dark:text-emerald-400">Joyful Learning</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Explore our thoughtfully structured classes designed to spark curiosity, creativity, and confidence in every child.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Programs Grid Section */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Classes We Offer
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Age-appropriate curricula designed for progressive development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {programs.map((prog, index) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${prog.color} border shadow-sm flex flex-col justify-between`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm border border-slate-200/50 dark:border-slate-800">
                    {prog.age}
                  </span>
                  <div className="flex items-center text-xs font-semibold text-slate-500 dark:text-slate-400 gap-1">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    {prog.schedule}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {prog.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6 font-medium leading-relaxed">
                  {prog.description}
                </p>

                <div className="space-y-2 mb-6">
                  {prog.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
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

      {/* 4. Sample Daily Routine Section */}
      <section className="py-16 lg:py-24 max-w-4xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1 block">
            Daily Schedule
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            A Typical Day at Junior Scholars
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Balanced activities designed to keep little ones energized and focused.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
          {dailyRoutine.map((routine, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-5 hover:bg-emerald-50/30 dark:hover:bg-slate-800/50 transition-colors">
              <span className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-slate-800 px-3 py-1 rounded-full mb-1 sm:mb-0">
                {routine.time}
              </span>
              <span className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300">
                {routine.activity}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}