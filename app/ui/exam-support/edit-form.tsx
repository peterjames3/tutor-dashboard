"use client";

import { AssistantField, ExamPrepForm } from "@/app/lib/definitions";
import {
  Clock,
  CheckCircle2,
  UserCircle,
  GraduationCap,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateExamSupport, State } from "@/app/lib/actions";
import { useActionState } from "react";

export default function EditExamSupportForm({
  student,
}: {
  student: ExamPrepForm;
  assistants: AssistantField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateExamSupportWithId = updateExamSupport.bind(null, student.id);
  const [state, formAction, isPending] = useActionState(
    updateExamSupportWithId,
    initialState
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="studentId" value={student.id} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Student Information */}
        <div className="mb-4">
          <label htmlFor="student" className="mb-2 block text-sm font-medium">
            Student Information
          </label>
          <div className="flex items-center gap-3 rounded-md border border-gray-200 p-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">{student.name}</p>
              <p className="text-sm text-gray-500">{student.email}</p>
            </div>
          </div>
        </div>

        {/* Assistant Assignment */}
        <div className="mb-4">
          <label htmlFor="assistant" className="mb-2 block text-sm font-medium">
            Assign Assistant
          </label>
          <div className="relative">
            <input
              id="assistant"
              name="assistant"
              type="text"
              defaultValue={student.assistant}
              placeholder="Enter assistant name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="assistant-error"
            />
            <UserCircle className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="assistant-error" aria-live="polite" aria-atomic="true">
            {state.errors?.assistant &&
              state.errors.assistant.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Status Update */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Update Student Status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="Pending"
                  defaultChecked={student.status === "Pending"}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-800"
                >
                  Pending <Clock className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="in-progress"
                  name="status"
                  type="radio"
                  value="In Progress"
                  defaultChecked={student.status === "In Progress"}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="in-progress"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-800"
                >
                  In Progress <Loader2 className="h-4 w-4 animate-spin" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="completed"
                  name="status"
                  type="radio"
                  value="Completed"
                  defaultChecked={student.status === "Completed"}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="completed"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-800"
                >
                  Completed <CheckCircle2 className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        {/* Display any form-level errors */}
        {state.message && (
          <p className="mt-4 text-sm text-red-500">{state.message}</p>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/exam-support"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" className="btn hover:cursor-pointer">
          {isPending ? "Updating Student ..." : "Update Student"}
        </Button>
      </div>
    </form>
  );
}
