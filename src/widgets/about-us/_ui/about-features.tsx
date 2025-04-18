import {  Braces, Grid, LayoutDashboard, Zap } from "lucide-react";

export function AboutUsFeatures(){
    return(
        <section id="features" className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold font-mono mb-4">СИСТЕМА</h2>
            <p className="text-white/70 mb-8 max-w-md">
              Революционный подход к образовательному процессу через интеграцию тестов с курсами и аналитикой в реальном
              времени
            </p>

            <div className="aspect-square relative border border-white/20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Grid className="w-16 h-16 opacity-20" />
              </div>
            </div>
          </div>

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
                <div key={i} className="border border-white/20 p-6 hover:border-white transition-colors group">
                  <div className="border border-white/30 p-2 inline-block mb-4 group-hover:border-white transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-mono mb-3">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
}