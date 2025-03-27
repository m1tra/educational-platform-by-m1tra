import AppLayout from "@/src/shared/components/app-layout";
import AuthorizedGuard from "@/src/shared/components/auth/auth-guard";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout variant={"private"}>
      <AuthorizedGuard>
        {children}
      </AuthorizedGuard>
    </AppLayout>
  );
}