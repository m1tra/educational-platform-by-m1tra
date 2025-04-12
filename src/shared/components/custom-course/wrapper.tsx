"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Plus, Trash2, FileText } from "lucide-react"

import Link from "next/link"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Badge } from "../ui/badge"
import { Switch } from "../ui/switch"

export interface course{
    id:number
    title:string
    description:string
    modules:module[]
}

interface module {
    id:number,
    title:string,
    lessons:lesson[]
}

type lesson = {
    id:number,
    title:string,
    content:string,
    hasTest:boolean,
    testId: number | null
}

export default function CoursesWrapper() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [modules, setModules] = useState<module[]>([
    {
      id: 1,
      title: "Введение в курс",
      lessons: [
        {
          id: 1,
          title: "Первый урок",
          content: "Содержание первого урока...",
          hasTest: false,
          testId: null,
        },
      ],
    },
  ])
  const [activeTab, setActiveTab] = useState("info")

  const handleAddTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  const handleAddModule = () => {
    const newModule = {
      id: modules.length + 1,
      title: `Новый модуль ${modules.length + 1}`,
      lessons: [],
    }
    setModules([...modules, newModule])
  }

  const handleAddLesson = (moduleId: number) => {
    const updatedModules = modules.map((module) => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: [
            ...module.lessons,
            {
              id: module.lessons.length + 1,
              title: `Новый урок ${module.lessons.length + 1}`,
              content: "",
              hasTest: false,
              testId: null,
            },
          ],
        }
      }
      return module
    })
    setModules(updatedModules)
  }

  const handleUpdateModuleTitle = (moduleId: number, title: string) => {
    const updatedModules = modules.map((module) => {
      if (module.id === moduleId) {
        return { ...module, title }
      }
      return module
    })
    setModules(updatedModules)
  }

  const handleUpdateLessonTitle = (moduleId: number, lessonId: number, title: string) => {
    const updatedModules = modules.map((module) => {
      if (module.id === moduleId) {
        const updatedLessons = module.lessons.map((lesson: lesson) => {
          if (lesson.id === lessonId) {
            return { ...lesson, title }
          }
          return lesson
        })
        return { ...module, lessons: updatedLessons }
      }
      return module
    })
    setModules(updatedModules)
  }

  const handleToggleTest = (moduleId: number, lessonId: number) => {
    const updatedModules = modules.map((module) => {
      if (module.id === moduleId) {
        const updatedLessons = module.lessons.map((lesson: lesson) => {
          if (lesson.id === lessonId) {
            return { ...lesson, hasTest: !lesson.hasTest }
          }
          return lesson
        })
        return { ...module, lessons: updatedLessons }
      }
      return module
    })
    setModules(updatedModules)
  }

  const handleRemoveModule = (moduleId: number) => {
    setModules(modules.filter((module) => module.id !== moduleId))
  }

  const handleRemoveLesson = (moduleId: number, lessonId: number) => {
    const updatedModules = modules.map((module) => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.filter((lesson: lesson) => lesson.id !== lessonId),
        }
      }
      return module
    })
    setModules(updatedModules)
  }

  const handleCreateCourse = () => {
    const newCourse = {
      id: Date.now(),
      title,
      description,
      tags,
      modules,
    }
  
    const storedCourses = localStorage.getItem("courses")
    const courses = storedCourses ? JSON.parse(storedCourses) : []
  
    localStorage.setItem("courses", JSON.stringify([...courses, newCourse]))
  
    router.push("/custom-course/dashboard")
  }
  

  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link href="/courses">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Назад к курсам
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Создание нового курса</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="info">Информация о курсе</TabsTrigger>
          <TabsTrigger value="structure">Структура курса</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Название курса</Label>
                <Input
                  id="title"
                  placeholder="Введите название курса"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Описание курса</Label>
                <Textarea
                  id="description"
                  placeholder="Введите описание курса"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Теги</Label>
                <div className="flex items-center">
                  <Input
                    placeholder="Добавить тег"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="mr-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <Button variant="outline" onClick={handleAddTag}>
                    Добавить
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.length > 0 ? (
                    tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 rounded-full hover:bg-gray-200 h-4 w-4 inline-flex items-center justify-center"
                        >
                          ×
                        </button>
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">Нет добавленных тегов</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => setActiveTab("structure")}>Далее: Структура курса</Button>
          </div>
        </TabsContent>

        <TabsContent value="structure" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Структура курса</CardTitle>
              <Button onClick={handleAddModule}>
                <Plus className="mr-2 h-4 w-4" /> Добавить модуль
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {modules.map((module) => (
                  <div key={module.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <Input
                        value={module.title}
                        onChange={(e) => handleUpdateModuleTitle(module.id, e.target.value)}
                        className="font-medium text-lg max-w-md"
                      />
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveModule(module.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>

                    <div className="pl-4 border-l-2 border-gray-200 space-y-4">
                      {module.lessons.map((lesson: lesson) => (
                        <div key={lesson.id} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <Input
                              value={lesson.title}
                              onChange={(e) => handleUpdateLessonTitle(module.id, lesson.id, e.target.value)}
                              className="max-w-md"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveLesson(module.id, lesson.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>

                          <div className="flex items-center space-x-2 mt-2">
                            <Switch
                              id={`test-${module.id}-${lesson.id}`}
                              checked={lesson.hasTest}
                              onCheckedChange={() => handleToggleTest(module.id, lesson.id)}
                            />
                            <Label htmlFor={`test-${module.id}-${lesson.id}`}>Добавить тест к уроку</Label>
                          </div>

                          {lesson.hasTest && (
                            <div className="mt-2 p-2 bg-gray-50 rounded-md flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm text-gray-600">Тест будет добавлен после создания курса</span>
                            </div>
                          )}
                        </div>
                      ))}

                      <Button variant="outline" className="mt-2" onClick={() => handleAddLesson(module.id)}>
                        <Plus className="mr-2 h-4 w-4" /> Добавить урок
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setActiveTab("info")}>
              Назад: Информация о курсе
            </Button>
            <Button
              onClick={handleCreateCourse}
              disabled={!title || modules.length === 0}
              className="bg-black text-white hover:bg-gray-800"
            >
              Создать курс
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
