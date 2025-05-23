import { fetchUser } from "@/app/lib/data";
import Image from "next/image";
import { User } from "@/app/lib/definitions";

export default async function AdminInfo() {
  const users = await fetchUser();
  console.log(users);
  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mt-2 text-sm text-error">There is no admin available.</p>
      </div>
    );
  }

  return (
    <div className="">
      {users.map((user: User, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <Image
            src={user?.imageurl || "/image-avatar.png"}
            alt="Admin Avatar"
            height={50}
            width={50}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold text-primary">{user?.name}</h2>
            <p className="text-sm text-label">{user?.email}</p>
            <p className="text-sm text-label">{user?.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
