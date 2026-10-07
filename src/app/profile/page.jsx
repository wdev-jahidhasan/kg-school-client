"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Shield, Edit3, X, Upload, CheckCircle2, Loader2, ArrowRight, BookOpen, Layers, Hash } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfileDetailsPage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Edit Form States
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentImageUrl, setStudentImageUrl] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentSection, setStudentSection] = useState("Morning");
  const [studentRoll, setStudentRoll] = useState("");

  const [uploading, setUploading] = useState(false);
  const [studentUploading, setStudentUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // ImgBB Upload Handler for User Picture
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setImageUrl(data.data.url);
    } else {
      toast.error(data.error?.message || "Image upload failed.");
    }
    setUploading(false);
  };

  const handleStudentImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setStudentUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setStudentImageUrl(data.data.url);
    } else {
      toast.error(data.error?.message || "Student image upload failed.");
    }
    setStudentUploading(false);
  };

  const handleOpenModal = () => {
    if (!user) return;
    setName(user.name || "");
    setImageUrl(user.image || "");
    setStudentName(user.studentName || "");
    setStudentImageUrl(user.studentImage || "");
    setStudentClass(user.studentClass || "");
    setStudentSection(user.studentSection || "Morning");
    setStudentRoll(user.studentRoll || "");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      toast.error("User email not found. Please log in again.");
      return;
    }

    setSaving(true);

    const fullProfilePayload = {
      name: name,
      image: imageUrl,
      studentInfo: user?.role === "guardian" ? {
        studentName,
        studentImage: studentImageUrl,
        studentClass,
        studentSection,
        studentRoll,
      } : undefined,
    };

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const response = await fetch(`${apiUrl}/api/users/update-profile/${user.email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fullProfilePayload),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      toast.success("Profile updated successfully!");
      setIsModalOpen(false);
      window.location.reload();
    } else {
      toast.error(data.message || "Failed to update profile.");
    }

    setSaving(false);
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20 bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-500 dark:text-slate-400">
        Please log in to view profile details.
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 flex justify-center">

      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-300/20 dark:bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-amber-300/25 dark:bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-amber-100 dark:border-slate-800 rounded-3xl shadow-xl shadow-amber-950/5 dark:shadow-black/40 p-6 sm:p-8"
      >
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Profile Details
          </h1>
          <button
            onClick={handleOpenModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-md transition-all"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        {/* Profile Info Display */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="relative w-24 h-24 rounded-full border-2 border-emerald-500/50 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md">
            {user.image ? (
              <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-slate-400" />
            )}
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
                {user.email}
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/50 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              Role: {user.role || "User"}
            </div>
          </div>
        </div>

        {/* Guardian Extra Info View */}
        {user.role === "guardian" && (
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Linked Student Information
            </h3>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
              <div className="w-14 h-14 rounded-full border border-emerald-500/30 bg-slate-200 dark:bg-slate-800 overflow-hidden flex items-center justify-center flex-shrink-0">
                {user.studentImage ? (
                  <img src={user.studentImage} alt="Student" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-slate-400" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{user.studentName || "Not Assigned"}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Student Profile</p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
                    <span>Class: <strong className="font-semibold">{user.studentClass || "N/A"}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
                    <span>Sec: <strong className="font-semibold">{user.studentSection || "N/A"}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <Hash className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
                    <span>Roll: <strong className="font-semibold">{user.studentRoll || "N/A"}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-7 overflow-y-auto max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Edit Profile</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Edit Form */}
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Profile Picture Upload */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Profile Picture
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full border-2 border-emerald-500/50 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
                      {imageUrl ? (
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Upload className="h-5 w-5 text-slate-400" />
                      )}
                    </div>

                    <label className="flex-1 cursor-pointer flex flex-col justify-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                      {uploading ? (
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 font-medium py-1">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Uploading...</span>
                        </div>
                      ) : imageUrl && imageUrl !== user?.image ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-500 font-semibold py-1">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Uploaded</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 py-1 text-slate-500 dark:text-slate-400">
                          <Upload className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                          <span>Choose new photo</span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Guardian Specific Options */}
                {user?.role === "guardian" && (
                  <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Student Details
                    </h4>

                    {/* Student Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Student Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Class & Roll Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                          Class <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={studentClass}
                          onChange={(e) => setStudentClass(e.target.value)}
                          placeholder="e.g. Nursery, Two"
                          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                          Roll <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={studentRoll}
                          onChange={(e) => setStudentRoll(e.target.value)}
                          placeholder="e.g. 05"
                          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Section Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Section <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={studentSection}
                        onChange={(e) => setStudentSection(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none transition-all"
                      >
                        <option value="Morning">Morning</option>
                        <option value="Day">Day</option>
                      </select>
                    </div>

                    {/* Student Picture Upload */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Student Picture <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full border-2 border-emerald-500/50 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
                          {studentImageUrl ? (
                            <img src={studentImageUrl} alt="Student Preview" className="w-full h-full object-cover" />
                          ) : (
                            <Upload className="h-5 w-5 text-slate-400" />
                          )}
                        </div>

                        <label className="flex-1 cursor-pointer flex flex-col justify-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                          {studentUploading ? (
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 font-medium py-1">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Uploading...</span>
                            </div>
                          ) : studentImageUrl && studentImageUrl !== user?.studentImage ? (
                            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-500 font-semibold py-1">
                              <CheckCircle2 className="h-4 w-4" />
                              <span>Uploaded</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 py-1 text-slate-500 dark:text-slate-400">
                              <Upload className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                              <span>Choose new photo</span>
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleStudentImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Actions */}
                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving || uploading || studentUploading}
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {saving ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Saving...</span>
                      </div>
                    ) : (
                      <>
                        Save Changes
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}