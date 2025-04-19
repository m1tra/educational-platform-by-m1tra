"use client";

import { About } from "@/src/widgets/about-us/about-interface";
import { useAppSession } from "@/src/entities/session/use-app-session";
import { BarLoader } from "@/src/shared/components/ui/loader";
import { Dashboard } from "@/src/widgets/home/dashboard";
import { useEffect, useState } from "react";
import { MainPreloader } from "@/src/shared/components/preloader";

export default function Home() {
  const session = useAppSession();
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <MainPreloader />
  }
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


