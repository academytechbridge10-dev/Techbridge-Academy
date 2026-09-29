export interface EnquiryFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  city: string;
  state: string;
  qualification: string;
  interestedCourse: string;
}

export interface SyllabusSection {
  title: string;
  topics: string[];
}

export interface CourseDetail {
  id: string;
  title: string;
  category: 'School (8th-10th)' | 'High School (11th-12th)' | 'College / Engineering' | 'Career & Skills';
  subjects: string;
  duration: string;
  mode: string;
  oneToOneFee: string;
  groupFee: string;
  terms?: string;
  classesPerWeek: number | string;
  classDuration: string;
  timing: string[];
  extraNotes?: string;
  syllabus: SyllabusSection[];
}

export interface EnquiryRecord extends EnquiryFormData {
  id: string;
  submittedAt: string;
  syncedToSheets?: boolean;
  emailSent?: boolean;
}
