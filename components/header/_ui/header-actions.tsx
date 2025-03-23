import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Github, User } from "lucide-react"

type HeaderVariant = 'auth' | 'private' | 'public';

interface HeaderActionsProps {
  variant?: HeaderVariant;
}

export function HeaderActions({ variant = 'public' }: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-4">
      <ThemeToggle />
      {variant === 'public' && (
        <Link href="https://github.com/m1tra/educational-platform-by-m1tra">
          <Button variant="outline" size="icon">
            <Github strokeWidth={2} className='h-[1.2rem] w-[1.2rem] text-secondary-foreground' />
          </Button>
        </Link>
      )}
      {(variant === 'private' || variant === 'auth') && (
        <Button variant="outline" size="icon">
          <User strokeWidth={2} className='h-[1.2rem] w-[1.2rem] text-secondary-foreground' />
        </Button>
      )}
    </div>
  )
} 