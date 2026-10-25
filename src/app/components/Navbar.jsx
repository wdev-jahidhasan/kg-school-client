"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun, Moon, Menu, X, GraduationCap, ChevronDown, User,
  LayoutDashboard, LogOut, AlertTriangle, ShieldAlert
} from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Status Restriction Modal State
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "pending", // 'pending' | 'disabled'
  });

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Admission", href: "/admission" },
    { name: "Academics", href: "/academics" },
    { name: "Teachers", href: "/teachers" },
    { name: "Success", href: "/success" },
    { name: "Notices", href: "/notices" },
  ];

  // Logout handler
  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully!");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Logout failed!");
        },
      },
    });
  };

  const userRole = user?.role || "default";
  const dashboardHref = userRole ? `/dashboard/${userRole}` : "/dashboard";

  // Dashboard Access Guard Function
  const handleDashboardClick = (e) => {
    e.preventDefault();
    setDropdownOpen(false);

    const userStatus = (user?.status || "").toLowerCase().trim();
    const isApproved = user?.isApproved === true || userStatus === "approved" || userStatus === "verified";

    // 1. If Disabled
    if (userStatus === "disabled") {
      setStatusModal({
        isOpen: true,
        title: "Account Disabled",
        message: "Your account is disabled by the Admin. You can't access dashboard now",
        type: "disabled",
      });
      return;
    }

    // 2. If Pending (Not Verified / Approved)
    if (!isApproved) {
      setStatusModal({
        isOpen: true,
        title: "Dashboard Access Restricted",
        message: "You not eligible to access dashboard now. Please go to profile page and fill all the information and wait for admin's approval",
        type: "pending",
      });
      return;
    }

    // 3. If Approved / Verified -> Grant Access
    router.push(dashboardHref);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-200/60 bg-amber-50/35 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Mobile: Left Actions (Menu & Theme) */}
        <div className="flex items-center gap-1 md:hidden z-10">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none"
            aria-label="Toggle Theme"
          >
            {mounted && (theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
          </motion.button>
        </div>

        {/* Desktop Logo & Name / Mobile Centered Logo & Name */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center gap-2 z-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-md">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-base sm:text-xl font-bold tracking-tight text-slate-800 dark:text-white truncate">
              Junior <span className="text-emerald-600 dark:text-emerald-400">Scholars</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition-colors ${isActive
                  ? "text-emerald-700 dark:text-emerald-400 font-semibold"
                  : "text-slate-600 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
                  }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-4 z-10">
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden md:flex p-1.5 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none"
            aria-label="Toggle Theme"
          >
            {mounted && (theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
          </motion.button>

          {isPending ? (
            <div className="h-9 w-20 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-lg" />
          ) : user ? (
            <div className="relative flex items-center gap-1.5" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center rounded-full p-0.5 bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-slate-800 hover:shadow-sm transition-all focus:outline-none"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-semibold text-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
              </button>

              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-center text-slate-600 dark:text-slate-300 focus:outline-none p-1"
                aria-label="Toggle Dropdown"
              >
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Box */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 top-12 mt-2 w-60 rounded-2xl bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-800 shadow-xl shadow-amber-950/5 dark:shadow-black/40 py-2 z-50 overflow-hidden"
                  >
                    {/* User Info Header */}
                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {user.name || "User 01"}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user.email || "user01@gmail.com"}
                      </p>
                    </div>

                    {/* Menu Options */}
                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-amber-50/60 dark:hover:bg-slate-800 transition-colors"
                      >
                        <User className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        My Profile
                      </Link>

                      {/* Dashboard guarded button */}
                      <button
                        onClick={handleDashboardClick}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-amber-50/60 dark:hover:bg-slate-800 transition-colors text-left"
                      >
                        <LayoutDashboard className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        Dashboard
                      </button>
                    </div>

                    {/* Logout Button */}
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-colors text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        Log Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-800"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-amber-200/60 bg-amber-50/90 dark:border-slate-800 dark:bg-slate-950 overflow-hidden"
          >
            <div className="flex flex-col px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`relative pl-3 text-base font-medium py-1 transition-colors ${isActive
                      ? "text-emerald-700 dark:text-emerald-400 font-semibold"
                      : "text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400"
                      }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1 bottom-1 w-1 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
                    )}
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Centered Popup Modal */}
      <AnimatePresence>
        {statusModal.isOpen && (
          <div className="fixed inset-x-0 top-24 z-[99999] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className={`pointer-events-auto border rounded-2xl max-w-xs sm:max-w-sm w-full p-5 shadow-2xl space-y-4 text-center bg-white dark:bg-slate-900 ${statusModal.type === "disabled"
                ? "border-rose-500/40 shadow-rose-950/30"
                : "border-amber-500/40 shadow-amber-950/30"
                }`}
            >
              <div className="flex justify-center">
                {statusModal.type === "disabled" ? (
                  <div className="p-3 bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-xl shadow-sm">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="p-3 bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-xl shadow-sm">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <h3 className={`text-base font-bold ${statusModal.type === "disabled" ? "text-rose-700 dark:text-rose-400" : "text-slate-900 dark:text-white"
                  }`}>
                  {statusModal.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {statusModal.message}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1">
                {statusModal.type === "pending" ? (
                  <>
                    <button
                      onClick={() => setStatusModal((prev) => ({ ...prev, isOpen: false }))}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                    >
                      Close
                    </button>
                    <Link
                      href="/profile"
                      onClick={() => setStatusModal((prev) => ({ ...prev, isOpen: false }))}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors inline-block"
                    >
                      Go to Profile
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={() => setStatusModal((prev) => ({ ...prev, isOpen: false }))}
                    className="px-5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm transition-colors"
                  >
                    Understand
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}