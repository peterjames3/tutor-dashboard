import { CircleCheckBig, Clock, Loader2 } from "lucide-react";
import clsx from "clsx";

export default function ExamPrepStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        {
          "bg-yellow-100 text-yellow-800": status === "Pending",
          "bg-blue-100 text-blue-800": status === "In Progress",
          "bg-green-100 text-green-800": status === "Completed",
        }
      )}
    >
      {status === "Pending" && (
        <>
          Pending
          <Clock className="ml-1 w-3 h-3" />
        </>
      )}
      {status === "In Progress" && (
        <>
          In Progress
          <Loader2 className="ml-1 w-3 h-3 animate-spin " />
        </>
      )}
      {status === "Completed" && (
        <>
          Completed
          <CircleCheckBig className="ml-1 w-3 h-3" />
        </>
      )}
    </span>
  );
}
