"use client"

import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"
import { TestCard } from "./test-card"

import { Card, CardFooter, CardContent, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { Test } from "../../types/test"
import TagInput from "../ui/tags"

interface Category{
  id:string,
  name:string,
  tests: Test[]
}


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
  const [tests, setTestsData] = useState<Test[]>([])
  const [tags, setTags] = useState<string[]>([])
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

  const initialLoad = useRef(true)

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      try {
        if (initialLoad.current) {
          const categoryRes = await fetch(`/api/categories`)
          const categories = await categoryRes.json()
          setTags(categories.map((category: Category) => category.name))
          console.log(categories)
          initialLoad.current = false
        } else {
          const res = await fetch(`/api/tests?categoryId=${tags}`)
          const tests = await res.json()
          setTestsData(tests)
        }
      } catch (error) {
        console.error('Ошибка при загрузке:', error)
      } finally {
        setLoading(false)
      }
    }
  
    fetchAll()
  }, [tags, response])
  

  return (
    <>
        <div className="w-full space-y-10">
          <div>
            <TagInput tags={tags} setTags={setTags}/>   
          </div>
          <div className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                  {loading && tests.length===0 ? (
                    <>
                      <TestCardSkeleton />
                      <TestCardSkeleton />
                      <TestCardSkeleton />
                      <TestCardSkeleton />
                      <TestCardSkeleton />
                      <TestCardSkeleton />
                    </>
                    ) : (
                      tests.length > 0 && (
                        tests
                          .map((test:Test) => (
                            <TestCard 
                            key={test.id} 
                            test={test} 
                            handleDelete={handleDelete} 
                        
                          />
                        ))
                      )
                    )}
                  </div>
          </div>
        </div>
        
    </>

  )
}

