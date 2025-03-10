"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { CreateTab } from "./create-tab"

export interface ProgrammingTask {
  title: string
  description: string
  initialCode: string
  expectedInput: string
  expectedOutput: string
}

interface CodePanelProps {
  handleTakeValue?: (task: ProgrammingTask[]) => void
  tasks?: ProgrammingTask[]
}

export const CodePanel = ({ handleTakeValue, tasks = [] }: CodePanelProps) => {
  const [currentTasks, setCurrentTasks] = useState<ProgrammingTask[]>(tasks)

  const handleTasksUpdate = (updatedTasks: ProgrammingTask[]) => {
    setCurrentTasks(updatedTasks)
    if (handleTakeValue) {
      handleTakeValue(updatedTasks)
    }
  }
  console.log(currentTasks)
  return (
    <Tabs defaultValue="create" className="mt-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="create">Создать задачу</TabsTrigger>
        <TabsTrigger value="solve">Решить задачу</TabsTrigger>
      </TabsList>
      <TabsContent value="create" className={cn("mt-6")}>
        <CreateTab handleTakeValue={handleTasksUpdate} />
      </TabsContent>
      <TabsContent value="solve">{/* Solve tab content will go here */}</TabsContent>
    </Tabs>
  )
}

