import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function AboutUsPreview(){
    return(
        <section className="container mx-auto px-4 pt-12 pb-24">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-7 lg:col-span-5 md:row-span-2 mb-12 md:mb-0 order-2 md:order-1">
            <h1 className="text-5xl md:text-7xl font-bold leading-none mb-8 font-mono">
              ТЕСТЫ.
              <br />
              КУРСЫ.
              <br />
              <span className="relative inline-block">
                ИНТЕЛЛЕКТ
                <div className="absolute -right-4 top-0 h-2 w-2 bg-white"></div>
              </span>
            </h1>

            <div className="mt-8 space-y-6">
              <p className="text-white/70 text-lg max-w-md border-l-2 border-white/30 pl-4">
                Образовательная платформа нового поколения с интеллектуальной системой тестирования
              </p>

              <div className="flex flex-wrap gap-4 font-mono text-xs">
                <span className="border border-white/20 px-3 py-1.5 inline-block">ТЕСТЫ</span>
                <span className="border border-white/20 px-3 py-1.5 inline-block">ИНТЕГРАЦИЯ</span>
                <span className="border border-white/20 px-3 py-1.5 inline-block">ИИ</span>
                <span className="border border-white/20 px-3 py-1.5 inline-block">СКОРОСТЬ</span>
                <span className="border border-white/20 px-3 py-1.5 inline-block">УПРАВЛЕНИЕ</span>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 lg:col-span-7 order-1 md:order-2 mb-8 md:mb-0">
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
          </div>

          <div className="col-span-12 md:col-span-7 order-3 mt-8 md:mt-0">
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
          </div>
        </div>
      </section>
    )
}