"use client"

import { ThumbsUp, ThumbsDown, ChevronRight } from "lucide-react"
import { Button } from "@/src/shared/components/ui/button"

interface LessonNavigationProps {
  currentStep: number
  totalSteps: number
  onNextStep: () => void
}

export function LessonNavigation({ currentStep, onNextStep }: LessonNavigationProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-4 border-t border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-1.5">
          <ThumbsUp size={14} />
          <span>9</span>
        </Button>
        <Button variant="outline" size="sm">
          <ThumbsDown size={14} />
        </Button>
      </div>

      <div className="text-sm text-zinc-500 dark:text-zinc-400">Шаг {currentStep}</div>

      <div className="ml-auto">
        <Button className="gap-1.5" onClick={onNextStep}>
          <span>Следующий шаг</span>
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  )
}
