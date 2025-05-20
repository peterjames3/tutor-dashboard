export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
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

export interface ExamSupportStudent extends BaseStudent {
  exam: string;
  examDate: Date;
}

export type TutoringStudent = BaseStudent & {
  supportType: "Tutoring";
};

export type ExamPrepStudent = ExamSupportStudent & {
  supportType: "Exam Prep";
};

export type EndToEndSupportStudent = ExamSupportStudent & {
  supportType: "End-to-End Exam Support";
};
