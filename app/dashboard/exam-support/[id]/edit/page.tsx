import EditExamSupportForm from "@/app/ui/exam-support/edit-form";
import Breadcrumbs from "@/app/ui/exam-prep/breadcrumps";
import { fetchExamSupportById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Exam Support Student",
};

type Params = Promise<{ id: string }>;
export default async function Page({ params }: { params: Params }) {
  const {id} =  await params;

  const [studentData] = await Promise.all([
    fetchExamSupportById(id),
    //fetchStudents(),
  ]);

  if (!studentData) {
    notFound();
  }

  return (
    <section>
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
      <EditExamSupportForm student={studentData} assistants={[]} />
    </section>
  );
}
