import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const result = await sql`SELECT name, email FROM users`;
    return NextResponse.json({ data: result.rows });
  } catch (error: unknown) {
    console.error("❌ Failed to fetch user:");
    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);

      console.error("Cause:", error.cause);
      console.error("Full Error Object:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: "Failed to fetch user", message: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { error: "Failed to fetch user", message: "Unknown error" },
        { status: 500 }
      );
    }
  }
}
