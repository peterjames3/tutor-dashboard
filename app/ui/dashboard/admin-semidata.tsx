// app/dashboard/components/AdminSemidata.tsx
"use client";

import useSWR from "swr";
import Image from "next/image";
import { fetchUser } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";

export default function AdminSemidata() {
  const {
    data: users,
    error,
    isLoading,
  } = useSWR<User[]>("adminUser", fetchUser);


  if (error) {
    return (
      <div className="flex items-center gap-2">
        <Image
          src="/image-avatar.png"
          alt="Admin Avatar"
          height={80}
          width={80}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col text-error">
          <p className="text-label font-semibold text-primary">
            Error: {error.message}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading || !users || users.length === 0) {
    return (
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
            {isLoading ? "Loading..." : "No users found"}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      {users.map((user: User) => (
        <div key={user.id} className="flex items-center gap-2">
          <Image
            src={user.imageurl || "/image-avatar.png"}
            alt="Admin Avatar"
            height={80}
            width={80}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <h2 className="text-label font-semibold text-primary">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
