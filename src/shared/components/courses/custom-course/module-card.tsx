import { useEffect, useState } from "react"
import { course } from "./wrapper"
import { Card, CardContent, CardFooter } from "../../ui/card"
import { EllipsisVertical, Pin, Users } from "lucide-react"
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"

export function CoursesDashboard() {
  const [courses, setCourses] = useState<course[]>([])

  useEffect(() => {
    const storedCourses = localStorage.getItem("courses")
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses))
    }
  }, [])

  return (
    <div className="grid md:grid-cols-3 grid-cols-2 gap-5">
      {courses.map((course, courseIndex) => (
        <Card key={courseIndex} className="overflow-hidden">
          <CardContent className="p-0  ">
            <div className="w-full h-62 bg-gray-200  flex items-center justify-center text-sm text-gray-500">
              Course Thumbnail
            </div>
          </CardContent>
          <CardFooter className=" p-4 flex flex-col justify-start text-sm space-y-2">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-base">{course.title}</h2>
              <Badge variant="secondary" className="rounded-sm">Опубликовано</Badge>
            </div>
            <div className="w-full text-sm  text-muted-foreground">
              {course.description || "No description provided"}
            </div>
            <div className="flex w-full justify-between items-end">
              <div className="flex gap-2 items-center text-xs">
                <Users size={16}/>
                <span>156 учеников</span>
              </div>
              <div className="flex gap-2">
                <Button variant={"ghost"} size={"icon"}>
                  <Pin size={20}/>
                </Button>
                <Button variant={"ghost"} size={"icon"}>
                  <EllipsisVertical size={20}/>
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
