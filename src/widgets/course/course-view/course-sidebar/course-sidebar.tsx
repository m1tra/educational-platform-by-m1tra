import Link from "next/link"
import { CuboidIcon as Cube, Search, BookmarkPlus, Users, Gift } from "lucide-react"
import { Button } from "@/src/shared/components/ui/button"
import { Progress } from "@/src/shared/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs"
import { SidebarNavigation } from "./sidebar-navigation"
import { getCourseProgress, getTotalPoints, getEarnedPoints, getActiveLesson } from "@/src/entities/course/model"
import { Course } from "@/src/entities/course/types"


interface CourseSidebarProps {
  course: Course
}

export function CourseSidebar({ course }: CourseSidebarProps) {
  const progress = getCourseProgress()
  const totalPoints = getTotalPoints()
  const earnedPoints = getEarnedPoints()
  const activeLesson = getActiveLesson()

  return (
    <div className="w-full md:w-80 border bg-muted md:min-h-screen  ">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-background text-primary p-2 rounded-md">
            <Cube size={18} />
          </div>
          <h1 className="font-bold text-xl">{course.title}</h1>
        </div>

        <div className="space-y-1 text-sm text-muted-foreground">
          <p>{course.description}</p>
          {course.studentsCount && <p className="mt-2">Студентов: {course.studentsCount}</p>}
        </div>

        <div className="mt-6 space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Прогресс курса</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Баллы</span>
            <span className="font-medium">
              {earnedPoints}/{totalPoints}
            </span>
          </div>
        </div>

        {activeLesson && (
          <Button className="w-full mt-6" size="lg" asChild>
            <Link href={`/lessons/${activeLesson.id}`}>Продолжить обучение</Link>
          </Button>
        )}
      </div>

      <div className="border-t border-border">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-border px-6 h-auto">
            <TabsTrigger
              value="about"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black dark:data-[state=active]:border-white pb-3"
            >
              О курсе
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black dark:data-[state=active]:border-white pb-3"
            >
              Содержание
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black dark:data-[state=active]:border-white pb-3"
            >
              Отзывы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="p-6">
            <p className="text-sm text-muted-foreground">{course.description}</p>
            {course.createdAt && (
              <p className="text-xs text-muted-foreground mt-4">
                Создан: {new Date(course.createdAt).toLocaleDateString()}
              </p>
            )}
            {course.updatedAt && (
              <p className="text-xs  text-muted-foreground">
                Обновлен: {new Date(course.updatedAt).toLocaleDateString()}
              </p>
            )}
          </TabsContent>

          <TabsContent value="content" className="p-0">
            <SidebarNavigation />
          </TabsContent>

          <TabsContent value="comments" className="p-6">
            <p className="text-sm  text-muted-foreground">Отзывы студентов будут отображаться здесь.</p>
          </TabsContent>
        </Tabs>
      </div>

      <div className="p-6 border-t border-border space-y-4">
        <button className="flex items-center gap-2 text-sm  text-muted-foreground hover:text-zinc-900 dark:hover:text-zinc-100 w-full text-left">
          <Search size={16} />
          <span>Поиск по курсу</span>
        </button>

        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-zinc-900 dark:hover:text-zinc-100 w-full text-left">
          <BookmarkPlus size={16} />
          <span>Добавить в избранное</span>
        </button>

        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-zinc-900 dark:hover:text-zinc-100 w-full text-left">
          <Users size={16} />
          <span>Создать класс</span>
        </button>

        <div className="pt-4 border-t border-border0">
          <button className="flex items-center gap-2 text-sm font-medium w-full text-left">
            <Gift size={16} />
            <span>Купить в подарок</span>
          </button>
        </div>
      </div>
    </div>
  )
}
