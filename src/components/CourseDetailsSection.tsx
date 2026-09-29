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
  ArrowRight,
  Filter,
  Sparkles
} from 'lucide-react';
import { COURSES } from '../data/courses';
import { CourseDetail } from '../types';

interface CourseDetailsSectionProps {
  onSelectCourse: (courseTitle: string) => void;
  selectedCourseTitle?: string;
}

export const CourseDetailsSection: React.FC<CourseDetailsSectionProps> = ({
  onSelectCourse,
  selectedCourseTitle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedSyllabusMap, setExpandedSyllabusMap] = useState<Record<string, boolean>>({});

  const categories = [
    'All',
    'School (8th-10th)',
    'High School (11th-12th)',
    'College / Engineering',
    'Career & Skills'
  ];

  const filteredCourses = selectedCategory === 'All'
    ? COURSES
    : COURSES.filter((c) => c.category === selectedCategory);

  const toggleSyllabus = (courseId: string) => {
    setExpandedSyllabusMap((prev) => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const handlePickCourse = (course: CourseDetail) => {
    onSelectCourse(course.title);
    const formElement = document.getElementById('enquiry-form-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="course-details-section" className="w-full max-w-7xl mx-auto pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
          <BookOpen className="w-4 h-4 text-blue-700" />
          Complete Course Directory (All {COURSES.length} Courses)
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight mb-3">
          Explore All Course Details & Complete Syllabi
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Read full curriculum topics, batch timings, class durations, and One-to-One vs Group fee options before submitting your enquiry.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-yellow-300 shadow-md shadow-blue-900/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat === 'All' ? `All ${COURSES.length} Courses` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses List / Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredCourses.map((course) => {
          const isSelected = selectedCourseTitle === course.title;
          const isSyllabusOpen = expandedSyllabusMap[course.id] ?? false;

          return (
            <div
              key={course.id}
              className={`bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl ${
                isSelected
                  ? 'border-blue-600 ring-2 ring-blue-500/30 shadow-blue-900/10'
                  : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                  {isSelected && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-blue-950 mb-1">
                  {course.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-blue-800 mb-4">
                  <span className="text-slate-500 font-normal">Subjects:</span> {course.subjects}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {/* Fee box */}
                  <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
                      <Coins className="w-3.5 h-3.5 text-yellow-500" />
                      <span>Fee Structure:</span>
                    </div>
                    <div className="text-xs space-y-0.5">
                      <p className="text-slate-700">
                        <strong className="text-blue-950">One-to-One:</strong> {course.oneToOneFee}
                      </p>
                      <p className="text-slate-700">
                        <strong className="text-emerald-700">Group Fee:</strong> {course.groupFee}
                      </p>
                    </div>
                    {course.terms && (
                      <p className="text-[10px] text-amber-800 mt-1 font-medium bg-amber-100/60 px-1.5 py-0.5 rounded">
                        * {course.terms}
                      </p>
                    )}
                  </div>

                  {/* Duration & Mode */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1">
                      <Clock className="w-3.5 h-3.5 text-blue-700" />
                      <span>Duration & Classes:</span>
                    </div>
                    <div className="text-xs space-y-0.5 text-slate-700">
                      <p><strong>Duration:</strong> {course.duration}</p>
                      <p><strong>Classes:</strong> {course.classesPerWeek}/week ({course.classDuration})</p>
                      <p className="text-blue-700 truncate font-medium"><strong>Mode:</strong> {course.mode}</p>
                    </div>
                  </div>
                </div>

                {/* Timing Bar */}
                <div className="p-3 rounded-xl bg-blue-950 text-white text-xs mb-4">
                  <div className="flex items-center gap-1.5 font-bold text-yellow-300 mb-1.5">
                    <Timer className="w-3.5 h-3.5" />
                    <span>Batch Timings:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {course.timing.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-white/15 text-[11px] font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Extra Notes */}
                {course.extraNotes && (
                  <p className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 p-2 rounded-lg mb-4">
                    ✓ {course.extraNotes}
                  </p>
                )}

                {/* Syllabus Accordion */}
                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSyllabus(course.id)}
                    className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-blue-900 cursor-pointer transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                      View Complete Syllabus ({course.syllabus.reduce((acc, s) => acc + s.topics.length, 0)} Topics)
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-700">
                      {isSyllabusOpen ? 'Hide' : 'Expand'}
                      {isSyllabusOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </span>
                  </button>

                  {isSyllabusOpen && (
                    <div className="p-4 bg-white space-y-3 max-h-64 overflow-y-auto divide-y divide-slate-100">
                      {course.syllabus.map((s, idx) => (
                        <div key={idx} className={idx > 0 ? 'pt-2.5' : ''}>
                          <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                            • {s.title}
                          </h5>
                          <div className="flex flex-wrap gap-1.5">
                            {s.topics.map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-1 bg-slate-50 border border-slate-200/80 rounded text-[11px] text-slate-700 font-medium"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="bg-slate-50 border-t border-slate-100 p-4 sm:px-8 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  Techbridge Academy Certified Course
                </span>
                <button
                  type="button"
                  onClick={() => handlePickCourse(course)}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-blue-900 hover:bg-blue-950 text-yellow-300 shadow-sm'
                  }`}
                >
                  {isSelected ? 'Selected in Form' : 'Select This Course'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
