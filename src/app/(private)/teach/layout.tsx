import { CourseNav } from "@/src/shared/components/courses/_ui/course-nav";
import { SidebarProvider } from "@/src/shared/components/ui/sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
    <div className="flex w-full ">
      <CourseNav/>
      <div className="w-full">
        {children}
      </div>
    </div>
    </SidebarProvider>
  );
}