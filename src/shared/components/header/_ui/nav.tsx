import Link from "next/link"

export function Nav() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Главная
      </Link>
      <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Все тесты
      </Link>
      <Link href="/about-project" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        О проекте
      </Link>
    </nav>
  )
} 