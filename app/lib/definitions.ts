import { z } from "zod";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  imageurl: string;
};
// Client-safe version without sensitive fields
export type SafeUser = Omit<User, "password" | "email">;

export type StudentLevel = "High School" | "A-Level" | "College";

export type StudentStatus = "Pending" | "In Progress" | "Completed";

export type SupportType = "Tutoring" | "Exam Prep" | "End-to-End Exam Support";

export type Student = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  level: StudentLevel;
  exam: string;
  subject: string;
  exam_date: string;

  assistant: string;
  status: StudentStatus;
  support_type: string;
};

export type StudentBasic = {
  id: string;
  name: string;
};

export interface BaseStudent {
  name: string;
  email: string;
  phone: string;
  level: StudentLevel;
  subject_help: string;
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
  id?: string;
  name: string;
  email: string;
  phone_number: string;
  level: StudentLevel;
  exam: string;
  subject: string;
  exam_date: string;
  assistant: string;
  status: StudentStatus;
  support_type: string;
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

export type PasswordState = {
  status: string;
  message: string | null;
  errors?: {
    currentPassword?: string[];
    newPassword?: string[];
    confirmPassword?: string[];
  };
};

export const ProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

export const PasswordSchema = z
  .object({
    userId: z.string(),
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  // Add this new refinement to prevent same password
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });
