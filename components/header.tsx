"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { BookOpen, Github, User } from "lucide-react"
import { useState } from "react"
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from './ui/drawer';

export function Header() {

    const [isOpen, setIsOpen] = useState(false);
  
    const handleLinkClick = () => {
      setIsOpen(false); // Закрываем Drawer
    };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between md:mx-auto px-5 ">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold"></span>
          </Link>
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
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="https://github.com/m1tra/educational-platform-by-m1tra">
            <Button variant="outline" size="icon">
                <Github strokeWidth={2} className=' h-[1.2rem] w-[1.2rem]  text-secondary-foreground' />
            </Button>
          </Link>
          <Button variant="outline" size="icon">
            <User strokeWidth={2} className=' h-[1.2rem] w-[1.2rem]  text-secondary-foreground' />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>

            <DrawerContent >
            <DrawerHeader className='p-0 m-0'>
              <DrawerTitle>
               
              </DrawerTitle>
            </DrawerHeader>
            <div className='flex flex-col gap-4 h-96 p-5'>
              <Link href="/" onClick={handleLinkClick}>
                <div className='text-secondary-foreground text-base'>Главная</div>
              </Link>
              <Link href="/" onClick={handleLinkClick}>
                <div className='text-secondary-foreground text-base'>Все тесты</div>
              </Link>
              <Link href="/" onClick={handleLinkClick}>
                <div className='text-secondary-foreground text-base'>О проекте</div>
              </Link>
            </div>
            <DrawerFooter>
              <div className='flex gap-2 justify-end'>
                <Link href="https://github.com/m1tra/educational-platform-by-m1tra">
                  <Github className='text-secondary-foreground' strokeWidth={1} />
                </Link>
              </div>
            </DrawerFooter>
            </DrawerContent>
          </Drawer>
    </header>
  )
}

