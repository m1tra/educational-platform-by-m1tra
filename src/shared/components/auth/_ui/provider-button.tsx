"use client"


import { type ClientSafeProvider, signIn } from "next-auth/react"
import { useState } from "react"
import { useAppSession } from "@/src/entities/session/use-app-session"
import { motion } from "framer-motion"
import { GitHubIcon, GoogleIcon, YandexIcon } from "../../custom-icons"


export function ProviderButton({ provider }: { provider: ClientSafeProvider }) {
  const { status } = useAppSession()
  const [isLoading, setIsLoading] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)

  const getIcon = (provider: ClientSafeProvider) => {
    switch (provider.id) {
      case "github":
        return <GitHubIcon className="mr-2 h-4 w-4" />
      case "yandex":
        return <YandexIcon className="mr-2 h-4 w-4" />
      case "google":
        return <GoogleIcon className="mr-2 h-4 w-4" />
      default:
        return null
    }
  }

  const handleSignIn = async () => {
    setIsGlitching(true)

    setTimeout(() => {
      setIsGlitching(false)
      setIsLoading(true)
    }, 800)

    await signIn(provider.id, {
      callbackUrl: "/",
      redirect: true,
    })
  }

  return (
    <motion.button
      type="button"
      onClick={handleSignIn}
      className="w-full border border-white px-4 py-2 font-mono text-sm text-white disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-white relative overflow-hidden"
      disabled={isLoading || status === "loading"}
      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        opacity: { duration: 0.3 },
        delay: 0.2,
      }}
    >
      {isGlitching && (
        <motion.div
          className="absolute inset-0 bg-white/10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.5, 0, 0.8, 0],
            x: [-5, 5, -3, 3, 0],
          }}
          transition={{ duration: 0.8 }}
        />
      )}

      <motion.span
        className="relative z-10 flex items-center justify-center"
        animate={
          isGlitching
            ? {
                x: [-2, 2, -1, 1, 0],
                filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
              }
            : {}
        }
        transition={{ duration: 0.8 }}
      >
        {getIcon(provider)}
        {isLoading ? (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            ВХОД...
          </motion.span>
        ) : (
          `ВОЙТИ ЧЕРЕЗ ${provider.name.toUpperCase()}`
        )}
      </motion.span>

      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-white"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0 }}
      />
    </motion.button>
  )
}
