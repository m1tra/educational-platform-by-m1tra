'use client'

import Link from 'next/link'
import { AlignJustify, BookOpen } from 'lucide-react'
import { useState } from 'react'
import { HeaderActions } from './_ui/header-actions'
import { MobileMenu } from './_ui/mobile-menu'
import { NavLinks } from './_ui/nav'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'


export type HeaderVariant = 'auth' | 'private' | 'public'

interface HeaderProps {
  variant?: HeaderVariant
}

export function Header({ variant = 'public' }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
      <div className="container flex h-16 items-center justify-between px-5">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-primary"
            aria-label="На главную"
          >
            <div className="rounded-md bg-primary p-1">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            <NavLinks />
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <HeaderActions variant={variant} />
          <Button
            variant={"outline"}
            size={'icon'}
            className={cn('md:hidden p-2  ')}
            onClick={() => setIsOpen(true)}
          >
            <AlignJustify size={30} />
          </Button>
        </div>
      </div>

      <MobileMenu
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onLinkClick={() => setIsOpen(false)}
      />
    </header>
  )
}
