import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import nodemailer from "nodemailer";

// ✅ Zod validation schema
const StudentSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone_number: z.string(),
  level: z.string(),
  support_type: z.enum(["Exam Prep", "Tutoring", "End to End Exam Support"]),
  assistant: z.string().optional().default("Liam Martin"),
  status: z.string().optional().default("Pending"),
  exam: z.string().optional(),
  subject: z.string().optional(),
  exam_date: z.string().optional(),
  start_date: z.string().optional(),
});

// ✅ CORS headers
const allowedOrigins = [
  "https://testhelpnow.com",
  "http://localhost:3000",
];
const corsHeaders = {
   "Access-Control-Allow-Origin":   "https://testhelpnow.com",

  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET() {
  return NextResponse.json(
    { message: "POST endpoint for submitting student info" },
    { headers: corsHeaders }
  );
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
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
        { status: 400, headers: corsHeaders }
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

    // ✅ Save to DB
    if (support_type === "Exam Prep") {
      await sql`
        INSERT INTO exam_prep_students (
          name, email, phone_number, level, exam, subject, exam_date, assistant, status, support_type
        )
        VALUES (${name}, ${email}, ${phone_number}, ${level},
          ${exam}, ${subject}, ${exam_date}, ${assistant}, ${status}, ${support_type})
      `;
    } else if (support_type === "Tutoring") {
      await sql`
        INSERT INTO tutoring_students (
          name, email, phone_number, level, subject, start_date, assistant, status, support_type
        )
        VALUES (${name}, ${email}, ${phone_number}, ${level},
          ${subject}, ${start_date}, ${assistant}, ${status}, ${support_type})
      `;
    } else if (support_type === "End to End Exam Support") {
      await sql`
        INSERT INTO end_to_end_support_students (
          name, email, phone_number, level, exam, subject, exam_date, assistant, status, support_type
        )
        VALUES (${name}, ${email}, ${phone_number}, ${level},
          ${exam}, ${subject}, ${exam_date}, ${assistant}, ${status}, ${support_type})
      `;
    }

    // ✅ Nodemailer transporter (Namecheap Private Email)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    } as import("nodemailer/lib/smtp-transport").Options);

    // ✅ 1. Send notification to admin
    await transporter.sendMail({
      from: `"TestHelpNow" <${process.env.EMAIL_USER}>`,
      to: "info@testhelpnow.com, testprep952@gmail.com, RLD9Nc7vvjQm2s@dkimvalidator.com",
      subject: `📩 New Student Application - ${support_type}`,
      html: `
        <h2>New Application Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone_number}</p>
        <p><strong>Level:</strong> ${level}</p>
      
      `,
    });

    // ✅ 2. Send auto-reply to student
    await transporter.sendMail({
      from: `"TestHelpNow" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ We received your application",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for submitting your application for <strong>${support_type}</strong>.</p>
        <p>One of our assistants (${assistant}) will review your details and contact you shortly.</p>
        <p>If you have any urgent questions, reply to this email or call us directly.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>TestHelpNow Team</strong></p>
      `,
    });

    return NextResponse.json(
      { success: true },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Form submission failed:", error);
    return NextResponse.json(
      {
        error: "Form submission failed",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
