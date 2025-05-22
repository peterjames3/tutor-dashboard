import Link from "next/link";

export default function NotFound() {
  return (
    <section className="h-screen  flex items-center justify-center ">
      <header className="space-y-3 text-center">
        <h3 className="text-9xl font-black text-primary">404</h3>
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>
        <p className="mt-4 text-primary">We can&apos;t find that resource.</p>
        <div className="mt-6 ">
          <Link
            href="/dashboard/exam-support"
            className="  btn delay-300 md:text-base"
          >
            Back to Home
          </Link>
        </div>
      </header>
    </section>
  );
}
