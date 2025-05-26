"use client";
import { Loader2 } from "lucide-react";
import { updatePassword } from "@/app/lib/actions";
import { useActionState, useState } from "react";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import { PasswordState } from "@/app/lib/definitions";

export default function PasswordForm({ userId }: { userId: string }) {
  const [visibility, setVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const initialState: PasswordState = { status: "", message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    updatePassword,
    initialState
  );

  const toggleVisibility = (field: keyof typeof visibility) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <section className="bg-tertiary-30 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Security Settings</h2>

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="userId" value={userId} />

        <div className="space-y-4">
          {/* Current Password */}

          <div className="mt-4 ">
            <div className="flex justify-between items-center">
              <label
                className="mb-3 mt-5 block text-sm font-medium text-gray-900"
                htmlFor="currentPassword"
              >
                Current Password
              </label>
              <div className="text-sm text-error">
                {state.errors?.currentPassword && (
                  <div className="">
                    {state.errors.currentPassword.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-cardBg py-[9px] pl-10 text-sm outline placeholder:text-gray-500"
                id="currentPassword"
                type={visibility.current ? "text" : "password"}
                name="currentPassword"
                placeholder="Enter current password"
                required
                minLength={6}
              />
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-primary peer-focus:text-gray-900" />
              <button
                type="button"
                onClick={() => toggleVisibility("current")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary focus:outline-none cursor-pointer"
                aria-label={
                  visibility.current ? "Hide password" : "Show password"
                }
              >
                {visibility.current ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <label
                className="mb-3 mt-5 block text-sm font-medium text-gray-900"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <div className="text-sm text-error">
                {state.errors?.newPassword && (
                  <div className="">
                    {state.errors.newPassword.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-cardBg py-[9px] pl-10 text-sm outline placeholder:text-gray-500"
                id="newPassword"
                type={visibility.new ? "text" : "password"}
                name="newPassword"
                placeholder="Enter new password"
                required
                minLength={6}
              />
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-primary peer-focus:text-gray-900" />
              <button
                type="button"
                onClick={() => toggleVisibility("new")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary focus:outline-none cursor-pointer"
                aria-label={visibility.new ? "Hide password" : "Show password"}
              >
                {visibility.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <label
                className="mb-3 mt-5 block text-sm font-medium text-gray-900"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="text-sm text-error">
                {state.errors?.confirmPassword && (
                  <div className="">
                    {state.errors.confirmPassword.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-cardBg py-[9px] pl-10 text-sm outline placeholder:text-gray-500"
                id="confirmPassword"
                type={visibility.confirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                required
                minLength={6}
              />
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-primary peer-focus:text-gray-900" />
              <button
                type="button"
                onClick={() => toggleVisibility("confirm")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary focus:outline-none hover:cursor-pointer"
                aria-label={
                  visibility.confirm ? "Hide password" : "Show password"
                }
              >
                {visibility.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn hover:cursor-pointer"
          disabled={isPending}
        >
          {isPending ? (
            <span className="loader flex items-center gap-2">
              <Loader2 className="ml-1 size-5 animate-spin" />
              Saving Password
            </span>
          ) : (
            <span>Change Password</span>
          )}
        </button>
        {/* Form Submission Feedback */}
        {state.message && (
          <p
            className={`text-sm mt-4 ${
              state.status === "success" ? "text-green-600" : "text-red-500"
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </section>
  );
}
