"use client"

import { useState } from "react"
import { cn } from "@/src/shared/lib/utils"
import { CreateTab } from "./create-tab"
import { TestTab } from "./test-tab"
import { CodePanelProps, ProgrammingTask } from "./code-panel-interface"
import { Tabs } from "@radix-ui/react-tabs"
import { TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs"


export const CodePanel = ({ handleTakeValue, initialTasks = [] }: CodePanelProps) => {
  const [tasks, setTasks] = useState<ProgrammingTask[]>(initialTasks)

  const handleTasksUpdate = (updatedTasks: ProgrammingTask[]) => {
    setTasks(updatedTasks)
    if (handleTakeValue) {
      handleTakeValue(updatedTasks)
    }
  }

  return (
    <Tabs defaultValue="create" className="mt-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="create">Создать задачу</TabsTrigger>
        <TabsTrigger value="solve">Решить задачу</TabsTrigger>
      </TabsList>
      <TabsContent value="create" className={cn("mt-6")}>
        <CreateTab tasks={tasks} handleTakeValue={handleTasksUpdate} />
      </TabsContent>
      <TabsContent value="solve" className={cn("mt-6")}>
        <TestTab tasks={tasks} />
      </TabsContent>
    </Tabs>
  )
}

