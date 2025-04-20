"use client"

import { motion } from "framer-motion"
import { useRef, useState, useEffect, type ReactNode } from "react"

interface GlitchHoverWrapperProps {
  children: ReactNode
  className?: string
}

export function GlitchButtonWrapper({ children, className = "" }: GlitchHoverWrapperProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const triggerGlitch = () => {
    if (isGlitching) return

    setIsGlitching(true)

    timeoutRef.current = setTimeout(() => {
      setIsGlitching(false)
    }, 2000) 
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={triggerGlitch}
    >
      <motion.div
        className="relative z-10"
        animate={
          isGlitching
            ? {
                x: [-1, 1, -1, 1, 0],
                y: [-1, 1, 1, -1, 0],
                rotate: [-1.5, 1.5, -0.5, 0.5, 0],
                scale: [1, 1.02, 0.98, 1.01, 1],
              }
            : { x: 0, y: 0, rotate: 0, scale: 1 }
        }
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>

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
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>

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
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>

      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-pink-500 z-20 pointer-events-none"
        style={{ top: "30%" }}
        animate={
          isGlitching
            ? { opacity: [0, 1, 0], x: ["-100%", "100%"] }
            : { opacity: 0 }
        }
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-cyan-400 z-20 pointer-events-none"
        style={{ top: "60%" }}
        animate={
          isGlitching
            ? { opacity: [0, 1, 0], x: ["100%", "-100%"] }
            : { opacity: 0 }
        }
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </div>
  )
}
