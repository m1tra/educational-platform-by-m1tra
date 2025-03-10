"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { CardContent } from "@/components/ui/card"
import type { ProgrammingTask } from "./code-panel"
import { Button } from "@/components/ui/button"
import {  Save  } from "lucide-react"

interface TaskEditFormProps {
  task: ProgrammingTask | null
  mode: "create" | "edit"
  index?: number
  onSave?: (task: ProgrammingTask, index: number) => void
  onChange: (field: string, value: string) => void
}

export const TaskEditForm = ({ task, mode, index = 0, onSave, onChange }: TaskEditFormProps) => {
  if (!task) return null

  const handleSave = () => {
    if (onSave && task) {
      onSave(task, index)
    }
  }

  return (
    <CardContent className="p-4">

      <div className="space-y-4">
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
            placeholder="Опишите задачу"
            className="min-h-[100px]"
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
          <Label htmlFor={mode === "create" ? "expectedInput" : `edit-expectedInput-${index}`}>Ожидаемый ввод</Label>
          <Textarea
            id={mode === "create" ? "expectedInput" : `edit-expectedInput-${index}`}
            value={task.expectedInput || ""}
            onChange={(e) => onChange("expectedInput", e.target.value)}
            placeholder="Ожидаемый ввод"
            className="min-h-[80px]"
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
        {mode === "edit" && (
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" /> Сохранить
          </Button>
        )}
      </div>
    </CardContent>
  )
}

