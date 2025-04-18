import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function AboutUsAdmin(){
    return(
        <section id="admin" className="container mx-auto px-4 py-24 border-t border-white/10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold font-mono mb-4">ПАНЕЛЬ УПРАВЛЕНИЯ</h2>
            <p className="text-white/70 mb-8">
              Мощный инструмент для преподавателей и администраторов с интуитивным интерфейсом и расширенной аналитикой
            </p>

            <div className="mt-8">
              <Link
                href="/admin-demo"
                className="border border-white px-6 py-3 font-mono text-sm hover:bg-white hover:text-black transition-colors inline-flex items-center"
              >
                ДЕМО ПАНЕЛИ
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8">
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
                      <div
                        key={i}
                        className={`h-8 flex items-center px-2 ${i === 2 ? "bg-white/5 border-l-2 border-white" : ""}`}
                      >
                        <span className="text-xs font-mono text-white/60">ПУНКТ МЕНЮ {i}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-9 p-4">
                  <div className="flex justify-between mb-6">
                    <div className="text-sm font-mono">АНАЛИТИКА ТЕСТИРОВАНИЯ</div>
                    <div className="text-xs font-mono border border-white/30 px-2 py-1">ЭКСПОРТ</div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { label: "ТЕСТЫ", value: "124" },
                      { label: "СТУДЕНТЫ", value: "1,842" },
                      { label: "ЗАВЕРШЕНО", value: "8,391" },
                    ].map((stat, i) => (
                      <div key={i} className="border border-white/10 p-4">
                        <div className="text-xs font-mono text-white/50 mb-2">{stat.label}</div>
                        <div className="text-2xl font-mono">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="border border-white/10 p-4 h-[220px] relative">
                    <div className="text-xs font-mono text-white/50 mb-4">ГРАФИК АКТИВНОСТИ</div>
                    <div className="absolute bottom-4 left-4 right-4 h-[160px] flex items-end">
                      {[15, 25, 18, 30, 45, 28, 60, 75, 50, 35, 40, 55].map((height, i) => (
                        <div key={i} className="flex-1 mx-0.5">
                          <div
                            className="bg-white/20 hover:bg-white/40 transition-colors"
                            style={{ height: `${height}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}