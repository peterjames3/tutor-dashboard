import EditExamPrepForm from "@/app/ui/exam-prep/edit-form";
import Breadcrumbs from "@/app/ui/exam-prep/breadcrumps";
import { fetchTutoringById, fetchStudents } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
//import { ExamPrepForm } from "@/app/lib/definitions";

export const metadata: Metadata = {
  title: "Edit Exam Prep Student",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const [studentData, assistants] = await Promise.all([
    fetchTutoringById(id),
    fetchStudents(),
  ]);

  if (!studentData) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Exam Prep", href: "/dashboard/tutoring" },
          {
            label: "Edit Student",
            href: `/dashboard/tutoring/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditExamPrepForm student={studentData} assistants={assistants} />
    </main>
  );
}
