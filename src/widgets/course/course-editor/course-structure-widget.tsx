"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { Button } from "@/src/shared/components/ui/button"
import { Accordion } from "@/src/shared/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog"
import { Input } from "@/src/shared/components/ui/input"
import { Textarea } from "@/src/shared/components/ui/textarea"
import { FolderPlus } from "lucide-react"

import { ModuleItem } from "@/src/features/course-editor/module-item"
import { Course, Lesson, Module } from "@/src/entities/course/types"


interface CourseStructureWidgetProps {
  course: Course
  setCourse: React.Dispatch<React.SetStateAction<Course | null>>
  activeModuleId: number | null
  setActiveModuleId: (id: number | null) => void
  activeLessonId: number | null
  setActiveLessonId: (id: number | null) => void
  expandedModules: string[]
  setExpandedModules: (modules: string[]) => void
  setActiveTab: (tab: string) => void
}

export function CourseStructureWidget({
  course,
  setCourse,
  activeModuleId,
  setActiveModuleId,
  activeLessonId,
  setActiveLessonId,
  expandedModules,
  setExpandedModules,
  setActiveTab,
}: CourseStructureWidgetProps) {
  // Состояния для диалогов
  const [newModuleDialogOpen, setNewModuleDialogOpen] = useState(false)
  const [newLessonDialogOpen, setNewLessonDialogOpen] = useState(false)
  const [deleteModuleDialogOpen, setDeleteModuleDialogOpen] = useState(false)
  const [deleteLessonDialogOpen, setDeleteLessonDialogOpen] = useState(false)
  const [editModuleDialogOpen, setEditModuleDialogOpen] = useState(false)

  // Данные для форм
  const [newModuleTitle, setNewModuleTitle] = useState("")
  const [newModuleDescription, setNewModuleDescription] = useState("")
  const [newLessonTitle, setNewLessonTitle] = useState("")
  const [moduleToDelete, setModuleToDelete] = useState<Module | null>(null)
  const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null)
  const [moduleToEdit, setModuleToEdit] = useState<Module | null>(null)

  // Добавление нового модуля
  const addNewModule = () => {
    if (!course || !newModuleTitle.trim()) return

    const newModule: Module = {
      id: Date.now(),
      title: newModuleTitle,
      description: newModuleDescription,
      lessons: [],
      isPublished: false,
    }

    const updatedCourse = {
      ...course,
      modules: [...course.modules, newModule],
    }

    setCourse(updatedCourse)
    setNewModuleTitle("")
    setNewModuleDescription("")
    setNewModuleDialogOpen(false)
    setActiveModuleId(newModule.id)
    setExpandedModules([...expandedModules, `module-${newModule.id}`])
  }

  // Редактирование модуля
  const updateModule = () => {
    if (!course || !moduleToEdit) return

    const updatedModules = course.modules.map((mod) => (mod.id === moduleToEdit.id ? { ...moduleToEdit } : mod))

    setCourse({
      ...course,
      modules: updatedModules,
    })

    setEditModuleDialogOpen(false)
    setModuleToEdit(null)
  }

  // Удаление модуля
  const deleteModule = () => {
    if (!course || !moduleToDelete) return

    const updatedModules = course.modules.filter((mod) => mod.id !== moduleToDelete.id)

    setCourse({
      ...course,
      modules: updatedModules,
    })

    setDeleteModuleDialogOpen(false)
    setModuleToDelete(null)

    // Если удаляемый модуль был активным, выбираем первый модуль или null
    if (activeModuleId === moduleToDelete.id) {
      setActiveModuleId(updatedModules.length > 0 ? updatedModules[0].id : null)
      setActiveLessonId(null)
    }
  }

  // Добавление нового урока в модуль
  const addNewLesson = () => {
    if (!course || !activeModuleId || !newLessonTitle.trim()) return

    const newLesson: Lesson = {
      id: Date.now(),
      title: newLessonTitle,
      content: "",
      hasTest: false,
      testId: null,
      isCompleted: false,
    }

    const updatedModules = course.modules.map((mod) =>
      mod.id === activeModuleId ? { ...mod, lessons: [...mod.lessons, newLesson] } : mod,
    )

    setCourse({
      ...course,
      modules: updatedModules,
    })

    setNewLessonTitle("")
    setNewLessonDialogOpen(false)
    setActiveLessonId(newLesson.id)
    setActiveTab("content")
  }

  // Удаление урока
  const deleteLesson = () => {
    if (!course || !activeModuleId || !lessonToDelete) return

    const updatedModules = course.modules.map((mod) =>
      mod.id === activeModuleId
        ? {
            ...mod,
            lessons: mod.lessons.filter((lesson) => lesson.id !== lessonToDelete.id),
          }
        : mod,
    )

    setCourse({
      ...course,
      modules: updatedModules,
    })

    setDeleteLessonDialogOpen(false)
    setLessonToDelete(null)


    if (activeLessonId === lessonToDelete.id) {
      const activeModule = updatedModules.find((mod) => mod.id === activeModuleId)
      setActiveLessonId(activeModule && activeModule.lessons.length > 0 ? activeModule.lessons[0].id : null)
    }
  }

  // Перемещение модуля вверх или вниз
  const moveModule = (moduleId: number, direction: "up" | "down") => {
    if (!course) return

    const moduleIndex = course.modules.findIndex((mod) => mod.id === moduleId)
    if (moduleIndex === -1) return

    const newIndex = direction === "up" ? moduleIndex - 1 : moduleIndex + 1

    if (newIndex < 0 || newIndex >= course.modules.length) return

    const updatedModules = [...course.modules]

    const temp = updatedModules[moduleIndex]
    updatedModules[moduleIndex] = updatedModules[newIndex]
    updatedModules[newIndex] = temp

    setCourse({
      ...course,
      modules: updatedModules,
    })
  }

  // Перемещение урока вверх или вниз в пределах модуля
  const moveLesson = (moduleId: number, lessonId: number, direction: "up" | "down") => {
    if (!course) return

    const moduleIndex = course.modules.findIndex((mod) => mod.id === moduleId)
    if (moduleIndex === -1) return

    const lessonIndex = course.modules[moduleIndex].lessons.findIndex((lesson) => lesson.id === lessonId)
    if (lessonIndex === -1) return

    const newIndex = direction === "up" ? lessonIndex - 1 : lessonIndex + 1

    if (newIndex < 0 || newIndex >= course.modules[moduleIndex].lessons.length) return

    const updatedLessons = [...course.modules[moduleIndex].lessons]

    const temp = updatedLessons[lessonIndex]
    updatedLessons[lessonIndex] = updatedLessons[newIndex]
    updatedLessons[newIndex] = temp

    const updatedModules = [...course.modules]
    updatedModules[moduleIndex] = {
      ...updatedModules[moduleIndex],
      lessons: updatedLessons,
    }

    setCourse({
      ...course,
      modules: updatedModules,
    })
  }

  // Переключение статуса публикации модуля
  const toggleModulePublishStatus = (moduleId: number) => {
    if (!course) return

    const updatedModules = course.modules.map((mod) =>
      mod.id === moduleId ? { ...mod, isPublished: !mod.isPublished } : mod,
    )

    setCourse({
      ...course,
      modules: updatedModules,
    })
  }

  // Обработка изменения аккордеона
  const handleAccordionChange = (value: string[]) => {
    setExpandedModules(value)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Структура курса</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setNewModuleDialogOpen(true)}>
            <FolderPlus className="mr-2 h-4 w-4" />
            Добавить модуль
          </Button>
        </CardHeader>
        <CardContent>
          {course.modules.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">У курса пока нет модулей</p>
              <Button variant="outline" className="mt-2" onClick={() => setNewModuleDialogOpen(true)}>
                <FolderPlus className="mr-2 h-4 w-4" />
                Добавить модуль
              </Button>
            </div>
          ) : (
            <Accordion type="multiple" value={expandedModules} onValueChange={handleAccordionChange} className="w-full">
              {course.modules.map((module, index) => (
                <ModuleItem
                  key={module.id}
                  module={module}
                  index={index}
                  totalModules={course.modules.length}
                  isActive={activeModuleId === module.id}
                  activeLessonId={activeLessonId}
                  onModuleSelect={setActiveModuleId}
                  onLessonSelect={(lessonId) => {
                    setActiveModuleId(module.id)
                    setActiveLessonId(lessonId)
                    setActiveTab("content")
                  }}
                  onAddLesson={() => {
                    setActiveModuleId(module.id)
                    setNewLessonDialogOpen(true)
                  }}
                  onEditModule={() => {
                    setModuleToEdit(module)
                    setNewModuleTitle(module.title)
                    setNewModuleDescription(module.description || "")
                    setEditModuleDialogOpen(true)
                  }}
                  onDeleteModule={() => {
                    setModuleToDelete(module)
                    setDeleteModuleDialogOpen(true)
                  }}
                  onMoveModule={moveModule}
                  onMoveLesson={moveLesson}
                  onDeleteLesson={(lesson) => {
                    setActiveModuleId(module.id)
                    setLessonToDelete(lesson)
                    setDeleteLessonDialogOpen(true)
                  }}
                  onTogglePublish={() => toggleModulePublishStatus(module.id)}
                />
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>

      {/* Диалог добавления нового модуля */}
      <Dialog open={newModuleDialogOpen} onOpenChange={setNewModuleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить новый модуль</DialogTitle>
            <DialogDescription>
              Введите название и описание для нового модуля. После создания вы сможете добавить уроки.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="module-title" className="text-sm font-medium">
                Название модуля
              </label>
              <Input
                id="module-title"
                placeholder="Введите название модуля"
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="module-description" className="text-sm font-medium">
                Описание модуля
              </label>
              <Textarea
                id="module-description"
                placeholder="Введите описание модуля"
                value={newModuleDescription}
                onChange={(e) => setNewModuleDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewModuleDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={addNewModule} disabled={!newModuleTitle.trim()}>
              Добавить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог редактирования модуля */}
      <Dialog open={editModuleDialogOpen} onOpenChange={setEditModuleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать модуль</DialogTitle>
            <DialogDescription>Измените название и описание модуля.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="edit-module-title" className="text-sm font-medium">
                Название модуля
              </label>
              <Input
                id="edit-module-title"
                placeholder="Введите название модуля"
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-module-description" className="text-sm font-medium">
                Описание модуля
              </label>
              <Textarea
                id="edit-module-description"
                placeholder="Введите описание модуля"
                value={newModuleDescription}
                onChange={(e) => setNewModuleDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModuleDialogOpen(false)}>
              Отмена
            </Button>
            <Button
              onClick={() => {
                if (moduleToEdit) {
                  setModuleToEdit({
                    ...moduleToEdit,
                    title: newModuleTitle,
                    description: newModuleDescription,
                  })
                  updateModule()
                }
              }}
              disabled={!newModuleTitle.trim()}
            >
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог добавления нового урока */}
      <Dialog open={newLessonDialogOpen} onOpenChange={setNewLessonDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить новый урок</DialogTitle>
            <DialogDescription>
              Введите название для нового урока. Вы сможете добавить содержание позже.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="new-lesson-title" className="text-sm font-medium">
                Название урока
              </label>
              <Input
                id="new-lesson-title"
                placeholder="Введите название урока"
                value={newLessonTitle}
                onChange={(e) => setNewLessonTitle(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewLessonDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={addNewLesson} disabled={!newLessonTitle.trim()}>
              Добавить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог удаления модуля !ошибка с рекурсией*/}
      <Dialog open={deleteModuleDialogOpen} onOpenChange={setDeleteModuleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить модуль</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить модуль &quot;{moduleToDelete?.title}&quot;? Это действие удалит все уроки в этом
              модуле и не может быть отменено.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModuleDialogOpen(false)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={deleteModule}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог удаления урока */}
      <Dialog open={deleteLessonDialogOpen} onOpenChange={setDeleteLessonDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить урок</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить урок &quot;{lessonToDelete?.title}&quot;? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteLessonDialogOpen(false)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={deleteLesson}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
