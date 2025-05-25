"use client";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { updateProfile } from "@/app/lib/actions";
import { ProfileState } from "@/app/lib/definitions";
import Image from "next/image";

export default function ProfileForm({
  user,
}: {
  user: {
    id: string;
    name: string;
    email: string;
    imageurl: string;
  };
}) {
  const initialState: ProfileState = { message: null, errors: {} };
  // const updateUserProfileWithId = updateProfile.bind(null, user.id, );
  const [firstName, lastName] = user.name.split(" ");
  const [state, formAction, isPending] = useActionState(
    updateProfile,
    initialState
  );

  return (
    <section className="bg-tertiary-30 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="userId" value={user.id} />

        <div className="space-y-4">
          {/* Avatar Upload */}
          <div className="flex items-center gap-6">
            <Image
              src="/image-avatar.png"
              alt="Avatar"
              width={80}
              height={80}
              className="rounded-full"
            />
            {/* <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Change Avatar
              </label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-accent2 file:text-button-textColor-disabled hover:file:text-secondary"
                aria-describedby="avatar-error"
              />
              <div id="avatar-error" aria-live="polite" aria-atomic="true">
                {state.errors?.avatar &&
                  state.errors.avatar.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div> */}
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                First Name
              </label>
              <input
                name="firstName"
                defaultValue={firstName}
                className="w-full p-2 border rounded-md"
                aria-describedby="firstName-error"
              />
              <div id="firstName-error" aria-live="polite" aria-atomic="true">
                {state.errors?.firstName &&
                  state.errors.firstName.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Last Name
              </label>
              <input
                name="lastName"
                defaultValue={lastName}
                className="w-full p-2 border rounded-md"
                aria-describedby="lastName-error"
              />
              <div id="lastName-error" aria-live="polite" aria-atomic="true">
                {state.errors?.lastName &&
                  state.errors.lastName.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              defaultValue={user.email}
              className="w-full p-2 border rounded-md"
              aria-describedby="email-error"
            />
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn hover:cursor-pointer"
          disabled={isPending}
        >
          {isPending ? (
            <span className="loader flex items-center gap-3">
              <Loader2 className="ml-1 size-5 animate-spin" /> Saving....
            </span>
          ) : (
            <span>Save Changes</span>
          )}
        </button>

        {/* Form-level Messages */}
        {state.message && (
          <p
            className={`mt-4 text-sm ${
              state.message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </section>
  );
}
