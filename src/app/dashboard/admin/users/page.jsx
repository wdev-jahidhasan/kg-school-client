"use client";

import { useState, useEffect } from "react";
import { Users, Mail, Loader2, AlertCircle, Search } from "lucide-react";

export default function AdminManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter users by ID or Email dynamically
  const filteredUsers = users.filter((user) => {
    const userId = (user.id || user.studentId || user.userId || "").toString().toLowerCase();
    const userEmail = (user.email || "").toLowerCase();
    const query = searchQuery.toLowerCase().trim();

    return userId.includes(query) || userEmail.includes(query);
  });

  // Role Badge Colors
  const getRoleBadgeColor = (role) => {
    const normalizedRole = role?.toLowerCase().trim();
    switch (normalizedRole) {
      case "admin":
        return "bg-lime-100 dark:bg-lime-950/60 text-lime-800 dark:text-lime-300 border border-lime-200 dark:border-lime-900/50";
      case "guardian":
        return "bg-fuchsia-100 dark:bg-fuchsia-950/60 text-fuchsia-700 dark:text-fuchsia-300";
      case "teacher":
      case "instructor":
        return "bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300";
      case "staff":
        return "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 p-4 sm:p-6 transition-colors duration-300">
      <div className="w-full space-y-6">

        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
              <Users className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              Database <span className="text-emerald-600 dark:text-emerald-400">User List</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Managing junior-scholars database users dynamically.
            </p>
          </div>

          {/* Real-time Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID or Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:focus:ring-emerald-400/50 text-slate-800 dark:text-slate-100 placeholder-slate-400 transition-all"
            />
          </div>
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
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm shadow-slate-100 dark:shadow-none">
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70 font-medium">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => {
                      const userId = user.id || user.studentId || user.userId || "N/A";

                      return (
                        <tr key={user._id || index} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-5 py-4 text-slate-400 text-center">{index + 1}</td>

                          {/* ID Column */}
                          <td className="px-5 py-4 text-slate-600 dark:text-slate-400 font-mono text-center">
                            {userId}
                          </td>

                          {/* Name Column */}
                          <td className="px-5 py-4 font-bold text-slate-900 dark:text-white text-center">
                            {user.name || "N/A"}
                          </td>

                          {/* Email Column */}
                          <td className="px-5 py-4 text-slate-500 dark:text-slate-400 text-center">
                            <div className="inline-flex items-center justify-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{user.email || "N/A"}</span>
                            </div>
                          </td>

                          {/* Role Column */}
                          <td className="px-5 py-4 text-center">
                            <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold capitalize ${getRoleBadgeColor(user.role)}`}>
                              {user.role || "User"}
                            </span>
                          </td>

                          {/* Status Column */}
                          <td className="px-5 py-4 text-center">
                            <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${user.status === "approved" || user.isApproved === true || user.status === "Approved"
                              ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                              : "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300"
                              }`}>
                              {user.status || (user.isApproved ? "Approved" : "Pending")}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-5 py-8 text-center text-slate-500">
                        {searchQuery ? `No users matching "${searchQuery}"` : "No users found in the database."}
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