'use client'
import { About } from "@/src/widgets/about-us/about-interface";
import { useAppSession } from "@/src/entities/session/use-app-session";
import { BarLoader } from "@/src/shared/components/ui/loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const session = useAppSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/home");
    }
  }, [session.status, router]);

  if (session.status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <BarLoader />
      </div>
    );
  }

  return <About />;
}
