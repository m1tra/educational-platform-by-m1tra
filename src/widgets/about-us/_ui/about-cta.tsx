import { GlitchSection } from "@/src/shared/components/ui/glitch-section";
import { GlitchText } from "@/src/shared/components/ui/glitch-text";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion"
import { GlitchButtonWrapper } from "@/src/shared/components/ui/glitch-button";

export function AboutUsCTA(){
    const ctaRef = useRef<HTMLDivElement>(null)
    const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 })
    return(
        <GlitchSection ref={ctaRef} className="container mx-auto px-4 py-24 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={ctaInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <GlitchText className="text-3xl md:text-4xl font-bold font-mono mb-4">НАЧНИТЕ СЕЙЧАС</GlitchText>
              <p className="text-white/70 mb-8">
                Присоединяйтесь к образовательной платформе нового поколения и трансформируйте процесс обучения
              </p>
            </motion.div>

            <motion.div
              className="flex flex-row md:flex-row gap-4 md:justify-end"
              initial={{ opacity: 0, y: 30 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <GlitchButtonWrapper>
                <Link
                  href="/auth"
                  className="border-2 border-white px-8 py-4 font-mono text-sm hover:bg-white hover:text-black transition-colors text-center md:text-left"
                >
                  РЕГИСТРАЦИЯ
                </Link>
              </GlitchButtonWrapper>
              <GlitchButtonWrapper>
                <Link
                  href="/contact"
                  className="border border-white/30 px-8 py-4 font-mono text-sm text-white/70 hover:text-white hover:border-white transition-colors text-center md:text-left"
                >
                  СВЯЗАТЬСЯ
                </Link>
              </GlitchButtonWrapper>
            </motion.div>
          </div>
        </GlitchSection>
    )
}