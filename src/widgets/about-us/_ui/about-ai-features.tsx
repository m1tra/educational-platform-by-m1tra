import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function AboutUsAi(){
    return(
        <section id="ai" className="container mx-auto px-4 py-24 border-t border-white/10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-7 order-2 md:order-1">
            <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/20 h-full">
              <div className="bg-black p-6 flex flex-col">
                <span className="text-xs font-mono text-white/50 mb-2">01. АНАЛИЗ</span>
                <p className="text-sm text-white/80">
                  Искусственный интеллект анализирует паттерны ответов и выявляет пробелы в знаниях
                </p>
              </div>
              <div className="bg-black p-6 flex flex-col">
                <span className="text-xs font-mono text-white/50 mb-2">02. АДАПТАЦИЯ</span>
                <p className="text-sm text-white/80">
                  Система автоматически адаптирует сложность и тип вопросов под каждого студента
                </p>
              </div>
              <div className="bg-black p-6 flex flex-col">
                <span className="text-xs font-mono text-white/50 mb-2">03. ПРОГНОЗИРОВАНИЕ</span>
                <p className="text-sm text-white/80">
                  ИИ прогнозирует потенциальные трудности и предлагает превентивные материалы
                </p>
              </div>
              <div className="bg-black p-6 flex flex-col">
                <span className="text-xs font-mono text-white/50 mb-2">04. РЕКОМЕНДАЦИИ</span>
                <p className="text-sm text-white/80">
                  Персонализированные рекомендации по улучшению результатов на основе анализа данных
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 mb-8 md:mb-0 order-1 md:order-2">
            <div className="sticky top-24">
              <h2 className="text-3xl font-bold font-mono mb-4">ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ</h2>
              <p className="text-white/70 mb-8">
                Наша платформа использует передовые алгоритмы машинного обучения для создания по-настоящему
                персонализированного образовательного опыта
              </p>

              <div className="mt-8">
                <Link
                  href="/ai-demo"
                  className="border border-white px-6 py-3 font-mono text-sm hover:bg-white hover:text-black transition-colors inline-flex items-center"
                >
                  ПОДРОБНЕЕ ОБ ИИ
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}