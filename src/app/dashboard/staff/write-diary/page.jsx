"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, BookOpen, GraduationCap, Calendar, CheckCircle2, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const classOptions = [
  "Play",
  "Nursery",
  "KG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
];

const subjectOptions = [
  "Bangla",
  "English",
  "Mathematics",
  "General Science",
  "Social Science",
  "Religion & Moral Education",
  "Drawing / Art",
  "ICT",
];

export default function WriteDiary() {
  const { data: session } = authClient.useSession();

  const [formData, setFormData] = useState({
    className: "Play",
    subjectName: "English",
    teacherName: "",
    diaryDate: new Date().toISOString().split("T")[0],
    details: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(false);

    const diaryPayload = {
      ...formData,
      publisherName: session?.user?.name || "Junior Scholars Office",
      publisherId: session?.user?.userId || "N/A",
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/write-diary`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(diaryPayload),
      });

      if (response.ok) {
        setSuccessMessage(true);

        setTimeout(() => {
          setFormData((prev) => ({
            ...prev,
            teacherName: "",
            details: "",
          }));
          setSuccessMessage(false);
        }, 2000);
      } else {
        console.error("Failed to write diary entry");
      }
    } catch (error) {
      console.error("Error writing diary:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300 py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-12">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-slate-800 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
            Staff Portal
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Write Digital <span className="text-emerald-600 dark:text-emerald-400">Diary</span>
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 font-medium">
            Record and publish classwork, homework, and lesson updates for students and guardians.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/60 dark:border-slate-800 shadow-sm"
        >
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2.5"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              Digital Diary entry successfully recorded!
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

              {/* Class Dropdown */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                  Select Class
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                  </span>
                  <select
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
                  >
                    {classOptions.map((cls) => (
                      <option key={cls} value={cls} className="dark:bg-slate-900">
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subject Dropdown */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                  Subject Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                  </span>
                  <select
                    name="subjectName"
                    value={formData.subjectName}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
                  >
                    {subjectOptions.map((sub) => (
                      <option key={sub} value={sub} className="dark:bg-slate-900">
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Diary Date Field */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                  Diary Date
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                  </span>
                  <input
                    type="date"
                    name="diaryDate"
                    required
                    value={formData.diaryDate}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer dark:[color-scheme:dark]"
                  />
                </div>
              </div>

            </div>

            {/* Teacher Name Input */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                Subject Teacher Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4 text-emerald-600" />
                </span>
                <input
                  type="text"
                  name="teacherName"
                  required
                  value={formData.teacherName}
                  onChange={handleChange}
                  placeholder="e.g., Mohammad Rahim Sir / Nusrat Jahan Madam"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Lesson / Task Details */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                Lesson Details (Classwork / Homework)
              </label>
              <div className="relative">
                <textarea
                  name="details"
                  required
                  rows={5}
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Write CW & HW details... (e.g., CW: Read Chapter 3 Page 42. HW: Solve Exercise Q1 to Q5 in notebook.)"
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Saving Diary..." : "Save Diary Entry"}
              </button>
            </div>

          </form>
        </motion.div>

      </div>
    </div>
  );
}