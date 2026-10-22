"use client";

import React, { useState, useEffect } from "react";
import { Users, Loader2, AlertCircle, Search, Filter, Eye, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import UserDetailsModal from "@/app/components/dashboardComps/UserDetailsModal";

export default function AdminManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  // Modal State
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Action Loading States
  const [updatingUserId, setUpdatingUserId] = useState(null);

  // Custom Alert Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "role", // "role" | "status"
    userId: null,
    newValue: "",
    currentRole: "",
  });

  // Fetch Users from Backend API
  useEffect(() => {
    fetchUsers();
  }, []);

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

  // Open Confirmation Modal for Role Change
  const triggerRoleChange = (userId, newRole, currentRole) => {
    if (currentRole.toLowerCase() === "admin") {
      setConfirmModal({
        isOpen: true,
        title: "Action Not Allowed",
        message: "Admin roles cannot be modified.",
        type: "info",
        userId: null,
        newValue: "",
        currentRole: "",
      });
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: "Confirm Role Change",
      message: `Are you sure you want to change this user's role from "${currentRole}" to "${newRole}"?`,
      type: "role",
      userId,
      newValue: newRole,
      currentRole,
    });
  };

  // Open Confirmation Modal for Status Change
  const triggerStatusChange = (userId, newStatus) => {
    const actionLabel = newStatus === "verified" ? "Verified" : "Disabled";
    setConfirmModal({
      isOpen: true,
      title: `Confirm User Status Update`,
      message: `Are you sure you want to change this user's status to "${actionLabel}"?`,
      type: "status",
      userId,
      newValue: newStatus,
      currentRole: "",
    });
  };

  // Execute Confirmed Action
  const handleConfirmAction = async () => {
    const { type, userId, newValue } = confirmModal;
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));

    if (!userId) return;

    setUpdatingUserId(userId);

    try {
      if (type === "role") {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/role`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newValue }),
        });

        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.message || "Failed to update role.");

        setUsers((prev) =>
          prev.map((u) => (u._id === userId || u.id === userId ? { ...u, role: newValue } : u))
        );
      } else if (type === "status") {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newValue }),
        });

        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.message || "Failed to update status.");

        setUsers((prev) =>
          prev.map((u) => (u._id === userId || u.id === userId ? { ...u, status: newValue } : u))
        );
      }
    } catch (err) {
      console.error("Error updating user:", err);
      setError(err.message || "Something went wrong while updating.");
    } finally {
      setUpdatingUserId(null);
    }
  };

  // Filter users dynamically
  const filteredUsers = users.filter((user) => {
    const userId = (user.id || user.studentId || user.userId || "").toString().toLowerCase();
    const userEmail = (user.email || "").toLowerCase();
    const query = searchQuery.toLowerCase().trim();

    const matchesSearch = userId.includes(query) || userEmail.includes(query);
    const userRole = (user.role || "").toLowerCase().trim();
    const matchesRole = selectedRole === "all" || userRole === selectedRole.toLowerCase();

    return matchesSearch && matchesRole;
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

  const handleOpenDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 p-4 sm:p-6 transition-colors duration-300">
      <div className="w-full space-y-6">

        {/* Header with Search & Role Filter */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
              <Users className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              Database <span className="text-emerald-600 dark:text-emerald-400">User List</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Managing junior-scholars database users dynamically.
            </p>
          </div>

          {/* Searchbar & Role Filter Controls */}
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by ID or Email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-slate-800 dark:text-slate-100 placeholder-slate-400 transition-all"
              />
            </div>

            <div className="relative w-full sm:w-44">
              <Filter className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-slate-800 dark:text-slate-100 cursor-pointer font-medium"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="guardian">Guardian</option>
                <option value="teacher">Teacher</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-400" />
            <p className="text-sm font-medium text-slate-500">Loading users</p>
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
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => {
                      const userId = user.id || user.studentId || user.userId || "N/A";
                      const rowKey = user._id || userId;
                      const isUpdating = updatingUserId === rowKey;
                      const isAdmin = user.role?.toLowerCase().trim() === "admin";

                      return (
                        <tr key={rowKey} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
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
                            <span>{user.email || "N/A"}</span>
                          </td>

                          {/* Role Column */}
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

                          {/* Status Column */}
                          <td className="px-5 py-4 text-center">
                            <select
                              disabled={isUpdating}
                              value={user.status || (user.isApproved ? "verified" : "pending")}
                              onChange={(e) => triggerStatusChange(rowKey, e.target.value)}
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
                          </td>

                          {/* Action Column */}
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
                        {searchQuery || selectedRole !== "all"
                          ? "No users matching your filters."
                          : "No users found in the database."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modern Confirmation Modal Alert */}
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-all animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                {confirmModal.type === "info" ? (
                  <AlertCircle className="w-7 h-7 text-amber-500 shrink-0" />
                ) : (
                  <AlertTriangle className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {confirmModal.title}
                </h3>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {confirmModal.message}
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                {confirmModal.type !== "info" ? (
                  <>
                    <button
                      onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                      className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmAction}
                      className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-colors"
                    >
                      Confirm Update
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                    className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 rounded-xl transition-colors"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* User Details Modal */}
        <UserDetailsModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          getRoleBadgeColor={getRoleBadgeColor}
        />

      </div>
    </div>
  );
}