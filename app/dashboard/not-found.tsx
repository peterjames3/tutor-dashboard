// app/(dashboard)/not-found.js
import { redirect } from "next/navigation";
//import { getSession } from "@/lib/auth";

export default async function NotFound() {
  //const session = await getSession();

  //   if (session) {
  //     redirect("/dashboard"); // Redirect to dashboard if authenticated
  //   }

  redirect("/"); // Redirect to home if not authenticated
}
