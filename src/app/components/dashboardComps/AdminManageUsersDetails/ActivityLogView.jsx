"use client";

import React from "react";
import { Activity } from "lucide-react";

export default function ActivityLogView({ userActivities }) {
  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
        <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <h5 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
          Recent Activity Log
        </h5>
      </div>

      {userActivities.length > 0 ? (
        <div className="space-y-2">
          {userActivities.map((act, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 flex items-start justify-between gap-3 text-xs"
            >
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  {act.title || act.action || "Activity recorded"}
                </p>
                {act.description && (
                  <p className="text-slate-400 text-[11px] mt-0.5">{act.description}</p>
                )}
              </div>
              <span className="text-[10px] text-slate-400 whitespace-nowrap font-mono">
                {act.timestamp ? new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recently"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 rounded-xl bg-slate-50/50 dark:bg-slate-800/20 border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-1">
          <Activity className="w-6 h-6 text-slate-300 dark:text-slate-600 mx-auto" />
          <p className="text-slate-500 dark:text-slate-400 font-medium text-xs">
            No recent activity found
          </p>
          <p className="text-[11px] text-slate-400">
            User activities and system logs will be listed here.
          </p>
        </div>
      )}
    </div>
  );
}