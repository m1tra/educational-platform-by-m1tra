
'use client'
import type React from "react"

import { SignInForm } from "@/src/shared/components/auth/sign-in-form"
import Link from "next/link"

import { motion, AnimatePresence } from "framer-motion"
import { GlitchText } from "@/src/shared/components/ui/glitch-text"
import { GlitchSection } from "@/src/shared/components/ui/glitch-section"

export default function AuthenticationPage() {


  return (
    <GlitchSection className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      <AnimatePresence>
        <motion.div
          key="content"
          className="container relative flex-col items-center justify-center self-center pt-12 pb-12 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >


          <motion.div
            className="max-w-[380px] mx-auto border border-white/30 p-6 relative bg-black"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >


            <motion.div
              className="flex flex-col space-y-2 text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlitchText className="text-2xl font-mono tracking-tight text-white relative">ВОЙТИ В СИСТЕМУ</GlitchText>
            </motion.div>

            <motion.div
              className="grid gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <SignInForm/>
              <motion.p
                className="px-0 text-center text-xs text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Нажимая продолжить вы соглашаетесь с{" "}
                <Link href="/terms" className="underline underline-offset-4 hover:text-white transition-colors">
                  Пользовательским соглашением
                </Link>{" "}
                и{" "}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-white transition-colors">
                  Политикой конфиденциальности
                </Link>
                .
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              href="/"
              className="text-xs font-mono text-white/60 hover:text-white transition-colors relative group"
            >
              <motion.span
                initial={{ filter: "blur(0px)" }}
                whileHover={{
                  filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
                  x: [0, -2, 2, -1, 0],
                  transition: {
                    filter: { duration: 0.2, repeat: 1 },
                    x: { duration: 0.2, repeat: 1 },
                  },
                }}
              >
                ВЕРНУТЬСЯ НА ГЛАВНУЮ
              </motion.span>
              <motion.span
                className="absolute left-0 -bottom-px h-px bg-white"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </GlitchSection>
  )
}