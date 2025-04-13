
import AuthorizedGuard from "@/src/shared/components/auth/auth-guard";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <AuthorizedGuard>
        {children}
      </AuthorizedGuard>
  );
}