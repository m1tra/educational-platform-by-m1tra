"use client"

import { useState, useEffect } from "react"
import { TestCard } from "@/src/shared/components/test-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs"
import { BookOpen, Brain  } from "lucide-react"
import { toast } from "sonner"


import { Card, CardFooter, CardContent, CardHeader } from "./ui/card"
import { Skeleton } from "./ui/skeleton"
import { Test } from "../types/test"


const TestCardSkeleton = () => {
    return (
      <>
          <Card className="overflow-hidden h-88 flex flex-col transition-all border-2">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Skeleton className="h-12 w-12" /> {/* Для иконки */}
                <Skeleton className="h-6 w-20" /> {/* Для бейджа сложности */}
              </div>
              <Skeleton className="h-7 w-3/4 mt-4" /> {/* Для заголовка */}
              <Skeleton className="h-4 w-full mt-2" /> {/* Для описания */}
            </CardHeader>
            <CardContent className="flex-grow">
              <Skeleton className="h-4 w-1/3" /> {/* Для количества вопросов */}
            </CardContent>
            <CardFooter className="pt-2">
              <Skeleton className="h-10 w-full" /> {/* Для кнопки */}
            </CardFooter>
          </Card>
    </>
    )
  }
  


export function TestsList() {
  const [tests, setTestsData] = useState([])

  const [loading, setLoading] = useState(false)

  const [response, setResponse] = useState<Response>()
  const handleDelete = async (id: string) => {
    try {
    const response = await fetch(`/api/tests?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setResponse(response)
    if (response.ok) {
      toast.success('Тест удален')
    } else {
      toast.error('Ошибка при удалении теста')
    }
    } catch (error) {
      toast.error(error as string)
    }
  }

  useEffect(() => {
    const fetchTests = async () => {
    setLoading(true)
      try {
        const response = await fetch(`/api/tests`)
        const tests = await response.json()
        setTestsData(tests) 
      } catch (error) {
        console.error('Ошибка при загрузке тестов:', error)
      }
      finally {
        setLoading(false)
      }
    }
    fetchTests()
  }, [response])
  return (
    <>
        <Tabs defaultValue="ege-rus" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="ege-rus" className="flex items-center gap-2 justify-center">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Егэ</span>
              </TabsTrigger>
              <TabsTrigger value="language" className="flex items-center gap-2 justify-center">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Язык</span>
              </TabsTrigger>
              <TabsTrigger value="math" className="flex items-center gap-2 justify-center">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Математика</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="ege-rus" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                  {loading ? (
                    <>
                      <TestCardSkeleton />
                      <TestCardSkeleton />
                      <TestCardSkeleton />
                      <TestCardSkeleton />
                      <TestCardSkeleton />
                      <TestCardSkeleton />
                    </>
                    ) : (
                            
                      tests
                        .filter((test:Test) => test.type === "words")
                        .map((test:Test) => (
                          <TestCard 
                            key={test.id} 
                            test={test} 
                            handleDelete={handleDelete} 
                        
                          />
                        ))
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="math" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                      <>
                        <TestCardSkeleton />
                        <TestCardSkeleton />
                        <TestCardSkeleton />
                        <TestCardSkeleton />
                        <TestCardSkeleton />
                        <TestCardSkeleton />
                      </>
                      ) : (

                       tests
                        .filter((test:Test) => test.type === "examTicket")
                        .map((test:Test) => (
                          <TestCard 
                            key={test.id} 
                            test={test} 
                            handleDelete={handleDelete} 
                          />
                        ))
                    )}
                </div>
            </TabsContent>

        </Tabs>
        
    </>

  )
}

