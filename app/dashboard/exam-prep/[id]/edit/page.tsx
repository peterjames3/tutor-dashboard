import EditExamPrepForm from "@/app/ui/exam-prep/edit-form";
import Breadcrumbs from "@/app/ui/exam-prep/breadcrumps";
import { fetchExamPrepById, fetchStudents } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { StudentBasic } from "@/app/lib/definitions";

export const metadata: Metadata = {
  title: "Edit Exam Prep Student",
};

interface PageProps {
  params: {
    id: string;
  };
}
export default async function Page({ params }: PageProps) {
  const id = params.id;

  const [studentData, assistants] = await Promise.all([
    fetchExamPrepById(id),
    fetchStudents(),
  ]);

  if (!studentData) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Exam Prep", href: "/dashboard/exam-prep" },
          {
            label: "Edit Student",
            href: `/dashboard/exam-prep/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditExamPrepForm
        student={studentData}
        assistants={assistants as StudentBasic[]}
      />
    </main>
  );
}
