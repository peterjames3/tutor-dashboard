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
import CurrentDate from "@/app/ui/dashboard/date";
//import Navbar from "@/app/ui/dashboard/navbar";
export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  return (
    <main>
      {/* <Navbar /> */}
      <div className="flex justify-between items-center w-full">
        <h1 className=" my-7 headline font-semibold">Dashboard</h1>
        <CurrentDate />
      </div>
      
      <div className=" grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6">
        <h2 className="title font-medium">Services Offered</h2>
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
