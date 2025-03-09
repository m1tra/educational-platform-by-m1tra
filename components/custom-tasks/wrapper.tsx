"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"

import { Combobox, type ITasks } from "@/components/combobox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type Word, WordLearningTest } from "@/components/word-learning"
import { WordsPanel } from "./words-panel"

export const Wrapper = () => {
  const [title, setTitle] = useState("Мой тест")
  const [description, setDescription] = useState("Заполните пропущенные буквы")
  const [showTest, setShowTest] = useState(false)
  const [selectedValue, setSelectedValue] = useState("words")
  const [testValue, setTestValue] = useState<Word[]>([])

  const handleDeleteAll = () => {
    setTestValue([])
  }

  const handleTakeValue = (value: Word[]) => {
    setTestValue(value)
  }

  const handleSelect = (option: ITasks) => {
    setSelectedValue(option.value)
  }

  const startTest = () => {
    if (testValue.length > 0) {
      setShowTest(true)
    }
  }

  if (showTest) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        <div className="w-full max-w-md mb-6">
          <Button variant="outline" onClick={() => setShowTest(false)} className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Вернуться к редактору
          </Button>
        </div>

        <WordLearningTest words={testValue} title={title} description={description} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
      <div className="md:w-3xl w-full mx-auto space-y-6">
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
              <WordsPanel handleTakeValue={handleTakeValue} words={testValue} />
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" disabled={testValue.length === 0} onClick={handleDeleteAll}>
              Очистить всё
            </Button>
            <Button variant="default" disabled={testValue.length === 0} onClick={startTest}>
              Начать тест
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

