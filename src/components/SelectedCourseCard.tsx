import React, { useState } from 'react';
import {
  Clock,
  Laptop,
  Coins,
  CalendarDays,
  Timer,
  BookOpen,
  Info,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Users
} from 'lucide-react';
import { CourseDetail } from '../types';

interface SelectedCourseCardProps {
  course: CourseDetail;
}

export const SelectedCourseCard: React.FC<SelectedCourseCardProps> = ({ course }) => {
  // Full syllabus is open by default so nothing is hidden, with toggle to collapse if desired
  const [isSyllabusExpanded, setIsSyllabusExpanded] = useState(true);

  return (
    <div className="mt-4 rounded-2xl border-2 border-blue-600/30 bg-gradient-to-b from-blue-50/70 via-white to-slate-50 p-5 sm:p-7 shadow-lg shadow-blue-900/5 transition-all">
      {/* Top Header with Course Name & Category Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-blue-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900 text-yellow-300 text-xs font-bold tracking-wide uppercase mb-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            Selected Course Preview
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-blue-950 tracking-tight">
            {course.title}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-blue-800 mt-0.5">
            <span className="text-slate-500 font-medium">Subjects / Focus:</span> {course.subjects}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200">
            {course.category}
          </span>
        </div>
      </div>

      {/* Grid of Key Attributes with Icons: Fee, Duration, Mode, Classes, Timing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 my-5">
        {/* Fees Box (Bright Yellow & Navy Accent) */}
        <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-3 col-span-1 sm:col-span-2 lg:col-span-1 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-yellow-400 text-blue-950 flex items-center justify-center shrink-0 font-bold shadow-xs">
            <Coins className="w-5 h-5 text-blue-950" />
          </div>
          <div className="w-full">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block">
              Course Fee Structure
            </span>
            <div className="flex items-center justify-between gap-2 mt-1">
              <div>
                <span className="text-xs text-slate-600 block">One-to-One:</span>
                <span className="text-sm font-extrabold text-blue-950">{course.oneToOneFee}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-600 block">Group Batch:</span>
                <span className="text-sm font-extrabold text-emerald-700">{course.groupFee}</span>
              </div>
            </div>
            {course.terms && (
              <p className="text-[10px] text-amber-800/90 mt-1.5 font-medium flex items-center gap-1 bg-amber-100/70 px-2 py-0.5 rounded">
                <Info className="w-3 h-3 shrink-0" />
                {course.terms}
              </p>
            )}
          </div>
        </div>

        {/* Duration & Mode Box */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Duration & Mode
            </span>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{course.duration}</p>
            <p className="text-xs text-blue-700 font-medium flex items-center gap-1 mt-0.5">
              <Laptop className="w-3 h-3" />
              {course.mode}
            </p>
          </div>
        </div>

        {/* Classes per Week & Class Duration */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0 font-bold">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Class Schedule
            </span>
            <p className="text-sm font-bold text-slate-900 mt-0.5">
              {course.classesPerWeek} Classes / Week
            </p>
            <p className="text-xs text-indigo-700 font-medium flex items-center gap-1 mt-0.5">
              <Timer className="w-3 h-3" />
              {course.classDuration} per session
            </p>
          </div>
        </div>
      </div>

      {/* Class Timing Schedule Box */}
      <div className="p-3.5 rounded-xl bg-blue-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 shadow-xs">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-yellow-300 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wide text-yellow-300">
            Batch Timings:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {course.timing.map((time, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-white/15 border border-white/20 text-xs font-semibold text-white tracking-wide"
            >
              {time}
            </span>
          ))}
        </div>
      </div>

      {/* Optional Note (e.g. Concept building or board tests) */}
      {course.extraNotes && (
        <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{course.extraNotes}</span>
        </div>
      )}

      {/* Complete Syllabus Section */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <button
          type="button"
          onClick={() => setIsSyllabusExpanded((prev) => !prev)}
          className="w-full px-4 py-3 bg-slate-100/90 hover:bg-slate-200/70 text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-700" />
            <span>Complete Course Syllabus & Topics</span>
            <span className="text-[11px] font-normal text-slate-500 hidden sm:inline">
              ({course.syllabus.reduce((acc, s) => acc + s.topics.length, 0)} key topics)
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-blue-700">
            <span>{isSyllabusExpanded ? 'Collapse' : 'Expand Syllabus'}</span>
            {isSyllabusExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isSyllabusExpanded && (
          <div className="p-4 sm:p-5 space-y-4 max-h-80 overflow-y-auto divide-y divide-slate-100">
            {course.syllabus.map((section, sIdx) => (
              <div key={sIdx} className={sIdx > 0 ? 'pt-3.5' : ''}>
                <h5 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  {section.title}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {section.topics.map((topic, tIdx) => (
                    <div
                      key={tIdx}
                      className="flex items-start gap-1.5 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
