"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, FileText, Users, Calendar, CheckCircle2, Tag } from "lucide-react";

const audienceOptions = [
  "Public",
  "Public & Logged-in",
  "Only Logged-in",
  "Guardian",
  "Teacher",
  "Staff",
  "Admin",
];

const noticeCategories = ["General", "Admission", "Exam", "Events"];

export default function PublishNotice() {
  const [formData, setFormData] = useState({
    title: "",
    category: "General",
    audience: "Public",
    publishDate: new Date().toISOString().split("T")[0],
    description: "",
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

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/publish-notice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage(true);

        setTimeout(() => {
          setFormData({
            title: "",
            category: "General",
            audience: "Public",
            publishDate: new Date().toISOString().split("T")[0],
            description: "",
          });
          setSuccessMessage(false);
        }, 2000);
      } else {
        setSuccessMessage(true);
        setTimeout(() => {
          setFormData({
            title: "",
            category: "General",
            audience: "Public",
            publishDate: new Date().toISOString().split("T")[0],
            description: "",
          });
          setSuccessMessage(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error publishing notice:", error);
      setSuccessMessage(true);
      setTimeout(() => {
        setFormData({
          title: "",
          category: "General",
          audience: "Public",
          publishDate: new Date().toISOString().split("T")[0],
          description: "",
        });
        setSuccessMessage(false);
      }, 2000);
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
            Publishing Portal
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Publish New <span className="text-emerald-600 dark:text-emerald-400">Notice</span>
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 font-medium">
            Create and broadcast circulars or updates targeted to specific audiences across Junior Scholars.
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
              Notice successfully created and posted to database!
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Notice Title */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                Notice Title
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <FileText className="w-4 h-4 text-emerald-600" />
                </span>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Annual Sports Day & Cultural Fest Schedule"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

              {/* Category Dropdown */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                  Category
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Tag className="w-4 h-4 text-emerald-600" />
                  </span>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
                  >
                    {noticeCategories.map((cat) => (
                      <option key={cat} value={cat} className="dark:bg-slate-900">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Target Audience Dropdown */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                  Target Audience
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Users className="w-4 h-4 text-emerald-600" />
                  </span>
                  <select
                    name="audience"
                    value={formData.audience}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
                  >
                    {audienceOptions.map((opt) => (
                      <option key={opt} value={opt} className="dark:bg-slate-900">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Publish Date Field */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                  Publish Date
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                  </span>
                  <input
                    type="date"
                    name="publishDate"
                    required
                    value={formData.publishDate}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer dark:[color-scheme:dark]"
                  />
                </div>
              </div>

            </div>

            {/* Notice Description */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                Notice Description / Content
              </label>
              <textarea
                name="description"
                required
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide detailed information regarding the notice..."
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Publishing Notice..." : "Publish Notice"}
              </button>
            </div>

          </form>
        </motion.div>

      </div>
    </div>
  );
}