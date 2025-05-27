"use server";
import { signOut } from "@/auth";
import { LogOut } from "lucide-react";
export default async function Page() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-default-link p-3 text-sm font-medium hover:bg-hover-link hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3">
        <LogOut size={32} className="w-6" />
        <div className="hidden md:block">Sign Out</div>
      </button>
    </form>
  );
}
