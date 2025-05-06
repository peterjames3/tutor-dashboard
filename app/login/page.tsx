import { GraduationCap } from "lucide-react";
import LoginForm from "@/app/ui/login-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description: "Log in to the Edusion Dashboard",
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center h-screen bg-background">
      <div className="relative mx-auto flex w-full max-w-[490px] flex-col space-y-2.5 md:-mt-32 bg-gray-100  rounded-lg">
        <div className="flex h-35 w-full items-end rounded-lg bg-primary p-3 md:h-45">
          <div className="w-64 text-white md:w-64">
            <div className="flex gap-2 items-center  font-semibold">
              <GraduationCap size={64} className="pr-2  " />{" "}
              <span className="text-3xl">Edusion</span>
            </div>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
