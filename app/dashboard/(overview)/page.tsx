import { Metadata } from "next";
import { Suspense } from "react";
import {
  EndToEndExamSupportSkeleton,
  TutoringServicesSkeleton,
  ExamPrepSkeleton,
  CardsSkeleton,
} from "@/app/ui/skeletons";
import CardWrapper from "@/app/ui/dashboard/cards";
import LatestExamPrep from "@/app/ui/dashboard/latest-exam-prep";
import LatestTutoringServices from "@/app/ui/dashboard/latest-tutoring-services";
import LatestExamSupport from "@/app/ui/dashboard/latest-end-to-end-support";
export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
      <div className=" grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div>
        <div className=" w-full mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div>
            <Suspense fallback={<ExamPrepSkeleton />}>
              <LatestExamPrep />
            </Suspense>
          </div>

          <div>
            <Suspense fallback={<TutoringServicesSkeleton />}>
              <LatestTutoringServices />
            </Suspense>
          </div>
        </div>
        <div className="mt-12">
          <Suspense fallback={<EndToEndExamSupportSkeleton />}>
            <LatestExamSupport />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
