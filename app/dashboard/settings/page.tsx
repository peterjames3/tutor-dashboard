import { Metadata } from "next";
import AdminInfo from "@/app/ui/settings/admin-infor";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Settings",
};

export default async function Page() {
  return (
    <section>
      <header className="mb-4 space-y-4">
        <ul className="flex gap-[4px] items-center p-text font-normal text-primary">
          <li className="  hover:text-secondary ">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <ChevronRight className="font-normal text-primary" />
          </li>
          <li>Settings</li>
        </ul>
        <h1 className=" headline font-semibold ">Settings</h1>
        <p className="p-text">Manage profile settings</p>
      </header>
      <AdminInfo />
    </section>
  );
}
