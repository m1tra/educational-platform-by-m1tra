"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { courseData } from "@/src/entities/course/model"


export function SidebarNavigation() {
  return (
    <div className="divide-y divide-border dark:divide-border">
      {courseData.modules.map((module) => (
        <div key={module.id} className="py-2">
          <div className="px-6 py-2 font-medium text-sm">
            {module.id}. {module.title}
          </div>
          <div>
            {module.lessons.map((lesson) => {
              const isActive = !lesson.isCompleted

              return (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.id}`}
                  className={`w-full flex items-center px-6 py-2 text-sm text-left hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
                    isActive ? "bg-zinc-50 dark:bg-zinc-800" : ""
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-3 ${lesson.isCompleted ? "bg-green-500" : "bg-amber-500"}`}
                  />
                  <span className="flex-1">{lesson.title}</span>
                  <ChevronRight size={14} className="text-muted-foreground" />
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
