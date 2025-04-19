import { GlitchSection } from "@/src/shared/components/ui/glitch-section";
import {  Braces, Grid, LayoutDashboard, Zap } from "lucide-react";
import { motion,useInView } from "framer-motion"
import { useRef } from "react";
import { GlitchText } from "@/src/shared/components/ui/glitch-text";

export function AboutUsFeatures(){
  const featuresRef = useRef<HTMLDivElement>(null)
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 })
  return(
    <GlitchSection ref={featuresRef} id="features" className="container mx-auto px-4 py-24">
    <div className="grid grid-cols-12 gap-8">
      <motion.div
        className="col-span-12 md:col-span-4 mb-8 md:mb-0"
        initial={{ opacity: 0, x: -30 }}
        animate={featuresInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <GlitchText className="text-3xl font-bold font-mono mb-4">СИСТЕМА</GlitchText>
        <p className="text-white/70 mb-8 max-w-md">
          Революционный подход к образовательному процессу через интеграцию тестов с курсами и аналитикой в
          реальном времени
        </p>

        <motion.div
          className="aspect-square relative border border-white/20 overflow-hidden"
          animate={{
            borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.2)"],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Grid className="w-16 h-16 opacity-20" />
          </div>
        </motion.div>
      </motion.div>

      <div className="col-span-12 md:col-span-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <Grid className="h-6 w-6" />,
              title: "АДАПТИВНЫЕ ТЕСТЫ",
              description: "Система автоматически регулирует сложность вопросов в зависимости от уровня знаний",
            },
            {
              icon: <Braces className="h-6 w-6" />,
              title: "ИНТЕГРАЦИЯ С КУРСАМИ",
              description: "Бесшовная связь между учебными материалами и системой тестирования",
            },
            {
              icon: <Zap className="h-6 w-6" />,
              title: "ВЫСОКАЯ ПРОИЗВОДИТЕЛЬНОСТЬ",
              description: "Мгновенная загрузка и обработка данных даже при высоких нагрузках",
            },
            {
              icon: <LayoutDashboard className="h-6 w-6" />,
              title: "АНАЛИТИКА В РЕАЛЬНОМ ВРЕМЕНИ",
              description: "Детальный анализ результатов и прогресса каждого студента",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="border border-white/20 p-6 hover:border-white transition-colors group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              whileHover={{
                x: [0, -3, 3, -2, 0],
                transition: { duration: 0.3 },
              }}
            >
              <div className="border border-white/30 p-2 inline-block mb-4 group-hover:border-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-mono mb-3">{feature.title}</h3>
              <p className="text-white/70 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </GlitchSection>
  )
}