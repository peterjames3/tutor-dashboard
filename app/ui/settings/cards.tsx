import { fetchUser } from "@/app/lib/data";
import Image from "next/image";

export default async function CardWrapper() {
  const user = await fetchUser();
  return (
    <>
      <Card
        title={user[0]?.name}
        email={user[0]?.email}
        role={user[0]?.role}
        imageurl={user[0]?.imageurl}
      />
    </>
  );
}

export const Card = ({
  title,
  email,
  role,
  imageurl,
}: {
  title: string;
  email: string;
  role: string;
  imageurl: string;
}) => {
  return (
    <section className=" rounded-lg shadow-md px-4 py-6 bg-tertiary-30">
      <h2 className="title font-semibold">Profile Information</h2>
      <div className="flex gap-6 items-center mt-2">
        <figure className="w-22 h-22 rounded-full bg-accent flex items-center justify-center">
          <Image
            src={imageurl || "/image-avatar.png"}
            alt="Admin Avatar"
            height={100}
            width={100}
            className="w-14 h-14 rounded-full"
          />
        </figure>
        <article className="flex flex-col">
          <h3 className=" text-primary ">
            Name: <span className="font-medium p-text"> {title}</span>
          </h3>
          <p className="p-text ">
            Email: <span className="font-medium">{email}</span>
          </p>

          <p className="p-text">
            Role: <span className="font-medium">{role}</span>
          </p>
        </article>
      </div>
    </section>
  );
};
