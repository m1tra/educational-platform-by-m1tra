"use client"

import { useTheme } from "next-themes"
import { Toaster } from "@/src/shared/components/ui/sonner"

export function ToastProvider() {
  const { theme } = useTheme()

  return <Toaster theme={theme as "light" | "dark" | "system"} />
}