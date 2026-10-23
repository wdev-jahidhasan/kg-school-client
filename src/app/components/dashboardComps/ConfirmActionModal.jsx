"use client";

import React from "react";
import { AlertCircle, AlertTriangle } from "lucide-react";

export default function ConfirmActionModal({ confirmModal, setConfirmModal, handleConfirmAction }) {
  if (!confirmModal.isOpen) return null;

  return (
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
  );
}