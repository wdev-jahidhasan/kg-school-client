"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Screen wise speed (px per second)
const getSpeed = () => {
  if (typeof window === "undefined") return 60;
  const w = window.innerWidth;
  if (w >= 1024) return 90;
  if (w >= 640) return 70;
  return 40;
};

export default function Marquee() {
  const [dynamicNotices, setDynamicNotices] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [timing, setTiming] = useState(null);

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const fetchLatestNotices = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notices`);
        if (!res.ok) return;

        const result = await res.json();
        const data = result.notices || [];

        const allowedAudiences = ["Public", "Public & Logged-in"];
        const publicNotices = data
          .filter((notice) => allowedAudiences.includes(notice.audience))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3)
          .map((notice) => notice.title);

        setDynamicNotices(publicNotices);
      } catch (error) {
        console.error("Error fetching marquee notices:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchLatestNotices();
  }, []);

  const notices = [
    "Welcome to the official website of Junior Scholars",
    ...dynamicNotices,
    "Please check the notice board for regular updates",
  ];

  useEffect(() => {
    if (!isLoaded) return;

    const calculate = () => {
      if (!containerRef.current || !trackRef.current) return;
      const speed = getSpeed();
      const containerWidth = containerRef.current.offsetWidth;
      const trackWidth = trackRef.current.offsetWidth;
      setTiming({
        intro: containerWidth / speed,
        loop: trackWidth / 2 / speed,
      });
    };

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, [isLoaded, dynamicNotices]);

  const renderLoop = (prefix) => (
    <div className="inline-flex items-center">
      {notices.map((notice, idx) => (
        <span key={`${prefix}-${idx}`} className="inline-flex items-center mr-8 sm:mr-16">
          {notice}
          <span className="ml-8 sm:ml-16 text-amber-400 font-normal">•</span>
        </span>
      ))}
    </div>
  );

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
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: "700ms",
                }}
              />
            ))}
          </div>

          {/* Marquee Ticker Effect */}
          <div
            ref={containerRef}
            className="marquee-wrap relative overflow-hidden w-full whitespace-nowrap"
          >
            {/* Outer */}
            <div
              className="marquee-anim"
              style={{
                visibility: timing ? "visible" : "hidden",
                animation: timing
                  ? `marquee-intro ${timing.intro}s linear both`
                  : "none",
              }}
            >
              {/* Inner */}
              <div
                ref={trackRef}
                className="marquee-anim inline-block text-xs sm:text-base font-bold text-amber-600 dark:text-amber-500 tracking-wide"
                style={{
                  animation: timing
                    ? `marquee-loop ${timing.loop}s linear ${timing.intro}s infinite`
                    : "none",
                }}
              >
                {renderLoop("a")}
                {renderLoop("b")}
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

      <style jsx global>{`
        @keyframes marquee-intro {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        @keyframes marquee-loop {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-wrap:hover .marquee-anim {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}