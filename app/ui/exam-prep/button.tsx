import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
//import { deleteInvoice } from "@/app/lib/actions";

export function UpdateExamPrep({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/exam-prep/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Pencil className="w-5" />
    </Link>
  );
}
export function DeleteExamPrep() {
  // const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <form action="#">
      {/* deleteInvoiceWithId */}
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <Trash2 className="w-4" />
      </button>
    </form>
  );
}
