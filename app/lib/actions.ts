"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import  bcrypt  from  'bcryptjs';
// import { signIn } from "@/auth";
// import { AuthError } from "next-auth";
import {
  FormSchema,
  ProfileSchema,
  PasswordSchema,
  type State,
  type ProfileState,
  type PasswordState,
} from "./definitions";

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
  } catch (error) {
    console.log(`Sql error : ${error}`);
    console.log("SQL Error in updateExamSupport:", error);
    return {
      message: `Database Error: Failed to Update Profile: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}
export const changePassword = async (
  prevState: ProfileState,
  formData: FormData
): Promise<PasswordState> => {
  const rowFormData = {
    userId: formData.get("userId"),
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  };

  try {
    const validatedData = PasswordSchema.parse(rowFormData);
    const hashedPassword = await bcrypt.h.hasg

    // Here you would typically hash the new password and update it in the database
    // For demonstration, we'll just log it
    console.log("Updating password for user:", validatedData.userId);
    console.log("New password:", validatedData.newPassword);

    // Simulate a database update
    await sql`
      UPDATE users
      SET 
        password = ${validatedData.newPassword} -- This should be hashed in a real application
      WHERE id = ${validatedData.userId}
    `;

    revalidatePath("dashboard/settings");
    return { status: "success", message: "Password updated successfully" };
  } catch (error) {
    console.log(`Sql error : ${error}`);
    return {
      status: "error",
      message: `Database Error: Failed to Update Password: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
};
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
