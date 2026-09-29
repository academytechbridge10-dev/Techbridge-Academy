import React, { useState, useEffect } from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Compass,
  GraduationCap,
  BookOpen,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RotateCcw,
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';
import { COURSES, INDIAN_STATES, QUALIFICATIONS } from '../data/courses';
import { EnquiryFormData, CourseDetail } from '../types';
import { SelectedCourseCard } from './SelectedCourseCard';

interface EnquiryFormProps {
  selectedCourseTitle?: string;
  onSelectCourse: (courseTitle: string) => void;
  onSubmitEnquiry: (formData: EnquiryFormData) => Promise<{ sheetUrl?: string; emailSent?: boolean }>;
  isSubmitting: boolean;
  isWorkspaceConnected: boolean;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  selectedCourseTitle = '',
  onSelectCourse,
  onSubmitEnquiry,
  isSubmitting,
  isWorkspaceConnected,
}) => {
  // Form fields: ONLY 7 fields
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    mobileNumber: '',
    email: '',
    city: '',
    state: '',
    qualification: '',
    interestedCourse: selectedCourseTitle || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryFormData, boolean>>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<{
    data: EnquiryFormData;
    sheetUrl?: string;
    emailSent?: boolean;
  } | null>(null);

  // Sync external course selection
  useEffect(() => {
    if (selectedCourseTitle && selectedCourseTitle !== formData.interestedCourse) {
      setFormData((prev) => ({ ...prev, interestedCourse: selectedCourseTitle }));
    }
  }, [selectedCourseTitle]);

  // Find currently selected course object
  const currentSelectedCourse: CourseDetail | undefined = COURSES.find(
    (c) => c.title === formData.interestedCourse
  );

  // Validation function enforcing exact prompt requirements:
  // Mobile: Exactly 10-digit Indian mobile numbers (starts with 6, 7, 8, 9)
  // Email: Valid email format
  const validate = (data: EnquiryFormData): Partial<Record<keyof EnquiryFormData, string>> => {
    const errs: Partial<Record<keyof EnquiryFormData, string>> = {};

    // 1. Full Name
    if (!data.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    } else if (data.fullName.trim().length < 2) {
      errs.fullName = 'Name must be at least 2 characters';
    }

    // 2. Mobile Number: Exactly 10-digit Indian mobile numbers
    const cleanMobile = data.mobileNumber.replace(/[\s\-\+]/g, '');
    const mobileDigits = cleanMobile.startsWith('91') && cleanMobile.length === 12
      ? cleanMobile.slice(2)
      : cleanMobile;

    if (!data.mobileNumber.trim()) {
      errs.mobileNumber = 'Mobile Number is required';
    } else if (!/^[6-9]\d{9}$/.test(mobileDigits)) {
      errs.mobileNumber = 'Please enter a valid 10-digit Indian mobile number';
    }

    // 3. Email Address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      errs.email = 'Email Address is required';
    } else if (!emailRegex.test(data.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    // 4. City
    if (!data.city.trim()) {
      errs.city = 'City is required';
    }

    // 5. State
    if (!data.state.trim()) {
      errs.state = 'State is required';
    }

    // 6. Qualification
    if (!data.qualification.trim()) {
      errs.qualification = 'Qualification is required';
    }

    // 7. Interested Course
    if (!data.interestedCourse.trim()) {
      errs.interestedCourse = 'Please select a course';
    }

    return errs;
  };

  const handleChange = (field: keyof EnquiryFormData, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    if (field === 'interestedCourse') {
      onSelectCourse(value);
    }

    if (touched[field]) {
      const fieldErrors = validate(updated);
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    }
  };

  const handleBlur = (field: keyof EnquiryFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      fullName: true,
      mobileNumber: true,
      email: true,
      city: true,
      state: true,
      qualification: true,
      interestedCourse: true,
    });

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.keys(validationErrors)[0];
      const el = document.getElementById(`field-${firstError}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
      }
      return;
    }

    try {
      const result = await onSubmitEnquiry(formData);
      setLastSubmission({
        data: { ...formData },
        sheetUrl: result.sheetUrl,
        emailSent: result.emailSent,
      });
      setIsSuccess(true);
      // Reset form
      setFormData({
        fullName: '',
        mobileNumber: '',
        email: '',
        city: '',
        state: '',
        qualification: '',
        interestedCourse: '',
      });
      setTouched({});
      setErrors({});
    } catch (err) {
      console.error('Error submitting enquiry:', err);
    }
  };

  const handleResetForNew = () => {
    setIsSuccess(false);
    setLastSubmission(null);
  };

  return (
    <div id="enquiry-form-card" className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-blue-950/10 overflow-hidden">
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 px-6 sm:px-10 py-8 text-white relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-yellow-400/10 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-yellow-300">
                Techbridge Academy
              </span>
              <span className="text-white/40">•</span>
              <span className="text-xs text-blue-200 font-medium">
                Live Interactive Online Classes
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
              Course Enquiry Form
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-blue-100 max-w-2xl font-normal leading-relaxed">
              Choose your course and submit your details. Our team will contact you shortly.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10">
          {isSuccess && lastSubmission ? (
            /* EXACT REQUIRED SUCCESS MESSAGE */
            <div className="py-8 px-4 sm:px-8 text-center animate-fadeIn">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <h3 className="text-3xl font-extrabold text-blue-950 mb-2">
                Thank You!
              </h3>
              <p className="text-lg font-bold text-slate-800 mb-2">
                Your enquiry has been submitted successfully.
              </p>
              <p className="text-base font-semibold text-blue-700 max-w-lg mx-auto mb-6">
                Our Techbridge Academy team will contact you shortly.
              </p>

              {/* Submission Summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-lg mx-auto text-left mb-6 shadow-xs">
                <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-3">
                  Summary of Details Submitted
                </h4>
                <div className="grid grid-cols-2 gap-y-2 text-xs sm:text-sm">
                  <span className="text-slate-500">Applicant Name:</span>
                  <span className="font-semibold text-slate-900 text-right">{lastSubmission.data.fullName}</span>

                  <span className="text-slate-500">Mobile Number:</span>
                  <span className="font-semibold text-slate-900 text-right">{lastSubmission.data.mobileNumber}</span>

                  <span className="text-slate-500">Email Address:</span>
                  <span className="font-semibold text-slate-900 text-right truncate">{lastSubmission.data.email}</span>

                  <span className="text-slate-500">City & State:</span>
                  <span className="font-semibold text-slate-900 text-right">
                    {lastSubmission.data.city}, {lastSubmission.data.state}
                  </span>

                  <span className="text-slate-500">Qualification:</span>
                  <span className="font-semibold text-slate-900 text-right">{lastSubmission.data.qualification}</span>

                  <span className="text-slate-500">Interested Course:</span>
                  <span className="font-extrabold text-blue-900 text-right">{lastSubmission.data.interestedCourse}</span>
                </div>
              </div>

              {lastSubmission.sheetUrl && (
                <div className="mb-6">
                  <a
                    href={lastSubmission.sheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    Recorded in Google Sheets
                    <ExternalLink className="w-3 h-3 text-emerald-500" />
                  </a>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleResetForNew}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-yellow-300 font-bold text-sm transition-all shadow-md cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Submit Another Enquiry
                </button>
                <a
                  href="#course-details-section"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  View All Courses Syllabus
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* ONLY 7 FORM FIELDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {/* 1. Full Name */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="field-fullName"
                    className="block text-sm font-bold text-slate-800 mb-1.5"
                  >
                    1. Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-5 h-5 text-blue-800" />
                    </div>
                    <input
                      type="text"
                      id="field-fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      onBlur={() => handleBlur('fullName')}
                      placeholder="Enter student or applicant full name"
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                        errors.fullName && touched.fullName
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50/20'
                          : 'border-slate-300 focus:border-blue-700 focus:ring-blue-100 hover:border-slate-400'
                      }`}
                    />
                  </div>
                  {errors.fullName && touched.fullName && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* 2. Mobile Number */}
                <div>
                  <label
                    htmlFor="field-mobileNumber"
                    className="block text-sm font-bold text-slate-800 mb-1.5"
                  >
                    2. Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-5 h-5 text-blue-800" />
                    </div>
                    <input
                      type="tel"
                      id="field-mobileNumber"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={(e) => handleChange('mobileNumber', e.target.value)}
                      onBlur={() => handleBlur('mobileNumber')}
                      placeholder="10-digit mobile number (e.g. 9876543210)"
                      maxLength={10}
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                        errors.mobileNumber && touched.mobileNumber
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50/20'
                          : 'border-slate-300 focus:border-blue-700 focus:ring-blue-100 hover:border-slate-400'
                      }`}
                    />
                  </div>
                  {errors.mobileNumber && touched.mobileNumber && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.mobileNumber}
                    </p>
                  )}
                  {!errors.mobileNumber && (
                    <p className="mt-1 text-[11px] text-slate-400">
                      Enter 10-digit Indian mobile number for counseling.
                    </p>
                  )}
                </div>

                {/* 3. Email Address */}
                <div>
                  <label
                    htmlFor="field-email"
                    className="block text-sm font-bold text-slate-800 mb-1.5"
                  >
                    3. Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-5 h-5 text-blue-800" />
                    </div>
                    <input
                      type="email"
                      id="field-email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="student@example.com"
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                        errors.email && touched.email
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50/20'
                          : 'border-slate-300 focus:border-blue-700 focus:ring-blue-100 hover:border-slate-400'
                      }`}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.email}
                    </p>
                  )}
                  {!errors.email && (
                    <p className="mt-1 text-[11px] text-slate-400">
                      Class link & batch updates will be emailed.
                    </p>
                  )}
                </div>

                {/* 4. City */}
                <div>
                  <label
                    htmlFor="field-city"
                    className="block text-sm font-bold text-slate-800 mb-1.5"
                  >
                    4. City <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="w-5 h-5 text-blue-800" />
                    </div>
                    <input
                      type="text"
                      id="field-city"
                      name="city"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      onBlur={() => handleBlur('city')}
                      placeholder="e.g. Pune, Bangalore, Delhi, Jaipur"
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                        errors.city && touched.city
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50/20'
                          : 'border-slate-300 focus:border-blue-700 focus:ring-blue-100 hover:border-slate-400'
                      }`}
                    />
                  </div>
                  {errors.city && touched.city && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* 5. State */}
                <div>
                  <label
                    htmlFor="field-state"
                    className="block text-sm font-bold text-slate-800 mb-1.5"
                  >
                    5. State <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Compass className="w-5 h-5 text-blue-800" />
                    </div>
                    <select
                      id="field-state"
                      name="state"
                      value={formData.state}
                      onChange={(e) => handleChange('state', e.target.value)}
                      onBlur={() => handleBlur('state')}
                      className={`w-full pl-11 pr-8 py-3 rounded-xl border text-sm transition-all bg-white text-slate-900 focus:outline-none focus:ring-2 appearance-none cursor-pointer ${
                        errors.state && touched.state
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50/20'
                          : 'border-slate-300 focus:border-blue-700 focus:ring-blue-100 hover:border-slate-400'
                      }`}
                    >
                      <option value="">Select your State</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errors.state && touched.state && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.state}
                    </p>
                  )}
                </div>

                {/* 6. Qualification */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="field-qualification"
                    className="block text-sm font-bold text-slate-800 mb-1.5"
                  >
                    6. Qualification <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <GraduationCap className="w-5 h-5 text-blue-800" />
                    </div>
                    <select
                      id="field-qualification"
                      name="qualification"
                      value={formData.qualification}
                      onChange={(e) => handleChange('qualification', e.target.value)}
                      onBlur={() => handleBlur('qualification')}
                      className={`w-full pl-11 pr-8 py-3 rounded-xl border text-sm transition-all bg-white text-slate-900 focus:outline-none focus:ring-2 appearance-none cursor-pointer ${
                        errors.qualification && touched.qualification
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50/20'
                          : 'border-slate-300 focus:border-blue-700 focus:ring-blue-100 hover:border-slate-400'
                      }`}
                    >
                      <option value="">Select your Current Class / Degree</option>
                      {QUALIFICATIONS.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errors.qualification && touched.qualification && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.qualification}
                    </p>
                  )}
                </div>

                {/* 7. Interested Course (Dropdown) */}
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="field-interestedCourse"
                      className="block text-sm font-bold text-slate-800"
                    >
                      7. Interested Course <span className="text-red-500">*</span>
                    </label>
                    <span className="text-xs text-blue-700 font-semibold">
                      Select to preview full fees & syllabus ↓
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <BookOpen className="w-5 h-5 text-blue-800" />
                    </div>
                    <select
                      id="field-interestedCourse"
                      name="interestedCourse"
                      value={formData.interestedCourse}
                      onChange={(e) => handleChange('interestedCourse', e.target.value)}
                      onBlur={() => handleBlur('interestedCourse')}
                      className={`w-full pl-11 pr-8 py-3.5 rounded-xl border text-sm font-bold transition-all bg-white text-blue-950 focus:outline-none focus:ring-2 appearance-none cursor-pointer ${
                        errors.interestedCourse && touched.interestedCourse
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50/20'
                          : 'border-blue-300 focus:border-blue-700 focus:ring-blue-100 hover:border-blue-400 bg-blue-50/30'
                      }`}
                    >
                      <option value="">-- Choose Course from Techbridge Academy --</option>
                      <optgroup label="School Foundations (Classes 8 - 10)">
                        {COURSES.filter((c) => c.category === 'School (8th-10th)').map((c) => (
                          <option key={c.id} value={c.title}>
                            {c.title} ({c.subjects} - {c.duration})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Higher Secondary Mathematics">
                        {COURSES.filter((c) => c.category === 'High School (11th-12th)').map((c) => (
                          <option key={c.id} value={c.title}>
                            {c.title} ({c.duration})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="College & Degree Coaching">
                        {COURSES.filter((c) => c.category === 'College / Engineering').map((c) => (
                          <option key={c.id} value={c.title}>
                            {c.title} ({c.duration})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Career, AI & Placement Mentorship">
                        {COURSES.filter((c) => c.category === 'Career & Skills').map((c) => (
                          <option key={c.id} value={c.title}>
                            {c.title} ({c.duration})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errors.interestedCourse && touched.interestedCourse && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.interestedCourse}
                    </p>
                  )}

                  {/* COURSE SELECTION BEHAVIOR:
                      "When the user selects a course, immediately display a beautiful Course Details Card below the dropdown." */}
                  {currentSelectedCourse && (
                    <SelectedCourseCard course={currentSelectedCourse} />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 pt-5 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 hover:from-blue-950 hover:via-blue-900 hover:to-indigo-950 text-yellow-300 font-extrabold text-base sm:text-lg shadow-xl shadow-blue-950/20 hover:shadow-blue-950/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed transform active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-yellow-300" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      Submitting Enquiry...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Enquiry
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-500 mt-3 font-medium">
                  By submitting this form, you request Techbridge Academy to connect with you regarding course batches and counseling.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
