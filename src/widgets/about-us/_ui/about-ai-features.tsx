import { GlitchSection } from "@/src/shared/components/ui/glitch-section";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { motion,useInView } from "framer-motion"
import { GlitchText } from "@/src/shared/components/ui/glitch-text";
import { GlitchButtonWrapper } from "@/src/shared/components/ui/glitch-button";

export function AboutUsAi(){
    const aiRef = useRef<HTMLDivElement>(null)
    const aiInView = useInView(aiRef, { once: true, amount: 0.3 })
    return(
        <GlitchSection ref={aiRef} id="ai" className="container mx-auto px-4 py-24 border-t border-white/10">
          <div className="grid grid-cols-12 gap-8">
            <motion.div
              className="col-span-12 md:col-span-7 order-2 md:order-1"
              initial={{ opacity: 0, x: -30 }}
              animate={aiInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/20 h-full">
                {[
                  {
                    num: "01",
                    title: "АНАЛИЗ",
                    desc: "Искусственный интеллект анализирует паттерны ответов и выявляет пробелы в знаниях",
                  },
                  {
                    num: "02",
                    title: "АДАПТАЦИЯ",
                    desc: "Система автоматически адаптирует сложность и тип вопросов под каждого студента",
                  },
                  {
                    num: "03",
                    title: "ПРОГНОЗИРОВАНИЕ",
                    desc: "ИИ прогнозирует потенциальные трудности и предлагает превентивные материалы",
                  },
                  {
                    num: "04",
                    title: "РЕКОМЕНДАЦИИ",
                    desc: "Персонализированные рекомендации по улучшению результатов на основе анализа данных",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="bg-black p-6 flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    whileHover={{
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    <span className="text-xs font-mono text-white/50 mb-2">
                      {item.num}. {item.title}
                    </span>
                    <p className="text-sm text-white/80">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="col-span-12 md:col-span-5 mb-8 md:mb-0 order-1 md:order-2"
              initial={{ opacity: 0, x: 30 }}
              animate={aiInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="sticky top-24">
                <GlitchText className="text-3xl font-bold font-mono mb-4">ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ</GlitchText>
                <p className="text-white/70 mb-8">
                  Наша платформа использует передовые алгоритмы машинного обучения для создания по-настоящему
                  персонализированного образовательного опыта
                </p>

                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <GlitchButtonWrapper>
                    <Link
                      href="/ai-demo"
                      className="border border-white px-6 py-3 font-mono text-sm hover:bg-white hover:text-black transition-colors inline-flex items-center"
                    >
                      ПОДРОБНЕЕ ОБ ИИ
                      <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Link>
                  </GlitchButtonWrapper>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </GlitchSection>
    )
}

