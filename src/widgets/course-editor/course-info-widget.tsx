"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { Input } from "@/src/shared/components/ui/input"
import { Textarea } from "@/src/shared/components/ui/textarea"
import { Badge } from "@/src/shared/components/ui/badge"
import { Separator } from "@/src/shared/components/ui/separator"
import { Switch } from "@/src/shared/components/ui/switch"
import { Label } from "@/src/shared/components/ui/label"
import { ImageIcon } from "lucide-react"
import { course } from "@/src/entities/course/model/types"


interface CourseInfoWidgetProps {
  course: course
  setCourse: React.Dispatch<React.SetStateAction<course | null>>
}

export function CourseInfoWidget({ course, setCourse }: CourseInfoWidgetProps) {
  // Обновление основной информации о курсе
  const updateCourseInfo = (field: keyof course, value: course[typeof field]) => {
    if (!course) return
    setCourse({ ...course, [field]: value })
  }

  // Переключение статуса публикации
  const togglePublishStatus = () => {
    if (!course) return
    const newStatus = course.status === "published" ? "draft" : "published"
    updateCourseInfo("status", newStatus)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Информация о курсе</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Название курса
          </label>
          <Input id="title" value={course.title} onChange={(e) => updateCourseInfo("title", e.target.value)} />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Описание курса
          </label>
          <Textarea
            id="description"
            value={course.description || ""}
            onChange={(e) => updateCourseInfo("description", e.target.value)}
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Обложка курса</label>
          <div className="border rounded-md p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Нажмите, чтобы загрузить обложку</p>
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Статус</p>
            <p className="text-xs text-muted-foreground">
              {course.status === "published" ? "Опубликован" : "Черновик"}
            </p>
          </div>
          <Badge variant={course.status === "published" ? "default" : "outline"}>
            {course.status === "published" ? "Опубликовано" : "Черновик"}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="publish-switch">Публикация</Label>
            <p className="text-xs text-muted-foreground">
              {course.status === "published" ? "Курс виден студентам" : "Курс скрыт от студентов"}
            </p>
          </div>
          <Switch
            id="publish-switch"
            checked={course.status === "published"}
            onCheckedChange={() => togglePublishStatus()}
          />
        </div>
      </CardContent>
    </Card>
  )
}
