"use server";

import { getProviders } from "next-auth/react";
import { cn } from "../../lib/utils";
import { Divider } from "./_ui/divider";
import { EmailSignInForm } from "./_ui/email-sign-in-form";
import { ProviderButton } from "./_ui/provider-button";

export async function SignInForm({ className }: { className?: string }) {
  const providers = await getProviders();
  const oauthProviders = Object.values(providers ?? {}).filter(
    (provider) => provider.type === "oauth",
  );

  return (
    <div className={cn("grid gap-4", className)}>
        <EmailSignInForm/>
        <Divider/>
        {oauthProviders.map((provider) => (
            <ProviderButton key={provider.id} provider={provider} />
      ))}
    </div>
  );
}