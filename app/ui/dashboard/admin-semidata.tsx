// admin-semidata.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchUser } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";

export default function AdminSemidata() {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    fetchUser().then(setUsers);
  }, []);

  if (!users || users.length === 0) {
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
          <h2 className="text-label font-semibold text-primary">Name: null</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {users.map((user, index) => (
        <div key={index} className="flex items-center gap-2">
          <Image
            src={user?.imageurl || "/image-avatar.png"}
            alt="Admin Avatar"
            height={80}
            width={80}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <h2 className="text-label font-semibold text-primary">
              {user?.name}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}
