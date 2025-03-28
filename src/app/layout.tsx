import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { AppProvider } from "./_providers/app-provider"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Учебные тесты",
  description: "Платформа для изучения и тестирования знаний",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProvider>
            {children}
          </AppProvider>
      </body>
    </html>
  )
}

