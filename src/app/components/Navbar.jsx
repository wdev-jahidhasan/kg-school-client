"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, GraduationCap } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    // { name: "Home", href: "/" },
    { name: "Admission", href: "/admission" },
    { name: "Academics", href: "/academics" },
    { name: "Results", href: "/results" },
    { name: "Notices", href: "/notices" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-200/60 bg-amber-50/30 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Mobile: Left Actions (Menu & Theme) */}
        <div className="flex items-center gap-2 md:hidden z-10">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100/60 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100/60 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            aria-label="Toggle Theme"
          >
            {mounted && (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
          </motion.button>
        </div>

        {/* Desktop Logo & Name / Mobile Centered Logo & Name */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center gap-2 z-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-md">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-base sm:text-xl font-bold tracking-tight text-slate-800 dark:text-white truncate">
              Junior <span className="text-emerald-600 dark:text-emerald-400">Scholars</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
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
                {/* Active Underline Bar */}
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

        {/* Right Side Actions (Desktop Theme Toggle & Login) */}
        <div className="flex items-center gap-2 sm:gap-4 z-10">
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden md:flex h-9 w-9 items-center justify-center rounded-full bg-amber-100/60 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            aria-label="Toggle Theme"
          >
            {mounted && (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
          </motion.button>

          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-800"
          >
            Login
          </Link>
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
                    {/* Mobile Left Border Indicator */}
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
    </header>
  );
}