import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Settings",
};

export default async function Page() {
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Settings</h1>
    </main>
  );
}
