import { CourseSidebarInterface } from "@/src/widgets/courses-nav/course-sidebar-interface";



export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CourseSidebarInterface variant={"home"}>{children}</CourseSidebarInterface>
  );
}