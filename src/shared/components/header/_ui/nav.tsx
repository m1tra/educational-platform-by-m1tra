'use client'

import { cn } from '@/src/shared/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinksProps {
  onClick?: () => void
  className?: string
}

export function NavLinks({ onClick, className }: NavLinksProps) {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Главная' },
    { href: '/tests', label: 'Тесты' },
    { href: '/courses', label: 'Курсы' },
    { href: '/teach', label: 'Преподавание' },
  ]



  return (
    <>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={onClick}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === href ? 'text-primary' : 'text-muted-foreground',
            className
          )}
        >
          {label}
        </Link>
      ))}
    </>
  )
}