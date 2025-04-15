"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/src/shared/components/ui/accordion"
import { Badge } from "@/src/shared/components/ui/badge"
import { Button } from "@/src/shared/components/ui/button"
import { Separator } from "@/src/shared/components/ui/separator"
import { Folder, Edit, MoveUp, MoveDown, CheckCircle, XCircle, Trash2, Plus } from "lucide-react"

import { LessonItem } from "./lesson-item"
import { lesson, module } from "@/src/entities/course/types"

interface ModuleItemProps {
  module: module
  index: number
  totalModules: number
  isActive: boolean
  activeLessonId: number | null
  onModuleSelect: (id: number) => void
  onLessonSelect: (id: number) => void
  onAddLesson: () => void
  onEditModule: () => void
  onDeleteModule: () => void
  onMoveModule: (id: number, direction: "up" | "down") => void
  onMoveLesson: (moduleId: number, lessonId: number, direction: "up" | "down") => void
  onDeleteLesson: (lesson: lesson) => void
  onTogglePublish: () => void
}

export function ModuleItem({
  module,
  index,
  totalModules,
  activeLessonId,
  onLessonSelect,
  onAddLesson,
  onEditModule,
  onDeleteModule,
  onMoveModule,
  onMoveLesson,
  onDeleteLesson,
  onTogglePublish,
}: ModuleItemProps) {
  return (
    <AccordionItem key={module.id} value={`module-${module.id}`} className="border-b">
      <AccordionTrigger className="hover:bg-muted/50 px-2 rounded-md">
        <div className="flex items-center gap-2 text-left">
          <Folder className="h-4 w-4 shrink-0" />
          <span className="font-medium truncate max-w-[180px]">{module.title}</span>
          <Badge variant={module.isPublished ? "default" : "outline"} className="ml-auto mr-2 text-xs">
            {module.isPublished ? "Опубликован" : "Черновик"}
          </Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="pl-2 space-y-1">
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onEditModule}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onMoveModule(module.id, "up")}
                disabled={index === 0}
              >
                <MoveUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onMoveModule(module.id, "down")}
                disabled={index === totalModules - 1}
              >
                <MoveDown className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onTogglePublish}>
                {module.isPublished ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive hover:text-destructive"
              onClick={onDeleteModule}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <Separator className="my-2" />

          {module.lessons.length === 0 ? (
            <p className="text-xs text-muted-foreground py-1">Нет уроков</p>
          ) : (
            module.lessons.map((lesson, lessonIndex) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                index={lessonIndex}
                totalLessons={module.lessons.length}
                isActive={activeLessonId === lesson.id}
                onClick={() => onLessonSelect(lesson.id)}
                onMoveUp={() => onMoveLesson(module.id, lesson.id, "up")}
                onMoveDown={() => onMoveLesson(module.id, lesson.id, "down")}
                onDelete={() => onDeleteLesson(lesson)}
              />
            ))
          )}

          <Button variant="outline" size="sm" className="w-full mt-2" onClick={onAddLesson}>
            <Plus className="mr-2 h-4 w-4" />
            Добавить урок
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
