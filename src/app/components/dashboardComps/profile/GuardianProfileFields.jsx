"use client";

import { Upload, Loader2, User } from "lucide-react";

export default function GuardianProfileFields({
  studentName, setStudentName,
  studentClass, setStudentClass,
  studentRoll, setStudentRoll,
  studentSection, setStudentSection,
  studentBloodGroup, setStudentBloodGroup,
  academicYear, setAcademicYear,
  studentImageUrl, handleStudentImageUpload,
  studentUploading, oldImage
}) {
  // Roll numbers from 01 to 20
  const rollNumbers = Array.from({ length: 20 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  return (
    <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800">
      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
        Student Information
      </h4>

      {/* Student Image Upload */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
          Student Photo
        </label>
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full border-2 border-emerald-500/50 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
            {studentImageUrl ? (
              <img src={studentImageUrl} alt="Student Preview" className="w-full h-full object-cover" />
            ) : (
              <User className="h-5 w-5 text-slate-400" />
            )}
          </div>
          <label className="flex-1 cursor-pointer flex flex-col justify-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            {studentUploading ? <Loader2 className="h-4 w-4 animate-spin text-emerald-600" /> : <Upload className="h-4 w-4 text-emerald-600" />}
            <input type="file" accept="image/*" onChange={handleStudentImageUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Student Name */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
          Student's Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none transition-all"
        />
      </div>

      {/* Class & Section Dropdowns */}
      <div className="grid grid-cols-2 gap-3">
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
            {["Play", "Nursery", "One", "Two", "Three", "Four", "Five"].map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>
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
            {["Morning", "Day"].map((sec) => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Roll & Academic Year Dropdown/Input */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Roll No <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={studentRoll}
            onChange={(e) => setStudentRoll(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none transition-all"
          >
            <option value="" disabled>Select Roll</option>
            {rollNumbers.map((roll) => (
              <option key={roll} value={roll}>{roll}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Academic Year <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 2026"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Blood Group (Compact) */}
      <div className="w-1/2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
          Blood Group <span className="text-red-500">*</span>
        </label>
        <select
          required
          value={studentBloodGroup}
          onChange={(e) => setStudentBloodGroup(e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none transition-all"
        >
          <option value="" disabled>Select</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
      </div>
    </div>
  );
}