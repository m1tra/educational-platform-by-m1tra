"use client"


import { Course } from "@/src/entities/course/types"
import { useEffect, useState } from "react"


export function useCourseView(courseId: string) {
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Загрузка курса из localStorage
    const storedCourses = localStorage.getItem("courses")
    if (storedCourses) {
      const courses = JSON.parse(storedCourses) as Course[]
      const foundCourse = courses.find((c) => c.id.toString() === courseId)
      if (foundCourse) {
        setCourse(foundCourse)
      }
    }
    setIsLoading(false)
  }, [courseId])

  // Подсчет общего количества уроков в курсе
  const countLessons = (): number => {
    if (!course) return 0
    return course.modules.reduce((total, module) => total + module.lessons.length, 0)
  }

  // Расчет процента завершенности курса
  const completedLessons =
    course?.modules.reduce(
      (total, module) => total + module.lessons.filter((lesson) => lesson.isCompleted).length,
      0,
    ) || 0

  const completionPercentage = countLessons() > 0 ? Math.round((completedLessons / countLessons()) * 100) : 0

  // Обновление статуса публикации курса
  const updateCourseStatus = (newStatus: "published" | "draft") => {
    if (!course) return

    const updatedCourse = { ...course, status: newStatus }
    setCourse(updatedCourse)

    // Обновление в localStorage
    const storedCourses = localStorage.getItem("courses")
    if (storedCourses) {
      const courses = JSON.parse(storedCourses) as Course[]
      const updatedCourses = courses.map((c) => (c.id.toString() === courseId ? updatedCourse : c))
      localStorage.setItem("courses", JSON.stringify(updatedCourses))
    }
  }

  return {
    course,
    isLoading,
    completionPercentage,
    completedLessons,
    countLessons: countLessons(),
    updateCourseStatus,
  }
}
