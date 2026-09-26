"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Nazmul Hossain",
    role: "Parent of Play Group Student",
    comment: "The environment at Junior Scholars Kindergarten School is wonderful. My daughter goes there happily every day to learn, and we are truly pleased with her progress.",
    rating: 5,
  },
  {
    id: 2,
    name: "Farhana Akter",
    role: "Parent of Nursery Student",
    comment: "The teachers are extremely caring and attentive. Special attention is given to every single child. This school is undoubtedly the best choice for shaping our child's future.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rakibul Hasan",
    role: "Parent of KG-1 Student",
    comment: "The play-based learning method is very effective. My son used to resist going to school, but now he is excited to attend every day. Thanks to all the teachers!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-slate-950 w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-16">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-slate-800 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
              Parents Feedback
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              What Parents <span className="text-emerald-600 dark:text-emerald-400">Say About Us</span>
            </h2>
            <p className="mt-3 text-sm sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
              Hear from our happy parents and guardians about their experience with our school.
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Quote Icon & Rating Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                    <Quote className="w-6 h-6" />
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed italic mb-6">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {item.name}
                </h4>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}