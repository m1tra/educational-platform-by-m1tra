
import { CoursesNavBar } from "./_ui/nav-bar"
import { CoursesDashboard } from "./module-card"



export function Courses() {

  return (
    <div className="space-y-5">
      <h1 className="">Все курсы</h1>
      <CoursesNavBar/>
      <div>
        <CoursesDashboard/>
      </div>
    </div>
  )
}
