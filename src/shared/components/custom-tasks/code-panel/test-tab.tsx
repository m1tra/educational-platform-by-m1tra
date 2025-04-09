"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/src/shared/lib/utils"
import { ChevronRight } from "lucide-react"
import { TestTabProps } from "./code-panel-interface"
import { CardPythonInterpreter } from "./compiler"
import { Card, CardContent, CardHeader } from "../../ui/card"



export const TestTab = ({ tasks }: TestTabProps) => {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(tasks.length > 0 ? 0 : null)
  const [code, setCode] = useState<string>("")
  const [output, setOutput] = useState<string>("")

  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-muted-foreground">Нет задач для решения. Создайте задачи во вкладке &quot;Создать задачу&quot;.</p>
      </div>
    )
  }

  const selectedTask = selectedTaskIndex !== null ? tasks[selectedTaskIndex] : null

  const handleTaskSelect = (index: number) => {
    setSelectedTaskIndex(index)
    setCode("")
    
    setOutput("")
  }
  



  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Выберите задачу</h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className={cn(
                    "p-2 rounded-md cursor-pointer flex items-center",
                    selectedTaskIndex === index ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                  onClick={() => handleTaskSelect(index)}
                >
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 mr-2",
                      selectedTaskIndex === index ? "text-primary-foreground" : "text-muted-foreground",
                    )}
                  />
                  <span className="truncate">{task.title}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        {selectedTask && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">{selectedTask.title}</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm">{selectedTask.description}</p>
                  </div>
                  {selectedTask.expectedOutput && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Ожидаемый результат:</h4>
                      <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                        {selectedTask.expectedOutput}
                      </pre>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <CardPythonInterpreter code={code} setCode={setCode} output={output} setOutput={setOutput} />  
          </div>
        )}
      </div>
    </div>
  )
}

