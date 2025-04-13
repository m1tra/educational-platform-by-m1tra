import Link from "next/link"

export function Nav() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Главная
      </Link>
      <Link href="/tests" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Тесты
      </Link>
      <Link href="/teach" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Курсы
      </Link>
    </nav>
  )
} 