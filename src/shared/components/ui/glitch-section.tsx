"use client" // Использовать клиентский рендеринг

import { motion } from "framer-motion"
import { forwardRef, type ReactNode, useState, useEffect, useRef } from "react"

interface GlitchSectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export const GlitchSection = forwardRef<HTMLDivElement, GlitchSectionProps>(
  ({ children, className = "", id }, ref) => {
    const [isGlitching, setIsGlitching] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const internalRef = useRef<HTMLDivElement>(null)

    const combinedRef = (node: HTMLDivElement) => {
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
      internalRef.current = node
    }

    // Запускаем периодические глитчи
    useEffect(() => {
      const triggerRandomGlitch = () => {
        const randomDelay = Math.random() * 4000 + 1000

        timeoutRef.current = setTimeout(() => {
          setIsGlitching(true)

          setTimeout(() => {
            setIsGlitching(false)
            triggerRandomGlitch()
          }, Math.random() * 500 + 200)
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
      <section id={id} className={`relative overflow-hidden ${className}`} ref={combinedRef}>
        {/* Основной контент */}
        <motion.div
          className="relative z-10"
          animate={
            isGlitching
              ? {
                  skewX: [-2, 2, -1, 1, 0],
                  scale: [1, 1.01, 0.99, 1],
                }
              : { skewX: 0, scale: 1 }
          }
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>

        {/* Глитч-эффекты при активном состоянии */}
        {isGlitching && (
          <>
            {/* Красное смещение */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full text-red-500 z-0 pointer-events-none"
              animate={{
                x: [-4, 4, -2],
                y: [0, -2, 2],
                opacity: [0, 0.7, 0.3, 0],
              }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>

            {/* Синее смещение */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full text-blue-400 z-0 pointer-events-none"
              animate={{
                x: [4, -5, 3],
                y: [1, -3, 0],
                opacity: [0, 0.6, 0.4, 0],
              }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>

            {/* Линии помех */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-0 right-0 h-[1px] bg-white/60 z-20 pointer-events-none"
                style={{ top: `${20 + i * 15}%` }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  x: i % 2 === 0 ? ["-100%", "100%"] : ["100%", "-100%"],
                }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.05,
                }}
              />
            ))}

            {/* Вспышка блока */}
            <motion.div
              className="absolute z-30 bg-white/20 pointer-events-none"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                width: "30px",
                height: "12px",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 0.3 }}
            />

            {/* Фоновый шум */}
            <motion.div
              className="absolute inset-0 bg-noise z-0 opacity-0 pointer-events-none"
              animate={{ opacity: [0, 0.08, 0] }}
              transition={{ duration: 0.3 }}
            />
          </>
        )}

        {/* шума */}
        <style jsx global>{`
          @keyframes noise {
            0% { background-position: 0 0; }
            100% { background-position: 100% 100%; }
          }

          .bg-noise {
            background-image: url("data:image/png;base64,..."); // закодированное изображение шума
            background-repeat: repeat;
            animation: noise 0.2s infinite;
          }
        `}</style>
      </section>
    )
  }
)

GlitchSection.displayName = "GlitchSection"
