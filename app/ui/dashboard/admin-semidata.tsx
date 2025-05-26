// admin-semidata.tsx - Update component with error handling
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchUser } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";

export default function AdminSemidata() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUser();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load user data");
      }
    };
    
    loadUser();
  }, []);

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error: {error}
      </div>
    );
  }

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
          <h2 className="text-label font-semibold text-primary">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {users.map((user) => (
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