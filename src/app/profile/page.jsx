"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Shield, Edit3, Loader2, BookOpen, Layers, Hash, Phone, Droplet, Briefcase, Calendar, CheckCircle2, Clock, Ban } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import EditProfileModal from "../components/dashboardComps/EditProfileModal";

export default function ProfileDetailsPage() {
  const { data: session, isPending } = useSession();
  const sessionUser = session?.user;

  const [dbUser, setDbUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (sessionUser?.email) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      fetch(`${apiUrl}/api/users/profile/${sessionUser.email}`)
        .then((res) => res.json())
        .then((data) => { if (data.success) setDbUser(data.user); })
        .catch((err) => console.error("Failed to fetch user profile:", err));
    }
  }, [sessionUser?.email]);

  const user = dbUser || sessionUser;

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20 bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-500" />
      </div>
    );
  }

  if (!user) {
    return <div className="flex items-center justify-center py-20 text-slate-500 dark:text-slate-400">Please log in to view profile details.</div>;
  }

  const role = user?.role?.toLowerCase().trim();
  const profile = user?.profile || {};

  const uniqueId = user?.userId && user.userId.trim() !== "" ? user.userId : "Not Assigned Yet";

  const statusApproved = user.status === "approved" || user.status === "verified" || user.isApproved === true || user.status === "Approved";
  const userStatus = user.status || (user.isApproved ? "Verified" : "Pending");

  const getIdLabel = () => {
    if (role === "teacher") return "Teacher ID";
    if (role === "staff") return "Staff ID";
    return "System ID";
  };

  const userPhone = profile.phone || user.phone;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 flex justify-center">

      <style jsx global>{`
        @keyframes sharpBlink {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.75;
            transform: scale(0.97);
          }
        }
        .animate-sharp-blink {
          animation: sharpBlink 3s infinite ease-in-out;
        }
      `}</style>

      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-300/20 dark:bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-amber-300/25 dark:bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} className="relative z-10 w-full max-w-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-amber-100 dark:border-slate-800 rounded-3xl shadow-xl shadow-amber-950/5 dark:shadow-black/40 p-6 sm:p-8">

        <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Profile Details</h1>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-md transition-all">
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="relative w-24 h-24 rounded-full border-2 border-emerald-500/50 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md">
            {user.image ? <img src={user.image} alt={user.name} className="w-full h-full object-cover" /> : <User className="w-10 h-10 text-slate-400" />}
          </div>
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" /> {user.email}
              </p>
              {userPhone && (
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" /> {userPhone}
                </p>
              )}
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/50 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" /> {user.role || "User"}
              </div>

              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusApproved
                ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800"
                : user.status === "disabled"
                  ? "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/50 dark:border-rose-800"
                  : "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800"
                }`}>
                {statusApproved ? <CheckCircle2 className="w-3.5 h-3.5" /> : user.status === "disabled" ? <Ban className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                {userStatus}
              </span>
            </div>
          </div>
        </div>

        {role !== "guardian" && (
          <div className="relative overflow-hidden mt-5 p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-cyan-950/40 border border-emerald-500/30 dark:border-emerald-500/20 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5 z-10">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <Hash className="w-4 h-4" />
              </div>
              <p className="text-xs uppercase font-extrabold tracking-wider text-slate-700 dark:text-slate-300">
                {getIdLabel()}
              </p>
            </div>

            <span className={`z-10 font-mono text-xs sm:text-sm px-3.5 py-1.5 rounded-lg border tracking-wider font-extrabold ${uniqueId !== "Not Assigned Yet"
              ? "text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 shadow-md shadow-emerald-500/30 animate-sharp-blink"
              : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-400/60 animate-sharp-blink italic"
              }`}>
              {uniqueId}
            </span>

          </div>
        )}

        {(role === "staff" || role === "teacher" || role === "instructor") && (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800">
              <Droplet className="w-4 h-4 text-rose-500 fill-rose-500 flex-shrink-0" />
              <div className="text-xs">
                <p className="text-slate-400">Blood Group</p>
                <p className="font-semibold text-slate-900 dark:text-white">{profile.bloodGroup || "N/A"}</p>
              </div>
            </div>
          </div>
        )}

        {role === "guardian" && (
          <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              Linked Student Information
            </h3>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-950/60 dark:to-emerald-950/20 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-emerald-500/30 transition-all space-y-4">

              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/80">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full border-2 border-emerald-500/40 bg-white dark:bg-slate-800 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm">
                    {profile.studentImage ? (
                      <img src={profile.studentImage} alt="Student" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-7 h-7 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                      {profile.studentName || "Not Assigned"}
                    </h4>
                    <span className="inline-block mt-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                      Junior Scholar Student
                    </span>
                  </div>
                </div>

                {/* Blood Group Badge: Red Droplet Icon with Custom Background */}
                {(profile.studentBloodGroup || profile.bloodGroup) && (
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <Droplet className="w-4 h-4 fill-rose-600 text-rose-600" />
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white tracking-wide">{profile.studentBloodGroup || profile.bloodGroup}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between bg-white/80 dark:bg-slate-900/80 px-3.5 py-2.5 rounded-xl border border-emerald-500/30 shadow-2xs">
                <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Hash className="w-4 h-4 text-emerald-600" /> Student ID:
                </span>
                <span className={`font-mono text-xs sm:text-sm px-3 py-1 rounded-md border tracking-wider font-extrabold ${uniqueId !== "Not Assigned Yet"
                  ? "text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 shadow-xs animate-sharp-blink"
                  : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-400/60 animate-sharp-blink italic text-xs"
                  }`}>
                  {uniqueId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">

                <div className="flex flex-col gap-1 p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
                    <span>Class</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 pl-5 truncate">
                    {profile.studentClass || profile.class || "N/A"}
                  </p>
                </div>

                <div className="flex flex-col gap-1 p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
                    <span>Section</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 pl-5 truncate">
                    {profile.studentSection || profile.section || "N/A"}
                  </p>
                </div>

                <div className="flex flex-col gap-1 p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    <Hash className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
                    <span>Roll No</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 pl-5 truncate">
                    {profile.studentRoll || profile.roll || "N/A"}
                  </p>
                </div>

                <div className="flex flex-col gap-1 p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
                    <span>Academic Year</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 pl-5 truncate">
                    {profile.academicYear || "N/A"}
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}

        {role === "staff" && (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Staff Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800"><Briefcase className="w-4 h-4 text-emerald-600" /><div className="text-xs"><p className="text-slate-400">Department</p><p className="font-semibold text-slate-800 dark:text-slate-200">{profile.department || "N/A"}</p></div></div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800"><Calendar className="w-4 h-4 text-emerald-600" /><div className="text-xs"><p className="text-slate-400">Joining Date</p><p className="font-semibold text-slate-800 dark:text-slate-200">{profile.joiningDate || "N/A"}</p></div></div>
            </div>
          </div>
        )}

        {(role === "teacher" || role === "instructor") && (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Teacher Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800"><BookOpen className="w-4 h-4 text-emerald-600" /><div className="text-xs"><p className="text-slate-400">Subject</p><p className="font-semibold text-slate-800 dark:text-slate-200">{profile.subject || "N/A"}</p></div></div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800"><Calendar className="w-4 h-4 text-emerald-600" /><div className="text-xs"><p className="text-slate-400">Joining Date</p><p className="font-semibold text-slate-800 dark:text-slate-200">{profile.joiningDate || "N/A"}</p></div></div>
            </div>
          </div>
        )}
      </motion.div>

      <EditProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={user} />
    </section>
  );
}