import { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/exam-prep/pagination";
import TutoringTable from "@/app/ui/tutoring/table";

import { Suspense } from "react";
import { fetchTutoringPages } from "@/app/lib/data";
import { ExamPrepRouteSkeleton } from "@/app/ui/skeletons";
export const metadata: Metadata = {
  title: "Tutoring",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  const query =
    typeof resolvedSearchParams.query === "string"
      ? resolvedSearchParams.query
      : "";
  const currentPage =
    typeof resolvedSearchParams.page === "string"
      ? Number(resolvedSearchParams.page)
      : 1;

  const totalPagesResult = await fetchTutoringPages(query);
  const totalPages =
    typeof totalPagesResult === "number" ? totalPagesResult : 0;
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
          <li>Tutoring</li>
        </ul>
        <h1 className=" headline font-semibold ">Tutoring</h1>
        <p className="p-text">Manage all Clients information and enrollment</p>
      </header>

      <div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search students..." />
        </div>
        <Suspense
          key={query + currentPage}
          fallback={<ExamPrepRouteSkeleton />}
        >
          <TutoringTable query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
