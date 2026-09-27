"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Award, Users } from "lucide-react";

export default function AllTeachersPage() {
  const allTeachers = [
    {
      id: 1,
      name: "Syeda Sabiha Sultana",
      designation: "Principal",
      qualification: "M.A. & B.Ed, DU",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
      email: "sabiha123@gmail.com",
      phone: "017000000001",
    },
    {
      id: 2,
      name: "Md. Aminul Islam",
      designation: "Head Teacher / Vice Principal",
      qualification: "M.Sc. in Physics, RU",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
      email: "aminul123@gmail.com",
      phone: "018000000002",
    },
    {
      id: 3,
      name: "Md. Rafiqul Islam",
      designation: "Senior Teacher (Math)",
      qualification: "M.Sc. in Mathematics, DU",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
      email: "rafiqul.math@gmail.com",
      phone: "019000000003",
    },
    {
      id: 4,
      name: "Farhana Yasmin",
      designation: "Senior Teacher (English)",
      qualification: "B.A. (Hons) in English, RU",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
      email: "farhana.eng@gmail.com",
      phone: "015000000004",
    },
    {
      id: 5,
      name: "Nazmul Hossain",
      designation: "Assistant Teacher",
      qualification: "B.A. in Bengali, NU",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
      email: "nazmul.gen@gmail.com",
      phone: "016000000005",
    },
    {
      id: 6,
      name: "Taslima Akter",
      designation: "Early Years Teacher",
      qualification: "B.Sc. in Home Economics",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
      email: "taslima.early@gmail.com",
      phone: "013000000006",
    },
    {
      id: 7,
      name: "Kamrul Hasan",
      designation: "Science Teacher",
      qualification: "B.Sc. in Chemistry",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800",
      email: "kamrul.sci@gmail.com",
      phone: "017000000007",
    },
    {
      id: 8,
      name: "Shahnaz Parvin",
      designation: "Social Studies Teacher",
      qualification: "M.A. in History",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
      email: "shahnaz.soc@gmail.com",
      phone: "018000000008",
    },
    {
      id: 9,
      name: "Tariqul Islam",
      designation: "ICT Teacher",
      qualification: "B.Sc. in CSE",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
      email: "tariqul.ict@gmail.com",
      phone: "019000000009",
    },
    {
      id: 10,
      name: "Nusrat Jahan",
      designation: "Arts & Crafts Teacher",
      qualification: "B.F.A. in Fine Arts",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800",
      email: "nusrat.art@gmail.com",
      phone: "015000000010",
    },
    {
      id: 11,
      name: "Moniruzzaman",
      designation: "Physical Education",
      qualification: "B.P.Ed.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
      email: "monir.pe@gmail.com",
      phone: "016000000011",
    },
    {
      id: 12,
      name: "Sabrina Sultana",
      designation: "Computer Teacher",
      qualification: "B.Sc. in Computer Science",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
      email: "sabrina.comp@gmail.com",
      phone: "013000000012",
    },
  ];

  const allStaff = [
    {
      id: 1,
      name: "Abdul Karim",
      designation: "Office Assistant",
      department: "Administrative",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
      email: "karim.office@gmail.com",
      phone: "017000000021",
    },
    {
      id: 2,
      name: "Rafiq Ahmed",
      designation: "Accounts Officer",
      department: "Accounts",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
      email: "rafiq.acc@gmail.com",
      phone: "018000000022",
    },
    {
      id: 3,
      name: "Bilkis Begum",
      designation: "Library Assistant",
      department: "Library",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800",
      email: "bilkis.lib@gmail.com",
      phone: "019000000023",
    },
    {
      id: 4,
      name: "Jahangir Alam",
      designation: "IT Support Technician",
      department: "ICT & Technical",
      image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=800",
      email: "jahangir.tech@gmail.com",
      phone: "015000000024",
    },
    {
      id: 5,
      name: "Rokeya Khatun",
      designation: "Senior Caretaker",
      department: "Support Staff",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800",
      email: "rokeya.support@gmail.com",
      phone: "016000000025",
    },
    {
      id: 6,
      name: "Anwar Hossain",
      designation: "Security Supervisor",
      department: "Security",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800",
      email: "anwar.sec@gmail.com",
      phone: "013000000026",
    },
    {
      id: 7,
      name: "Tanvir Ahmed",
      designation: "Front Desk Receptionist",
      department: "Front Office",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=800",
      email: "tanvir.reception@gmail.com",
      phone: "017000000027",
    },
    {
      id: 8,
      name: "Belal Hossain",
      designation: "Maintenance Supervisor",
      department: "Maintenance",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800",
      email: "belal.maint@gmail.com",
      phone: "018000000028",
    },
  ];

  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-24 bg-white dark:bg-slate-950 w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back to Home Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-slate-800 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
              Our People
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Teachers & <span className="text-emerald-600 dark:text-emerald-400">Staff Directory</span>
            </h1>
            <p className="mt-3 text-sm sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
              Meet our respected faculty members and dedicated staff who keep our institution running smoothly every day.
            </p>
          </motion.div>
        </div>

        {/* SECTION 1: Teachers */}
        <div className="mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
            <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Our Teachers
            </h2>
          </div>

          {/* Teachers Grid: 4 cols on large, 3 cols on medium, 2 cols on small */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {allTeachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden p-4 sm:p-5 flex flex-col items-center text-center group hover:border-emerald-500/50 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-emerald-500/30 dark:border-emerald-500/20 shadow-md mb-3">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="space-y-1 w-full">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                    {teacher.name}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs flex items-center justify-center gap-1">
                    <Award className="w-3 h-3 shrink-0" />
                    <span className="truncate">{teacher.designation}</span>
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs truncate">
                    {teacher.qualification}
                  </p>
                  <div className="pt-2 mt-1 border-t border-slate-200 dark:border-slate-800 space-y-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center justify-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[130px] sm:max-w-[160px]">{teacher.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{teacher.phone}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Staff Members */}
        <div>
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
            <Users className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Our Staff Members
            </h2>
          </div>

          {/* Staff Grid: 4 cols on large, 3 cols on medium, 2 cols on small */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {allStaff.map((staff, index) => (
              <motion.div
                key={staff.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden p-4 sm:p-5 flex flex-col items-center text-center group hover:border-amber-500/50 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-amber-500/30 dark:border-amber-500/20 shadow-md mb-3">
                  <Image
                    src={staff.image}
                    alt={staff.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="space-y-1 w-full">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                    {staff.name}
                  </h3>
                  <p className="text-amber-600 dark:text-amber-400 font-semibold text-xs flex items-center justify-center gap-1">
                    <Users className="w-3 h-3 shrink-0" />
                    <span className="truncate">{staff.designation}</span>
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs truncate">
                    Dept: {staff.department}
                  </p>
                  <div className="pt-2 mt-1 border-t border-slate-200 dark:border-slate-800 space-y-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center justify-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[130px] sm:max-w-[160px]">{staff.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{staff.phone}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}