"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  GraduationCap,
  AlertCircle,
  Clock,
  CheckCircle2
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const classOptions = [
  { label: "Play", value: "play" },
  { label: "Nursery", value: "nursery" },
  { label: "Class One", value: "one" },
  { label: "Class Two", value: "two" },
  { label: "Class Three", value: "three" },
  { label: "Class Four", value: "four" },
  { label: "Class Five", value: "five" },
];

export default function DigitalDiary() {
  const { data: session } = authClient.useSession();

  const [selectedClass, setSelectedClass] = useState("one");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [diaryData, setDiaryData] = useState([]);
  const [publisherInfo, setPublisherInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const userClass =
      session?.user?.profile?.studentClass || session?.user?.class;

    if (userClass) {
      let formatted = userClass.toLowerCase().replace(/\s+/g, "");
      if (formatted.startsWith("class")) {
        formatted = formatted.replace("class", "");
      }

      const isValidClass = classOptions.some((c) => c.value === formatted);
      if (isValidClass) {
        setSelectedClass(formatted);
      }
    }
  }, [session]);

  const fetchDiary = async (cls, date) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/diaries?className=${cls}&date=${date}`
      );
      const result = await response.json();

      if (result.success && result.data) {
        setDiaryData(result.data.subjects || []);
        setPublisherInfo({
          name: result.data.publisherName,
          updatedAt: result.data.updatedAt,
        });
      } else {
        setDiaryData([]);
        setPublisherInfo(null);
      }
    } catch (error) {
      console.error("Error fetching diary:", error);
      setDiaryData([]);
      setPublisherInfo(null);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  useEffect(() => {
    if (selectedClass && selectedDate) {
      fetchDiary(selectedClass, selectedDate);
    }
  }, [selectedClass, selectedDate]);

  return (
    <div className="w-full min-h-screen bg-transparent py-4 sm:py-6 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-4">

        {/* Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/60 dark:border-slate-800">

          {/* Title with 2 Colors */}
          <h1 className="text-xl sm:text-2xl font-black tracking-tight whitespace-nowrap">
            <span className="text-slate-900 dark:text-white">Digital </span>
            <span className="text-emerald-500 dark:text-emerald-400">Diary</span>
          </h1>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-2.5">

            {/* Select Class */}
            <div className="relative w-36 sm:w-40">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-500 dark:text-emerald-400">
                <GraduationCap className="w-4 h-4" />
              </span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer shadow-sm appearance-none"
              >
                {classOptions.map((cls) => (
                  <option key={cls.value} value={cls.value} className="dark:bg-slate-900 font-medium">
                    {cls.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            {/* Select Date */}
            <div className="relative w-40 sm:w-44">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-500 dark:text-emerald-400 z-10">
                <Calendar className="w-4 h-4" />
              </span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer shadow-sm dark:[color-scheme:dark]"
              />
            </div>

          </div>
        </div>

        {/* Publisher & Context Bar */}
        {publisherInfo && !loading && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-2.5 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/50 dark:border-emerald-800/40 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
              <span>
                Published by: <strong className="text-slate-900 dark:text-white font-semibold">{publisherInfo.name}</strong>
              </span>
            </div>
            {publisherInfo.updatedAt && (
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <Clock className="w-3 h-3 shrink-0" />
                <span>Last updated at {new Date(publisherInfo.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            )}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-3 animate-pulse">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-4/5"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && searched && diaryData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/60 dark:border-amber-800/50 flex items-center justify-center mb-3 text-amber-500">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1">
              No Diary Entry Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              Digital diary for <span className="font-bold text-emerald-500 dark:text-emerald-400">{classOptions.find(c => c.value === selectedClass)?.label}</span> has not been published yet for <span className="font-semibold">{selectedDate}</span>.
            </p>
          </div>
        )}

        {/* Grid Cards Layout: 3 Columns on Large, 2 Columns on Medium, 1 Column on Mobile (3-2-1 Pattern) */}
        {!loading && diaryData.length > 0 && (
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {diaryData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                  className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5 space-y-1.5">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
                        {item.subjectName}
                      </h3>

                      {item.teacherName && (
                        <div className="inline-block px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/50 dark:border-emerald-800/50 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                          {item.teacherName}
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed bg-slate-50/80 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800/60 whitespace-pre-line">
                      {item.details}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}

      </div>
    </div>
  );
}