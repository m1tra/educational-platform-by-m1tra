'use client'
import { Wrapper } from "@/src/shared/components/custom-tasks/wrapper";

export default function EditPage(){
    return(
        <div className="flex min-h-screen flex-col">
            <section className="flex-1 bg-background flex justify-center">
                <div className="container py-6 md:py-10">
                    <Wrapper />
                </div>
            </section>
        </div>
    )
}