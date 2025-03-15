"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"

import { Combobox, type IWordObject } from "@/components/combobox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type Word, Test } from "@/components/test/tests"
import { WordsPanel } from "./words-panel/words-panel"
import { CodePanel } from "./code-panel/code-panel"
import { ProgrammingTask } from "./code-panel/code-panel-interface"

export const Wrapper = () => {
  const [title, setTitle] = useState("Мой тест")
  const [description, setDescription] = useState("Заполните пропущенные буквы")
  const [showTest, setShowTest] = useState(false)
  const [selectedValue, setSelectedValue] = useState("words")
  const [testData, setTestData] = useState<Array<Word | ProgrammingTask>>([])
  
  const handleTakeValue = (value: Array<Word | ProgrammingTask>) => {
    setTestData(value)
  }  

  const handleDeleteAll = () => {
    setTestData([])
  }

  const handleSelect = (option: IWordObject) => {

    setSelectedValue(option.value)
  }

  const startTest = () => {
    if (
      testData.length>0
    ) {
      setShowTest(true)
    }
  }

  const isStartDisabled = testData.length === 0
  const isClearDisabled = testData.length === 0
  if (showTest) {
    return (
      <div className="container mx-auto md:px-4 py-8 md:py-12 flex flex-col items-center">
        <div className="w-full max-w-md mb-6">
          <Button variant="outline" onClick={() => setShowTest(false)} className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Вернуться к редактору
          </Button>
        </div>
        <Test tasks={testData} title={title} description={description} />
        {/* {selectedValue === "words" ? (
          <Test tasks={testValue} title={title} description={description} />
        ) : (
          <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">{title}</h2>
            <p className="mb-8">{description}</p>
            <div className="bg-muted p-6 rounded-lg">
              <p>Программирование: {programmingTasks.length} задач</p>

            </div>
          </div>
        )} */}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
      <div className="md:max-w-7xl w-full mx-auto space-y-6">
        <Combobox onSelect={handleSelect} />
        <Card>
          <CardHeader>
            <CardTitle>Создайте свой тест</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5 grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="title">Название теста</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Введите название теста"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Описание теста</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Введите описание теста"
                />
              </div>
            </div>

            {selectedValue === "words" && (
              <WordsPanel handleTakeValue={handleTakeValue} words={testData.filter((item): item is Word => "expectedOutput" in item)} />
            )}

            {selectedValue === "code" && (
              <CodePanel handleTakeValue={handleTakeValue} initialTasks={testData.filter((item): item is ProgrammingTask => "title" in item)} />
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" disabled={isClearDisabled} onClick={handleDeleteAll}>
              Очистить всё
            </Button>
            <Button variant="default" disabled={isStartDisabled} onClick={startTest}>
              Начать тест
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

