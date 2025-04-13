'use client'

import { Courses } from "@/src/shared/components/courses/custom-course/courses"



export default function CourseDashboard(){
    return(
        <div className="flex min-h-screen flex-col">
            <section className="flex-1 bg-background flex justify-center">
                <div className="container py-6 md:py-10">
                    <Courses/>
                </div>
            </section>
        </div>
    )
}