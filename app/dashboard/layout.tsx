import SideNav from "@/app/ui/dashboard/sidenav";
import Navbar from "@/app/ui/dashboard/navbar";
//setting  partial prerending to true
export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-background">
      <div className="w-full flex-none md:w-[20rem]">
        <SideNav />
      </div>

      <div className="flex flex-col flex-grow md:overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white shadow-sm md:shadow-none">
          <Navbar />
        </div>
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
