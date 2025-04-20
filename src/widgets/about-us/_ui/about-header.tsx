import Link from "next/link";
import { motion, useInView } from "framer-motion"
import { useRef } from "react";
import { GlitchButtonWrapper } from "@/src/shared/components/ui/glitch-button";

export function AboutUsHeader(){
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 })
  return(
    <motion.header 
      ref={headerRef} 
      className="container mx-auto px-4 py-6 flex items-center justify-between" 
      initial={{ opacity: 0, y: -30 }}
      animate={headerInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}>
      <div className="flex items-center gap-2">
        <div className="border border-white/30 p-1.5 rounded-sm">
          <span className="font-mono text-sm">T/E</span>
        </div>
        <span className="font-mono tracking-tight">ThinksEra</span>
      </div>  
      <nav className="hidden md:flex items-center gap-8">
        <Link
          href="#features"
          className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider"
        >
          Система
        </Link>
        <Link
          href="#ai"
          className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider"
        >
          ИИ
        </Link>
        <Link
          href="#admin"
          className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider"
        >
          Управление
        </Link>
      </nav>  
      <GlitchButtonWrapper>
        <Link
          href="/auth/sign-in"
          className="border border-white px-4 py-1.5 text-sm font-mono hover:bg-white hover:text-black transition-colors"
        >
          Начать
        </Link>
      </GlitchButtonWrapper>
    </motion.header>
  )
}