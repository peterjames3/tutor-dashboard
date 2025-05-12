"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, ChevronDown, ChevronUp, Settings, LogOut } from "lucide-react";
import Notification from "./notification";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isnotificationOpen, setIsNotificationOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleNotification = () => {
    setIsNotificationOpen(!isnotificationOpen);
  };

  const links = [
    { name: "Settings", href: "dashboard/settings", Icon: Settings },
    // { name: "Logout", href: "/logout", Icon: LogOut },
  ];

  return (
    <header className=" flex w-full items-center justify-between px-4 py-2 bg-white border-b border-accent2">
      <div className=" relative w-full flex items-center justify-between">
        <button
          onClick={toggleNotification}
          type="button"
          className="  flex items-center gap-2 hover:bg-accent2 p-2 rounded-lg   transition-all duration-200 ease-in-out cursor-pointer "
        >
          <Bell className="text-primary" />
          <span className="text-label text-primary font-medium">
            Notifications
          </span>
          <nav className="absolute size-8 top-0 left-32 text-cardBg bg-error p-2 rounded-full text-sm font-medium flex items-center justify-center">
            3
          </nav>
        </button>
        <div>{isnotificationOpen && <Notification />}</div>

        <div className="flex items-center gap-3 hover:bg-accent2  rounded-lg   transition-all duration-200 ease-in-out p-2 ">
          <Image
            src="/image-avatar.png"
            alt="Avatar"
            width={80}
            height={80}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-label text-primary font-medium">John Doe</span>
          {isOpen ? (
            <ChevronUp
              className="text-primary cursor-pointer"
              onClick={toggleDropdown}
            />
          ) : (
            <ChevronDown
              className="text-primary cursor-pointer"
              onClick={toggleDropdown}
            />
          )}
          <div>
            {isOpen && (
              <div className="absolute right-3 top-16 w-[190px] bg-notificationBg border-b border-notification-hovered rounded-lg shadow-lg ">
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
                <div className="border-t p-4 text-error border-notification-hovered flex gap-2 items-center hover:bg-notification-hovered cursor-pointer rounded-b-lg">
                  <LogOut className="text-error" />
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
