import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  Mail,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  LogOut,
  Download,
  AlertCircle,
  FileText
} from 'lucide-react';
import type { User } from 'firebase/auth';
import { EnquiryRecord } from '../types';
import { getOrCreateEnquirySpreadsheet, createGoogleForm } from '../services/workspace';

interface WorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
  isLoggingIn: boolean;
  enquiries: EnquiryRecord[];
  onSyncAllToSheets: () => Promise<void>;
  isSyncing: boolean;
}

export const WorkspaceModal: React.FC<WorkspaceModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogin,
  onLogout,
  isLoggingIn,
  enquiries,
  onSyncAllToSheets,
  isSyncing,
}) => {
  const [sheetUrl, setSheetUrl] = useState<string | null>(() => {
    const id = localStorage.getItem('techbridge_sheets_id');
    return id ? `https://docs.google.com/spreadsheets/d/${id}/edit` : null;
  });
  const [createdFormUrl, setCreatedFormUrl] = useState<string | null>(null);
  const [isCreatingForm, setIsCreatingForm] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleOpenOrCreateSheet = async () => {
    try {
      setStatusMessage('Locating or creating Google Spreadsheet...');
      const res = await getOrCreateEnquirySpreadsheet();
      setSheetUrl(res.url);
      window.open(res.url, '_blank');
      setStatusMessage(res.created ? 'Created new Google Spreadsheet!' : 'Found existing Google Spreadsheet.');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to access Google Sheets';
      setStatusMessage(`Error: ${message}`);
    }
  };

  const handleCreateGoogleForm = async () => {
    try {
      setIsCreatingForm(true);
      setStatusMessage('Creating Google Form via Google Forms API...');
      const res = await createGoogleForm();
      const formEditUrl = `https://docs.google.com/forms/d/${res.formId}/edit`;
      setCreatedFormUrl(formEditUrl);
      window.open(formEditUrl, '_blank');
      setStatusMessage('Google Form generated successfully!');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create Google Form';
      setStatusMessage(`Error: ${message}`);
    } finally {
      setIsCreatingForm(false);
    }
  };

  const handleExportCSV = () => {
    if (enquiries.length === 0) return;
    const headers = ['Full Name', 'Mobile Number', 'Email Address', 'City', 'State', 'Qualification', 'Interested Course', 'Submitted At'];
    const rows = enquiries.map((e) => [
      `"${e.fullName}"`,
      `"${e.mobileNumber}"`,
      `"${e.email}"`,
      `"${e.city}"`,
      `"${e.state}"`,
      `"${e.qualification}"`,
      `"${e.interestedCourse}"`,
      `"${e.submittedAt}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `techbridge_academy_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-fadeIn">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Google Workspace & Academy Sync</h3>
            <p className="text-xs text-blue-200">
              Google Sheets, Gmail confirmation, and Google Forms integration
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Auth State Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-slate-900">Google Account Status</span>
                {user ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    Disconnected
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                {user
                  ? `Authenticated as: ${user.email || user.displayName}`
                  : 'Connect your Google account to automatically record enquiries into Google Sheets and dispatch instant Gmail notifications.'}
              </p>
            </div>

            <div>
              {user ? (
                <button
                  onClick={onLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={onLogin}
                  disabled={isLoggingIn}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  {isLoggingIn ? 'Connecting...' : 'Sign in with Google'}
                </button>
              )}
            </div>
          </div>

          {/* Integration Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Google Sheets */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-800 text-xs">Google Sheets</h4>
              <p className="text-[11px] text-slate-500 mb-3">
                Live spreadsheet recording all 7 form fields in real-time.
              </p>
              {user ? (
                <button
                  onClick={handleOpenOrCreateSheet}
                  className="w-full inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
                >
                  <ExternalLink className="w-3 h-3" />
                  {sheetUrl ? 'Open Sheet' : 'Create Sheet'}
                </button>
              ) : (
                <span className="text-[11px] text-slate-400">Sign in to sync</span>
              )}
            </div>

            {/* Gmail */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-2">
                <Mail className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-800 text-xs">Gmail Notifications</h4>
              <p className="text-[11px] text-slate-500 mb-3">
                Automated email confirmations sent to enquirers & academy.
              </p>
              <div className="flex items-center gap-1 text-[11px] text-slate-600">
                <span className={`w-2 h-2 rounded-full ${user ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                <span>{user ? 'Ready to send' : 'Pending login'}</span>
              </div>
            </div>

            {/* Google Forms */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-800 text-xs">Google Forms</h4>
              <p className="text-[11px] text-slate-500 mb-3">
                Create and manage synced Google Forms for course intake.
              </p>
              {user ? (
                createdFormUrl ? (
                  <a
                    href={createdFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold"
                  >
                    <ExternalLink className="w-3 h-3" /> View Form
                  </a>
                ) : (
                  <button
                    onClick={handleCreateGoogleForm}
                    disabled={isCreatingForm}
                    className="w-full inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold"
                  >
                    {isCreatingForm ? 'Creating...' : 'Create Form'}
                  </button>
                )
              ) : (
                <span className="text-[11px] text-slate-400">Sign in to create</span>
              )}
            </div>
          </div>

          {/* Feedback message banner */}
          {statusMessage && (
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Enquiries Record Log */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Submitted Enquiries ({enquiries.length})
              </h4>
              <div className="flex items-center gap-2">
                {enquiries.length > 0 && (
                  <>
                    <button
                      onClick={handleExportCSV}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium"
                      title="Download as CSV spreadsheet"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      Export CSV
                    </button>
                    {user && (
                      <button
                        onClick={onSyncAllToSheets}
                        disabled={isSyncing}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 text-xs font-semibold"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                        Sync to Sheets
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {enquiries.length === 0 ? (
              <div className="p-6 text-center rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs">
                No course enquiries submitted yet. Fill out the form to log your first enquiry!
              </div>
            ) : (
              <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-48 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-semibold sticky top-0">
                    <tr>
                      <th className="p-2.5">Name</th>
                      <th className="p-2.5">Mobile</th>
                      <th className="p-2.5">Course</th>
                      <th className="p-2.5">City, State</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {enquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-slate-50">
                        <td className="p-2.5 font-medium text-slate-900">{enq.fullName}</td>
                        <td className="p-2.5 text-slate-600">{enq.mobileNumber}</td>
                        <td className="p-2.5 text-blue-700 font-medium truncate max-w-[140px]">
                          {enq.interestedCourse}
                        </td>
                        <td className="p-2.5 text-slate-500 truncate max-w-[120px]">
                          {enq.city}, {enq.state}
                        </td>
                        <td className="p-2.5">
                          {enq.syncedToSheets ? (
                            <span className="inline-flex items-center gap-0.5 text-emerald-700 font-medium">
                              <CheckCircle2 className="w-3 h-3" /> Synced
                            </span>
                          ) : (
                            <span className="text-slate-400">Local</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
