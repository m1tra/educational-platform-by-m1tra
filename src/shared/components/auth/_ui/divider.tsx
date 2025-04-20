"use client"

import { motion } from "framer-motion"

export function Divider() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <motion.span
          className="w-full border-t border-white/20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <motion.span
          className="bg-black px-2 text-white/60 font-mono"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          whileHover={{
            x: [0, -1, 1, 0],
            filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
            transition: { duration: 0.2 },
          }}
        >
          или войдите через
        </motion.span>
      </div>
    </div>
  )
}
