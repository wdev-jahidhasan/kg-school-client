"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { roleBasedMenus } from "@/config/navConfig";
import { Menu, X, ShieldAlert } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const pathSegments = pathname.split("/");
  const currentRole = pathSegments[2] || "guardian";

  const menuItems = roleBasedMenus[currentRole] || roleBasedMenus.guardian;

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Responsive & Dark Theme Optimized */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-slate-900/95 md:bg-slate-900 border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        {/* Sidebar Header with Brand */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-bold tracking-wide text-white">
              Junior Scholars
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/50"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Badge Indicator inside Sidebar */}
        <div className="px-6 py-4 border-b border-slate-800/40 bg-slate-950/30">
          <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
            Active Workspace
          </p>
          <p className="text-xs font-bold text-emerald-400 capitalize mt-0.5">
            {currentRole} Portal
          </p>
        </div>

        {/* Sidebar Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const isHome = item.href === "/";

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isHome
                  ? "mt-6 border border-emerald-500/30 text-emerald-400 bg-emerald-950/10 hover:bg-emerald-950/30"
                  : isActive
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                  }`}
              >
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Dashboard Topbar (Clean & Mobile Friendly) */}
        <header className="h-16 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-800/60 text-slate-300 hover:text-white border border-slate-700/50 transition-colors"
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5 text-emerald-400" />
            </button>
            <h1 className="text-xs md:text-sm font-semibold text-slate-300 tracking-wide">
              Dashboard <span className="text-slate-500 mx-1">/</span>{" "}
              <span className="text-emerald-400 capitalize">{currentRole}</span>
            </h1>
          </div>

          {/* Right side role info badge */}
          <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 px-3 py-1.5 rounded-full text-xs shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold uppercase tracking-wider text-slate-200">
              {currentRole}
            </span>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
}