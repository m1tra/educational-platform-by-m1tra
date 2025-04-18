"use client"

import { useState } from "react"

import { Tabs } from "@/src/shared/components/ui/tabs"
import { CourseAnalytics } from "./_ui/course-analytics-navigation"
import { AnalyticsHeader } from "./_ui/analytics-header"
import { ActiveCourseStatsCard } from "./_ui/statistics-overview/active-courses-stats-card "
import { AvgTimeStatsCard } from "./_ui/statistics-overview/avg-time-stats-card"
import { CompletionStatsCard } from "./_ui/statistics-overview/completion-stats-card "
import { StudentsStatsCard } from "./_ui/statistics-overview/students-stats-сard"
import { Overview } from "./_ui/tabs/overview"
import { Courses } from "./_ui/tabs/courses"
import { Students } from "./_ui/tabs/students"


export default function AnalyticsInterface() {
  const [period, setPeriod] = useState("month")

  return (
    <div className="space-y-6">
      <AnalyticsHeader period={period} onChangePeriod={setPeriod} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ActiveCourseStatsCard period={period}/>
        <AvgTimeStatsCard period={period}/>
        <CompletionStatsCard period={period}/>
        <StudentsStatsCard period={period}/>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <CourseAnalytics/>  
        <Overview/>
        <Courses/>
        <Students/>
      </Tabs>
    </div>
  )
}
