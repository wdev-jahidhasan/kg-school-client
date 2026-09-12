"use client";

import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, Smile, BookOpenCheck } from "lucide-react";

const features = [
  {
    id: 1,
    icon: <Smile className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
    title: "Play-Based Learning",
    description: "Engaging and fun educational activities where children naturally explore, discover, and learn with joy.",
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-900/50",
  },
  {
    id: 2,
    icon: <HeartHandshake className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
    title: "Caring & Expert Teachers",
    description: "Passionate and experienced educators who provide individual care, warmth, and attention to every child.",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-900/50",
  },
  {
    id: 3,
    icon: <ShieldCheck className="w-8 h-8 text-sky-600 dark:text-sky-400" />,
    title: "100% Safe Environment",
    description: "A secure, child-friendly campus equipped with safety measures and monitoring to keep your little ones protected.",
    bg: "bg-sky-50 dark:bg-sky-950/20",
    border: "border-sky-200 dark:border-sky-900/50",
  },
  {
    id: 4,
    icon: <BookOpenCheck className="w-8 h-8 text-rose-600 dark:text-rose-400" />,
    title: "Interactive Activities",
    description: "Fostering creativity and essential skills through arts, crafts, storytelling, music, and group play.",
    bg: "bg-rose-50 dark:bg-rose-950/20",
    border: "border-rose-200 dark:border-rose-900/50",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-slate-950 w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-slate-800 text-xs sm:text-sm font-semibold mb-4 shadow-sm">
              Why Choose Us
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Why Parents <span className="text-emerald-600 dark:text-emerald-400">Choose Us</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
              We go beyond traditional teaching to build a strong foundation of confidence, curiosity, and happiness.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {features.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`p-8 rounded-3xl border ${item.bg} ${item.border} shadow-sm transition-all duration-300 flex flex-col h-full`}
            >
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm mb-6 inline-flex items-center justify-center w-fit">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {item.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-auto">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}