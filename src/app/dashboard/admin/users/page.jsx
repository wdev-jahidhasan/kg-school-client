"use client";

import { useState, useEffect } from "react";
import { Users, Mail, Loader2, AlertCircle } from "lucide-react";

export default function AdminManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Users from Backend API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success) {
          setUsers(data.users);
        } else {
          throw new Error(data.message || "Failed to fetch users.");
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError(err.message || "Failed to load users from database.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            Database <span className="text-emerald-600 dark:text-emerald-400">User List</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Managing junior-scholars database users dynamically.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-400" />
            <p className="text-sm font-medium text-slate-500">Loading users from MongoDB...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-2xl text-rose-700 dark:text-rose-300 flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* User Table */}
        {!loading && !error && (
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-5 py-3.5">#</th>
                    <th className="px-5 py-3.5">Name</th>
                    <th className="px-5 py-3.5">Email</th>
                    <th className="px-5 py-3.5">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 font-medium">
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={user._id || index} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-5 py-4 text-slate-400">{index + 1}</td>
                        <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                          {user.name || "N/A"}
                        </td>
                        <td className="px-5 py-4 text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          {user.email || "N/A"}
                        </td>
                        <td className="px-5 py-4">
                          <span className="px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                            {user.role || "User"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-5 py-8 text-center text-slate-500">
                        No users found in the database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}