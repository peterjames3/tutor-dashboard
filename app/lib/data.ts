import { sql } from "@vercel/postgres";
// import {
//   TutoringStudent,
//   ExamSupportStudent,
//   ExamPrepStudent,
//   EndToEndSupportStudent,
// } from "./definitions";
import { ExamSupportForm } from "./definitions";
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

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredExamPrep(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const students = await sql`
      SELECT
        id,
        name,
        email,
        phone_number,
        level,
        exam,
        subject,
        exam_date,
        assistant,
        support_type,
        status
      FROM exam_prep_students
      WHERE
        name ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`} OR
        exam ILIKE ${`%${query}%`} OR
        subject ILIKE ${`%${query}%`} OR
        assistant ILIKE ${`%${query}%`} OR
        status ILIKE ${`%${query}%`}
      ORDER BY exam_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return students.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch exam prep students.");
  }
}

export async function fetchExamPrepPages(query: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM exam_prep_students
      WHERE
        name ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`} OR
        exam ILIKE ${`%${query}%`} OR
        subject ILIKE ${`%${query}%`} OR
        assistant ILIKE ${`%${query}%`} OR
        status ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of exam prep students.");
  }
}

export async function fetchExamPrepById(id: string) {
  try {
    const data = await sql`
      SELECT
        id,
        name,
        email,
        phone_number,
        level,
        exam,
        subject,
        exam_date,
        assistant,
        status,
        support_type
      FROM exam_prep_students
      WHERE id = ${id};
    `;

    const student = data.rows.map((student) => ({
      ...student,
      exam_date: new Date(student.exam_date).toISOString().split("T")[0],
    }));

    return student[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch exam prep student.");
  }
}

export async function fetchStudents() {
  try {
    const data = await sql`
      SELECT id, name FROM exam_prep_students ORDER BY name;
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch students.");
  }
}

export async function fetchFilteredTutoring(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const students = await sql`
      SELECT
        id,
        name,
        email,
        phone_number,
        level,
        subject,
        start_date,
        assistant,
        support_type,
        status
      FROM tutoring_students
      WHERE
        name ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`} OR
        subject ILIKE ${`%${query}%`} OR
        assistant ILIKE ${`%${query}%`} OR
        status ILIKE ${`%${query}%`}
      ORDER BY start_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return students.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tutoring students.");
  }
}

export async function fetchTutoringPages(query: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM tutoring_students
      WHERE
        name ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`} OR
       subject ILIKE ${`%${query}%`} OR
        assistant ILIKE ${`%${query}%`} OR
        status ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: `Database Error: Fa Student: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}

export async function fetchTutoringById(id: string) {
  try {
    const data = await sql`
      SELECT
        id,
        name,
        email,
        phone_number,
        level,
        subject,
        start_date,
        assistant,
        status,
        support_type
      FROM tutoring_students
      WHERE id = ${id};
    `;

    const student = data.rows.map((student) => ({
      ...student,
      start_date: new Date(student.start_date).toISOString().split("T")[0],
    }));

    return student[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tutoring student.");
  }
}

//exam support

export async function fetchFilteredExamSupport(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const students = await sql`
      SELECT
        id,
        name,
        email,
        phone_number,
        level,
        subject,
        exam,
        exam_date,
        assistant,
        support_type,
        status
      FROM end_to_end_support_students
      WHERE
        name ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`} OR
        exam ILIKE ${`%${query}%`} OR
        subject ILIKE ${`%${query}%`} OR
        assistant ILIKE ${`%${query}%`} OR
        status ILIKE ${`%${query}%`}
      ORDER BY exam_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return students.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch exam support students.");
  }
}

export async function fetchExamSupportPages(query: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM end_to_end_support_students
      WHERE
        name ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`} OR
        exam ILIKE ${`%${query}%`} OR
       subject ILIKE ${`%${query}%`} OR
        assistant ILIKE ${`%${query}%`} OR
        status ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: `Database Error: Fetching Exam Support Student: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}

export async function fetchExamSupportById(
  id: string
): Promise<ExamSupportForm> {
  try {
    const data = await sql<ExamSupportForm>`
      SELECT
        id,
        name,
        email,
        phone_number,
        level,
        subject,
        exam,
        exam_date,
        assistant,
        status,
        support_type
      FROM end_to_end_support_students
      WHERE id = ${id};
    `;

    if (data.rows.length === 0) {
      throw new Error("Student not found");
    }

    return {
      ...data.rows[0],
      exam_date: new Date(data.rows[0].exam_date).toISOString().split("T")[0],
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch exam support student.");
  }
}
