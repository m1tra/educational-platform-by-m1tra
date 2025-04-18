"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/src/shared/components/ui/card"
import { Badge } from "@/src/shared/components/ui/badge"
import type { Lesson, Module } from "../types"

interface ModuleCardProps {
  module: Module
}

export function ModuleCard({ module }: ModuleCardProps) {

  const totalLessons = module.lessons.length
  const completedLessons = module.lessons.filter((lesson) => lesson.isCompleted).length
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <span>{module.id}.</span>
          <span>{module.title}</span>
        </h3>
        <Badge
          variant={progress === 100 ? "default" : "outline"}
          className={progress === 100 ? "bg-green-500 hover:bg-green-600" : ""}
        >
          {progress === 100 ? "Завершено" : `${progress}%`}
        </Badge>
      </div>

      {module.description && <p className="text-sm text-zinc-500 dark:text-zinc-400">{module.description}</p>}

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {module.lessons.map((lesson) => (
              <LessonRow key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface LessonRowProps {
  lesson: Lesson
}

function LessonRow({ lesson }: LessonRowProps) {
  const isActive = !lesson.isCompleted

  return (
    <Link
      href={`/lessons/${lesson.id}`}
      className={`w-full flex items-center p-4 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors ${
        isActive ? "bg-zinc-50 dark:bg-zinc-900" : ""
      }`}
    >
      <div className="mr-4 relative">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border ${
            lesson.isCompleted
              ? "border-green-500 bg-green-50 dark:bg-green-950"
              : "border-amber-500 bg-amber-50 dark:bg-amber-950"
          }`}
        >
          {lesson.isCompleted ? (
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          ) : (
            <div className="w-3 h-3 bg-amber-500 rounded-full" />
          )}
        </div>
      </div>

      <div className="flex-1">
        <div className="font-medium">{lesson.title}</div>
        {lesson.duration && (
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Продолжительность: {lesson.duration} мин</div>
        )}
      </div>

      <div className="ml-4 flex items-center gap-2">
        {lesson.hasTest && <span className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full">Тест</span>}
        <ChevronRight size={16} className="text-zinc-400" />
      </div>
    </Link>
  )
}
