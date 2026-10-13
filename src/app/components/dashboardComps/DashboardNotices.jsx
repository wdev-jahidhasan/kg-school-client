"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Bell, X, FileText, UserCheck } from "lucide-react";
import { getFilteredNotices } from "@/utils/noticeFilter";
import { useSession } from "@/lib/auth-client";

export default function DashboardNotices() {
  const { data: session, isPending } = useSession();
  const currentUser = session?.user;

  const [notices, setNotices] = useState([]);
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

      {/* Notice List */}
      {notices.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400 py-8 text-center">
          No active notices available for your account right now.
        </p>
      ) : (
        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice._id || notice.id}
              onClick={() => setSelectedNotice(notice)}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 hover:border-emerald-500/40 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400">
                    {notice.category}
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/40">
                    Audience: {notice.audience}
                  </span>
                </div>

                <div className="flex items-center text-xs font-medium text-slate-500 dark:text-slate-400 gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  {notice.date}
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                {notice.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                {notice.description}
              </p>
            </div>
          ))}
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
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                  {selectedNotice.category}
                </span>
                <span className="text-xs text-slate-500">
                  Target: {selectedNotice.audience}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {selectedNotice.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {selectedNotice.description}
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                Official Internal Circular
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}