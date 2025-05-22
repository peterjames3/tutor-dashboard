import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteExamSupport } from "@/app/lib/actions";

export function UpdateExamSupport({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/exam-support/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Pencil className="w-5" />
    </Link>
  );
}

export function DeleteExamSupport({ id }: { id: string }) {
  const deleteExamSupportWithId = deleteExamSupport.bind(null, id);

  return (
    <form action={deleteExamSupportWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <Trash2 className="w-4" />
      </button>
    </form>
  );
}
