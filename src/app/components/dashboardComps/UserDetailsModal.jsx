"use client";

import React from "react";
import { X, User, Mail, CheckCircle2, Clock, Ban, Hash } from "lucide-react";
import GuardianView from "./AdminManageUsersDetails/GuardianView";
import StaffTeacherView from "./AdminManageUsersDetails/StaffTeacherView";
import ActivityLogView from "./AdminManageUsersDetails/ActivityLogView";

export default function UserDetailsModal({ user, isOpen, onClose, getRoleBadgeColor }) {
  if (!isOpen || !user) return null;

  const role = user?.role?.toLowerCase().trim();
  const profile = user?.profile || {};

  const uniqueId = user?.userId && user.userId.trim() !== "" ? user.userId : "Not Assigned Yet";

  const statusApproved = user.status === "approved" || user.status === "verified" || user.isApproved === true || user.status === "Approved";
  const userActivities = user.activities || user.activityLog || [];

  const getIdLabel = () => {
    if (role === "guardian") return "Student ID";
    if (role === "teacher") return "Teacher ID";
    if (role === "staff") return "Staff ID";
    return "System ID";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Custom Blinking Keyframes CSS */}
      <style jsx global>{`
        @keyframes sharpBlink {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.75;
            transform: scale(0.97);
          }
        }
        .animate-sharp-blink {
          animation: sharpBlink 3s infinite ease-in-out;
        }
      `}</style>

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
            <div className="w-12 h-12 rounded-full border-2 border-emerald-500/40 bg-emerald-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-lg shrink-0 overflow-hidden shadow-sm">
              {user.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
              )}
            </div>
            <div className="space-y-1 flex-1 overflow-hidden">
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight truncate">
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

          {/* Always Blinking ID Badge Box */}
          <div className="relative overflow-hidden p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-cyan-950/40 border border-emerald-500/30 dark:border-emerald-500/20 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5 z-10">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <Hash className="w-4 h-4 animate-spin-slow" />
              </div>
              <p className="text-xs uppercase font-extrabold tracking-wider text-slate-700 dark:text-slate-300">
                {getIdLabel()}
              </p>
            </div>

            {/* Continuous Sharp Blinking Badge */}
            <span className={`z-10 font-mono text-xs sm:text-sm px-3.5 py-1.5 rounded-lg border tracking-wider font-extrabold ${uniqueId !== "Not Assigned Yet"
              ? "text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 shadow-md shadow-emerald-500/30 animate-sharp-blink"
              : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-400/60 animate-sharp-blink italic"
              }`}>
              {uniqueId}
            </span>
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

          {/* Role-Specific Modular Views */}
          {role === "guardian" && <GuardianView user={user} profile={profile} />}
          {(role === "staff" || role === "teacher" || role === "instructor" || role === "admin") && (
            <StaffTeacherView role={role} profile={profile} />
          )}

          {/* Activity Panel */}
          <ActivityLogView userActivities={userActivities} />
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