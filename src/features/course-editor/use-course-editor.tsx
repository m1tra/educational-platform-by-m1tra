"use client"

import { Course, Lesson, Module } from "@/src/entities/course/types"
import { useState } from "react"


export function useCourseEditor() {
  const [course, setCourse] = useState<Course | null>(null)
  const [activeTab, setActiveTab] = useState("content")
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null)
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null)
  const [expandedModules, setExpandedModules] = useState<string[]>([])

  // Обновление основной информации о курсе
  const updateCourseInfo = (field: keyof Course, value: Course[typeof field]) => {
    if (!course) return
    setCourse({ ...course, [field]: value })
  }

  // Переключение статуса публикации
  const togglePublishStatus = () => {
    if (!course) return
    const newStatus = course.status === "published" ? "draft" : "published"
    updateCourseInfo("status", newStatus)
  }

  // Получение активного модуля
  const getActiveModule = () => {
    if (!course || !activeModuleId) return null
    return course.modules.find((mod) => mod.id === activeModuleId) || null
  }

  // Получение активного урока
  const getActiveLesson = () => {
    const activeModule = getActiveModule()
    if (!activeModule || !activeLessonId) return null
    return activeModule.lessons.find((lesson) => lesson.id === activeLessonId) || null
  }

  // Добавление нового модуля
  const addModule = (moduleData: Omit<Module, "id" | "lessons">) => {
    if (!course) return

    const newModule: Module = {
      id: Date.now(),
      title: moduleData.title,
      description: moduleData.description,
      lessons: [],
      isPublished: false,
    }

    setCourse({
      ...course,
      modules: [...course.modules, newModule],
    })

    return newModule.id
  }

  // Обновление модуля
  const updateModule = (moduleId: number, data: Partial<Module>) => {
    if (!course) return

    setCourse({
      ...course,
      modules: course.modules.map((mod) => (mod.id === moduleId ? { ...mod, ...data } : mod)),
    })
  }

  // Удаление модуля
  const deleteModule = (moduleId: number) => {
    if (!course) return

    setCourse({
      ...course,
      modules: course.modules.filter((mod) => mod.id !== moduleId),
    })

    // Если удаляемый модуль был активным, выбираем первый модуль или null
    if (activeModuleId === moduleId) {
      const remainingModules = course.modules.filter((mod) => mod.id !== moduleId)
      setActiveModuleId(remainingModules.length > 0 ? remainingModules[0].id : null)
      setActiveLessonId(null)
    }
  }

  // Добавление нового урока
  const addLesson = (moduleId: number, lessonData: Omit<Lesson, "id" | "hasTest" | "testId">) => {
    if (!course) return

    const newLesson: Lesson = {
      id: Date.now(),
      title: lessonData.title,
      content: lessonData.content || "",
      hasTest: false,
      testId: null,
    }

    setCourse({
      ...course,
      modules: course.modules.map((mod) =>
        mod.id === moduleId ? { ...mod, lessons: [...mod.lessons, newLesson] } : mod,
      ),
    })

    return newLesson.id
  }

  // Обновление урока
  const updateLesson = (moduleId: number, lessonId: number, data: Partial<Lesson>) => {
    if (!course) return

    setCourse({
      ...course,
      modules: course.modules.map((mod) =>
        mod.id === moduleId
          ? {
              ...mod,
              lessons: mod.lessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, ...data } : lesson)),
            }
          : mod,
      ),
    })
  }

  // Удаление урока
  const deleteLesson = (moduleId: number, lessonId: number) => {
    if (!course) return

    setCourse({
      ...course,
      modules: course.modules.map((mod) =>
        mod.id === moduleId
          ? {
              ...mod,
              lessons: mod.lessons.filter((lesson) => lesson.id !== lessonId),
            }
          : mod,
      ),
    })

    if (activeLessonId === lessonId && activeModuleId === moduleId) {
      const activeModule = course.modules.find((mod) => mod.id === moduleId)
      const remainingLessons = activeModule?.lessons.filter((lesson) => lesson.id !== lessonId) || []
      setActiveLessonId(remainingLessons.length > 0 ? remainingLessons[0].id : null)
    }
  }

  return {
    course,
    setCourse,
    activeTab,
    setActiveTab,
    activeModuleId,
    setActiveModuleId,
    activeLessonId,
    setActiveLessonId,
    expandedModules,
    setExpandedModules,
    updateCourseInfo,
    togglePublishStatus,
    getActiveModule,
    getActiveLesson,
    addModule,
    updateModule,
    deleteModule,
    addLesson,
    updateLesson,
    deleteLesson,
  }
}
