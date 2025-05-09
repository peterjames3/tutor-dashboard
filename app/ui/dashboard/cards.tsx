import { Users, PencilRuler, BookOpenText, Headset } from "lucide-react";
import { fetchCardData } from "@/app/lib/data";

const iconMap = {
  totalStudents: Users,
  tutoring: PencilRuler,
  examPrep: BookOpenText,
  endToEndSupport: Headset,
};

export default async function CardWrapper() {
  const { tutoringCount, examSupportCount, examPrepCount, totalStudents } =
    await fetchCardData();
  return (
    <>
      <Card
        title="Total Students"
        count={totalStudents}
        icon={iconMap.totalStudents}
      />
      <Card
        title="Tutoring Students"
        count={tutoringCount}
        icon={iconMap.tutoring}
      />
      <Card
        title="Exam Prep Students"
        count={examPrepCount}
        icon={iconMap.examPrep}
      />
      <Card
        title="End-to-End Support Students"
        count={examSupportCount}
        icon={iconMap.endToEndSupport}
      />
    </>
  );
}

export const Card = ({
  title,
  count,
  icon: Icon,
}: {
  title: string;
  count: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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
