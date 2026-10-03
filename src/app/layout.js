"use client";

import { Geist, Geist_Mono, Nunito } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {!isDashboard && <Navbar />}

          <main className="flex-1 flex flex-col">{children}</main>

          {!isDashboard && <Footer />}

          {/* Global Toaster with Dark/Light Theme Support */}
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              className: "!bg-white dark:!bg-slate-900 !text-slate-900 dark:!text-slate-100 !border !border-slate-200 dark:!border-slate-800 !rounded-xl !shadow-lg !text-xs sm:!text-sm",
              success: {
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#ffffff",
                },
                className: "!bg-emerald-50 dark:!bg-emerald-950/80 !text-emerald-900 dark:!text-emerald-200 !border !border-emerald-200 dark:!border-emerald-800",
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#ffffff",
                },
                className: "!bg-red-50 dark:!bg-red-950/80 !text-red-900 dark:!text-red-200 !border !border-red-200 dark:!border-red-800",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}