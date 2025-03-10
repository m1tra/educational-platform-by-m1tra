"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Edit, Trash } from "lucide-react"
import { TaskEditForm } from "./inputs"


export interface ProgrammingTask {
  title: string
  description: string
  initialCode: string
  expectedInput: string
  expectedOutput: string
}

interface CreateTabProps {
  tasks: ProgrammingTask[]
  handleTakeValue: (tasks: ProgrammingTask[]) => void
}

export const CreateTab = ({ tasks, handleTakeValue }: CreateTabProps) => {
  const [tasksList, setTasksList] = useState<ProgrammingTask[]>(tasks)
  const [currentTask, setCurrentTask] = useState<ProgrammingTask>({
    title: "",
    description: "",
    initialCode: "",
    expectedInput: "",
    expectedOutput: "",
  })
  const [editingTask, setEditingTask] = useState<ProgrammingTask>({
    title: "",
    description: "",
    initialCode: "",
    expectedInput: "",
    expectedOutput: "",
  })
  const [editIndex, setEditIndex] = useState<number | null>(null)

  useEffect(() => {
    setTasksList(tasks)
  }, [tasks])

  useEffect(() => {
    handleTakeValue(tasksList)
  }, [tasksList, handleTakeValue])

  const onSave = (task: ProgrammingTask, index: number) => {
    const updatedList = [...tasksList]
    updatedList[index] = task
    setTasksList(updatedList)
    setEditIndex(null)
  }

  const handleCreateTaskChange = (id: string, value: string) => {
    setCurrentTask((prev) => ({ ...prev, [id]: value }))
  }

  const handleEditTaskChange = (id: string, value: string) => {
    setEditingTask((prev) => ({ ...prev, [id]: value }))
  }

  const addTask = () => {
    const updatedValue = [...tasksList, currentTask]
    setTasksList(updatedValue)
    setCurrentTask({
      title: "",
      description: "",
      initialCode: "",
      expectedInput: "",
      expectedOutput: "",
    })
  }

  const deleteTask = (index: number) => {
    const updatedList = tasksList.filter((_, i) => i !== index)
    setTasksList(updatedList)
  }

  const startEditing = (index: number) => {
    setEditingTask({ ...tasksList[index] })
    setEditIndex(index)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <TaskEditForm task={currentTask} mode="create" onChange={handleCreateTaskChange} />
        <Button
          onClick={addTask}
          disabled={
            !currentTask.title || !currentTask.description || !currentTask.expectedInput || !currentTask.expectedOutput
          }
        >
          Добавить задачу
        </Button>
      </div>
      <div>
        {tasksList.length === 0 ? (
          <p className="text-muted-foreground">Нет созданных задач</p>
        ) : (
          <ul>
            {tasksList.map((task, index) => (
              <Card key={index} className="mb-4">
                {editIndex === index ? (
                  <>
                    <TaskEditForm
                      task={editingTask}
                      mode="edit"
                      index={index}
                      onChange={handleEditTaskChange}
                      onSave={onSave}
                    />
                  </>
                ) : (
                  <>
                    <CardHeader>
                      <div className="flex justify-between">
                        <h2 className="text-base">{task.title}</h2>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => startEditing(index)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteTask(index)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <p className="text-sm">{task.description}</p>
                      </div>
                      {task.initialCode && (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">Начальный код:</p>
                          <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto mt-1">{task.initialCode}</pre>
                        </div>
                      )}
                      {task.expectedInput && (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">Ввод:</p>
                          <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto mt-1">
                            {task.expectedInput}
                          </pre>
                        </div>
                      )}
                      {task.expectedOutput && (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">Ожидаемый результат:</p>
                          <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto mt-1">
                            {task.expectedOutput}
                          </pre>
                        </div>
                      )}
                    </CardContent>
                  </>
                )}
              </Card>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

