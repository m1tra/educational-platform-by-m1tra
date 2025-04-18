"use client"

import { Alert, AlertDescription } from "@/src/shared/components/ui/alert"
import { getLessonById, getLessonProgress, getComments } from "@/src/entities/course/model"

import { VideoPlayer } from "../video-player/video-player"
import { LessonProgressNav } from "@/src/features/course-view/lesson-progress-nav/lesson-progress-nav"
import { LessonNavigation } from "@/src/features/course-view/lesson-navigation/lesson-navigation"
import { CommentsSection } from "@/src/features/course-view/course-comments/comments-section"


interface LessonViewProps {
  lessonId: number | null
  onBack: () => void
  onNavigate?: (lessonId: number) => void
}

export default function LessonView({ lessonId, onNavigate }: LessonViewProps) {
  if (!lessonId) return null

  const lesson = getLessonById(lessonId)
  if (!lesson) return null

  const lessonProgress = getLessonProgress()
  const comments = getComments()

  const handleNavigate = (newLessonId: number) => {
    if (onNavigate) {
      onNavigate(newLessonId)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">

      <LessonProgressNav currentLessonId={lessonId} onNavigate={handleNavigate} />

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-8">
        <Alert className="mb-8 border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/50">
          <AlertDescription className="text-amber-800 dark:text-amber-300">
            Внимание! В конце этого разбора автор допускает вычислительную ошибку и получает ответ в 4 раза больше.
            Верный ответ: 7. Будьте внимательны!
          </AlertDescription>
        </Alert>

        <VideoPlayer
          title={lesson.title}
          duration={lesson.duration ? lesson.duration * 60 : 15 * 60 + 48} // Convert minutes to seconds or use default
        />

        <div className="my-8 prose prose-zinc dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
        </div>

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

        <LessonNavigation
          currentStep={lessonProgress.completedSteps + 1}
          totalSteps={lessonProgress.totalSteps}
          onNextStep={() => console.log("Next step")}
        />

        <CommentsSection comments={comments} />
      </main>
    </div>
  )
}
