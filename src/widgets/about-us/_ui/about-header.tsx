import Link from "next/link";

export function AboutUsHeader(){
    return(
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="border border-white/30 p-1.5 rounded-sm">
            <span className="font-mono text-sm">E/V</span>
          </div>
          <span className="font-mono tracking-tight">Evlera</span>
        </div>  
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider"
          >
            Система
          </Link>
          <Link
            href="#ai"
            className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider"
          >
            ИИ
          </Link>
          <Link
            href="#admin"
            className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider"
          >
            Управление
          </Link>
        </nav>  
        <Link
          href="/auth/sign-in"
          className="border border-white px-4 py-1.5 text-sm font-mono hover:bg-white hover:text-black transition-colors"
        >
          Начать
        </Link>
      </header>
    )
}