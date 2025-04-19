import { GlitchSection } from "@/src/shared/components/ui/glitch-section";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { GlitchText } from "@/src/shared/components/ui/glitch-text";

export function AboutUsPreview(){

  const { scrollY } = useScroll()
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null)

  // InView states for sections
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })


  const heroY = useTransform(scrollY, [0, 300], [0, 50])
  return(
    <GlitchSection ref={heroRef} className="container mx-auto px-4 pt-32 pb-24">
    <div className="grid grid-cols-12 gap-4">
      <motion.div
        className="col-span-12 md:col-span-7 lg:col-span-5 md:row-span-2 mb-12 md:mb-0 order-2 md:order-1"
        style={{ y: heroY }}
        initial={{ opacity: 0, x: -50 }}
        animate={heroInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <GlitchText className="text-5xl md:text-7xl font-bold leading-none mb-8 font-mono">
          ТЕСТЫ.
          <br />
          КУРСЫ.
          <br />
          <span className="relative inline-block">
            ИНТЕЛЛЕКТ
            <div className="absolute -right-4 top-0 h-2 w-2 bg-white"></div>
          </span>
        </GlitchText>

        <motion.div
          className="mt-8 space-y-6"
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <p className="text-white/70 text-lg max-w-md border-l-2 border-white/30 pl-4">
            Образовательная платформа нового поколения с интеллектуальной системой тестирования
          </p>

          <div className="flex flex-wrap gap-4 font-mono text-xs">
            <motion.span
              className="border border-white/20 px-3 py-1.5 inline-block"
              whileHover={{
                x: [0, -2, 2, -1, 0],
                borderColor: "rgba(255, 255, 255, 0.5)",
                transition: { duration: 0.3 },
              }}
            >
              ТЕСТЫ
            </motion.span>
            <motion.span
              className="border border-white/20 px-3 py-1.5 inline-block"
              whileHover={{
                x: [0, -2, 2, -1, 0],
                borderColor: "rgba(255, 255, 255, 0.5)",
                transition: { duration: 0.3 },
              }}
            >
              ИНТЕГРАЦИЯ
            </motion.span>
            <motion.span
              className="border border-white/20 px-3 py-1.5 inline-block"
              whileHover={{
                x: [0, -2, 2, -1, 0],
                borderColor: "rgba(255, 255, 255, 0.5)",
                transition: { duration: 0.3 },
              }}
            >
              ИИ
            </motion.span>
            <motion.span
              className="border border-white/20 px-3 py-1.5 inline-block"
              whileHover={{
                x: [0, -2, 2, -1, 0],
                borderColor: "rgba(255, 255, 255, 0.5)",
                transition: { duration: 0.3 },
              }}
            >
              СКОРОСТЬ
            </motion.span>
            <motion.span
              className="border border-white/20 px-3 py-1.5 inline-block"
              whileHover={{
                x: [0, -2, 2, -1, 0],
                borderColor: "rgba(255, 255, 255, 0.5)",
                transition: { duration: 0.3 },
              }}
            >
              УПРАВЛЕНИЕ
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="col-span-12 md:col-span-5 lg:col-span-7 order-1 md:order-2 mb-8 md:mb-0"
        initial={{ opacity: 0, x: 50 }}
        animate={heroInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="relative aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden border border-white/20">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-px bg-white/10">
            <div className="bg-black relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border border-white/30 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white"></div>
                </div>
              </div>
            </div>
            <div className="bg-black relative overflow-hidden">
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-6xl font-mono font-bold opacity-20">T</div>
              </div>
            </div>
            <div className="bg-black relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-[1px] bg-white/30"></div>
              </div>
            </div>
            <div className="bg-black relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-xs font-mono tracking-widest">СИСТЕМА.ТЕСТИРОВАНИЯ</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="col-span-12 md:col-span-7 order-3 mt-8 md:mt-0"
        initial={{ opacity: 0, y: 30 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <Link
            href="/demo"
            className="border border-white px-6 py-3 font-mono text-sm hover:bg-white hover:text-black transition-colors flex items-center justify-between group"
          >
            <span>ДЕМОНСТРАЦИЯ</span>
            <ArrowUpRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>

          <Link
            href="/about"
            className="border border-white/30 px-6 py-3 font-mono text-sm text-white/70 hover:text-white hover:border-white transition-colors flex items-center justify-between"
          >
            <span>О СИСТЕМЕ</span>
            <span className="ml-2 text-lg">→</span>
          </Link>
        </div>
      </motion.div>
    </div>
  </GlitchSection>
  )
}