import { useEffect, useState } from "react"
import { course } from "./wrapper"
import { Card, CardContent, CardHeader } from "../ui/card"

export function CoursesDashboard() {
  const [courses, setCourses] = useState<course[]>([])

  useEffect(() => {
    const storedCourses = localStorage.getItem("courses")
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses))
    }
  }, [])

  return (
    <div>
      <h1>Courses Dashboard</h1>
      {courses.map((course, courseIndex) => (
        <Card key={courseIndex}>
          <CardHeader>{course.title}</CardHeader>
          <CardContent>
            {course.modules.map((module, moduleIndex) => (
              <div key={moduleIndex}>
                <h3>{module.title}</h3>
                <ul className="pl-5">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <li key={lessonIndex}>
                      <h4>{lesson.title}</h4>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
