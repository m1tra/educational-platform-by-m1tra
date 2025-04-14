"use client"


import { Button } from "@/src/shared/components/ui/button"
import { Plus } from "lucide-react"

interface EmptyCoursesStateProps {
  onCreateCourse: () => void
}

export function EmptyCoursesState({ onCreateCourse }: EmptyCoursesStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Plus className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-medium mb-2">У вас пока нет курсов</h3>
      <p className="text-muted-foreground mt-2 max-w-md">
        Создайте свой первый курс, чтобы начать обучение. Вы сможете добавить модули, уроки и тесты.
      </p>
      <Button className="mt-6" onClick={onCreateCourse}>
        <Plus className="mr-2 h-4 w-4" />
        Быстро создать курс
      </Button>
    </div>
  )
}
