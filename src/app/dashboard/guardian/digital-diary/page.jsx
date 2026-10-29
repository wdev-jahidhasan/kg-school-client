"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, BookOpen, GraduationCap, User, Clock, AlertCircle, Loader2, Sparkles } from "lucide-react";
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
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [diaryData, setDiaryData] = useState([]);
  const [publisherInfo, setPublisherInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const userClass = session?.user?.profile?.studentClass || session?.user?.class;

    if (userClass) {
      let formatted = userClass.toLowerCase().replace(/\s+/g, '');
      if (formatted.startsWith('class')) {
        formatted = formatted.replace('class', '');
      }

      const isValidClass = classOptions.some(c => c.value === formatted);
      if (isValidClass) {
        setSelectedClass(formatted);
      }
    }
  }, [session]);

  // Fetch Diary Data from Backend
  const fetchDiary = async (cls, date) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/diaries?className=${cls}&date=${date}`);
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
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-10">

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold mb-2 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          Student Daily Portal
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Digital <span className="text-emerald-600 dark:text-emerald-400">Diary</span>
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
          Select class and date to check daily classwork and homework.
        </p>
      </motion.div>

      {/* Filter Card (Search Bar) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Select Class */}
          <div className="w-full">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
              Select Class
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
              </span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
              >
                {classOptions.map((cls) => (
                  <option key={cls.value} value={cls.value} className="dark:bg-slate-900">
                    {cls.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Select Date */}
          <div className="w-full">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
              Select Date
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Calendar className="w-4 h-4 text-emerald-600" />
              </span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer dark:[color-scheme:dark]"
              />
            </div>
          </div>

        </div>
      </motion.div>

      {/* Publisher & Last Updated Info Bar */}
      {publisherInfo && !loading && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            Published by: <strong className="text-slate-700 dark:text-slate-200">{publisherInfo.name}</strong>
          </span>
          {publisherInfo.updatedAt && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Last updated: {new Date(publisherInfo.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mb-2" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Loading digital diary...</p>
        </div>
      )}

      {/* Empty State (No Diary Found) */}
      {!loading && searched && diaryData.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm"
        >
          <AlertCircle className="w-12 h-12 text-amber-500 mb-3 opacity-80" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
            No Diary Entry Found!
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm">
            Digital diary for <span className="font-semibold text-emerald-600">{classOptions.find(c => c.value === selectedClass)?.label}</span> has not been published yet for {selectedDate}.
          </p>
        </motion.div>
      )}

      {/* Diary Content Cards */}
      {!loading && diaryData.length > 0 && (
        <div className="space-y-4">
          {diaryData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Subject Header */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight truncate">
                      {item.subjectName}
                    </h3>
                    {item.teacherName && (
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                        <User className="w-3 h-3 text-emerald-600 shrink-0" />
                        Teacher: {item.teacherName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Lesson Details (CW/HW) */}
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium whitespace-pre-line leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/60 break-words">
                {item.details}
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
}