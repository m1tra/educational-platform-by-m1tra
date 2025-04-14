"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs"
import { Input } from "@/src/shared/components/ui/input"
import { Textarea } from "@/src/shared/components/ui/textarea"
import { Label } from "@/src/shared/components/ui/label"
import { Switch } from "@/src/shared/components/ui/switch"
import { Separator } from "@/src/shared/components/ui/separator"
import { Button } from "@/src/shared/components/ui/button"
import { FileText, ImageIcon, Video, Upload, FolderPlus, Plus } from "lucide-react"
import { course } from "@/src/entities/course/model/types"


interface LessonEditorWidgetProps {
  course: course
  setCourse: React.Dispatch<React.SetStateAction<course | null>>
  activeModuleId: number | null
  activeLessonId: number | null
  activeTab: string
  setActiveTab: (tab: string) => void
  setNewModuleDialogOpen: (open: boolean) => void
}

export function LessonEditorWidget({
  course,
  setCourse,
  activeModuleId,
  activeLessonId,
  activeTab,
  setActiveTab,
  setNewModuleDialogOpen,
}: LessonEditorWidgetProps) {
  // Получение активного модуля
  const getActiveModule = () => {
    if (!course || !activeModuleId) return null
    return course.modules.find((mod) => mod.id === activeModuleId) || null
  }

  // Получение активного урока
  const getActiveLesson = () => {
    const activeModule = getActiveModule()
    if (!activeModule || !activeLessonId) return null
    return activeModule.lessons.find((lesson) => lesson.id === activeLessonId) || null
  }

  // Обновление содержимого урока !потом убрать надо костыль
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateLessonContent = (field: string, value: any) => {
    if (!course || !activeModuleId || !activeLessonId) return

    const updatedModules = course.modules.map((mod) =>
      mod.id === activeModuleId
        ? {
            ...mod,
            lessons: mod.lessons.map((lesson) =>
              lesson.id === activeLessonId ? { ...lesson, [field]: value } : lesson,
            ),
          }
        : mod,
    )

    setCourse({
      ...course,
      modules: updatedModules,
    })
  }

  if (!activeLessonId || !activeModuleId) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Нет выбранного урока</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            {course.modules.length === 0
              ? "Сначала создайте модуль, затем добавьте в него уроки"
              : "Выберите урок из списка слева или создайте новый урок, чтобы начать редактирование"}
          </p>
          {course.modules.length === 0 ? (
            <Button onClick={() => setNewModuleDialogOpen(true)}>
              <FolderPlus className="mr-2 h-4 w-4" />
              Создать модуль
            </Button>
          ) : (
            <Button disabled={!activeModuleId && course.modules.length === 0}>
              <Plus className="mr-2 h-4 w-4" />
              Создать урок
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  const activeLesson = getActiveLesson()
  const activeModule = getActiveModule()

  if (!activeLesson || !activeModule) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {activeModule.title} / {activeLesson.title || "Редактирование урока"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="content">Содержание</TabsTrigger>
            <TabsTrigger value="media">Медиа</TabsTrigger>
            <TabsTrigger value="test">Тест</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
            <TabsTrigger value="preview">Предпросмотр</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="lesson-title" className="text-sm font-medium">
                Название урока
              </label>
              <Input
                id="lesson-title"
                value={activeLesson.title || ""}
                onChange={(e) => updateLessonContent("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lesson-content" className="text-sm font-medium">
                Содержание урока
              </label>
              <Textarea
                id="lesson-content"
                value={activeLesson.content || ""}
                onChange={(e) => updateLessonContent("content", e.target.value)}
                rows={12}
                placeholder="Введите содержание урока..."
              />
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
                <p className="font-medium">Добавить изображение</p>
                <p className="text-xs text-muted-foreground">PNG, JPG до 10MB</p>
              </div>
              <div className="border rounded-md p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                <Video className="h-10 w-10 text-muted-foreground" />
                <p className="font-medium">Добавить видео</p>
                <p className="text-xs text-muted-foreground">MP4, WebM до 100MB</p>
              </div>
              <div className="border rounded-md p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                <FileText className="h-10 w-10 text-muted-foreground" />
                <p className="font-medium">Добавить документ</p>
                <p className="text-xs text-muted-foreground">PDF, DOCX до 10MB</p>
              </div>
              <div className="border rounded-md p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <p className="font-medium">Другие файлы</p>
                <p className="text-xs text-muted-foreground">ZIP, RAR до 50MB</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="test" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="test-switch">Тест для урока</Label>
                <p className="text-xs text-muted-foreground">
                  Добавьте тест для проверки знаний после прохождения урока
                </p>
              </div>
              <Switch
                id="test-switch"
                checked={activeLesson.hasTest || false}
                onCheckedChange={(checked) => updateLessonContent("hasTest", checked)}
              />
            </div>

            {activeLesson.hasTest ? (
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="test-id">ID теста</Label>
                  <div className="flex gap-2">
                    <Input
                      id="test-id"
                      type="number"
                      value={activeLesson.testId || ""}
                      onChange={(e) => updateLessonContent("testId", Number(e.target.value) || null)}
                      placeholder="Введите ID теста"
                    />
                    <Button variant="outline">Выбрать тест</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Выберите существующий тест или создайте новый</p>
                </div>

                <div className="border rounded-md p-4">
                  {activeLesson.testId ? (
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Тест #{activeLesson.testId}</p>
                        <p className="text-xs text-muted-foreground">Тест привязан к уроку</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Редактировать тест
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-2">
                      <p className="text-sm text-muted-foreground">Тест не выбран</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Создать новый тест
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="border rounded-md p-6 text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Включите переключатель выше, чтобы добавить тест к уроку
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="completed-switch">Завершенность</Label>
                <p className="text-xs text-muted-foreground">Отметьте урок как завершенный, когда он готов</p>
              </div>
              <Switch
                id="completed-switch"
                checked={activeLesson.isCompleted || false}
                onCheckedChange={(checked) => updateLessonContent("isCompleted", checked)}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="lesson-duration">Продолжительность (минуты)</Label>
              <Input
                id="lesson-duration"
                type="number"
                min="1"
                value={activeLesson.duration || ""}
                onChange={(e) => updateLessonContent("duration", Number(e.target.value) || undefined)}
                placeholder="Например: 30"
              />
              <p className="text-xs text-muted-foreground">Укажите примерную продолжительность урока в минутах</p>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <div className="border rounded-md p-6">
              <h2 className="text-xl font-bold mb-4">{activeLesson.title}</h2>
              <div className="prose max-w-none">
                {activeLesson.content ? (
                  <p>{activeLesson.content}</p>
                ) : (
                  <p className="text-muted-foreground">Нет содержимого для предпросмотра</p>
                )}
              </div>

              {activeLesson.hasTest && (
                <div className="mt-6 p-4 border rounded-md bg-muted/20">
                  <h3 className="font-medium mb-2">Тест к уроку</h3>
                  <p className="text-sm text-muted-foreground">
                    {activeLesson.testId
                      ? `Тест #${activeLesson.testId} будет показан после прохождения урока`
                      : "Тест еще не выбран"}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
