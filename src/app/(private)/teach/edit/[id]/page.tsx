"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/src/shared/components/ui/button"
import { CourseHeader } from "@/src/widgets/course-editor/course-header"
import { CourseInfoWidget } from "@/src/widgets/course-editor/course-info-widget"
import { CourseStructureWidget } from "@/src/widgets/course-editor/course-structure-widget"
import { LessonEditorWidget } from "@/src/widgets/course-editor/lesson-editor-widget"
import { useCourseEditor } from "@/src/features/course-editor/use-course-editor"
import { toast } from "sonner"
import { course } from "@/src/entities/course/model/types"


export default function EditCoursePage() {
  const params = useParams()
  const router = useRouter()
  const courseId = Number(params.id)
  const [isSaving, setIsSaving] = useState(false)

  const {
    course,
    setCourse,
    activeModuleId,
    setActiveModuleId,
    activeLessonId,
    setActiveLessonId,
    expandedModules,
    setExpandedModules,
    activeTab,
    setActiveTab,
  } = useCourseEditor()

  useEffect(() => {
    // Загрузка курса из localStorage
    const storedCourses = localStorage.getItem("courses")
    if (storedCourses) {
      const courses = JSON.parse(storedCourses) as course[]
      const foundCourse = courses.find((c) => c.id === courseId)
      if (foundCourse) {
        setCourse(foundCourse)

        // Установка первого модуля как активного, если есть модули
        if (foundCourse.modules.length > 0) {
          setActiveModuleId(foundCourse.modules[0].id)
          setExpandedModules([`module-${foundCourse.modules[0].id}`])

          // Установка первого урока как активного, если есть уроки в первом модуле
          if (foundCourse.modules[0].lessons.length > 0) {
            setActiveLessonId(foundCourse.modules[0].lessons[0].id)
          }
        }
      } else {
        // Курс не найден, перенаправление на страницу курсов
        router.push("/teaching/courses")
      }
    }
  }, [courseId, router, setCourse, setActiveModuleId, setActiveLessonId, setExpandedModules])

  // Сохранение изменений курса
  const saveCourse = () => {
    if (!course) return

    setIsSaving(true)

    setTimeout(() => {
      const storedCourses = localStorage.getItem("courses")
      if (storedCourses) {
        const courses = JSON.parse(storedCourses) as course[]
        const updatedCourses = courses.map((c) =>
          c.id === course.id ? { ...course, updatedAt: new Date().toISOString() } : c,
        )
        localStorage.setItem("courses", JSON.stringify(updatedCourses))
        toast.success("Изменения сохранены")
      }
      setIsSaving(false)
    }, 500)
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Загрузка курса...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.push("/teaching/courses")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Редактирование курса</h1>
        </div>
        <CourseHeader course={course} setCourse={setCourse} isSaving={isSaving} onSave={saveCourse} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая колонка - информация о курсе и структура */}
        <div className="lg:col-span-1 space-y-6">
          <CourseInfoWidget course={course} setCourse={setCourse} />
          <CourseStructureWidget
            course={course}
            setCourse={setCourse}
            activeModuleId={activeModuleId}
            setActiveModuleId={setActiveModuleId}
            activeLessonId={activeLessonId}
            setActiveLessonId={setActiveLessonId}
            expandedModules={expandedModules}
            setExpandedModules={setExpandedModules}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Правая колонка - редактор урока */}
        <div className="lg:col-span-2">
          <LessonEditorWidget
            course={course}
            setCourse={setCourse}
            activeModuleId={activeModuleId}
            activeLessonId={activeLessonId}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setNewModuleDialogOpen={() => {
              // Здесь будет логика открытия диалога добавления модуля
            }}
          />
        </div>
      </div>
    </div>
  )
}
