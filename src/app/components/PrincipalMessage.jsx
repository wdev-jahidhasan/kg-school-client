"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PrincipalMessage() {
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
              Principal's Message
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Principal&apos;s <span className="text-emerald-600 dark:text-emerald-400">Message</span>
            </h2>
            <p className="mt-3 text-sm sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
              Building a bright and joyful foundation for every child through dedication and care.
            </p>
          </motion.div>
        </div>

        {/* Main Content Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center gap-8 p-6 sm:p-10 lg:p-12"
        >

          {/* Left Side: Principal Official Image (Office Desk Setup) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden border-2 border-emerald-500/30 dark:border-emerald-500/20 shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                alt="Principal at Office"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Side: Message, Name & Designation */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Shaping Young Minds with Wisdom and Care
            </h3>

            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              &ldquo;Welcome to Junior Scholars Kindergarten School! We are dedicated to providing a nurturing, safe, and engaging environment where every child can explore, learn, and grow with confidence. Alongside early academics, our passionate educators focus on moral values, creativity, and social development. We believe that a strong partnership between parents and teachers is the key to unlocking every child&apos;s true potential.&rdquo;
            </p>

            {/* Name and Designation */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Syeda Sabiha Sultana</h4>
              <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">Principal</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Junior Scholars Kindergarten School</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs">Gobindaganj, Gaibandha</p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}