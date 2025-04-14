"use client"

import { Badge } from "@/src/shared/components/ui/badge"
import { Button } from "@/src/shared/components/ui/button"
import { lesson } from "@/src/entities/course/model/types"
import { MoveUp, MoveDown, Trash2 } from "lucide-react"


interface LessonItemProps {
  lesson: lesson
  index: number
  totalLessons: number
  isActive: boolean
  onClick: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  onDelete: () => void
}

export function LessonItem({
  lesson,
  index,
  totalLessons,
  isActive,
  onClick,
  onMoveUp,
  onMoveDown,
  onDelete,
}: LessonItemProps) {
  return (
    <div
      className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
        isActive ? "bg-muted" : "hover:bg-muted/50"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="w-6 h-6 flex items-center justify-center p-0">
          {index + 1}
        </Badge>
        <span className="text-sm truncate max-w-[120px]">{lesson.title}</span>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={(e) => {
            e.stopPropagation()
            onMoveUp()
          }}
          disabled={index === 0}
        >
          <MoveUp className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={(e) => {
            e.stopPropagation()
            onMoveDown()
          }}
          disabled={index === totalLessons - 1}
        >
          <MoveDown className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-destructive hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
