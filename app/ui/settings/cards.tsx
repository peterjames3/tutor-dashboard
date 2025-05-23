
import { fetchUser } from "@/app/lib/data";



export default async function CardWrapper() {
  const user =
    await fetchUser();
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
  imageurl
 

}: {
  title: string;
  email: string;
  role: string;
  imageurl: string;

}) => {
  return (
    <div className=" flex justify-between items-center rounded-lg shadow-md px-6 py-10 bg-tertiary-30">
      <div className="flex flex-col">
        <h2 className="p-text text-primary">{title}</h2>
        <p className="text-4xl font-bold">{count}</p>
      </div>
      <div className="w-18 h-18 rounded-full bg-accent flex items-center justify-center">
        <Icon className="text-2xl text-primary" />
      </div>
    </div>
  );
};
