"use client";

export default function TeacherProfileFields({ subject, setSubject, joiningDate, setJoiningDate }) {
  return (
    <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800">
      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
        Teacher Details
      </h4>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Mathematics"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Joining Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            required
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
}