"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { EllipsisVertical, Pin, Users, Edit, Eye, BarChart3, Trash2 } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/src/shared/components/ui/card"
import { Button } from "@/src/shared/components/ui/button"
import { Badge } from "@/src/shared/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/components/ui/dropdown-menu"
import { course } from "@/src/entities/course/types"


interface CourseCardProps {
  course: course
  onTogglePin: (courseId: number) => void
  onDelete: (course: course) => void
}

export function CourseCard({ course, onTogglePin, onDelete }: CourseCardProps) {
  const router = useRouter()

  // Подсчет общего количества уроков в курсе
  const countLessons = (): number => {
    return course.modules.reduce((total, module) => total + module.lessons.length, 0)
  }

  const navigateToEditCourse = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/teach/edit/${course.id}`)
  }

  const navigateToViewCourse = () => {
    router.push(`/teach/view/${course.id}`)
  }

  const navigateToCourseAnalytics = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/teach/course/${course.id}`)
  }

  return (
    <Card className="overflow-hidden group transition-all duration-200 hover:shadow-md">
      <CardContent className="p-0 cursor-pointer" onClick={navigateToViewCourse}>
        <div className="relative w-full h-66 bg-gray-100 flex items-center justify-center text-sm text-gray-500 overflow-hidden">
          {course.thumbnail ? (
            <img
              src={course.thumbnail || "/placeholder.svg?height=200&width=400"}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-3xl font-bold text-gray-300 mb-2">{course.title.charAt(0)}</div>
              <span className="text-gray-400">Нет обложки</span>
            </div>
          )}


          <Badge variant={course.status === "published" ? "default" : "outline"} className="absolute top-2 right-2" >
            {course.status === "published" ? "Опубликовано" : "Черновик"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex flex-col justify-start text-sm space-y-3">
        <div className="flex justify-between items-start w-full">
          <h2 className="text-base font-medium line-clamp-2">{course.title}</h2>
        </div>
        <div className="w-full text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
          {course.description || "Описание отсутствует"}
        </div>
        <div className="flex w-full justify-between items-center pt-1">
          <div className="flex gap-4 items-center text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{course.studentsCount || 0} учеников</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="text-xs">
                {countLessons()}{" "}
                {countLessons() === 1 ? "урок" : countLessons() >= 2 && countLessons() <= 4 ? "урока" : "уроков"}
              </Badge>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant={course.isPinned ? "secondary" : "ghost"}
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                onTogglePin(course.id)
              }}
              className="h-8 w-8"
              title={course.isPinned ? "Открепить" : "Закрепить"}
            >
              <Pin size={16} className={course.isPinned ? "fill-foreground" : ""} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                  <EllipsisVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={navigateToEditCourse}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Редактировать</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateToViewCourse()
                  }}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Просмотреть</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={navigateToCourseAnalytics}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Аналитика</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(course)
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Удалить</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
