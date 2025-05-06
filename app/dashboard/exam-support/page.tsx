import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Exam Support",
};

export default async function Page() {
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Exam Support</h1>
    </main>
  );
}
