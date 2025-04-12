'use client'

import { CoursesDashboard } from "@/src/shared/components/custom-course/module-info"



export default function CourseDashboard(){
    return(
        <div className="flex min-h-screen flex-col">
            <section className="flex-1 bg-background flex justify-center">
                <div className="container py-6 md:py-10">
                    <CoursesDashboard/>
                </div>
            </section>
        </div>
    )
}