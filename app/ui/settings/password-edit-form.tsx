"use client";
import { Loader2 } from "lucide-react";
import { useFormState } from "react-dom";
import { changePassword } from "@/app/lib/actions";

export default function PasswordForm({ userId }: { userId: string }) {
  const [state, formAction, isPending] = useFormState(changePassword, {});

  return (
    <section className="bg-tertiary-30 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Security Settings</h2>

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="userId" value={userId} />

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Current Password
            </label>
            <input
              name="currentPassword"
              type="password"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              New Password
            </label>
            <input
              name="newPassword"
              type="password"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm New Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <button type="submit" className="btn hover:cursor-pointer">
          {isPending ? (
            <span className="loader flex items-center gap-2">
              {" "}
              <Loader2 className="ml-1 size-5 animate-spin" />
              Saving Password
            </span>
          ) : (
            <span> Change Password</span>
          )}
        </button>

        {/* {state.message && (
          <p
            className={`mt-4 text-sm ${
              state.message.includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {state.message}
          </p>
        )} */}
      </form>
    </section>
  );
}
