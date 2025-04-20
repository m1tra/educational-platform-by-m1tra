"use client"

import { motion } from "framer-motion"
import { type ReactNode, useRef, useState, useEffect } from "react"

interface GlitchTextProps {
  children: ReactNode
  className?: string
}

export function GlitchText({ children, className = "" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const triggerRandomGlitch = () => {
      const randomDelay = Math.random() * 4000 + 1000

      timeoutRef.current = setTimeout(() => {
        setIsGlitching(true)

        setTimeout(() => {
          setIsGlitching(false)
          triggerRandomGlitch()
        }, Math.random() * 400 + 100)
      }, randomDelay)
    }

    triggerRandomGlitch()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className={`relative inline-block font-bold ${className}`}>
      {/* Основной текст */}
      <div className="relative z-10">{children}</div>

      {/* Красное смещение */}
      <motion.div
        className="absolute left-0 top-0 z-0 text-red-500 pointer-events-none"
        animate={
          isGlitching
            ? {
                x: [-2, 2, -4, 1],
                y: [-1, 2, -2, 0],
                opacity: [0, 1, 0.8, 0],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      {/* Синее смещение */}
      <motion.div
        className="absolute left-0 top-0 z-0 text-blue-500 pointer-events-none"
        animate={
          isGlitching
            ? {
                x: [2, -2, 4, -1],
                y: [1, -2, 2, 0],
                opacity: [0, 1, 0.8, 0],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      {/* Горизонтальная глитч-линия (розовая) */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-pink-500 z-20 pointer-events-none"
        style={{ top: "30%" }}
        animate={
          isGlitching
            ? {
                opacity: [0, 1, 0],
                x: ["-100%", "100%"],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.3 }}
      />

      {/* Горизонтальная глитч-линия (голубая) */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-cyan-400 z-20 pointer-events-none"
        style={{ top: "60%" }}
        animate={
          isGlitching
            ? {
                opacity: [0, 1, 0],
                x: ["100%", "-100%"],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </div>
  )
}
