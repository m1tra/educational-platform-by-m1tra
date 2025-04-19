import Link from "next/link";

export function AboutUsFooter(){
    return(
        <footer className="container mx-auto px-4 py-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-8 md:mb-0">
            <div className="border border-white/30 p-1.5 rounded-sm inline-block mb-4">
              <span className="font-mono text-sm">T/S</span>
            </div>
            <p className="text-white/50 text-xs max-w-xs mt-4">
              Образовательная платформа с интеллектуальной системой тестирования и интеграцией курсов
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xs font-mono mb-4 text-white/50">НАВИГАЦИЯ</h3>
              <ul className="space-y-2">
                {["Главная", "О системе", "Возможности", "ИИ", "Управление"].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-sm hover:underline">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono mb-4 text-white/50">РЕСУРСЫ</h3>
              <ul className="space-y-2">
                {["Документация", "API", "Поддержка", "Сообщество", "Блог"].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-sm hover:underline">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 mt-8 md:mt-0">
              <h3 className="text-xs font-mono mb-4 text-white/50">КОНТАКТЫ</h3>
              <address className="not-italic text-sm space-y-2 text-white/70">
                <p>info@testmaster.com</p>
                <p>+7 (999) 123-45-67</p>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-xs mb-4 md:mb-0">© 2025 ThinkSera. Все права защищены.</div>

          <div className="flex gap-4">
            {["Условия", "Конфиденциальность", "Cookies"].map((item, i) => (
              <Link key={i} href="#" className="text-xs text-white/50 hover:text-white">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    )
}