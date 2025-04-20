// src/shared/components/auth/sign-in-form.tsx
"use client";

import { useEffect, useState } from "react";
import { ClientSafeProvider, getProviders } from "next-auth/react";
import { cn } from "../../lib/utils";
import { Divider } from "./_ui/divider";
import { EmailSignInForm } from "./_ui/email-sign-in-form";
import { ProviderButton } from "./_ui/provider-button";

export function SignInForm({ className }: { className?: string }) {
  const [providers, setProviders] = useState<ClientSafeProvider[]>([]);

  useEffect(() => {
    getProviders().then((res) => {
      if (res) {
        const oauth = Object.values(res).filter(
          (provider: ClientSafeProvider) => provider.type === "oauth"
        );
        setProviders(oauth);
      }
    });
  }, []);

  return (
    <div className={cn("grid gap-4", className)}>
      <EmailSignInForm />
      <Divider />
      {providers.map((provider) => (
        <ProviderButton key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
