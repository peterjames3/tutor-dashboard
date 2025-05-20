"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { signIn } from "@/auth";
// import { AuthError } from "next-auth";

const FormSchema = z.object({
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

const UpdateExamPrep = FormSchema.omit({ id: true, date: true });

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
    return {
      message: "Database Error: Failed to Delete Student",
    };
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
