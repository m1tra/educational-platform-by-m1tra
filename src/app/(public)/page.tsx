"use client";

import { About } from "@/src/widgets/about-us/about-interface";
import { useAppSession } from "@/src/entities/session/use-app-session";
import { BarLoader } from "@/src/shared/components/ui/loader";
import { Dashboard } from "@/src/widgets/home/dashboard";

export default function Home() {
  const session = useAppSession();

  if (session.status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <BarLoader />
      </div>
    );
  }

  if (session.status === "authenticated") {
    return <Dashboard />;
  }

  return <About />;
}
