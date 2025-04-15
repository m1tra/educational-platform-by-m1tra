"use client"

import type React from "react"


import { Save } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/src/shared/components/ui/button"
import { course } from "@/src/entities/course/types"



interface CourseHeaderProps {
  course: course
  setCourse: React.Dispatch<React.SetStateAction<course | null>>
  isSaving: boolean
  onSave: () => void
}

export function CourseHeader({ course, setCourse, isSaving, onSave }: CourseHeaderProps) {

  const togglePublishStatus = () => {
    if (!course) return

    const newStatus = course.status === "published" ? "draft" : "published"
    setCourse({ ...course, status: newStatus })
    toast(newStatus === "published"
      ? "Курс опубликован"
      : "Курс переведен в черновики", {
        description: newStatus === "published"
          ? "Теперь курс доступен для студентов"
          : "Курс больше не виден студентам",
      });

  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={togglePublishStatus}>
        {course.status === "published" ? "В черновики" : "Опубликовать"}
      </Button>
      <Button onClick={onSave} disabled={isSaving}>
        {isSaving ? (
          <>Сохранение...</>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Сохранить
          </>
        )}
      </Button>
    </div>
  )
}
