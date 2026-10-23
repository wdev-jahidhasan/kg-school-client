"use client";

import React from "react";
import { Mail, Phone, User, BookOpen, Layers, Hash, Droplet } from "lucide-react";

export default function GuardianView({ user, profile }) {
  return (
    <div className="space-y-3 pt-1">
      {/* Email & Guardian's Phone Together */}
      <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-100/60 dark:bg-emerald-950/60 text-emerald-600 shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] uppercase font-medium text-slate-400">Email Address</p>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{user.email || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:border-l sm:border-slate-200/60 sm:dark:border-slate-800 sm:pl-3">
          <div className="p-2 rounded-lg bg-emerald-100/60 dark:bg-emerald-950/60 text-emerald-600 shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] uppercase font-medium text-slate-400">Guardian's Phone</p>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{profile.phone || user.phone || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Linked Student Information Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-950/60 dark:to-emerald-950/20 border border-slate-200/80 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-200/60 dark:border-slate-800">
          <div className="w-12 h-12 rounded-full border border-emerald-500/30 bg-white dark:bg-slate-800 overflow-hidden flex items-center justify-center shrink-0">
            {profile.studentImage ? (
              <img src={profile.studentImage} alt="Student" className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-slate-400" />
            )}
          </div>
          <div>
            <h5 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              {profile.studentName || "Not Assigned"}
            </h5>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md inline-block mt-0.5">
              Linked Student Profile
            </span>
          </div>
        </div>

        {/* Student 2x2 Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>Class</span>
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 pl-5">{profile.studentClass || "N/A"}</p>
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Section</span>
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 pl-5">{profile.studentSection || "N/A"}</p>
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
              <Hash className="w-3.5 h-3.5 text-emerald-600" />
              <span>Roll No</span>
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 pl-5">{profile.studentRoll || "N/A"}</p>
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
              <Droplet className="w-3.5 h-3.5 text-rose-500" />
              <span>Blood Group</span>
            </div>
            <p className="text-xs font-bold text-rose-600 dark:text-rose-400 pl-5">{profile.studentBloodGroup || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}