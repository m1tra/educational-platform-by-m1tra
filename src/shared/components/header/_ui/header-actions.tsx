import Link from "next/link"

import { Github } from "lucide-react"
import { Profile } from "./profile";
import { ThemeToggle } from "../../theme-toggle";
import { Button } from "../../ui/button";

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
        <Profile/>
      )}
    </div>
  )
} 