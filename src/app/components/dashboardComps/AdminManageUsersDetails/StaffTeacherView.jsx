"use client";

import React from "react";
import { Phone, Droplet, Briefcase, Calendar, BookOpen } from "lucide-react";

export default function StaffTeacherView({ role, profile }) {
  if (role === "admin") {
    return (
      <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60 text-center text-xs text-slate-500 dark:text-slate-400">
        System Administrator profile requires no extra details.
      </div>
    );
  }

  const isTeacher = role === "teacher" || role === "instructor";

  return (
    <div className="grid grid-cols-2 gap-3 pt-1">
      <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60">
        <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mb-1">
          <Phone className="w-3.5 h-3.5 text-emerald-600" /> Phone Number
        </span>
        <p className="font-semibold text-slate-800 dark:text-slate-200">{profile.phone || "N/A"}</p>
      </div>

      <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60">
        <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mb-1">
          <Droplet className="w-3.5 h-3.5 text-rose-500" /> Blood Group
        </span>
        <p className="font-bold text-rose-600 dark:text-rose-400 uppercase">{profile.bloodGroup || "N/A"}</p>
      </div>

      <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60">
        <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mb-1">
          {isTeacher ? <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> : <Briefcase className="w-3.5 h-3.5 text-emerald-600" />}
          {isTeacher ? "Subject" : "Department"}
        </span>
        <p className="font-semibold text-slate-800 dark:text-slate-200">
          {isTeacher ? profile.subject || "N/A" : profile.department || "N/A"}
        </p>
      </div>

      <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60">
        <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mb-1">
          <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Joining Date
        </span>
        <p className="font-semibold text-slate-800 dark:text-slate-200">{profile.joiningDate || "N/A"}</p>
      </div>
    </div>
  );
}