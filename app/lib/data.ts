import { sql } from "@vercel/postgres";
// import {
//   TutoringStudent,
//   ExamSupportStudent,
//   ExamPrepStudent,
//   EndToEndSupportStudent,
// } from "./definitions";

export const fetchCardData = async () => {
  // Define all your promises first
  const tutoringCountPromise = sql`SELECT COUNT(*) FROM tutoring_students`;
  const examSupportCountPromise = sql`SELECT COUNT(*) FROM end_to_end_support_students`;
  const examPrepCountPromise = sql`SELECT COUNT(*) FROM exam_prep_students`;

  // Execute all queries concurrently using Promise.all
  const [tutoringResult, examSupportResult, examPrepResult] = await Promise.all(
    [tutoringCountPromise, examSupportCountPromise, examPrepCountPromise]
  );

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
};
