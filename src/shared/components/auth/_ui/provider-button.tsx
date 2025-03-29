"use client";

import { Github } from "lucide-react";
import { ClientSafeProvider, signIn } from "next-auth/react";
import { Button } from "../../ui/button";
import { useState } from "react";
import { useAppSession } from "@/src/entities/session/use-app-session";
import nextAuthConfig from "@/src/entities/session/next-auth-config";

export function ProviderButton({ provider }: { provider: ClientSafeProvider }) {
  const { status } = useAppSession()
  const [isLoading, setIsLoading] = useState(false);

  const getIcon = (provider: ClientSafeProvider) => {
    switch (provider.id) {
      case "github":
        return <Github className="mr-2 h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn(provider.id, { 
      callbackUrl: "/",
      redirect: true 
    });
  };
  console.log("Providers:", nextAuthConfig.providers);
  return (
    <Button
      variant="outline"
      type="button"
      onClick={handleSignIn}
      className="w-full"
      disabled={isLoading || status === "loading"}
    >
      {getIcon(provider)}
      {isLoading ? "Вход..." : `Войти через ${provider.name}`}
    </Button>
  );
}