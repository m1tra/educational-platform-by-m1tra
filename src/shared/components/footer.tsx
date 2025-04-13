"use client"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8 z-50">
        <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2025 Учебная платформа. Все права защищены.
          </p>
          <p className="text-center text-sm text-muted-foreground md:text-right">Создано с ❤️ для обучения</p>
        </div>
  </footer>
  )
}

