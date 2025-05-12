import { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Exam Support",
};

export default async function Page() {
  return (
    <main>
      <header className="mb-4 space-y-4">
        <ul className="flex gap-[4px] items-center p-text font-normal text-primary">
          <li className="  hover:text-secondary ">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <ChevronRight className="font-normal text-primary" />
          </li>
          <li>Exam Support</li>
        </ul>
        <h1 className=" text-xl md:text-2xl">Exam Support</h1>
        <p className="p-text">Manage all Clients information and enrollment</p>
      </header>
    </main>
  );
}
