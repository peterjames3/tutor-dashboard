"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center text-primary">Something went wrong!</h2>
      <button onClick={() => reset()} type="button" className="mt-4 btn ">
        Try again
      </button>
    </div>
  );
}
