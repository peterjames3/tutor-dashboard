"use client";

import {
  LayoutDashboard,
  Users,
  Calendar,
  BookOpenText,
  PencilRuler,
  Headset,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation
const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    name: "Clients",
    href: "/dashboard/clients",
    icon: Users,
  },
  { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { name: "Exam Prep", href: "/dashboard/exam-prep", icon: BookOpenText },
  { name: "Tutoring", href: "/dashboard/tutoring", icon: PencilRuler },
  { name: "Exam Support", href: "/dashboard/exam-support", icon: Headset },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function NavLinks() {
  const pathname = usePathname(); // Get the current route

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon; // Access the icon dynamically
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-6 rounded-md bg-default-link p-3 text-sm font-medium hover:bg-hover-link hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-green-600 text-primary hover:bg-green-600":
                  pathname === link.href, // Active state styling
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
