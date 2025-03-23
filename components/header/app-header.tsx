"use client"

import Link from "next/link"
import { BookOpen } from "lucide-react"
import { useState } from "react"
import { Nav } from "./_ui/nav"
import { MobileMenu } from "./_ui/mobile-menu"
import { HeaderActions } from "./_ui/header-actions"

export type HeaderVariant = 'auth' | 'private' | 'public';

interface HeaderProps {
  variant?: HeaderVariant;
}

export function Header({ variant = 'public' }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between md:mx-auto px-5">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold"></span>
          </Link>
          <Nav />
        </div>

        <HeaderActions variant={variant} />
      </div>

      <MobileMenu 
        isOpen={isOpen} 
        onOpenChange={setIsOpen}
        onLinkClick={handleLinkClick}
      />
    </header>
  )
}