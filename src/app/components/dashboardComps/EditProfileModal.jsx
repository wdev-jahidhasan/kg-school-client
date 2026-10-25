"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Loader2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

import GuardianProfileFields from "./profile/GuardianProfileFields";
import StaffProfileFields from "./profile/StaffProfileFields";
import TeacherProfileFields from "./profile/TeacherProfileFields";

export default function EditProfileModal({ isOpen, onClose, user }) {
  const [name, setName] = useState(user?.name || "");
  const [imageUrl, setImageUrl] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.profile?.phone || "");
  const [bloodGroup, setBloodGroup] = useState(user?.profile?.bloodGroup || "");

  // Guardian States (including academicYear)
  const [studentName, setStudentName] = useState(user?.profile?.studentName || "");
  const [studentImageUrl, setStudentImageUrl] = useState(user?.profile?.studentImage || "");
  const [studentClass, setStudentClass] = useState(user?.profile?.studentClass || "");
  const [studentSection, setStudentSection] = useState(user?.profile?.studentSection || "");
  const [studentRoll, setStudentRoll] = useState(user?.profile?.studentRoll || "");
  const [studentBloodGroup, setStudentBloodGroup] = useState(user?.profile?.studentBloodGroup || "");
  const [academicYear, setAcademicYear] = useState(user?.profile?.academicYear || "");

  // Staff & Teacher States
  const [department, setDepartment] = useState(user?.profile?.department || "");
  const [subject, setSubject] = useState(user?.profile?.subject || "");
  const [joiningDate, setJoiningDate] = useState(user?.profile?.joiningDate || "");

  const [uploading, setUploading] = useState(false);
  const [studentUploading, setStudentUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const role = user?.role?.toLowerCase().trim();

  // ImgBB Upload Handler
  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, { method: "POST", body: formData });
    return await res.json();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = await uploadToImgBB(file);
    if (data.success) setImageUrl(data.data.url);
    else toast.error(data.error?.message || "Image upload failed.");
    setUploading(false);
  };

  const handleStudentImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setStudentUploading(true);
    const data = await uploadToImgBB(file);
    if (data.success) setStudentImageUrl(data.data.url);
    else toast.error(data.error?.message || "Student image upload failed.");
    setStudentUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) return toast.error("User email not found.");

    setSaving(true);
    let profilePayload = {};

    if (role === "guardian") {
      profilePayload = {
        phone,
        studentName,
        studentImage: studentImageUrl,
        studentClass,
        studentSection,
        studentRoll,
        studentBloodGroup,
        academicYear
      };
    } else if (role === "staff") {
      profilePayload = { phone, bloodGroup, department, joiningDate };
    } else if (role === "teacher" || role === "instructor") {
      profilePayload = { phone, bloodGroup, subject, joiningDate };
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch(`${apiUrl}/api/users/update-profile/${user.email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image: imageUrl, profile: profilePayload }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      toast.success("Profile updated successfully!");
      onClose();
      window.location.reload();
    } else {
      toast.error(data.message || "Failed to update profile.");
    }
    setSaving(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-7 overflow-y-auto max-h-[90vh]">

            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Edit Profile</h3>
              <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">Profile Picture</label>
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full border-2 border-emerald-500/50 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
                    {imageUrl ? <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" /> : <Upload className="h-5 w-5 text-slate-400" />}
                  </div>
                  <label className="flex-1 cursor-pointer flex flex-col justify-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                    {uploading ? <Loader2 className="h-4 w-4 animate-spin text-emerald-600" /> : <Upload className="h-4 w-4 text-emerald-600" />}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none transition-all" />
              </div>

              {role === "guardian" && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">Guardian's Phone Number <span className="text-red-500">*</span></label>
                  <input type="text" required placeholder="017xxxxxxxx" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none transition-all" />
                </div>
              )}

              {(role === "staff" || role === "teacher" || role === "instructor") && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                    <input type="text" required placeholder="017xxxxxxxx" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">Blood Group <span className="text-red-500">*</span></label>
                    <select required value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none transition-all">
                      <option value="" disabled>Select Group</option>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {role === "guardian" && (
                <GuardianProfileFields
                  studentName={studentName} setStudentName={setStudentName}
                  studentClass={studentClass} setStudentClass={setStudentClass}
                  studentRoll={studentRoll} setStudentRoll={setStudentRoll}
                  studentSection={studentSection} setStudentSection={setStudentSection}
                  studentBloodGroup={studentBloodGroup} setStudentBloodGroup={setStudentBloodGroup}
                  academicYear={academicYear} setAcademicYear={setAcademicYear}
                  studentImageUrl={studentImageUrl} handleStudentImageUpload={handleStudentImageUpload}
                  studentUploading={studentUploading} oldImage={user?.profile?.studentImage}
                />
              )}

              {role === "staff" && (
                <StaffProfileFields
                  department={department} setDepartment={setDepartment}
                  joiningDate={joiningDate} setJoiningDate={setJoiningDate}
                />
              )}

              {(role === "teacher" || role === "instructor") && (
                <TeacherProfileFields
                  subject={subject} setSubject={setSubject}
                  joiningDate={joiningDate} setJoiningDate={setJoiningDate}
                />
              )}

              <div className="flex items-center justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">Cancel</button>
                <button type="submit" disabled={saving || uploading || studentUploading} className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-emerald-700 disabled:opacity-50">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Save Changes <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></>}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}