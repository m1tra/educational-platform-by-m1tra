"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus } from "lucide-react"
import { Button } from "@/src/shared/components/ui/button"
import { Input } from "@/src/shared/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog"

import { EmptyCoursesState } from "@/src/features/courses/empty-courses-state"
import { CourseCard } from "@/src/features/courses/course-card"
import { Course } from "@/src/entities/course/types"

// Пример данных курсов для первоначальной загрузки, если в localStorage ничего нет
const mockCourses: Course[] = [
  {
    id: 1,
    title: "Веб-разработка",
    description: "Курс по основам веб-разработки с использованием HTML, CSS и JavaScript",
    status: "published",
    studentsCount: 156,
    isPinned: true,
    thumbnail: "/placeholder.svg?height=200&width=400",
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-04-20T14:30:00Z",
    modules: [
      {
        id: 1,
        title: "Введение в HTML",
        description: "Основы HTML разметки",
        isPublished: true,
        lessons: [
          {
            id: 1,
            title: "Структура HTML документа",
            content: "Содержание урока о структуре HTML документа...",
            hasTest: true,
            testId: 101,
            duration: 30,
            isCompleted: true,
          },
          {
            id: 2,
            title: "Теги и атрибуты",
            content: "Содержание урока о тегах и атрибутах...",
            hasTest: false,
            testId: null,
            duration: 45,
            isCompleted: true,
          },
        ],
      },
      {
        id: 2,
        title: "CSS стилизация",
        description: "Основы CSS для оформления веб-страниц",
        isPublished: true,
        lessons: [
          {
            id: 3,
            title: "Селекторы CSS",
            content: "Содержание урока о селекторах CSS...",
            hasTest: true,
            testId: 102,
            duration: 40,
            isCompleted: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Математика",
    description: "Базовый курс математики для начинающих",
    status: "published",
    studentsCount: 120,
    isPinned: false,
    createdAt: "2023-02-10T09:00:00Z",
    updatedAt: "2023-04-15T11:20:00Z",
    modules: [
      {
        id: 3,
        title: "Алгебра",
        description: "Основы алгебры",
        isPublished: true,
        lessons: [
          {
            id: 4,
            title: "Линейные уравнения",
            content: "Содержание урока о линейных уравнениях...",
            hasTest: true,
            testId: 103,
            isCompleted: true,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Программирование на Python",
    description: "Изучение языка программирования Python с нуля до продвинутого уровня",
    status: "draft",
    studentsCount: 0,
    isPinned: false,
    createdAt: "2023-03-05T15:30:00Z",
    updatedAt: "2023-03-05T15:30:00Z",
    modules: [],
  },
]

export function CoursesDashboard() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null)
  const [createCourseDialogOpen, setCreateCourseDialogOpen] = useState(false)
  const [newCourseTitle, setNewCourseTitle] = useState("")
  const [newCourseDescription, setNewCourseDescription] = useState("")

  useEffect(() => {
    // Загрузка курсов из localStorage или использование моковых данных
    const storedCourses = localStorage.getItem("courses")
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses))
    } else {
      setCourses(mockCourses)
      localStorage.setItem("courses", JSON.stringify(mockCourses))
    }
  }, [])

  // Сохранение курсов в localStorage при изменении
  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem("courses", JSON.stringify(courses))
    }
  }, [courses])

  const togglePin = (courseId: number) => {
    setCourses(courses.map((course) => (course.id === courseId ? { ...course, isPinned: !course.isPinned } : course)))
  }

  const handleDeleteCourse = (course: Course) => {
    setCourseToDelete(course)
    // Добавляем небольшую задержку перед открытием диалога, чтобы избежать рекурсии
    setTimeout(() => {
      setDeleteDialogOpen(true)
    }, 0)
  }

  // Также изменим обработчик закрытия диалога, чтобы сначала закрывать диалог, а затем сбрасывать курс
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false)
    // Сбрасываем courseToDelete после закрытия диалога
    setTimeout(() => {
      setCourseToDelete(null)
    }, 100)
  }

  const confirmDelete = () => {
    if (!courseToDelete) return

    setCourses(courses.filter((course) => course.id !== courseToDelete.id))
    setDeleteDialogOpen(false)
    setCourseToDelete(null)
  }

  const createNewCourse = () => {
    if (!newCourseTitle.trim()) return

    const newCourse: Course = {
      id: Date.now(),
      title: newCourseTitle,
      description: newCourseDescription,
      modules: [],
      status: "draft",
      studentsCount: 0,
      isPinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setCourses([newCourse, ...courses])
    setNewCourseTitle("")
    setNewCourseDescription("")
    setCreateCourseDialogOpen(false)

    // Перенаправление на страницу редактирования нового курса
    router.push(`/teach/edit/${newCourse.id}`)
  }

  // Фильтрация курсов
  const filteredCourses = courses.filter((course) => {
    // Поиск по названию или описанию
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase()))

    // Фильтр по статусу
    const matchesStatus =
      activeTab === "all" ||
      (activeTab === "published" && course.status === "published") ||
      (activeTab === "draft" && course.status === "draft")

    return matchesSearch && matchesStatus
  })

  // Сортировка: сначала закрепленные, затем по дате обновления
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.updatedAt || "").getTime() - new Date(a.updatedAt || "").getTime()
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold">Мои курсы</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск курсов..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setCreateCourseDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Быстро создать курс
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Все курсы</TabsTrigger>
          <TabsTrigger value="published">Опубликовано</TabsTrigger>
          <TabsTrigger value="draft">Черновик</TabsTrigger>
        </TabsList>
      </Tabs>

      {sortedCourses.length === 0 ? (
        <EmptyCoursesState onCreateCourse={() => setCreateCourseDialogOpen(true)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCourses.map((course) => (
            <CourseCard key={course.id} course={course} onTogglePin={togglePin} onDelete={handleDeleteCourse} />
          ))}
        </div>
      )}

      <Dialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!open) handleCloseDeleteDialog()
          else setDeleteDialogOpen(true)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить курс</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить курс &quot;{courseToDelete?.title}&quot;? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDeleteDialog}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог создания курса */}
      <Dialog open={createCourseDialogOpen} onOpenChange={setCreateCourseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Создать новый курс</DialogTitle>
            <DialogDescription>
              Введите название и описание для нового курса. После создания вы сможете добавить модули и уроки.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Название курса
              </label>
              <Input
                id="title"
                placeholder="Введите название курса"
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Описание курса
              </label>
              <Input
                id="description"
                placeholder="Введите описание курса"
                value={newCourseDescription}
                onChange={(e) => setNewCourseDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateCourseDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={createNewCourse} disabled={!newCourseTitle.trim()}>
              Создать и редактировать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
