import Link from "next/link";
import { Settings } from "lucide-react";
import Logout from "@/app/ui/dashboard/logout";
export default function UserDropdown() {
  const links = [
    { name: "Settings", href: "/dashboard/settings", Icon: Settings },
  ];

  return (
    <div className="absolute right-0 top-16 w-[190px] bg-cardBg border-b border-notification-hovered rounded-lg shadow-lg">
      <ul className="flex flex-col ">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center gap-2 w-full p-4 hover:bg-notification-hovered rounded-t-lg "
          >
            <link.Icon className="text-primary" />
            <span className="text-label text-primary font-medium">
              {link.name}
            </span>
          </Link>
        ))}
        <div className="border-t px-4 text-error border-notification-hovered hover:bg-notification-hovered flex gap-2 items-center   rounded-b-lg">
          <Logout />
        </div>
      </ul>
    </div>
  );
}
