import { UpdateExamPrep, DeleteExamPrep } from "@/app/ui/exam-prep/button";
import ExamPrepStatus from "@/app/ui/exam-prep/status";
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchFilteredExamPrep } from "@/app/lib/data";
import clsx from "clsx";

export default async function ExamPrepTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const students = await fetchFilteredExamPrep(query, currentPage);

  return (
    <div className="mt-6 flow-root  border border-tertiary rounded-lg p-3">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* <div className="md:hidden">
            {students?.map((student) => (
              <div
                key={student.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-lg font-medium">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>
                  <ExamPrepStatus status={student.status} />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <p className="text-sm font-medium">Exam</p>
                    <p className="text-sm">{student.exam}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Subject</p>
                    <p className="text-sm">{student.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Exam Date</p>
                    <p className="text-sm">
                      {formatDateToLocal(student.exam_date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Assistant</p>
                    <p className="text-sm">{student.assistant}</p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <UpdateExamPrep id={student.id} />
                  <DeleteExamPrep id={student.id} />
                </div>
              </div>
            ))}
          </div> */}
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto min-w-[1040px]">
              <thead className="mb-4 ">
                <tr>
                  {[
                    "Student",
                    "Phone",
                    "Level",
                    "Exam",
                    "Subject",
                    "Status",
                    "Assistant",
                    "Support Type",
                    "Exam Date",
                  ].map((header) => (
                    <th
                      key={header}
                      className="border-b font-medium border-accent2 px-4 py-2 text-left"
                    >
                      {header}
                    </th>
                  ))}
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
                    <td className="flex  gap-2 px-4 py-3">
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
                    <td className="whitespace-nowrap px-3 py-3">
                      {student.exam}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {student.level}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {student.subject}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {student.status}
                    </td>
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
                        <UpdateExamPrep id={student.id} />
                        <DeleteExamPrep id={student.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
