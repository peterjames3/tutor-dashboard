import {
  UpdateExamSupport,
  DeleteExamSupport,
} from "@/app/ui/exam-support/button";
import ExamPrepStatus from "@/app/ui/exam-prep/status";
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchFilteredExamSupport } from "@/app/lib/data";
import clsx from "clsx";

export default async function ExamSupportTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const students = await fetchFilteredExamSupport(query, currentPage);

  return (
    <div className="mt-6 border border-tertiary rounded-lg">
      <div className="w-full overflow-x-auto px-2">
        <table className="w-full table-auto min-w-[1040px]">
          <thead className="mb-4 py-2">
            <tr>
              {[
                "Student",
                "Phone",
                "Level",
                "Subject",
                "Exam",
                "Assistant",
                "Support Type",
                "Exam Date",
                "Status",
              ].map((header) => (
                <th key={header} className="font-medium px-4 py-4 text-left">
                  {header}
                </th>
              ))}
              <th scope="col" className="relative py-3 pl-6 pr-3">
                <span className="text-sm font-bold">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {students?.map((student, index) => (
              <tr
                key={student.id}
                className={clsx(
                  "border-b border-accent2",
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                )}
              >
                <td className="flex gap-2 px-4 py-3">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-label text-primary font-medium">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-label text-primary font-medium">
                      {student.name}
                    </p>
                    <p className="text-label text-gray-500 font-normal">
                      {student.email}
                    </p>
                  </div>
                </td>

                <td className="whitespace-nowrap px-3 py-3">
                  {student.phone_number}
                </td>
                <td className="whitespace-nowrap px-3 py-3">{student.level}</td>

                <td className="whitespace-nowrap px-3 py-3">
                  {student.subject}
                </td>
                <td className="whitespace-nowrap px-3 py-3">{student.exam}</td>
                <td className="whitespace-nowrap px-3 py-3">
                  {student.assistant}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {student.support_type}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {formatDateToLocal(student.exam_date)}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <ExamPrepStatus status={student.status} />
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-3">
                    <UpdateExamSupport id={student.id} />
                    <DeleteExamSupport id={student.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
