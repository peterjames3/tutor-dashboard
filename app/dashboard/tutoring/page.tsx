import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tutoring",
};

export default async function Page() {
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Tutoring</h1>
    </main>
  );
}
