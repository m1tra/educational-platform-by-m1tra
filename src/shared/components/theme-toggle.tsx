"use client"

import { useTheme } from "next-themes"
import { Monitor, Moon, Sun } from "lucide-react"
import { cn } from "../lib/utils"

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()


  const options = [
    { value: "system", icon: <Monitor size={14} />, label: "System" },
    { value: "light", icon: <Sun size={14} />, label: "Light" },
    { value: "dark", icon: <Moon size={14} />, label: "Dark" },
  ]

  return (
    <div className="flex items-center space-x-0.5 rounded-full bg-muted p-0.5">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setTheme(option.value)}
          className={cn(
            "flex items-center justify-center rounded-full p-1 text-muted-foreground transition-all",
            theme === option.value && "bg-background text-foreground shadow-sm"
          )}
          style={{ width: 28, height: 28 }}
        >
          {option.icon}
        </button>
      ))}
    </div>
  )
}
