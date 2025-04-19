"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function MainPreloader() {
  const [text, setText] = useState("")
  const fullText = "БУДУЩЕЕ ОБРАЗОВАНИЯ ЗА НАМИ"
  const [typingComplete, setTypingComplete] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let currentIndex = 0
    let typingInterval: NodeJS.Timeout

    const startTyping = () => {
      typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setText(fullText.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typingInterval)
          setTypingComplete(true)

          let blinks = 0
          const blinkInterval = setInterval(() => {
            setShowCursor((prev) => !prev)
            blinks++

            if (blinks > 6) {
              clearInterval(blinkInterval)
              setShowCursor(true)
            }
          }, 400)
        }
      }, 100)
    }

    const initialDelay = setTimeout(() => {
      startTyping()
    }, 500)

    return () => {
      clearTimeout(initialDelay)
      clearInterval(typingInterval)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-white/15 w-full"
            style={{ top: `${i * 20}%` }}
            animate={{ x: i % 2 === 0 ? ["100%", "-100%"] : ["-100%", "100%"] }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <motion.div
        className="font-mono text-4xl md:text-6xl lg:text-7xl relative z-10 text-white text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="relative inline-block"
          animate={{
            filter: typingComplete ? ["blur(0px)", "blur(2px)", "blur(0px)"] : "blur(0px)",
          }}
          transition={{
            duration: 0.1,
            repeat: typingComplete ? 2 : 0,
            repeatType: "mirror",
            repeatDelay: 3,
          }}
        >
          {text}
          {showCursor && (
            <motion.span
              className="absolute inline-block w-3 h-12 bg-white ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </motion.span>
      </motion.div>

      <motion.div
        className="mt-16 relative z-10 w-64 md:w-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="h-1 bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-white/80"
            initial={{ width: 0 }}
            animate={{
              width: `${(text.length / fullText.length) * 100}%`,
            }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        {typingComplete && (
          <motion.div
            className="mt-8 text-sm text-white/70 text-center font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="absolute top-1/4 left-1/4 w-4 h-20 bg-white/20"
        animate={{
          opacity: [0, 0.7, 0],
          scaleY: [1, 1.5, 1],
        }}
        transition={{
          duration: 0.2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          repeatDelay: 5,
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-16 h-3 bg-white/15"
        animate={{
          opacity: [0, 0.5, 0],
          scaleX: [1, 1.3, 1],
        }}
        transition={{
          duration: 0.15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          repeatDelay: 7,
        }}
      />
    </motion.div>
  )
}
