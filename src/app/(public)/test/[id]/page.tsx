'use client'

import { Test, Word } from "@/src/shared/components/test/tests";
import { BarLoader } from "@/src/shared/components/ui/loader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface TestResponse {
    id: string
    title: string
    description: string
    questions: string // JSON строка
    type: string
  }
  

export default function TestPage() {
    const { id } = useParams()
    const [test, setTest] = useState<TestResponse | null>(null)
    
    useEffect(() => {
        const fetchTest = async () => {
            try {
                // Используем query параметр для получения теста
                const response = await fetch(`/api/tests?id=${id}`)
                
                if (!response.ok) {
                    throw new Error('Failed to fetch test')
                }
                
                const data = await response.json()
                setTest(data)
            } catch (error) {
                console.error('Error fetching test:', error)
            }
        }
        fetchTest()
    }, [id])

    if (!test) {
        return <BarLoader/>
    }

    const questions = JSON.parse(test.questions) as Word[]

    return (
        <div className="container  mx-auto  flex flex-col min-h-[calc(100vh-65px)] justify-center py-10">
            <Test 
                tasks={questions} 
                title={test.title} 
                description={test.description} 
            />
        </div>
    )
}