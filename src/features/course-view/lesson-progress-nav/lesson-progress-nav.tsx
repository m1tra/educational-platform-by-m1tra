"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle2 } from "lucide-react"
import { Button } from "@/src/shared/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/shared/components/ui/tooltip"
import { Progress } from "@/src/shared/components/ui/progress"
import { courseData, getModuleForLesson } from "@/src/entities/course/model"

interface LessonProgressNavProps {
  currentLessonId: number
  onNavigate?: (lessonId: number) => void
}

export function LessonProgressNav({ currentLessonId, onNavigate }: LessonProgressNavProps) {

  // текущий модуль и урок
  const currentModule = getModuleForLesson(currentLessonId)
  if (!currentModule) return null

  // Получить все уроки в курсе в виде плоского массива
  const allLessons = courseData.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      ...lesson,
      moduleId: module.id,
      moduleTitle: module.title,
    })),
  )

  // индекс текущего урока
  const currentLessonIndex = allLessons.findIndex((lesson) => lesson.id === currentLessonId)
  if (currentLessonIndex === -1) return null

  // предыдущий и следующий уроки
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null

  // процент прогресса
  const progressPercentage = ((currentLessonIndex + 1) / allLessons.length) * 100

  // количество завершённых уроков
  const completedLessons = allLessons.filter((lesson) => lesson.isCompleted).length

  const handleNavigate = (lessonId: number) => {
    if (onNavigate) {
      onNavigate(lessonId)
    }
  }

  const currentLesson = allLessons[currentLessonIndex]

  return (
    <div className="bg-background border-b border-border  text-primary py-2 px-4 sticky top-0 z-20 ">
      <Link href="/" className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2 text-xl font-bold text-primary" aria-label="На главную">
        <div className="rounded-md bg-primary p-1">
          <BookOpen className="h-5 w-5 text-primary-foreground" />
        </div>
      </Link>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">{currentModule.title}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-primary">
            <span>{completedLessons} завершено</span>
            <span>•</span>
            <span>{allLessons.length - completedLessons} осталось</span>
          </div>
        </div>

        <div className="mb-2">
          <Progress
            value={progressPercentage}
            className="h-1 bg-muted"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {prevLesson ? (
              <Link href={`/lessons/${prevLesson.id}`} passHref>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:bg-primary/10 p-1 h-auto flex items-center gap-1 rounded-full"
                  onClick={() => prevLesson && handleNavigate(prevLesson.id)}
                >
                  <ChevronLeft size={16} />
                  <span className="text-xs hidden sm:inline">Назад</span>
                </Button>
              </Link>
            ) : (
              <Button variant="ghost" size="sm" className="text-white/50 p-1 h-auto opacity-50 rounded-full" disabled>
                <ChevronLeft size={16} />
                <span className="text-xs hidden sm:inline">Назад</span>
              </Button>
            )}

            <div className="text-sm font-medium truncate">
              <span className="text-primary/70">
                {currentLessonIndex + 1}/{allLessons.length}
              </span>
              <span className="mx-2 hidden sm:inline">•</span>
              <span className="hidden sm:inline">{currentLesson.title}</span>
            </div>

            {nextLesson ? (
              <Link href={`/lessons/${nextLesson.id}`} passHref>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:bg-primary/10 p-1 h-auto flex items-center gap-1 rounded-full"
                  onClick={() => nextLesson && handleNavigate(nextLesson.id)}
                >
                  <span className="text-xs hidden sm:inline">Далее</span>
                  <ChevronRight size={16} />
                </Button>
              </Link>
            ) : (
              <Button variant="ghost" size="sm" className="text-primary/50 p-1 h-auto opacity-50 rounded-full" disabled>
                <span className="text-xs hidden sm:inline">Далее</span>
                <ChevronRight size={16} />
              </Button>
            )}
          </div>

          <TooltipProvider>
            <div className=" items-center gap-1 hidden md:flex py-1 ">
              {allLessons.map((lesson, index) => {
                const isCurrentLesson = lesson.id === currentLessonId
                const isCompleted = lesson.isCompleted

                return (
                  <Tooltip key={lesson.id}>
                    <TooltipTrigger asChild>
                      <Link href={`/lessons/${lesson.id}`} passHref>
                        <button
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all
                            ${
                              isCurrentLesson
                                ? "bg-primary text-primary-foreground ring-2 ring-ring/30 ring-offset-1 ring-offset-secondary"
                                : isCompleted
                                  ? " bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600"
                                  : "bg-muted hover:bg-accent text-accent-foreground border border-border"
                            }`}
                          onClick={() => handleNavigate(lesson.id)}
                        >
                          {isCompleted && !isCurrentLesson ? (
                            <CheckCircle2 size={14} className="text-white"/>
                          ) : (
                            <span className="text-xs font-medium">{index + 1}</span>
                          )}
                        </button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-popover border-border text-popover-foreground">
                      <p className="font-medium">{lesson.title}</p>
                      <p className="text-muted-foreground text-xs">{lesson.moduleTitle}</p>
                      {isCompleted && <p className="text-chart-2 text-xs mt-1">Завершено</p>}
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
