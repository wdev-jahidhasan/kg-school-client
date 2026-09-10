"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, CreditCard } from "lucide-react";

export default function HeroEmeraldAmber() {
  return (
    <section className="relative overflow-hidden bg-amber-50/30 py-20 dark:bg-slate-950 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Smart Kindergarten Management Portal</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Modern Education System for <span className="text-emerald-600 dark:text-emerald-400">Bright Futures</span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0">
              An all-in-one school solution featuring secure Stripe payments for guardians, real-time result tracking, and streamlined attendance management for teachers.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/admission"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-800"
              >
                Apply for Admission
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-amber-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-amber-50/50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Portal Login
              </Link>
            </div>

            {/* Features Highlights */}
            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-amber-200/60 pt-8 dark:border-slate-800 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Secure Payment</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Fee processing via Stripe</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Role-Based Access</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Secure dashboard panels</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Preview Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md rounded-3xl bg-slate-900 p-3 shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800">
              <div className="rounded-2xl bg-white p-6 dark:bg-slate-950">
                <div className="space-y-4">
                  <div className="h-4 w-3/4 rounded bg-slate-100 dark:bg-slate-800 animate-pulse"></div>
                  <div className="h-32 w-full rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-800">
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Bright Sparks KG School Preview</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-900"></div>
                    <div className="h-3 w-5/6 rounded bg-slate-100 dark:bg-slate-900"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}