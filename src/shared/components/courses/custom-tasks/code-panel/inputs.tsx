"use client"


import {  Save  } from "lucide-react"
import { TaskEditFormProps } from "./code-panel-interface"
import { CardContent } from "../../../ui/card"
import { Label } from "../../../ui/label"
import { Input } from "../../../ui/input"
import { Textarea } from "../../../ui/textarea"
import { Button } from "../../../ui/button"



export const TaskEditForm = ({ task, mode, index = 0, onSave, onChange }: TaskEditFormProps) => {
  if (!task) return null

  const handleSave = () => {
    if (onSave && task) {
      onSave(task, index)
    }
  }

  return (
    <CardContent className="p-4">

      <div className="md:flex gap-5 space-y-4">
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor={mode === "create" ? "title" : `edit-title-${index}`}>Название задачи</Label>
            <Input
              id={mode === "create" ? "title" : `edit-title-${index}`}
              value={task.title || ""}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="Введите название задачи"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={mode === "create" ? "description" : `edit-description-${index}`}>Описание задачи</Label>
            <Textarea
              id={mode === "create" ? "description" : `edit-description-${index}`}
              value={task.description || ""}
              onChange={(e) => onChange("description", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  
                  const start = e.currentTarget.selectionStart
                  const end = e.currentTarget.selectionEnd
                  const value = task.description || ""
                  const newValue = value.substring(0, start) + "\t" + value.substring(end)
                  onChange("description", newValue)
                  setTimeout(() => {
                    e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 1
                  }, 0)
                }
              }}
              placeholder="Опишите задачу"
              className="min-h-[100px] whitespace-pre-wrap font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={mode === "create" ? "initialCode" : `edit-initialCode-${index}`}>Начальный код</Label>
            <Textarea
              id={mode === "create" ? "initialCode" : `edit-initialCode-${index}`}
              value={task.initialCode || ""}
              onChange={(e) => onChange("initialCode", e.target.value)}
              placeholder="// Начальный код для задачи"
              className="min-h-[150px] font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={mode === "create" ? "expectedOutput" : `edit-expectedOutput-${index}`}>
              Ожидаемый результат
            </Label>
            <Textarea
              id={mode === "create" ? "expectedOutput" : `edit-expectedOutput-${index}`}
              value={task.expectedOutput || ""}
              onChange={(e) => onChange("expectedOutput", e.target.value)}
              placeholder="Ожидаемый вывод в консоль"
              className="min-h-[80px]"
            />
          </div>
        </div>
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor={mode === "create" ? "generateScript" : `edit-generateScript-${index}`}>
              Скрипт генерации задачи(опционально)
              !Временно не работает
            </Label>
            <Textarea
              disabled
              id={mode === "create" ? "generateScript" : `edit-generateScript-${index}`}
              value={task.generateScript || ""}
              onChange={(e) => onChange("generateScript", e.target.value)}
              placeholder="// Введите код"
              className="min-h-[200px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={mode === "create" ? "answerScript" : `edit-answerScript-${index}`}>
              Скрипт проверки ответа(опционально, работает вместе с скриптом генерации)
              !Временно не работает
            </Label>
            <Textarea
              disabled
              id={mode === "create" ? "answerScript" : `edit-answerScript-${index}`}
              value={task.answerScript || ""}
              onChange={(e) => onChange("answerScript", e.target.value)}
              placeholder="// Введите код "
              className="min-h-[200px]"
            />
          </div>
        </div>
        {mode === "edit" && (
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" /> Сохранить
          </Button>
        )}
      </div>
    </CardContent>
  )
}

