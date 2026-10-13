"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Bell, X, FileText, UserCheck, ArrowRight, Download } from "lucide-react";
import { getFilteredNotices } from "@/utils/noticeFilter";
import { useSession } from "@/lib/auth-client";

const noticeCategories = ["All", "General", "Admission", "Exam", "Events"];

export default function DashboardNotices() {
  const { data: session, isPending } = useSession();
  const currentUser = session?.user;

  const [notices, setNotices] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notices`);
        const data = await response.json();

        if (data.success) {
          const userNotices = getFilteredNotices(data.notices, currentUser, "dashboard");
          setNotices(userNotices);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard notices:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchNotices();
    }
  }, [currentUser]);

  const filteredNotices = activeCategory === "All"
    ? notices
    : notices.filter((notice) => notice.category === activeCategory);

  if (isPending || loading) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/60 dark:border-slate-800 text-center text-slate-500 font-medium">
        Loading portal updates...
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/60 dark:border-slate-800 shadow-sm">

      {/* Header with User Role Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600" /> Notice Board
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Updates and circulars intended for your portal
          </p>
        </div>

        <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/50 flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5" />
          {currentUser?.role || "User"} Portal
        </span>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {noticeCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${activeCategory === category
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-slate-700/50 border border-slate-200/50 dark:border-slate-700/50"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Notice List */}
      {filteredNotices.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400 py-8 text-center">
          No active notices found for this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotices.map((notice) => {
            const isRoleSpecific = notice.audience?.toLowerCase() === currentUser?.role?.toLowerCase();

            return (
              <div
                key={notice._id || notice.id}
                onClick={() => setSelectedNotice(notice)}
                className="group p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 hover:border-emerald-500/40 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-slate-700">
                        {notice.category}
                      </span>

                      {/* Animated Ringing Bell Badge for Role-Specific Notice */}
                      {isRoleSpecific && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50">
                          <motion.div
                            animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                          >
                            <Bell className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                          </motion.div>
                          For You
                        </span>
                      )}
                    </div>

                    <div className="flex items-center text-xs font-medium text-slate-500 dark:text-slate-400 gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      {notice.date}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {notice.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4">
                    {notice.description}
                  </p>
                </div>

                {/* View Details Button */}
                <div className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 gap-1 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
                  View Details
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Notice Details Modal */}
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
              className="relative max-w-xl w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800"
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

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {selectedNotice.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {selectedNotice.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  Official Internal Circular
                </div>

                {/* Download PDF Button */}
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