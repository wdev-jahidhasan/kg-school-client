"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-slate-950 w-full relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-12 lg:px-16">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-slate-800 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
              Get in Touch
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Contact <span className="text-emerald-600 dark:text-emerald-400">Us</span>
            </h2>
            <p className="mt-3 text-sm sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
              Have any questions or want to know more about admission? Reach out to us anytime.
            </p>
          </motion.div>
        </div>

        {/* Contact Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 shadow-sm"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 text-center sm:text-left">
            School Information & Contacts
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left Column: Location & Office Hours */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Our Location</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Jheelpara, Gobindaganj, Gaibandha
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Office Hours</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Sat - Thu: 8:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Phone & Email */}
            <div className="space-y-6">
              {/* Multiple Phone Numbers */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Phone Numbers</h4>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Office:</span> +880 1700-000000
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Principal:</span> +880 1800-000000
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Admission Hotline:</span> +880 1900-000000
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Email Address</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    info@juniorscholarskg.edu
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}