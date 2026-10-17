"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  Clock,
  CheckCircle2,
  Send,
  FileText,
  Info
} from "lucide-react";

export default function AdmissionPage() {
  const [formData, setFormData] = useState({
    studentName: "",
    gender: "",
    dob: "",
    applyingClass: "",
    shift: "",
    fatherName: "",
    motherName: "",
    guardianPhone: "",
    email: "",
    address: "",
    previousSchool: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic (e.g., API call) can be added here
    console.log("Admission Application Data:", formData);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">

      {/* 1. Hero Section */}
      <section className="relative py-16 lg:py-24 bg-amber-50/40 dark:bg-slate-900/50 border-b border-amber-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-slate-800 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
              Online Admission
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Apply for <span className="text-emerald-600 dark:text-emerald-400">Admission</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Enroll your child for the upcoming academic session. Fill out the application form below to start the admission process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Content Section */}
      <section className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Admission Instructions & Information */}
          <div className="lg:col-span-4 space-y-6">

            {/* Quick Info Box */}
            <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Admission Guidelines
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Ensure all personal and contact details are accurate.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Select the appropriate class (Play Group to Class Five).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Choose your preferred shift (Morning or Day).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Our office will contact you for document verification upon submission.</span>
                </li>
              </ul>
            </div>

            {/* Required Documents Card */}
            <div className="bg-amber-50/50 dark:bg-slate-900/40 rounded-3xl p-6 border border-amber-200/60 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                Required Documents
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                <li className="flex items-center gap-2">• Student Birth Certificate Copy</li>
                <li className="flex items-center gap-2">• 3 Passport Size Photographs</li>
                <li className="flex items-center gap-2">• Father&apos;s & Mother&apos;s NID Card Copies</li>
                <li className="flex items-center gap-2">• Transfer Certificate (TC) if applicable</li>
              </ul>
            </div>

            {/* Help & Support */}
            <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-3xl p-6 border border-emerald-200/60 dark:border-emerald-800/40 text-center">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">Need Assistance?</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Call our admission desk for immediate support.</p>
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full font-bold text-sm shadow-sm">
                <Phone className="w-4 h-4" />
                <span>+880 1700-000000</span>
              </div>
            </div>

          </div>

          {/* Right Column: Admission Application Form */}
          <div className="lg:col-span-8">
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto font-medium">
                    Thank you for applying to Junior Scholars. Our admissions team will review the details and reach out to you shortly via phone or email.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-semibold text-sm transition-all shadow-sm"
                  >
                    Submit Another Application
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Form Section Header: Student Info */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      Student Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                          Student Full Name *
                        </label>
                        <input
                          type="text"
                          name="studentName"
                          required
                          placeholder="e.g. Abdullah Al Mamun"
                          value={formData.studentName}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-emerald-500 font-medium"
                        />
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                          Date of Birth *
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="dob"
                            required
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-emerald-500 font-medium"
                          />
                        </div>
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                          Gender *
                        </label>
                        <select
                          name="gender"
                          required
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-emerald-500 font-medium"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {/* Class Selection Dropdown */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                          Applying Class *
                        </label>
                        <select
                          name="applyingClass"
                          required
                          value={formData.applyingClass}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-emerald-500 font-medium"
                        >
                          <option value="">Select Class</option>
                          <option value="Play Group">Play Group</option>
                          <option value="Nursery">Nursery</option>
                          <option value="KG">KG (Kindergarten)</option>
                          <option value="Class One">Class One</option>
                          <option value="Class Two">Class Two</option>
                          <option value="Class Three">Class Three</option>
                          <option value="Class Four">Class Four</option>
                          <option value="Class Five">Class Five</option>
                        </select>
                      </div>

                      {/* Shift Selection Dropdown */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                          Preferred Shift *
                        </label>
                        <select
                          name="shift"
                          required
                          value={formData.shift}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-emerald-500 font-medium"
                        >
                          <option value="">Select Shift</option>
                          <option value="Morning Shift">Morning Shift</option>
                          <option value="Day Shift">Day Shift</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Form Section Header: Guardian Info */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 mb-4 flex items-center gap-2 pt-2">
                      <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      Parent / Guardian Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Father's Name */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                          Father&apos;s Name *
                        </label>
                        <input
                          type="text"
                          name="fatherName"
                          required
                          placeholder="Father's full name"
                          value={formData.fatherName}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-emerald-500 font-medium"
                        />
                      </div>

                      {/* Mother's Name */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                          Mother&apos;s Name *
                        </label>
                        <input
                          type="text"
                          name="motherName"
                          required
                          placeholder="Mother's full name"
                          value={formData.motherName}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-emerald-500 font-medium"
                        />
                      </div>

                      {/* Guardian Phone Number */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                          Guardian Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="guardianPhone"
                          required
                          placeholder="017XXXXXXXX"
                          value={formData.guardianPhone}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-emerald-500 font-medium"
                        />
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="guardian@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-emerald-500 font-medium"
                        />
                      </div>

                      {/* Address */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                          Present Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          required
                          placeholder="House, Road, Area, City"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-emerald-500 font-medium"
                        />
                      </div>

                      {/* Previous School Name */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                          Previous School (If Any)
                        </label>
                        <input
                          type="text"
                          name="previousSchool"
                          placeholder="Name of previous institution"
                          value={formData.previousSchool}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-emerald-500 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 group"
                    >
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      <span>Submit Application</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}