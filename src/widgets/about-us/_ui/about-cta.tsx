import Link from "next/link";

export function AboutUsCTA(){
    return(
        <section className="container mx-auto px-4 py-24 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">НАЧНИТЕ СЕЙЧАС</h2>
                <p className="text-white/70 mb-8">
                  Присоединяйтесь к образовательной платформе нового поколения и трансформируйте процесс обучения
                </p>
              </div>
        
              <div className="flex flex-col md:flex-row gap-4 md:justify-end">
                <Link
                  href="/register"
                  className="border-2 border-white px-8 py-4 font-mono text-sm hover:bg-white hover:text-black transition-colors text-center md:text-left"
                >
                  РЕГИСТРАЦИЯ
                </Link>
        
                <Link
                  href="/contact"
                  className="border border-white/30 px-8 py-4 font-mono text-sm text-white/70 hover:text-white hover:border-white transition-colors text-center md:text-left"
                >
                  СВЯЗАТЬСЯ
                </Link>
              </div>
            </div>
      </section>
    )
}