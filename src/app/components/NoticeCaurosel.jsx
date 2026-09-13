"use client";

import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

export default function NoticeCarousel() {
  const noticeText = "Welcome to the official website of Junior Scholars  •  Admission is going on.";

  return (
    <section className="w-full bg-white dark:bg-slate-950 py-3.5 px-4 sm:px-8 border-b border-slate-200/60 dark:border-slate-800 shadow-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left Side: Marquee with Arrows */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden w-full">
          {/* 5 Right Arrows */}
          <div className="flex items-center -space-x-1.5 shrink-0 bg-slate-50 dark:bg-slate-900 px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
            {[0, 1, 2, 3, 4].map((index) => (
              <ChevronRight
                key={index}
                className="w-4 h-4 text-amber-500 font-extrabold stroke-[3] animate-pulse"
                style={{ animationDelay: `${index * 100}ms`, animationDuration: '600ms' }}
              />
            ))}
          </div>

          {/* Marquee Ticker Effect - Fixed spacing and Yellow text */}
          <div className="relative overflow-hidden w-full whitespace-nowrap">
            <div className="inline-block animate-marquee text-sm sm:text-base font-bold text-amber-500 tracking-wide">
              <span className="mr-24">{noticeText}</span>
              <span className="mr-24">{noticeText}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Details Button */}
        <div className="shrink-0">
          <Link
            href="/notices"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all duration-300"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
          animation: marquee 18s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}