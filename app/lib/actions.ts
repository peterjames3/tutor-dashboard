"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { signIn } from "@/auth";
// import { AuthError } from "next-auth";
import {
  FormSchema,
  ProfileSchema,
  type State,
  type ProfileState,
} from "./definitions";

// const FormSchema = z.object({
//   id: z.string(),
//   studentId: z.string({
//     invalid_type_error: "Please select a student",
//   }),
//   assistant: z.string({
//     invalid_type_error: "Please select an assistant",
//   }),
//   status: z.enum(["Pending", "In Progress", "Completed"], {
//     invalid_type_error: "Please select a valid status.",
//   }),
//   date: z.string(),
// });

// export type State = {
//   errors?: {
//     studentId?: string[];
//     assistant?: string[];
//     status?: string[];
//   };
//   message?: string | null;
// };
// export type ProfileState = {
//   message: string | null;
//   errors?: {
//     avatar?: string[];
//     firstName?: string[];
//     lastName?: string[];
//     email?: string[];
//   };
// };
// export const ProfileSchema = z.object({
//   firstName: z.string().min(1, "First name is required"),
//   lastName: z.string().min(1, "Last name is required"),
//   email: z.string().email("Invalid email address"),
// });

// export const PasswordSchema = z
//   .object({
//     currentPassword: z
//       .string()
//       .min(8, "Password must be at least 8 characters"),
//     newPassword: z
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .regex(/[A-Z]/, "Must contain at least one uppercase letter")
//       .regex(/[a-z]/, "Must contain at least one lowercase letter")
//       .regex(/[0-9]/, "Must contain at least one number"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.newPassword === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });

const UpdateExamPrep = FormSchema.omit({ id: true, date: true });

export async function updateProfile(
  prevState: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const rawFormData = {
    userId: formData.get("userId"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    avatar: formData.get("avatar"),
  };

  try {
    const validatedData = ProfileSchema.parse(rawFormData);

    await sql`
      UPDATE users
      SET 
        name = ${`${validatedData.firstName} ${validatedData.lastName}`},
        email = ${validatedData.email},
        imageurl = ${rawFormData.avatar?.toString() || ""}
      WHERE id = ${rawFormData.userId?.toString()}
    `;

    revalidatePath("dashboard/settings");
    return { message: "Profile updated successfully" };
  } catch {
    return {
      message: "Database Error: Failed to Update profile",
    };
  }
}
export const changePassword = async () => {};
export async function updateExamPrep(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateExamPrep.safeParse({
    studentId: formData.get("studentId"),
    assistant: formData.get("assistant"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Student.",
    };
  }

  const { assistant, status } = validatedFields.data;

  try {
    await sql`
      UPDATE exam_prep_students
      SET 
        assistant = ${assistant},
        status = ${status},
        updated_at = NOW()
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log("SQL Error in updateExamPrep:", error);
    return {
      message: `Database Error: Failed to Update Student: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }

  revalidatePath("/dashboard/exam-prep");
  redirect("/dashboard/exam-prep");
}

export async function deleteExamPrep(id: string) {
  try {
    await sql`DELETE FROM exam_prep_students WHERE id = ${id}`;
  } catch {
    throw new Error("Database Error: Failed to Delete Student");
  }

  revalidatePath("/dashboard/exam-prep");
}

export async function assignAssistant(studentId: string, assistantId: string) {
  try {
    await sql`
      UPDATE exam_prep_students
      SET 
        assistant = ${assistantId},
        updated_at = NOW()
      WHERE id = ${studentId}
    `;
    revalidatePath("/dashboard/exam-prep");
    return { success: true };
  } catch {
    return {
      message: "Database Error: Failed to Assign Assistant",
    };
  }
}

export async function updateStudentStatus(
  studentId: string,
  status: "Pending" | "In Progress" | "Completed"
) {
  try {
    await sql`
      UPDATE exam_prep_students
      SET 
        status = ${status},
        updated_at = NOW()
      WHERE id = ${studentId}
    `;
    revalidatePath("/dashboard/exam-prep");
    return { success: true };
  } catch {
    return {
      message: "Database Error: Failed to Update Status",
    };
  }
}

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData
// ) {
//   try {
//     await signIn("credentials", formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return "Invalid credentials.";
//         default:
//           return "Something went wrong.";
//       }
//     }
//     throw error;
//   }
// }

const UpdateTutoring = FormSchema.omit({ id: true, date: true });

export async function updateTutoring(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateTutoring.safeParse({
    studentId: formData.get("studentId"),
    assistant: formData.get("assistant"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Student.",
    };
  }

  const { assistant, status } = validatedFields.data;

  try {
    await sql`
      UPDATE tutoring_students
      SET 
        assistant = ${assistant},
        status = ${status},
        updated_at = NOW()
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log("SQL Error in updateExamPrep:", error);
    return {
      message: `Database Error: Failed to Update Student: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }

  revalidatePath("/dashboard/tutoring");
  redirect("/dashboard/tutoring");
}

export async function deleteTutoring(id: string) {
  try {
    await sql`DELETE FROM tutoring_students WHERE id = ${id}`;
  } catch {
    throw new Error("Database Error: Failed to Delete Student");
  }

  revalidatePath("/dashboard/exam-prep");
}

export async function assignAssistantTutoring(
  studentId: string,
  assistantId: string
) {
  try {
    await sql`
      UPDATE tutoring_students
      SET 
        assistant = ${assistantId},
        updated_at = NOW()
      WHERE id = ${studentId}
    `;
    revalidatePath("/dashboard/tutoring");
    return { success: true };
  } catch {
    return {
      message: "Database Error: Failed to Assign Assistant",
    };
  }
}

export async function updateStudentStatusTutoring(
  studentId: string,
  status: "Pending" | "In Progress" | "Completed"
) {
  try {
    await sql`
      UPDATE tutoring_students
      SET 
        status = ${status},
        updated_at = NOW()
      WHERE id = ${studentId}
    `;
    revalidatePath("/dashboard/tutoring");
    return { success: true };
  } catch {
    return {
      message: "Database Error: Failed to Update Status",
    };
  }
}

//exam support actions
const UpdateExamSupport = FormSchema.omit({ id: true, date: true });

export async function updateExamSupport(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateExamSupport.safeParse({
    studentId: formData.get("studentId"),
    assistant: formData.get("assistant"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Student.",
    };
  }

  const { assistant, status } = validatedFields.data;

  try {
    await sql`
      UPDATE end_to_end_support_students
      SET 
        assistant = ${assistant},
        status = ${status},
        updated_at = NOW()
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log("SQL Error in updateExamSupport:", error);
    return {
      message: `Database Error: Failed to Update Student: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }

  revalidatePath("/dashboard/exam-support");
  redirect("/dashboard/exam-support");
}

export async function deleteExamSupport(id: string) {
  try {
    await sql`DELETE FROM end_to_end_support_students WHERE id = ${id}`;
  } catch {
    throw new Error("Database Error: Failed to Delete Student");
  }

  revalidatePath("/dashboard/exam-support");
}

export async function assignAssistantExamSupport(
  studentId: string,
  assistantId: string
) {
  try {
    await sql`
      UPDATE end_to_end_support_students
      SET 
        assistant = ${assistantId},
        updated_at = NOW()
      WHERE id = ${studentId}
    `;
    revalidatePath("/dashboard/exam-support");
    return { success: true };
  } catch {
    return {
      message: "Database Error: Failed to Assign Assistant",
    };
  }
}

export async function updateStudentStatusExamSupport(
  studentId: string,
  status: "Pending" | "In Progress" | "Completed"
) {
  try {
    await sql`
      UPDATE end_to_end_support_students
      SET 
        status = ${status},
        updated_at = NOW()
      WHERE id = ${studentId}
    `;
    revalidatePath("/dashboard/exam-support");
    return { success: true };
  } catch {
    return {
      message: "Database Error: Failed to Update Status",
    };
  }
}
