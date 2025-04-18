"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { Button } from "@/src/shared/components/ui/button"
import { Slider } from "@/src/shared/components/ui/slider"
import type { TestConfigProps } from "./test-interface"
import { BookOpen, Info } from "lucide-react"

export const TestConfig = ({ tasks, taskCount, setTaskCount, onStart, title, description }: TestConfigProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="md:shadow-lg shadow-none md:border border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-center">{title}</CardTitle>
          <CardDescription className="text-center">{description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Количество заданий</h3>
              </div>
              <span className="text-2xl font-bold text-primary">{taskCount}</span>
            </div>

            <Slider
              value={[taskCount]}
              min={1}
              max={Math.min(tasks.length)}
              step={1}
              onValueChange={(value) => setTaskCount(value[0])}
              className="py-4"
            />

            <div className="flex justify-between text-sm text-muted-foreground">
              <span>1</span>
              <span>Всего доступно: {tasks.length}</span>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Как это работает</h4>
                <p className="text-sm text-muted-foreground">
                  Вам будет предложено {taskCount} заданий, в которых нужно будет ввести правильный ответ на основе
                  предоставленной информации.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  После 3 неправильных попыток вам будет показан правильный ответ и система перейдёт к следующему
                  заданию.
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={() => onStart(taskCount)} className="w-full" size="lg">
            Начать тест
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
