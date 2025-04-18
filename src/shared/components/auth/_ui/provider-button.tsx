"use client"

import { Github } from "lucide-react"
import { type ClientSafeProvider, signIn } from "next-auth/react"
import { useState } from "react"
import { useAppSession } from "@/src/entities/session/use-app-session"

export function ProviderButton({ provider }: { provider: ClientSafeProvider }) {
  const { status } = useAppSession()
  const [isLoading, setIsLoading] = useState(false)

  const getIcon = (provider: ClientSafeProvider) => {
    switch (provider.id) {
      case "github":
        return <Github className="mr-2 h-4 w-4" />
      default:
        return null
    }
  }

  const handleSignIn = async () => {
    setIsLoading(true)
    await signIn(provider.id, {
      callbackUrl: "/",
      redirect: true,
    })
  }

  return (
    <button
      type="button"
      onClick={handleSignIn}
      className="w-full border border-white px-4 py-2 font-mono text-sm hover:bg-white hover:text-black transition-colors flex items-center justify-center disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-white"
      disabled={isLoading || status === "loading"}
    >
      {getIcon(provider)}
      {isLoading ? "ВХОД..." : `ВОЙТИ ЧЕРЕЗ ${provider.name.toUpperCase()}`}
    </button>
  )
}
