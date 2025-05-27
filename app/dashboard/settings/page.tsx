import { Metadata } from "next";
//import AdminInfo from "@/app/ui/settings/admin-infor";
import { ChevronRight } from "lucide-react";
import CardWrapper from "@/app/ui/settings/cards";
import Link from "next/link";
import ProfileSetting from "@/app/ui/settings/profile-edit-form";
import PasswordSetting from "@/app/ui/settings/password-edit-form";
import { fetchUser } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function Page() {
  const user = await fetchUser();

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
      <div className="w-full flex  flex-col-reverse xl:flex-row items-start justify-between gap-10">
        <div className="w-full xl:w-[65%] flex flex-col gap-10 ">
          <div className="flex flex-col gap-3">
            <ProfileSetting user={user[0]} />
          </div>
          <div className="flex flex-col gap-3">
            <PasswordSetting userId={user[0].id} />
          </div>
        </div>
        <div className="w-full xl:w-[30%] ">
          <CardWrapper />
        </div>
      </div>
  
    </section>
  );
}
