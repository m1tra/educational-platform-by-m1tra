"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const fullText = "БУДУЩЕЕ ОБРАЗОВАНИЯ ЗА НАМИ"

export function MainPreloader() {
  const [text, setText] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [showLogo, setShowLogo] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    let typingInterval: NodeJS.Timeout

    const startTyping = () => {
      typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setText(fullText.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typingInterval)
          setTypingComplete(true)

          let blinks = 0
          const blinkInterval = setInterval(() => {
            setShowCursor((prev) => !prev)
            blinks++
            if (blinks > 2) {
              clearInterval(blinkInterval)
              setShowCursor(true)
              setTimeout(() => setShowLogo(true), 300)
            }
          }, 400)
        }
      }, 100)
    }

    const initialDelay = setTimeout(startTyping, 500)

    return () => {
      clearTimeout(initialDelay)
      clearInterval(typingInterval)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Глитч линии */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-white/15"
            style={{ top: `${i * 20}%` }}
            animate={{ x: i % 2 === 0 ? ["100%", "-100%"] : ["-100%", "100%"] }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Логотип */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            className="mb-12 relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative"
              animate={{ filter: ["blur(0px)", "blur(1px)", "blur(0px)"] }}
              transition={{
                duration: 0.2,
                repeat: 5,
                repeatType: "mirror",
                repeatDelay: 2,
              }}
            >
              <div className="relative border-2 border-white/80 p-4">
                <div className="text-3xl font-mono text-white">T/E</div>
                <motion.div
                  className="absolute inset-0 bg-white/5 mix-blend-overlay"
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Глитч элементы */}
              <motion.div
                className="absolute -top-2 -left-2 w-3 h-3 bg-white"
                animate={{ opacity: [0.7, 1, 0.7], x: [0, -1, 0], y: [0, -1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
              />
              <motion.div
                className="absolute -bottom-2 -right-2 w-3 h-3 bg-white"
                animate={{ opacity: [0.7, 1, 0.7], x: [0, 1, 0], y: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: 0.5 }}
              />
              <motion.div
                className="absolute -inset-1 border border-white/20"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Текст с набором */}
      <motion.div
        className="relative z-10 px-4 text-center font-mono text-4xl md:text-6xl lg:text-7xl text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="inline-block relative"
          animate={{
            filter: typingComplete ? ["blur(0px)", "blur(2px)", "blur(0px)"] : "blur(0px)",
            y: showLogo ? -20 : 0,
          }}
          transition={{
            filter: {
              duration: 0.1,
              repeat: typingComplete ? 2 : 0,
              repeatType: "mirror",
              repeatDelay: 3,
            },
            y: { duration: 0.5 },
          }}
        >
          {text}
          {showCursor && (
            <motion.span
              className="absolute inline-block ml-1 w-3 h-12 bg-white"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </motion.span>
      </motion.div>

      {/* Прогресс-бар */}
      <motion.div
        className="relative z-10 mt-16 w-64 md:w-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="h-1 bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-white/80"
            initial={{ width: 0 }}
            animate={{ width: `${(text.length / fullText.length) * 100}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        {typingComplete && (
          <motion.div
            className="mt-8 text-sm text-center font-mono text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ
          </motion.div>
        )}
      </motion.div>

      {/* Случайные глитч элементы */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-4 h-20 bg-white/20 pointer-events-none"
        animate={{ opacity: [0, 0.7, 0], scaleY: [1, 1.5, 1] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror", repeatDelay: 5 }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-16 h-3 bg-white/15 pointer-events-none"
        animate={{ opacity: [0, 0.5, 0], scaleX: [1, 1.3, 1] }}
        transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror", repeatDelay: 7 }}
      />
    </motion.div>
  )
}
