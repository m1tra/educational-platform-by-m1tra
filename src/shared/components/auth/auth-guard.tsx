"use client";

import { useAppSession } from "@/src/entities/session/use-app-session";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { BarLoader } from "../ui/loader";

export default function AuthorizedGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useAppSession();

  const isUnauthenticated = session.status === "unauthenticated";

  useEffect(() => {
    if (isUnauthenticated) {
      signIn();
    }
  }, [isUnauthenticated]);

  const isLoading = session.status === "loading" || session.status === "unauthenticated";

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <BarLoader />
        </div>
      ) : (
        <>
          {session.status === "authenticated" && children}
        </>
      )}

    </>
  );
}