import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Clients",
};

export default async function Page() {
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Clients</h1>
    </main>
  );
}
