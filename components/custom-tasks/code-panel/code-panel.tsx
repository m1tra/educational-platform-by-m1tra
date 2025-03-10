import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { cn } from "@/lib/utils"
import { Button } from "../../ui/button"
import { TaskEditForm } from "./inputs"

interface CodePanelProps {
  handleTakeValue: (task:ProgrammingTask[]) => void
  tasks: ProgrammingTask[]
}
export interface ProgrammingTask{
    title:string,
    description:string,
    initialCode:string,
    expectedInput:string,
    expectedOutput:string
}


export const CodePanel = ({}:CodePanelProps) => {
    const [tasksList, setTasksList] = useState<ProgrammingTask[]>([])
    const [currentTask, setCurrentTask] = useState<ProgrammingTask>({
        title: "",
        description: "",
        initialCode:"",
        expectedInput: "",
        expectedOutput: "",
      })
    const handleTaskChange = (id:string,value:string) =>{
        setCurrentTask((prev) => ({ ...prev, [id]: value }))
    }
    const addTask = () => {
        const updatedValue = [...tasksList,currentTask]
        setTasksList(updatedValue)
    }
    console.log(tasksList)
    return (
        <Tabs defaultValue="create" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Создать задачу</TabsTrigger>
              <TabsTrigger value="solve">Решить задачу</TabsTrigger>
            </TabsList>
            <TabsContent value="create" className={cn("space-y-6 mt-6")}>
                <div className="space-y-2">
                <TaskEditForm 
                  task={currentTask}
                  mode="create"
                  onChange={handleTaskChange}
                />
                <Button onClick={addTask} disabled={!currentTask.title || !currentTask.description || !currentTask.expectedInput || !currentTask.expectedOutput}>
                    Добавить задачу
                </Button>
                </div>
                <div className="">
                    {tasksList.length===0?(
                        <p className="text-muted-foreground">Нет созданных задач</p>
                    )
                    :
                    (
                    <ul>
                    {tasksList.map((task,index)=>(
                        <li key={index} className="border rounded">
                            <p>{task.title}</p>
                        </li>
                    ))}
                    </ul>
                    )}
                </div>
            </TabsContent>
            <TabsContent value="solve">

            </TabsContent>
        </Tabs>
    )
}