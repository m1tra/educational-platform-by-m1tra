import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion,useInView } from "framer-motion"
import { GlitchText } from "@/src/shared/components/ui/glitch-text";
import { GlitchSection } from "@/src/shared/components/ui/glitch-section";
import { useRef } from "react";
import { GlitchButtonWrapper } from "@/src/shared/components/ui/glitch-button";

export function AboutUsAdmin(){
  const adminRef = useRef<HTMLDivElement>(null)
  const adminInView = useInView(adminRef, { once: true, amount: 0.3 })
  return(
    <GlitchSection ref={adminRef} id="admin" className="container mx-auto px-4 py-24 border-t border-white/10">
      <div className="grid grid-cols-12 gap-8">
        <motion.div
          className="col-span-12 md:col-span-4 mb-8 md:mb-0"
          initial={{ opacity: 0, x: -30 }}
          animate={adminInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <GlitchText className="text-3xl font-bold font-mono mb-4">ПАНЕЛЬ УПРАВЛЕНИЯ</GlitchText>
          <p className="text-white/70 mb-8">
            Мощный инструмент для преподавателей и администраторов с интуитивным интерфейсом и расширенной
            аналитикой
          </p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GlitchButtonWrapper>
              <Link
                href="/admin-demo"
                className="border border-white px-6 py-3 font-mono text-sm hover:bg-white hover:text-black transition-colors inline-flex items-center"
              >
                ДЕМО ПАНЕЛИ
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Link>
              </GlitchButtonWrapper>
          </motion.div>
        </motion.div>

        <motion.div
          className="col-span-12 md:col-span-8"
          initial={{ opacity: 0, x: 30 }}
          animate={adminInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="border border-white/20 overflow-hidden">
            <div className="border-b border-white/20 p-3 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full border border-white/40"></div>
              <div className="w-3 h-3 rounded-full border border-white/40"></div>
              <div className="w-3 h-3 rounded-full border border-white/40"></div>
              <div className="ml-4 text-xs font-mono text-white/50">АДМИН-ПАНЕЛЬ / ТЕСТЫ / АНАЛИТИКА</div>
            </div>

            <div className="grid grid-cols-12 h-[400px]">
              <div className="col-span-3 border-r border-white/20 p-4">
                <div className="space-y-4">
                  <div className="h-6 border-b border-white/10 pb-4 flex items-center">
                    <div className="w-3 h-3 bg-white/20 mr-2"></div>
                    <div className="text-xs font-mono text-white/70">НАВИГАЦИЯ</div>
                  </div>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                      key={i}
                      className={`h-8 flex items-center px-2 ${i === 2 ? "bg-white/5 border-l-2 border-white" : ""}`}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                      whileHover={{
                        x: 3,
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <span className="text-xs font-mono text-white/60">ПУНКТ МЕНЮ {i}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="col-span-9 p-4">
                <motion.div
                  className="flex justify-between mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="text-sm font-mono">АНАЛИТИКА ТЕСТИРОВАНИЯ</div>
                  <div className="text-xs font-mono border border-white/30 px-2 py-1">ЭКСПОРТ</div>
                </motion.div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "ТЕСТЫ", value: "124" },
                    { label: "СТУДЕНТЫ", value: "1,842" },
                    { label: "ЗАВЕРШЕНО", value: "8,391" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="border border-white/10 p-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                      whileHover={{
                        borderColor: "rgba(255, 255, 255, 0.3)",
                        y: -3,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <div className="text-xs font-mono text-white/50 mb-2">{stat.label}</div>
                      <div className="text-2xl font-mono">{stat.value}</div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="border border-white/10 p-4 h-[220px] relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <div className="text-xs font-mono text-white/50 mb-4">ГРАФИК АКТИВНОСТИ</div>
                  <div className="absolute bottom-4 left-4 right-4 h-[160px] flex items-end">
                    {[15, 25, 18, 30, 45, 28, 60, 75, 50, 35, 40, 55].map((height, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 mx-0.5"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.8 + i * 0.03 }}
                        style={{ originY: 1 }}
                      >
                        <motion.div
                          className="bg-white/20 hover:bg-white/40 transition-colors"
                          style={{ height: `${height * 2}px` }} 

                          whileHover={{
                            scaleY: 1.1,
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            transition: { duration: 0.2 },
                          }}
                        >
                            
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </GlitchSection>
  )
}