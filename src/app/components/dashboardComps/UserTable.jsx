"use client";

import React from "react";
import { Eye } from "lucide-react";

export default function UserTable({ users, updatingUserId, getRoleBadgeColor, triggerRoleChange, triggerStatusChange, handleOpenDetails }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-center text-xs sm:text-sm">
          <thead className="bg-slate-50/80 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200/80 dark:border-slate-800">
            <tr>
              <th className="px-5 py-4 text-center">#</th>
              <th className="px-5 py-4 text-center">ID</th>
              <th className="px-5 py-4 text-center">Name</th>
              <th className="px-5 py-4 text-center">Email</th>
              <th className="px-5 py-4 text-center">Role</th>
              <th className="px-5 py-4 text-center">Status</th>
              <th className="px-5 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70 font-medium">
            {users.length > 0 ? (
              users.map((user, index) => {
                const userId = user.id || user.studentId || user.userId || "N/A";
                const rowKey = user._id || userId;
                const isUpdating = updatingUserId === rowKey;
                const isAdmin = user.role?.toLowerCase().trim() === "admin";

                return (
                  <tr key={rowKey} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-5 py-4 text-slate-400 text-center">{index + 1}</td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-400 font-mono text-center">{userId}</td>
                    <td className="px-5 py-4 font-bold text-slate-900 dark:text-white text-center">{user.name || "N/A"}</td>
                    <td className="px-5 py-4 text-slate-500 dark:text-slate-400 text-center"><span>{user.email || "N/A"}</span></td>

                    {/* Role Selector */}
                    <td className="px-5 py-4 text-center">
                      {isAdmin ? (
                        <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold capitalize ${getRoleBadgeColor(user.role)}`}>
                          {user.role || "Admin"}
                        </span>
                      ) : (
                        <select
                          disabled={isUpdating}
                          value={user.role || "guardian"}
                          onChange={(e) => triggerRoleChange(rowKey, e.target.value, user.role)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${getRoleBadgeColor(user.role)}`}
                        >
                          <option value="guardian">Guardian</option>
                          <option value="teacher">Teacher</option>
                          <option value="staff">Staff</option>
                        </select>
                      )}
                    </td>

                    {/* Status Selector / Fixed Badge without Check Circle for Admin */}
                    <td className="px-5 py-4 text-center">
                      {isAdmin ? (
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 shadow-2xs">
                          Verified
                        </span>
                      ) : (
                        <select
                          disabled={isUpdating}
                          value={user.status || (user.isApproved ? "verified" : "pending")}
                          onChange={(e) => triggerStatusChange(rowKey, e.target.value, user.role)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${user.status === "verified" || user.isApproved === true || user.status === "Approved"
                            ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                            : user.status === "disabled"
                              ? "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300"
                              : "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300"
                            }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="verified">Verified</option>
                          <option value="disabled">Disabled</option>
                        </select>
                      )}
                    </td>

                    {/* Action Button */}
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => handleOpenDetails(user)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="px-5 py-8 text-center text-slate-500">
                  No users matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}