import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone_number,
      level,
      support_type,
      assistant = "Liam Martin",
      status = "Pending",

      // Exam Prep + End to End
      exam,
      subject,
      exam_date,

      // Tutoring
      subject_help,
      start_date,
    } = body;

    if (support_type === "Exam Prep") {
      await sql`
        INSERT INTO exam_prep_students 
        (name, email, phone_number, level, exam, subject, exam_date, assistant, status, support_type)
        VALUES (
          ${name}, ${email}, ${phone_number}, ${level},
          ${exam}, ${subject}, ${exam_date}, ${assistant}, ${status}, ${support_type}
        );
      `;
    } else if (support_type === "Tutoring") {
      await sql`
        INSERT INTO tutoring_students 
        (name, email, phone_number, level, subject_help, subject, start_date, assistant, status, support_type)
        VALUES (
          ${name}, ${email}, ${phone_number}, ${level},
          ${subject_help}, ${subject}, ${start_date}, ${assistant}, ${status}, ${support_type}
        );
      `;
    } else if (support_type === "End to End Exam Support") {
      await sql`
        INSERT INTO end_to_end_support_students 
        (name, email, phone_number, level, exam, subject, exam_date, assistant, status, support_type)
        VALUES (
          ${name}, ${email}, ${phone_number}, ${level},
          ${exam}, ${subject}, ${exam_date}, ${assistant}, ${status}, ${support_type}
        );
      `;
    } else {
      return NextResponse.json(
        { error: "Invalid support_type" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Form submission failed:", error);
    return NextResponse.json(
      { error: "Form submission failed" },
      { status: 500 }
    );
  }
}
