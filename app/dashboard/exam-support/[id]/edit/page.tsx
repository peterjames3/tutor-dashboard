import EditExamSupportForm from "@/app/ui/exam-support/edit-form";
import Breadcrumbs from "@/app/ui/exam-prep/breadcrumps";
import { fetchExamSupportById, fetchStudents } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Exam Support Student",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const [studentData, assistants] = await Promise.all([
    fetchExamSupportById(id),
    fetchStudents(),
  ]);

  if (!studentData) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Exam Support", href: "/dashboard/exam-support" },
          {
            label: "Edit  Student",
            href: `/dashboard/exam-support/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditExamSupportForm student={studentData} assistants={assistants} />
    </main>
  );
}
