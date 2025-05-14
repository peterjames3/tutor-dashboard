import { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/exam-prep/pagination";
import ExamPrepTable from "@/app/ui/exam-prep/table";
import { CreateExamPrep } from "@/app/ui/exam-prep/button";
import { Suspense } from "react";
import { EndToEndExamSupportSkeleton } from "@/app/ui/skeletons";
import { fetchExamPrepPages } from "@/app/lib/data";
export const metadata: Metadata = {
  title: "Exam Prep",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchExamPrepPages(query);
  return (
    <div>
      <header className="mb-4 space-y-4">
        <ul className="flex gap-[4px] items-center p-text font-normal text-primary">
          <li className="  hover:text-secondary ">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <ChevronRight className="font-normal text-primary" />
          </li>
          <li>Exam Prep</li>
        </ul>
        <h1 className=" headline font-semibold ">Exam Preparation</h1>
        <p className="p-text">Manage all Clients information and enrollment</p>
      </header>

      <div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search students..." />
          <CreateExamPrep />
        </div>
        <Suspense
          key={query + currentPage}
          fallback={<EndToEndExamSupportSkeleton />}
        >
          <ExamPrepTable query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
