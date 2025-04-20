import { Profile } from "./profile";
import { ThemeSwitch } from "../../theme-toggle";

type HeaderVariant = 'auth' | 'private' | 'public';

interface HeaderActionsProps {
  variant?: HeaderVariant;
}

export function HeaderActions({ variant = 'public' }: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-2 ">
      {variant === 'public' && (
        <Profile/>
      )}
      {(variant === 'private' || variant === 'auth') && (
        <Profile/>
      )}
      <ThemeSwitch />
      
    </div>
  )
} 