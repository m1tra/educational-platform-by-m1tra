import AppLayout from "@/components/app-layout";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout variant={"private"}>
        {children}
    </AppLayout>
  );
}