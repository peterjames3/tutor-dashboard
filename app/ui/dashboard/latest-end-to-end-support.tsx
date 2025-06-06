import { RefreshCcw } from "lucide-react";
import clsx from "clsx";
import { fetchEndToEndSupportSemiData, fetchCardData } from "@/app/lib/data";
export default async function LatestExamSupport() {
  const examPrepStudents = await fetchEndToEndSupportSemiData();
   const examPrepCount = await fetchCardData();
  return (
    <div className="w-full flex flex-col gap-4 border border-tertiary rounded-lg ">
      <div className=" w-full px-3 py-2">
        <div className="flex justify-between items-center w-full  mb-3">
          <nav className="title text-primary font-medium">
            End-to-End Exam Support
          </nav>
          <nav className=" rounded-full  px-4 py-2 bg-accent">
            <span className="text-label text-left font-normal text-primary">
               {examPrepCount.examPrepCount} students 
            </span>
          </nav>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto  min-w-[1040px] ">
            <thead>
              <tr>
                {[
                  "Student",
                  "Phone",
                  "Level",
                  "Exam",
                  "Subject",
                  "Assistant",
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
            <tbody>
              {examPrepStudents.map((student, index) => (
                <tr
                  key={index}
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
                  <td className="px-4 py-3">{student.phone_number}</td>
                  <td className="px-4 py-3">{student.level}</td>
                  <td className="px-4 py-3">{student.exam}</td>
                  <td className="px-4 py-3">{student.subject}</td>
                  <td className="px-4 py-3">{student.assistant}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex gap-2 items-center  pl-3 py-2">
        <button
          className={clsx(
            "p-2 rounded-md hover:bg-accent/10 transition-colors",
            "text-primary"
          )}
        >
          <RefreshCcw className="text-gray-500" />
        </button>
        <p className="text-label font-normal text-gray-500">Updated just now</p>
      </div>
    </div>
  );
}
