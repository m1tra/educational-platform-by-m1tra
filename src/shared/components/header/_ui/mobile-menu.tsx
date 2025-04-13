'use client'

import { cn } from '@/src/shared/lib/utils'
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '../../ui/drawer'
import { NavLinks } from './nav'


interface MobileMenuProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onLinkClick: () => void
}

export function MobileMenu({ isOpen, onOpenChange, onLinkClick }: MobileMenuProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className={cn("h-3/4 md:hidden")}>
        <DrawerHeader className="px-5 pt-4 pb-0">
          <DrawerTitle className="text-lg font-semibold">Меню</DrawerTitle>
        </DrawerHeader>

        <nav className="flex flex-col gap-4 px-5 py-6" aria-label="Мобильная навигация">
          <NavLinks onClick={onLinkClick} className="text-base text-secondary-foreground" />
        </nav>

        <DrawerFooter>
          <div className="flex justify-end gap-2">

          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}