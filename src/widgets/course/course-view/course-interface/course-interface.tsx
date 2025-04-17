"use client"

import { ModuleCard } from "@/src/entities/course/_ui/module-card"
import { courseData } from "@/src/entities/course/model"
import { CourseSidebar } from "../course-sidebar/course-sidebar"


export default function CourseInterface() {


  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="flex flex-col md:flex-row min-h-screen">
        <CourseSidebar course={courseData}  />
        <div className="flex-1 p-6 md:p-10 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Программа курса</h2>
          <div className="space-y-10">
            {courseData.modules.map((module) => (
              <ModuleCard key={module.id} module={module}  />
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
