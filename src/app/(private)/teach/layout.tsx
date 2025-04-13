import { TeachingSidebar } from "@/src/shared/components/courses/_ui/course-nav";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TeachingSidebar>{children}</TeachingSidebar>
  );
}