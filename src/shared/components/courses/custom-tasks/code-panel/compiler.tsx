"use client"

import { Play } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { cardPythonInterpreterProps } from "./code-panel-interface"
import { Button } from "../../../ui/button"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../../../ui/sheet"
import CodeMirror from "@uiw/react-codemirror"
import { python } from "@codemirror/lang-python"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"

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
  }, [onOutput])

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

export const CardPythonInterpreter = ({ code, setCode, output, setOutput }: cardPythonInterpreterProps) => {
  const handleCodeChange = (value: string) => {
    setCode(value)
  }

  return (
    <Sheet>
      <SheetTrigger asChild className="m-0">
        <Button variant="default">Открыть редактор</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md md:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Ваше решение</SheetTitle>
        </SheetHeader>
        <div className="md:px-6 px-0 py-4">
          <div className="relative space-y-4">
            <div className="border rounded-md overflow-hidden">
              <CodeMirror
                value={code}
                height="300px"
                onChange={handleCodeChange}
                theme={vscodeDark}
                extensions={[python()]}
                basicSetup={{
                  lineNumbers: true,
                  highlightActiveLineGutter: true,
                  highlightSpecialChars: true,
                  foldGutter: true,
                  dropCursor: true,
                  allowMultipleSelections: true,
                  indentOnInput: true,
                  syntaxHighlighting: true,
                  bracketMatching: true,
                  closeBrackets: true,
                  autocompletion: true,
                  rectangularSelection: true,
                  crosshairCursor: true,
                  highlightActiveLine: true,
                  highlightSelectionMatches: true,
                  closeBracketsKeymap: true,
                  defaultKeymap: true,
                  searchKeymap: true,
                  historyKeymap: true,
                  foldKeymap: true,
                  completionKeymap: true,
                  lintKeymap: true,
                }}
                placeholder="# Введите ваш код на Python здесь"
              />
            </div>

            {output && (
              <div>
                <h4 className="text-sm font-medium mb-1">Результат выполнения:</h4>
                <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto whitespace-pre-wrap max-h-[100px]">
                  {output}
                </pre>
              </div>
            )}
          </div>
        </div>
        <SheetFooter>
          <PythonInterpreter code={code} onOutput={setOutput} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
