"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Application Error Logged:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex items-center justify-center p-6 transition-colors duration-300">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-slate-50 dark:bg-slate-900/60 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-lg"
        >
          {/* Error Icon */}
          <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-semibold mb-3">
            Something Went Wrong
          </span>

          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
            Oops! An Error Occurred
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium mb-6 leading-relaxed">
            We encountered an unexpected issue. You can try refreshing the section or return back to the main page.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Try Again Button */}
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            {/* Back to Home Button */}
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}