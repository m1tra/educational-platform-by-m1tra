import Link from "next/link"
import { Github } from "lucide-react"
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'

interface MobileMenuProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onLinkClick: () => void
}

export function MobileMenu({ isOpen, onOpenChange, onLinkClick }: MobileMenuProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className='p-0 m-0'>
          <DrawerTitle></DrawerTitle>
        </DrawerHeader>
        <div className='flex flex-col gap-4 h-96 p-5'>
          <Link href="/" onClick={onLinkClick}>
            <div className='text-secondary-foreground text-base'>Главная</div>
          </Link>
          <Link href="/" onClick={onLinkClick}>
            <div className='text-secondary-foreground text-base'>Все тесты</div>
          </Link>
          <Link href="/" onClick={onLinkClick}>
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
  )
} 