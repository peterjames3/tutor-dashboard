export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  imageurl: string;
};

export type StudentLevel = "High School" | "A-Level" | "College";

export type StudentStatus = "Pending" | "In Progress" | "Completed";

export type SupportType = "Tutoring" | "Exam Prep" | "End-to-End Exam Support";

export interface BaseStudent {
  name: string;
  email: string;
  phone: string;
  level: StudentLevel;
  startDate: Date;
  subjectHelp: string;
  assistant?: string; // assigned from frontend
  status: StudentStatus;
  supportType: SupportType;
}

export type AssistantField = {
  id: string;
  name: string;
};

export type ExamPrepForm = {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: StudentLevel;
  startDate: Date;
  subjectHelp: string;
  assistant?: string;
  status: StudentStatus;
  supportType: "Exam Prep";
  exam: string;
  exam_date: Date;
};

export interface ExamSupportForm {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  level: string;
  subject: string;
  exam: string;
  exam_date: string;
  assistant: string;
  status: "Pending" | "In Progress" | "Completed";
  support_type: string;
}
