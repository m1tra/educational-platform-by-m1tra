"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  getLessonById,
  getLessonProgress,
  getComments,
  courseData,
} from "@/src/entities/course/model"
import { CommentsSection } from "@/src/features/course-view/course-comments/comments-section"
import { LessonNavigation } from "@/src/features/course-view/lesson-navigation/lesson-navigation"
import { LessonProgressNav } from "@/src/features/course-view/lesson-progress-nav/lesson-progress-nav"
import { VideoPlayer } from "@/src/widgets/course/course-view/video-player/video-player"

export default function LessonPage() {
  const router = useRouter()
  const params = useParams()
  const lessonId = Number(params.lesson_id)
  const isInvalidId = Number.isNaN(lessonId)
  const lesson = isInvalidId ? null : getLessonById(lessonId)

  useEffect(() => {
    if (isInvalidId || !lesson) {
      router.push("/")
    }
  }, [isInvalidId, lesson, router])

  if (isInvalidId || !lesson) {
    return null
  }

  const lessonProgress = getLessonProgress()
  const comments = getComments()

  const handleNavigate = (newLessonId: number) => {
    router.push(`/lessons/${newLessonId}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LessonProgressNav currentLessonId={lessonId} onNavigate={handleNavigate} />

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-8">
        <VideoPlayer
          title={lesson.title}
          duration={lesson.duration ? lesson.duration * 60 : 15 * 60 + 48} // Преобразуем минуты в секунды или используем значение по умолчанию
        />

        {/* Контент урока */}
        <div className="my-8 prose prose-zinc dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
        </div>

        {/* Информация о тесте */}
        {lesson.hasTest && (
          <div className="mb-8 p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <h3 className="font-medium mb-2">Тест по теме</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              После изучения материала пройдите тест для закрепления знаний.
            </p>
            <button className="mt-4 px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">
              Перейти к тесту
            </button>
          </div>
        )}

        {/* Обратная связь и навигация */}
        <LessonNavigation
          currentStep={lessonProgress.completedSteps + 1}
          totalSteps={lessonProgress.totalSteps}
          onNextStep={() => {
            // Найти следующий урок и перейти к нему
            const allLessons = courseData.modules.flatMap((module) => module.lessons)
            const currentIndex = allLessons.findIndex((l) => l.id === lessonId)
            if (currentIndex < allLessons.length - 1) {
              handleNavigate(allLessons[currentIndex + 1].id)
            }
          }}
        />

        {/* Комментарии */}
        <CommentsSection comments={comments} />
      </main>
    </div>
  )
}
