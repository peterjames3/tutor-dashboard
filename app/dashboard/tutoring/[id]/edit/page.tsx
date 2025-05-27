import EditTutoringForm from "@/app/ui/tutoring/edit-form";
import Breadcrumbs from "@/app/ui/exam-prep/breadcrumps";
import { fetchTutoringById, fetchStudents } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Exam Prep Student",
};
type Params = Promise<{ id: string }>;
export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

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
          { label: "Tutoring", href: "/dashboard/tutoring" },
          {
            label: "Edit Tutoring Student",
            href: `/dashboard/tutoring/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditTutoringForm student={studentData} assistants={assistants} />
    </main>
  );
}
