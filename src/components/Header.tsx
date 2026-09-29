import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Phone, Mail } from 'lucide-react';
import type { User } from 'firebase/auth';

interface HeaderProps {
  user: User | null;
  onOpenWorkspaceModal: () => void;
  onLoginClick: () => void;
  isLoggingIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenWorkspaceModal,
  onLoginClick,
  isLoggingIn,
}) => {
  return (
    <header className="bg-blue-950 text-white border-b border-blue-900 sticky top-0 z-40 backdrop-blur-md bg-blue-950/95 shadow-md">
      {/* Top micro bar for contact info */}
      <div className="bg-blue-900/60 border-b border-blue-800/60 py-1.5 px-4 sm:px-6 lg:px-8 text-[11px] text-blue-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-yellow-300" />
              <span>Admissions Helpline: +91 9560554806</span>
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Mail className="w-3 h-3 text-yellow-300" />
              <span>academytechbridge10@gmail.com</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-yellow-300 font-semibold">Live 1-on-1 & Group Classes Now Open</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-yellow-400 to-amber-500 flex items-center justify-center text-blue-950 font-black shadow-md shadow-yellow-500/20">
              <svg
                className="w-7 h-7 text-blue-950"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19c4-5 8-5 16 0" />
                <path d="M4 15c4-3 8-3 16 0" />
                <path d="M12 3v12" />
                <path d="M7 6l5-3 5 3" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Techbridge <span className="text-yellow-300">Academy</span>
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                  Premier Coaching
                </span>
              </div>
              <p className="text-xs text-blue-200 hidden sm:block">
                School, Engineering & Career Mentorship Excellence
              </p>
            </div>
          </div>

          {/* Right Action: Workspace Status / Google Sign in */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <button
                onClick={onOpenWorkspaceModal}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-400/40 bg-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-semibold hover:bg-emerald-500/30 transition-colors shadow-xs"
                title="Google Workspace Connected"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="hidden sm:inline">Google Workspace</span> Active
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                disabled={isLoggingIn}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium transition-all shadow-xs"
                title="Connect Google Sheets & Gmail"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>{isLoggingIn ? 'Connecting...' : 'Staff Sync'}</span>
              </button>
            )}

            <button
              onClick={onOpenWorkspaceModal}
              className="p-2 text-blue-200 hover:text-yellow-300 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title="Workspace Settings & Submissions"
              aria-label="Workspace Settings"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
