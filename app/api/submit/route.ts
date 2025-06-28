import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { z } from "zod";

// Zod validation schema
const StudentSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone_number: z.string(),
  level: z.string(),
  support_type: z.enum(["Exam Prep", "Tutoring", "End to End Exam Support"]),
  assistant: z.string().optional().default("Liam Martin"),
  status: z.string().optional().default("Pending"),

  // For Exam Prep + End to End
  exam: z.string().optional(),
  subject: z.string().optional(),
  exam_date: z.string().optional(),

  // For Tutoring
  //subject_help: z.string().optional(),
  start_date: z.string().optional(),
});

export async function GET() {
  return NextResponse.json({
    message: "POST endpoint for submitting student info",
  });
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = StudentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      phone_number,
      level,
      support_type,
      assistant,
      status,
      exam,
      subject,
      exam_date,

      start_date,
    } = parsed.data;

    if (support_type === "Exam Prep") {
      await sql`
        INSERT INTO exam_prep_students (
          name, email, phone_number, level, exam, subject, exam_date, assistant, status, support_type
        )
        VALUES (
          ${name}, ${email}, ${phone_number}, ${level},
          ${exam}, ${subject}, ${exam_date}, ${assistant}, ${status}, ${support_type}
        )
      `;
    } else if (support_type === "Tutoring") {
      await sql`
        INSERT INTO tutoring_students (
          name, email, phone_number, level, subject_help, subject, start_date, assistant, status, support_type
        )
        VALUES (
          ${name}, ${email}, ${phone_number}, ${level},
           ${subject}, ${start_date}, ${assistant}, ${status}, ${support_type}
        )
      `;
    } else if (support_type === "End to End Exam Support") {
      await sql`
        INSERT INTO end_to_end_support_students (
          name, email, phone_number, level, exam, subject, exam_date, assistant, status, support_type
        )
        VALUES (
          ${name}, ${email}, ${phone_number}, ${level},
          ${exam}, ${subject}, ${exam_date}, ${assistant}, ${status}, ${support_type}
        )
      `;
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Form submission failed:", error);
    return NextResponse.json(
      {
        error: "Form submission failed",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
