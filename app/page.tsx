import { GraduationCap, MoveRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-[#041107] text-3xl font-semibold text-background p-4 md:h-52">
        <div className="flex gap-2 items-center">
          <GraduationCap size={64} className="pr-2  " /> TestHelpNow
        </div>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row font-poppins ">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-100 px-6 py-10 md:w-2/5 md:px-20">
          <GraduationCap size={64} className="pr-2 text-primary " />
          <p className=" sm:headline md:text-4xl/12 ">
            <strong>
              {" "}
              <span className="text-secondary"> At TestHelpNow,</span> we
              provide
              <span className=""> comprehensive exam</span>,{" "}
              <span>tutoring</span> and <span> End-To-End Exam support</span>.
            </strong>
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start  btn delay-300 md:text-base"
          >
            <span>Log in To Dashboard</span>{" "}
            <MoveRight className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12  ">
          {/* Add Hero Images Here */}
          <Image
            src="/Group 2.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/Group 2.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
      </div>
    </main>
  );
}
