"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function EditProfileModal({ isOpen, onClose, user }) {
  const [name, setName] = useState(user?.name || "");
  const [imageUrl, setImageUrl] = useState(user?.image || "");

  const [studentName, setStudentName] = useState(user?.studentInfo?.studentName || "");
  const [studentImageUrl, setStudentImageUrl] = useState(user?.studentInfo?.studentImage || "");
  const [studentClass, setStudentClass] = useState(user?.studentInfo?.studentClass || "");
  const [studentSection, setStudentSection] = useState(user?.studentInfo?.studentSection || "");
  const [studentRoll, setStudentRoll] = useState(user?.studentInfo?.studentRoll || "");

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
      onClose();
      window.location.reload();
    } else {
      toast.error(data.message || "Failed to update profile.");
    }

    setSaving(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
                onClick={onClose}
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
                    {/* Class Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Class <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={studentClass}
                        onChange={(e) => setStudentClass(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none transition-all"
                      >
                        <option value="" disabled>Select Class</option>
                        <option value="Play">Play</option>
                        <option value="Nursery">Nursery</option>
                        <option value="One">One</option>
                        <option value="Two">Two</option>
                        <option value="Three">Three</option>
                        <option value="Four">Four</option>
                        <option value="Five">Five</option>
                      </select>
                    </div>

                    {/* Roll Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Roll <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={studentRoll}
                        onChange={(e) => setStudentRoll(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none transition-all"
                      >
                        <option value="" disabled>Select Roll</option>
                        {Array.from({ length: 20 }, (_, index) => {
                          const rollNum = String(index + 1).padStart(2, '0');
                          return (
                            <option key={rollNum} value={rollNum}>
                              {rollNum}
                            </option>
                          );
                        })}
                      </select>
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
                      <option value="" disabled>Select Section</option>
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
                        ) : studentImageUrl && studentImageUrl !== user?.studentInfo?.studentImage ? (
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
                  onClick={onClose}
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
  );
}