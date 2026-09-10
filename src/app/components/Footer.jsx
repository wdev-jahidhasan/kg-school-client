import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-amber-200/60 bg-amber-50/85 backdrop-blur-md text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">

          {/* Column 1: About School */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-md">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Junior <span className="text-emerald-600 dark:text-emerald-400">Scholars</span>
              </span>
            </div>
            <p className="text-sm">
              Dedicated to making early childhood education joyful and tech-enabled. A unique blend of quality learning and secure payment solutions.
            </p>
            <div className="flex space-x-4">
              {/* Facebook Icon SVG */}
              <a href="#" className="text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400" aria-label="Facebook">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* Twitter/X Icon SVG */}
              <a href="#" className="text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400" aria-label="Twitter">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Youtube Icon SVG */}
              <a href="#" className="text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400" aria-label="Youtube">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-emerald-700 dark:hover:text-emerald-400">About Us</Link>
              </li>
              <li>
                <Link href="/academics" className="hover:text-emerald-700 dark:hover:text-emerald-400">Academics</Link>
              </li>
              <li>
                <Link href="/admission" className="hover:text-emerald-700 dark:hover:text-emerald-400">Admission Info</Link>
              </li>
              <li>
                <Link href="/notices" className="hover:text-emerald-700 dark:hover:text-emerald-400">Notice Board</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Portal Logins */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Portal Access
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login?role=admin" className="hover:text-emerald-700 dark:hover:text-emerald-400">Admin Panel</Link>
              </li>
              <li>
                <Link href="/login?role=teacher" className="hover:text-emerald-700 dark:hover:text-emerald-400">Teacher Portal</Link>
              </li>
              <li>
                <Link href="/login?role=guardian" className="hover:text-emerald-700 dark:hover:text-emerald-400">Guardian Portal (Stripe)</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-700 dark:text-emerald-500 shrink-0 mt-0.5" />
                <span>Dhanmondi, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-700 dark:text-emerald-500 shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-700 dark:text-emerald-500 shrink-0" />
                <span>info@juniorscholarskg.edu</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 border-t border-amber-200/60 pt-8 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs">
          <p>&copy; {new Date().getFullYear()} Junior Scholars KG School. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="hover:text-emerald-700 dark:hover:text-emerald-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-emerald-700 dark:hover:text-emerald-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}