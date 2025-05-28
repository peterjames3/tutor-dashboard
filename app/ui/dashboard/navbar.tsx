// app/ui/dashboard/navbar.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { Bell, ChevronDown, ChevronUp } from "lucide-react";
import Notification from "./notification";
import UserDropdown from "./user-dropdown";
import { User } from "@/app/lib/definitions";

export default function Navbar({ users }: { users: User[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isnotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleNotification = () => setIsNotificationOpen(!isnotificationOpen);

  return (
    <header className="flex w-full items-center justify-between px-4 py-2 bg-white border-b border-accent2">
      <div className="relative w-full flex items-center justify-between">
        <button
          onClick={toggleNotification}
          type="button"
          className="flex items-center gap-2 hover:bg-accent2 p-2 rounded-lg transition-all duration-200 ease-in-out cursor-pointer"
        >
          <Bell className="text-primary" />
          <span className="text-label text-primary font-medium">
            Notifications
          </span>
          <nav className="absolute size-8 top-0 left-32 text-cardBg bg-error p-2 rounded-full text-sm font-medium flex items-center justify-center">
            3
          </nav>
        </button>

        {isnotificationOpen && <Notification />}

        <div className="flex items-center gap-3 hover:bg-accent2 rounded-lg transition-all duration-200 ease-in-out p-2">
          {/* Render user data directly */}
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className="flex items-center gap-2">
                <Image
                  src={user.imageurl || "/image-avatar.png"}
                  alt="Admin Avatar"
                  height={90}
                  width={90}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex gap-1.5 ">
                  <h2 className="text-label font-semibold text-primary">
                    {user.name}
                  </h2>
                  <p className="text-label text-gray-500">{user.role}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-2">
              <Image
                src="/image-avatar.png"
                alt="Admin Avatar"
                height={80}
                width={80}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <h2 className="text-label font-semibold text-primary">
                  No users found
                </h2>
              </div>
            </div>
          )}

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

          {isOpen && <UserDropdown />}
        </div>
      </div>
    </header>
  );
}
