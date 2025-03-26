"use client"

import { signOut as nextAuthSignOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export const useSignOut = () => {
  const router = useRouter()

  const signOut = async () => {
    try {
      await nextAuthSignOut({ 
        redirect: false,
        callbackUrl: "/"
      })
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Ошибка при выходе из системы: ", error)
    }
  }

  return signOut
} 