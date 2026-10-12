"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Bell, Download, X, ArrowRight, FileText } from "lucide-react";

const noticeCategories = ["All", "General", "Admission", "Exam", "Events"];

export default function NoticesPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [noticesData, setNoticesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notices`);
        const data = await response.json();

        if (data.success) {
          const publicNotices = data.notices.filter(
            (notice) => notice.audience === "Public" || notice.audience === "Public & Logged-in"
          );
          setNoticesData(publicNotices);
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const filteredNotices = activeTab === "All"
    ? noticesData
    : noticesData.filter((notice) => notice.category === activeTab);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">

      {/* 1. Hero Section */}
      <section className="relative py-16 lg:py-24 bg-amber-50/40 dark:bg-slate-900/50 border-b border-amber-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-slate-800 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
              Official Notice Board
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Latest Updates & <span className="text-emerald-600 dark:text-emerald-400">Announcements</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Stay informed with all recent news, circulars, admission details, and event schedules from Junior Scholars.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Category Filter Tabs */}
      <section className="py-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3 mb-10">
          {noticeCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${activeTab === category
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading / Empty State */}
        {loading ? (
          <div className="text-center py-20 text-slate-500 font-medium">Loading notices...</div>
        ) : filteredNotices.length === 0 ? (
          <div className="text-center py-20 text-slate-500 font-medium">No notices found for this category.</div>
        ) : (
          /* 3. Notices Grid */
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredNotices.map((notice) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={notice._id || notice.id}
                  onClick={() => setSelectedNotice(notice)}
                  className={`group rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between ${notice.important ? "ring-2 ring-amber-400/50 dark:ring-amber-500/30" : ""
                    }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-slate-700">
                        {notice.category}
                      </span>
                      <div className="flex items-center text-xs font-semibold text-slate-500 dark:text-slate-400 gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        {notice.date}
                      </div>
                    </div>

                    {notice.important && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 mb-2">
                        <Bell className="w-3.5 h-3.5 animate-bounce" /> Important Update
                      </span>
                    )}

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {notice.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium line-clamp-3 mb-6">
                      {notice.description}
                    </p>
                  </div>

                  <div className="flex items-center text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 gap-1 pt-4 border-t border-slate-100 dark:border-slate-800">
                    Read Full Notice
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* 4. Notice Details Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNotice(null)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <button
                onClick={() => setSelectedNotice(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-slate-700">
                  {selectedNotice.category}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-semibold">
                  <Calendar className="w-3.5 h-3.5" /> {selectedNotice.date}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {selectedNotice.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-6">
                {selectedNotice.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  Official Circular - Junior Scholars Authority
                </div>

                {/* <button
                  onClick={() => alert("Notice PDF download started!")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-800"
                >
                  <Download className="w-4 h-4" /> Download Notice PDF
                </button> */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}