import React, { useState, useEffect, useCallback } from 'react';
import type { User } from 'firebase/auth';
import { Header } from './components/Header';
import { EnquiryForm } from './components/EnquiryForm';
import { CourseDetailsSection } from './components/CourseDetailsSection';
import { WorkspaceModal } from './components/WorkspaceModal';
import {
  initAuth,
  googleSignIn,
  logout as authLogout,
  getAccessToken
} from './services/auth';
import { appendEnquiryToSheet, sendEnquiryEmailViaGmail } from './services/workspace';
import { EnquiryFormData, EnquiryRecord } from './types';
import {
  Award,
  Users,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  PhoneCall,
  Mail,
  MapPin,
  Calendar,
  Clock,
  BookOpen
} from 'lucide-react';

const STORAGE_KEY_ENQUIRIES = 'techbridge_enquiries_v2';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState<string>('10th Class');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Local storage cache for enquiries
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ENQUIRIES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ENQUIRIES, JSON.stringify(enquiries));
    } catch (e) {
      console.error('Failed to save enquiries to localStorage', e);
    }
  }, [enquiries]);

  // Firebase auth initialization
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser) => {
        setUser(currentUser);
      },
      () => {
        setUser(null);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      console.error('Google Sign-in failed:', message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authLogout();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Submit Enquiry Handler
  const handleSubmitEnquiry = async (
    formData: EnquiryFormData
  ): Promise<{ sheetUrl?: string; emailSent?: boolean }> => {
    setIsSubmitting(true);
    let sheetUrl: string | undefined;
    let emailSent = false;

    const newRecord: EnquiryRecord = {
      ...formData,
      id: `enq_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      submittedAt: new Date().toISOString(),
      syncedToSheets: false,
      emailSent: false,
    };

    try {
      const token = await getAccessToken();

      if (token) {
        // Append row to Google Sheets
        try {
          const sheetResult = await appendEnquiryToSheet(formData);
          if (sheetResult.success) {
            sheetUrl = sheetResult.url;
            newRecord.syncedToSheets = true;
          }
        } catch (sheetErr) {
          console.warn('Sheets sync error:', sheetErr);
        }

        // Send confirmation email via Gmail
        try {
          const emailResult = await sendEnquiryEmailViaGmail(formData);
          if (emailResult.success) {
            emailSent = true;
            newRecord.emailSent = true;
          }
        } catch (emailErr) {
          console.warn('Gmail sending error:', emailErr);
        }
      }

      setEnquiries((prev) => [newRecord, ...prev]);
      return { sheetUrl, emailSent };
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sync all unsynced enquiries
  const handleSyncAllToSheets = useCallback(async () => {
    const token = await getAccessToken();
    if (!token) {
      await handleLogin();
      return;
    }

    setIsSyncing(true);
    try {
      for (const enq of enquiries) {
        if (!enq.syncedToSheets) {
          await appendEnquiryToSheet(enq);
        }
      }
      setEnquiries((prev) =>
        prev.map((e) => ({ ...e, syncedToSheets: true }))
      );
    } catch (err) {
      console.error('Failed to sync all records:', err);
    } finally {
      setIsSyncing(false);
    }
  }, [enquiries]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <Header
        user={user}
        onOpenWorkspaceModal={() => setIsWorkspaceModalOpen(true)}
        onLoginClick={handleLogin}
        isLoggingIn={isLoggingIn}
      />

      {/* Hero Poster Banner */}
      <section className="bg-gradient-to-b from-blue-950 via-blue-900 to-indigo-950 text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Glow & geometry */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-400/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/15 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-5 backdrop-blur-md shadow-xs">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            Admissions Open • Live Online One-on-One & Group Batches
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
            Learn from the Best at{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400">
              Techbridge Academy
            </span>
          </h1>

          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
            Expert academic coaching for Classes 8th–12th, Engineering, Degree & IT subjects, plus Career Mentorship, AI, Placement Guidance & Resume Building.
          </p>

          {/* Key Institute Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="bg-white/10 border border-white/15 rounded-2xl p-3.5 backdrop-blur-xs">
              <div className="text-yellow-300 font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>Flexible Modes</span>
              </div>
              <p className="text-sm font-extrabold text-white">1-on-1 & Group</p>
              <p className="text-[11px] text-blue-200 mt-0.5">Starting from ₹69/hr</p>
            </div>

            <div className="bg-white/10 border border-white/15 rounded-2xl p-3.5 backdrop-blur-xs">
              <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Convenient Schedule</span>
              </div>
              <p className="text-sm font-extrabold text-white">Weekend Batches</p>
              <p className="text-[11px] text-blue-200 mt-0.5">Sat & Sun 3 Classes/wk</p>
            </div>

            <div className="bg-white/10 border border-white/15 rounded-2xl p-3.5 backdrop-blur-xs">
              <div className="text-sky-300 font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Full Curriculum</span>
              </div>
              <p className="text-sm font-extrabold text-white">Complete Syllabus</p>
              <p className="text-[11px] text-blue-200 mt-0.5">Concept to Exam Prep</p>
            </div>

            <div className="bg-white/10 border border-white/15 rounded-2xl p-3.5 backdrop-blur-xs">
              <div className="text-pink-300 font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Mentorship</span>
              </div>
              <p className="text-sm font-extrabold text-white">Career & Placement</p>
              <p className="text-[11px] text-blue-200 mt-0.5">Mock Interviews & AI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area: Form & Course Details */}
      <main className="flex-1 -mt-10 relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Enquiry Form Card (ONLY 7 Fields + Selected Course Details Card Below Dropdown) */}
        <EnquiryForm
          selectedCourseTitle={selectedCourseTitle}
          onSelectCourse={(title) => setSelectedCourseTitle(title)}
          onSubmitEnquiry={handleSubmitEnquiry}
          isSubmitting={isSubmitting}
          isWorkspaceConnected={!!user}
        />

        {/* Complete Course Details Section (Clearly & Visibly below form fields) */}
        <CourseDetailsSection
          onSelectCourse={(title) => {
            setSelectedCourseTitle(title);
            const formDropdown = document.getElementById('field-interestedCourse') as HTMLSelectElement | null;
            if (formDropdown) {
              formDropdown.value = title;
              formDropdown.dispatchEvent(new Event('change', { bubbles: true }));
            }
          }}
          selectedCourseTitle={selectedCourseTitle}
        />
      </main>

      {/* Google Workspace Modal */}
      <WorkspaceModal
        isOpen={isWorkspaceModalOpen}
        onClose={() => setIsWorkspaceModalOpen(false)}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isLoggingIn={isLoggingIn}
        enquiries={enquiries}
        onSyncAllToSheets={handleSyncAllToSheets}
        isSyncing={isSyncing}
      />

      {/* Footer */}
      <footer className="bg-blue-950 text-slate-300 border-t border-blue-900 pt-16 pb-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Academy Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-400 text-blue-950 flex items-center justify-center font-black">
                  TB
                </div>
                <span className="text-xl font-extrabold text-white">
                  Techbridge <span className="text-yellow-300">Academy</span>
                </span>
              </div>
              <p className="text-sm text-blue-200 max-w-md leading-relaxed mb-6">
                Techbridge Academy provides personalized coaching from secondary school foundations (8th–10th), higher secondary mathematics (11th–12th), college degree engineering & IT, through to career mentorship, AI skills, and placement guidance.
              </p>
              <div className="flex items-center gap-3 text-xs text-blue-300">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-yellow-300" /> One-to-One Coaching
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Group Interactive Batches
                </span>
              </div>
            </div>

            {/* Quick Contact */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                Admissions & Counseling
              </h4>
              <ul className="space-y-3 text-sm text-blue-200">
                <li className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-yellow-300 shrink-0" />
                  <span>+91 9560554806</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-yellow-300 shrink-0" />
                  <span className="truncate">academytechbridge10@gmail.com</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-yellow-300 shrink-0 mt-0.5" />
                  <span>Weekend Batches: Sat 7 AM/PM & Sun 7 PM</span>
                </li>
              </ul>
            </div>

            {/* Workspace & Sync */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                Academy Admin & Sync
              </h4>
              <p className="text-xs text-blue-200 leading-relaxed mb-4">
                Google Sheets, Gmail auto-confirmations, and Google Forms for real-time lead management.
              </p>
              <button
                onClick={() => setIsWorkspaceModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-yellow-300 text-xs font-bold border border-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Google Workspace Management</span>
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-blue-900/80 text-center text-xs text-blue-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Techbridge Academy. All rights reserved.</p>
            <p>Course Enquiry Web Form</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
