import bcrypt from "bcryptjs";
import { db, sql } from "@vercel/postgres";
import {
  users,
  tutoringStudents,
  examPrepStudents,
  endToEndSupportStudents,
} from "../lib/placeholder-data";

// Define a custom SQLClient type for type safety
type SQLClient = {
  sql: typeof sql;
  release: () => void;
};

async function seedUsers(client: SQLClient) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL,
      imageurl TEXT,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, role, imageurl, email, password)
        VALUES (${user.id}, ${user.name}, ${user.role}, ${user.imageurl}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedTutoringStudents(client: SQLClient) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS tutoring_students (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      phone_number VARCHAR(20),
      level TEXT,
      start_date DATE,
      subject TEXT,
      assistant TEXT,
      status TEXT,
      support_type TEXT
    );
  `;

  await Promise.all(
    tutoringStudents.map((student) => {
      return client.sql`
        INSERT INTO tutoring_students (
          name, email, phone_number, level, start_date, subject, assistant, status, support_type
        ) VALUES (
          ${student.name}, ${student.email}, ${student.phone},
          ${student.level}, ${student.startDate.toISOString()}, ${
        student.subjectHelp
      },
          ${student.assistant}, ${student.status}, ${student.supportType}
        )
        ON CONFLICT DO NOTHING;
      `;
    })
  );
}

async function seedExamPrepStudents(client: SQLClient) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS exam_prep_students (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      phone_number VARCHAR(20),
      level TEXT,
      exam TEXT,
      subject TEXT,
      exam_date DATE,
      assistant TEXT,
      status TEXT,
      support_type TEXT
    );
  `;

  await Promise.all(
    examPrepStudents.map((student) => {
      return client.sql`
        INSERT INTO exam_prep_students (
          name, email, phone_number, level, exam, subject,
          exam_date, assistant, status, support_type
        ) VALUES (
          ${student.name}, 
          ${student.email}, 
          ${student.phone},
          ${student.level}, 
          ${student.exam}, 
          ${student.subjectHelp},  // This should match your seed data structure
          ${student.examDate.toISOString()}, 
          ${student.assistant}, 
          ${student.status},
          ${student.supportType}
        )
        ON CONFLICT DO NOTHING;
      `;
    })
  );
}
async function seedEndToEndSupportStudents(client: SQLClient) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS end_to_end_support_students (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      phone_number VARCHAR(20),
      level TEXT,
      exam TEXT,
      subject TEXT,
      exam_date DATE,
      assistant TEXT,
      status TEXT,
      support_type TEXT
    );
  `;

  await Promise.all(
    endToEndSupportStudents.map((student) => {
      return client.sql`
        INSERT INTO end_to_end_support_students (
          name, email, phone_number, level, exam, subject,
          exam_date, assistant, status, support_type
        ) VALUES (
          ${student.name}, ${student.email}, ${student.phone},
          ${student.level}, ${student.exam}, ${student.subjectHelp},
          ${student.examDate.toISOString()}, ${student.assistant}, ${
        student.status
      },
          ${student.supportType}
        )
        ON CONFLICT DO NOTHING;
      `;
    })
  );
}

export async function GET() {
  const connectionString = process.env.POSTGRES_URL;

  if (!connectionString) {
    return new Response("Database connection string is missing.", {
      status: 400,
    });
  }
  const rawClient = await db.connect();
  const client = rawClient as unknown as SQLClient;

  try {
    await seedUsers(client);
    await seedTutoringStudents(client);
    await seedExamPrepStudents(client);
    await seedEndToEndSupportStudents(client);
    await client.sql`COMMIT`;

    return new Response(
      JSON.stringify({ message: "Database seeded successfully" }),
      { status: 200 }
    );
  } catch (error) {
    await client.sql`ROLLBACK`;
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  } finally {
    client.release();
  }
}
