"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Play } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { cardPythonInterpreterProps } from "./code-panel-interface"

interface PythonInterpreterProps {
  code: string
  onOutput: (output: string) => void
}

const PythonInterpreter = ({ code, onOutput }: PythonInterpreterProps) => {
  const [isRunning, setIsRunning] = useState(false)
  const [isPyodideReady, setIsPyodideReady] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pyodideRef = useRef<any>(null)

  useEffect(() => {
    async function loadPyodide() {
      setIsRunning(true)
      try {
        if (typeof window !== "undefined") {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script")
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
            script.onload = resolve
            script.onerror = reject
            document.head.appendChild(script)
          })

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          pyodideRef.current = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
          })

          setIsPyodideReady(true)
        }
      } catch (error) {
        console.error("Ошибка загрузки Pyodide:", error)
        onOutput("Ошибка загрузки Python-интерпретатора.")
      } finally {
        setIsRunning(false)
      }
    }

    loadPyodide()
  }, [])

  const executeCode = () => {
    if (!isPyodideReady) {
      onOutput("Python-интерпретатор еще загружается...")
      return
    }
    setIsRunning(true)
    onOutput("Выполнение кода...")

    try {
      pyodideRef.current.runPython(`
        import sys
        from io import StringIO
        sys.stdout = StringIO()
      `)

      pyodideRef.current.runPython(code)
      const stdout = pyodideRef.current.runPython("sys.stdout.getvalue()")
      onOutput(stdout)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      onOutput(`Ошибка: ${error.message}`)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <Button onClick={executeCode} disabled={isRunning || !code.trim()} size="sm">
        <Play className="h-4 w-4 mr-2" />
        Запустить
    </Button>
  )
}

export const CardPythonInterpreter = ({code,setCode,output,setOutput}:cardPythonInterpreterProps) => {
    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCode(e.target.value)
    }
    return (
        <Card className="border-none shadow-none">
            <CardHeader className="md:px-6 px-0">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Ваше решение</h3>
                <PythonInterpreter code={code} onOutput={setOutput} />
              </div>
            </CardHeader>
            <CardContent className=" md:px-6 px-0">
              <div className="relative space-y-4 ">
                <Textarea
                  value={code}
                  onChange={handleCodeChange}
                  placeholder="# Введите ваш код на Python здесь"
                  className="font-mono md:min-h-[200px] min-h-[100px] resize-y"
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
    )
}