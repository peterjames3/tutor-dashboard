// components/LogoutButton.tsx
"use client";

import { logoutAction } from "@/app/lib/actions"; // adjust path as needed
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md hover:cursor-pointer text-label font-medium md:flex-none md:justify-start "
      >
        <LogOut size={32} className="w-6" />
        <span className="hidden md:block">Sign Out</span>
      </button>
    </form>
  );
}
