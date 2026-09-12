"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What is the minimum age requirement for admission?",
    answer: "Children can enroll in our Play Group starting at 2 years of age. For Nursery, the requirement is 3+ years, KG-I is 4+ years, and KG-II is 5+ years.",
  },
  {
    id: 2,
    question: "What are the school hours for different classes?",
    answer: "For Play Group and Nursery, classes typically run for 2.5 to 3 hours in the morning (e.g., 9:00 AM to 12:00 PM). For KG-I and KG-II, classes run from 9:00 AM to 1:00 PM.",
  },
  {
    id: 3,
    question: "How do you ensure a safe and secure environment for children?",
    answer: "Our campus is 100% secured with CCTV monitoring, gated entry points, verified staff, and child-proof classrooms and play zones to ensure complete protection.",
  },
  {
    id: 4,
    question: "What is your student-to-teacher ratio?",
    answer: "We maintain a low student-to-teacher ratio to ensure personalized care, warmth, and individual attention for every single child in our classrooms.",
  },
  {
    id: 5,
    question: "How can I apply for my child's admission?",
    answer: "You can apply online by clicking the 'Apply Now' button on our website, or you can visit our campus directly to collect the admission form and take a school tour.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-slate-950 w-full relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-12">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-slate-800 text-xs sm:text-sm font-semibold mb-4 shadow-sm">
              Got Questions?
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Frequently Asked <span className="text-emerald-600 dark:text-emerald-400">Questions</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
              Find quick answers to common queries regarding admissions, school hours, safety, and more.
            </p>
          </motion.div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border border-slate-200/80 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed border-t border-slate-200/40 dark:border-slate-800/60 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}