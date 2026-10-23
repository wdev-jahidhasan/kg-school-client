"use client";

import React from "react";
import {
  X, User, Mail, Shield, CheckCircle2, Clock,
  Phone, Droplet, Activity, BookOpen, Layers, Hash, Briefcase, Ban
} from "lucide-react";

export default function UserDetailsModal({ user, isOpen, onClose, getRoleBadgeColor }) {
  if (!isOpen || !user) return null;

  const role = user?.role?.toLowerCase().trim();
  const profile = user?.profile || {};

  const statusApproved = user.status === "approved" || user.status === "verified" || user.isApproved === true || user.status === "Approved";
  const userActivities = user.activities || user.activityLog || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all transform max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40 shrink-0">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">User Profile Details</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="p-6 space-y-5 text-xs sm:text-sm overflow-y-auto">

          {/* User Header Summary */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-full border-2 border-emerald-500/40 bg-emerald-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-lg shrink-0 overflow-hidden">
              {user.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
              )}
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
                {user.name || "N/A"}
              </h4>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold capitalize ${getRoleBadgeColor ? getRoleBadgeColor(user.role) : "bg-slate-100 text-slate-700"}`}>
                  {user.role || "User"}
                </span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${statusApproved
                  ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                  : user.status === "disabled"
                    ? "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300"
                    : "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300"
                  }`}>
                  {statusApproved ? <CheckCircle2 className="w-3 h-3" /> : user.status === "disabled" ? <Ban className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  {user.status || (user.isApproved ? "Verified" : "Pending")}
                </span>
              </div>
            </div>
          </div>

          {/* Non-Guardian Email Box */}
          {role !== "guardian" && (
            <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mb-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                {user.email || "N/A"}
              </p>
            </div>
          )}

          {/* Dynamic Role-Based Extra Details Section */}

          {/* 1. GUARDIAN ROLE DETAILS */}
          {role === "guardian" && (
            <div className="space-y-3 pt-1">

              {/* Email & Guardian's Phone Together in One Box */}
              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Email */}
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-100/60 dark:bg-emerald-950/60 text-emerald-600 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] uppercase font-medium text-slate-400">Email Address</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{user.email || "N/A"}</p>
                  </div>
                </div>

                {/* Phone */}
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

              {/* Linked Student Information Card (2x2 Clean Grid) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-950/60 dark:to-emerald-950/20 border border-slate-200/80 dark:border-slate-800 space-y-3">

                {/* Student Top Header */}
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

                {/* Student 2x2 Grid Layout */}
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
          )}

          {/* 2. STAFF ROLE DETAILS */}
          {role === "staff" && (
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mb-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" /> Phone Number
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{profile.phone || user.phone || "N/A"}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mb-1">
                  <Droplet className="w-3.5 h-3.5 text-rose-500" /> Blood Group
                </span>
                <p className="font-bold text-rose-600 dark:text-rose-400 uppercase">{profile.bloodGroup || "N/A"}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mb-1">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600" /> Department
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{profile.department || "N/A"}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mb-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> Joining Date
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{profile.joiningDate || "N/A"}</p>
              </div>
            </div>
          )}

          {/* 3. TEACHER ROLE DETAILS */}
          {(role === "teacher" || role === "instructor") && (
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mb-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" /> Phone Number
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{profile.phone || user.phone || "N/A"}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mb-1">
                  <Droplet className="w-3.5 h-3.5 text-rose-500" /> Blood Group
                </span>
                <p className="font-bold text-rose-600 dark:text-rose-400 uppercase">{profile.bloodGroup || "N/A"}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mb-1">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> Subject
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{profile.subject || "N/A"}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mb-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> Joining Date
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{profile.joiningDate || "N/A"}</p>
              </div>
            </div>
          )}

          {/* 4. ADMIN ROLE DETAILS */}
          {role === "admin" && (
            <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60 text-center text-xs text-slate-500 dark:text-slate-400">
              System Administrator profile requires no extra details.
            </div>
          )}

          {/* Activity Panel */}
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

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50/80 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}