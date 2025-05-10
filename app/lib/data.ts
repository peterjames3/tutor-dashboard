import { sql } from "@vercel/postgres";
// import {
//   TutoringStudent,
//   ExamSupportStudent,
//   ExamPrepStudent,
//   EndToEndSupportStudent,
// } from "./definitions";

export const fetchCardData = async () => {
  try {
    // Define all your promises first
    const tutoringCountPromise = sql`SELECT COUNT(*) FROM tutoring_students`;
    const examSupportCountPromise = sql`SELECT COUNT(*) FROM end_to_end_support_students`;
    const examPrepCountPromise = sql`SELECT COUNT(*) FROM exam_prep_students`;

    // Execute all queries concurrently using Promise.all
    const [tutoringResult, examSupportResult, examPrepResult] =
      await Promise.all([
        tutoringCountPromise,
        examSupportCountPromise,
        examPrepCountPromise,
      ]);

    // Process results
    return {
      tutoringCount: Number(tutoringResult.rows[0].count),
      examSupportCount: Number(examSupportResult.rows[0].count),
      examPrepCount: Number(examPrepResult.rows[0].count),
      totalStudents:
        Number(tutoringResult.rows[0].count) +
        Number(examSupportResult.rows[0].count) +
        Number(examPrepResult.rows[0].count),
    };
  } catch (error) {
    console.error("Error fetching card data:", error);
    throw new Error("Failed to fetch card data");
  }
};

export const fetchExamPrepSemiData = async () => {
  try {
    const result = await sql`SELECT 
    name, 
    email,
    exam,
    level
     As subject FROM exam_prep_students
    ORDER BY id Desc
    LIMIT 5`;
    return result.rows;
  } catch (error) {
    console.error("Error fetching exam prep semi data:", error);
    throw new Error("Failed to fetch exam prep semi data");
  }
};
export const fetchTutoringSemiData = async () => {
  try {
    const result = await sql`SELECT 
    name,
    email,
    level,
    subject As subject FROM tutoring_students
    ORDER BY id Desc
    LIMIT 5`;
    return result.rows;
  } catch (error) {
    console.error("Error fetching exam support semi data:", error);
    throw new Error("Failed to fetch exam support semi data");
  }
};

export const fetchEndToEndSupportSemiData = async () => {
  try {
    const result = await sql`SELECT 
    name,
    email,
    phone_number,
    exam,
    level,
    exam_date,
    assistant,
    status,
    assistant,
    subject As subject FROM end_to_end_support_students
    ORDER BY id Desc
    LIMIT 5`;
    return result.rows;
  } catch (error) {
    console.error("Error fetching exam support semi data:", error);
    throw new Error("Failed to fetch exam support semi data");
  }
};
