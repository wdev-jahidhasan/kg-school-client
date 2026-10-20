"use client";

import React from "react";
import { X, User, Mail, Shield, CheckCircle2, Clock, Calendar, Phone, Droplet, Activity } from "lucide-react";

export default function UserDetailsModal({ user, isOpen, onClose, getRoleBadgeColor }) {
  if (!isOpen || !user) return null;

  const statusApproved = user.status === "approved" || user.isApproved === true || user.status === "Approved";
  const userActivities = user.activities || user.activityLog || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
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
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-lg shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
                {user.name || "N/A"}
              </h4>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold capitalize ${getRoleBadgeColor(user.role)}`}>
                  {user.role || "User"}
                </span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${statusApproved
                  ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                  : "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300"
                  }`}>
                  {statusApproved ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  {user.status || (user.isApproved ? "Approved" : "Pending")}
                </span>
              </div>
            </div>
          </div>

          {/* Key-Value Details List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mb-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                {user.email || "N/A"}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mb-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone Number
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {user.phone || user.mobile || "N/A"}
              </p>
            </div>

            {/* Blood Group Field */}
            <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mb-1">
                <Droplet className="w-3.5 h-3.5 text-rose-500" /> Blood Group
              </span>
              <p className="font-bold text-rose-600 dark:text-rose-400 uppercase">
                {user.bloodGroup || user.blood_group || "N/A"}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-medium mb-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Joined Date
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </p>
            </div>

            {/* Role Specific Dynamic Info */}
            {user.role?.toLowerCase() === "teacher" && (
              <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60 sm:col-span-2">
                <span className="text-slate-400 text-[11px] font-medium mb-1 block">Subject / Department</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {user.subject || user.department || "General Teacher"}
                </p>
              </div>
            )}

            {user.role?.toLowerCase() === "guardian" && (
              <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60 sm:col-span-2">
                <span className="text-slate-400 text-[11px] font-medium mb-1 block">Connected Students / Ward</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {user.studentName || user.ward || "No student linked"}
                </p>
              </div>
            )}

          </div>

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
              /* Empty Activity State UI */
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