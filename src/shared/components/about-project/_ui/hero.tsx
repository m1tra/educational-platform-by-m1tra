"use client"

import { Terminal } from "lucide-react"
import { Button } from "../../ui/button"

export function Hero(){
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <div className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-background/5 border border-border text-foreground/70 mb-4">
                    <Terminal className="w-3 h-3 mr-1" /> Образовательная платформа
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    <span className="bg-gradient-to-r from-[#A855F7] to-[#4D4DFF] bg-clip-text text-transparent">
                      Создавайте интерактивные тесты
                    </span>
                    <br />
                    <span className="text-foreground/90">легко и быстро</span>
                  </h1>
                  <p className="max-w-[600px] text-foreground/70 md:text-xl">
                    Наша платформа позволяет преподавателям и студентам создавать, делиться и проходить тесты в
                    интерактивном формате.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="px-8 bg-gradient-to-r from-[#A855F7] to-[#4D4DFF] hover:opacity-90 transition-all duration-300 border-0 text-white"
                  >
                    Узнать больше
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center animate-float">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-r bg-noise from-[#A855F7] to-[#4D4DFF] rounded-2xl blur-xl opacity-20 animate-pulse"></div>
                  <div className="relative rounded-xl overflow-hidden border border-border/10 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#A855F7]/10 to-[#4D4DFF]/10"></div>
                    <div className="absolute top-0 left-0 right-0 h-6 bg-background flex items-center px-3 border-b border-white/5">
                      <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF4D4D]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                      </div>
                    </div>
                    <img
                      alt="Образовательная платформа"
                      className="relative mx-auto aspect-video object-cover object-center sm:w-full mt-6"
                      src="/"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}