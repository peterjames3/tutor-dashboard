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

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://testhelpnow.com",
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
      secure: process.env.EMAIL_SECURE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    } as import("nodemailer/lib/smtp-transport").Options);

    // ✅ 1. Send notification to admin
    await transporter.sendMail({
      from: `"TestHelpNow" <${process.env.EMAIL_USER}>`,
      to: "info@testhelpnow.com, testprep952@gmail.com",
      subject: `📩 New Student Application - ${support_type}`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background: #fafafa;">
      <h2 style="color: #2c3e50; margin-bottom: 15px;">📩 New Application Received</h2>
      
      <p style="font-size: 15px; margin: 8px 0;"><strong>Name:</strong> ${name}</p>
      <p style="font-size: 15px; margin: 8px 0;"><strong>Email:</strong> ${email}</p>
      <p style="font-size: 15px; margin: 8px 0;"><strong>Phone:</strong> ${phone_number}</p>
      <p style="font-size: 15px; margin: 8px 0;"><strong>Level:</strong> ${level}</p>
  

      <div style="margin: 20px 0; text-align: center;">
        <a href="mailto:${email}?subject=${encodeURIComponent(
        `Re: Your Application for ${support_type}`
      )}&body=${encodeURIComponent(
        `Hello ${name},\n\nThank you for your application for ${support_type}. We have received your details and one of our assistants will contact you shortly.\n\nBest regards,\nTestHelpNow Team`
      )}" 
           style="display: inline-block; padding: 10px 20px; background-color: #27ae60; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">
           📧 Reply to Student
        </a>
         <a href='https://tutor-dashboard-self.vercel.app/' target='_blank' 
           style="display: inline-block; padding: 10px 20px; background-color: #2980b9; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">
           📊 View in Dashboard
        </a>
      </div>

      <hr style="margin: 20px 0;"/>
      <p style="font-size: 13px; color: #888; text-align: center;">
        This is an automated notification from <strong>TestHelpNow</strong>.
      </p>
    </div>
      
      `,
    });

    // ✅ 2. Send auto-reply to student
    await transporter.sendMail({
      from: `"TestHelpNow" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ We received your application",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background: #ffffff;">
      <h2 style="color: #27ae60;">Hello ${name},</h2>
      <p style="font-size: 15px;">Thank you for submitting your application for <strong>${support_type}</strong>.</p>
      <p style="font-size: 15px;">One of our assistants (<strong>${assistant}</strong>) will review your details and contact you shortly.</p>
      <p style="font-size: 15px;">If you have any urgent questions, you can reply to this email, or reach us at 
        <a href="mailto:info@testhelpnow.com" style="color:#2980b9;">info@testhelpnow.com</a>.
      </p>

      <br/>
      <p style="margin: 0; font-size: 15px;">Best regards,</p>
      <p style="margin: 0; font-weight: bold; font-size: 16px; color: #2c3e50;">TestHelpNow Team</p>
      <br/>

      <footer style="margin-top: 20px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 10px;">
        © ${new Date().getFullYear()} TestHelpNow. All rights reserved.  
      </footer>
    </div>
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
