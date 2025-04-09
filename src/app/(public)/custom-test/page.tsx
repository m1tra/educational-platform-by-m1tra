'use client'
import { Wrapper } from "@/src/shared/components/custom-tasks/wrapper";
import { BarLoader } from "@/src/shared/components/ui/loader";
import { Suspense } from "react";


export default function EditPage(){
    return(
        <div className="flex min-h-screen flex-col">
            <section className="flex-1 bg-background flex justify-center">
                <div className="container py-6 md:py-10">
                <Suspense fallback={<BarLoader/>}>
                    <Wrapper />
                </Suspense>
                </div>
            </section>
        </div>
    )
}