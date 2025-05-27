import EditExamPrepForm from "@/app/ui/exam-prep/edit-form";
import Breadcrumbs from "@/app/ui/exam-prep/breadcrumps";
import { fetchExamPrepById, fetchStudents } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { StudentBasic } from "@/app/lib/definitions";

export const metadata: Metadata = {
  title: "Edit Exam Prep Student",
};
type Params = Promise<{ id: string }>;
export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  const [studentData, assistants] = await Promise.all([
    fetchExamPrepById(id),
    fetchStudents(),
  ]);

  if (!studentData) {
    notFound();
  }
console.log("Params:", params);
console.log("Student Data:", studentData);
console.log("Assistants:", assistants);
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
