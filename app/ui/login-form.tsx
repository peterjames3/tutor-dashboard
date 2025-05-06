"use client";

import {
  MoveRight,
  LockKeyhole,
  GraduationCap,
  Eye,
  Mail,
  EyeOff,
  CircleAlert,
} from "lucide-react";
import { Button } from "@/app/ui/button";
import { useState } from "react";
//import { useActionState } from "react";
//import { authenticate } from "@/app/lib/actions";

export default function LoginForm() {
  //   const [errorMessage, formAction, isPending] = useActionState(
  //     authenticate,
  //     undefined
  //   );

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action="#" className="space-y-3 py-5 ">
      <div className="flex-1 rounded-lg  px-6 pb-4 pt-8">
        <div className="w-full flex items-center justify-center">
          <GraduationCap size={64} className="text-secondary" />
        </div>
        <h1 className=" text-center mb-2 title font-semibold">Welcome Back!</h1>
        <p className=" text-center p-text">Sign in to access your dashboard</p>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-cardBg py-[9px] pl-10 text-sm outline placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-primary peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-cardBg py-[9px] pl-10 text-sm outline placeholder:text-gray-500"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-primary peer-focus:text-gray-900" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-[18px] w-[18px]" />
                ) : (
                  <Eye className="h-[18px] w-[18px]" />
                )}
              </button>
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full btn cursor-pointer">
          Log in <MoveRight className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        {/* <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <CircleAlert className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div> */}
      </div>
    </form>
  );
}
