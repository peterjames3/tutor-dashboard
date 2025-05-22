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
// export function DeleteTutoring({ id }: { id: string }) {
//   const deleteTutoringWithId = async () => {
//     try {
//       await deleteTutoring(id);
//       // Optional: Add any client-side success handling here
//     } catch (error) {
//       // Handle errors appropriately
//       console.error("Failed to delete tutoring:", error);
//     }
//   };

//   return (
//     <form action={deleteTutoringWithId}>
//       <button
//         type="submit"
//         className="rounded-md border p-2 hover:bg-gray-100 hover:cursor-pointer transition-all delay-300"
//       >
//         <span className="sr-only">Delete</span>
//         <Trash2 className="w-4" />
//       </button>
//     </form>
//   );
// }
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
