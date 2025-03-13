"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Play, ChevronRight } from "lucide-react"
import { TestTabProps } from "./code-panel-interface"



export const TestTab = ({ tasks }: TestTabProps) => {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(tasks.length > 0 ? 0 : null)
  const [code, setCode] = useState<string>("")
  const [output, setOutput] = useState<string>("")
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [isPyodideReady,setIsPyodideReady] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pyodideRef = useRef<any>(null)
  useEffect(() => {
    async function loadPyodide() {
      setIsRunning(true)
      try {
        if (typeof window !== "undefined") {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          window.loadPyodide = async (config) => {
            await new Promise((resolve, reject) => {
              const script = document.createElement("script")
              script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
              script.onload = resolve
              script.onerror = reject
              document.head.appendChild(script)
            })

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return window.loadPyodide(config)
          }

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          pyodideRef.current = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
          })

          setIsPyodideReady(true)
        }
      } catch (error) {
        console.error("Failed to load Pyodide:", error)
        setOutput("Failed to load Python interpreter. Error: " + String(error))
      } finally {
        setIsRunning(false)
      }
    }

    loadPyodide()

  }, [])


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

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
  }

  const executeCode = () => {
    if (!isPyodideReady) {
      setOutput("Python interpreter is still loading...")
      return
    }
    if (!selectedTask) return

    setIsRunning(true)
    setOutput("Выполнение кода...")

    try {
      pyodideRef.current.runPython(`
        import sys
        from io import StringIO
        sys.stdout = StringIO()
      `)

      pyodideRef.current.runPython(code)
      const stdout = pyodideRef.current.runPython(`sys.stdout.getvalue()`)
      setOutput(`# Результат выполнения:
  
Входные данные:
${selectedTask.expectedInput}

Ожидаемый результат:
${selectedTask.expectedOutput}   

Вывод программы:
${stdout}         `)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setOutput(`Error: ${error.message}`)
    } finally {
      setIsRunning(false)
    }

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

                  {selectedTask.expectedInput && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Входные данные:</h4>
                      <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                        {selectedTask.expectedInput}
                      </pre>
                    </div>
                  )}

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

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Ваше решение</h3>
                  <Button onClick={executeCode} disabled={isRunning || !code.trim()} size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Запустить
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    value={code}
                    onChange={handleCodeChange}
                    placeholder="# Введите ваш код на Python здесь"
                    className="font-mono min-h-[200px] resize-y"
                  />

                  {output && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Результат выполнения:</h4>
                      <pre className="bg-muted p-3 rounded-md text-xs overflow-x-scroll whitespace-pre-wrap max-h-100">
                        {output}
                      </pre>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

