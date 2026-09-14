"use client";

import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

export default function Marquee() {
  const notices = [
    "Welcome to the official website of Junior Scholars",
    "Admission is going on for upcoming session",
    "Please check the notice board for regular updates",
  ];

  return (
    <section className="w-full bg-white dark:bg-slate-950 py-3 px-3 sm:px-8 border-b border-slate-200/60 dark:border-slate-800 shadow-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-6">

        {/* Left Side: Marquee with Arrows */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-hidden w-full">
          {/* Mobile-friendly compact arrow box */}
          <div className="hidden xs:flex items-center -space-x-2 shrink-0 bg-slate-50 dark:bg-slate-900 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
            {[0, 1, 2].map((index) => (
              <ChevronRight
                key={index}
                className="w-3.5 h-3.5 text-amber-500 font-extrabold stroke-[3] animate-pulse"
                style={{ animationDelay: `${index * 100}ms`, animationDuration: '700ms' }}
              />
            ))}
          </div>

          {/* Marquee Ticker Effect */}
          <div className="relative overflow-hidden w-full whitespace-nowrap">
            <div className="inline-block animate-marquee text-xs sm:text-base font-bold text-amber-600 dark:text-amber-500 tracking-wide">
              <div className="inline-flex items-center">
                {notices.map((notice, idx) => (
                  <span key={idx} className="inline-flex items-center mr-8 sm:mr-16">
                    {notice}
                    {idx < notices.length - 1 && (
                      <span className="ml-8 sm:ml-16 text-amber-400 font-normal">•</span>
                    )}
                  </span>
                ))}
              </div>

              <div className="inline-flex items-center ml-8 sm:ml-16">
                {notices.map((notice, idx) => (
                  <span key={`dup-${idx}`} className="inline-flex items-center mr-8 sm:mr-16">
                    {notice}
                    {idx < notices.length - 1 && (
                      <span className="ml-8 sm:ml-16 text-amber-400 font-normal">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Outline All Button */}
        <div className="shrink-0">
          <Link
            href="/notices"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg border border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white text-xs sm:text-sm font-semibold shadow-sm transition-all duration-300"
          >
            <span>All</span>
          </Link>
        </div>

      </div>

      {/* Tailwind Custom Marquee Animation Style */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}