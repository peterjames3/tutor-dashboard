import { z } from "zod";
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

export const FormSchema = z.object({
  id: z.string(),
  studentId: z.string({
    invalid_type_error: "Please select a student",
  }),
  assistant: z.string({
    invalid_type_error: "Please select an assistant",
  }),
  status: z.enum(["Pending", "In Progress", "Completed"], {
    invalid_type_error: "Please select a valid status.",
  }),
  date: z.string(),
});

export type State = {
  errors?: {
    studentId?: string[];
    assistant?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type ProfileState = {
  message: string | null;
  errors?: {
    avatar?: string[];
    firstName?: string[];
    lastName?: string[];
    email?: string[];
  };
};

export const ProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

