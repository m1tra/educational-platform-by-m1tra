"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Edit, Trash, Save, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Word } from "@/components/word-learning"
import { pairOfWords } from "@/lib/words"

interface WordsPanelProps {
  handleTakeValue: (words: Word[]) => void
  words: Word[]
}

export const WordsPanel = ({ handleTakeValue, words }: WordsPanelProps) => {
  const [currentWord, setCurrentWord] = useState<Word>({ withGaps: "", correct: "" })
  const [wordsList, setWordsList] = useState<Word[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingWord, setEditingWord] = useState<Word>({ withGaps: "", correct: "" })

  // Sync with parent component's words
  useEffect(() => {
    setWordsList(words)
  }, [words])

  const handleChangeWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    const correct = e.target.value
    const withGaps = pairOfWords(correct)
    setCurrentWord({ withGaps: withGaps || "", correct })
  }

  const addWord = () => {
    if (currentWord.correct.length > 0) {
      const updatedList = [...wordsList, currentWord]
      setWordsList(updatedList)
      handleTakeValue(updatedList)
      setCurrentWord({ withGaps: "", correct: "" })
    }
  }

  const deleteWord = (index: number) => {
    const updatedList = wordsList.filter((_, i) => i !== index)
    setWordsList(updatedList)
    handleTakeValue(updatedList)
  }


  const startEditing = (index: number) => {
    setEditingIndex(index)
    setEditingWord({ ...wordsList[index] })
  }

  const cancelEditing = () => {
    setEditingIndex(null)
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const correct = e.target.value
    const withGaps = pairOfWords(correct)
    setEditingWord({ withGaps: withGaps || "", correct })
  }

  const saveEdit = (index: number) => {
    if (editingWord.correct.length > 0) {
      const updatedList = [...wordsList]
      updatedList[index] = editingWord
      setWordsList(updatedList)
      handleTakeValue(updatedList)
      setEditingIndex(null)
    }
  }

  return (
    <Tabs defaultValue="one" className="mt-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="one">Добавить по одному</TabsTrigger>
        <TabsTrigger value="all">Добавить всё</TabsTrigger>
      </TabsList>
      <TabsContent value="one">
        <div className="space-y-2 relative">
          <Label htmlFor="words">Слова</Label>
          <Input id="words" value={currentWord.correct} onChange={handleChangeWord} placeholder="Введите слово" />
          <p className="text-xs text-muted-foreground">
            Используйте заглавные буквы для обозначения ошибок. <br />
            Например: бЮллЕтень, кОрабль и тд...
          </p>
          <Button size="sm" onClick={addWord}>
            Добавить слово
          </Button>
        </div>
        <div className="mt-7 space-y-2">
          {wordsList.map((item: Word, index) => (
            <div key={index} className="flex w-full justify-between border p-3 rounded-md">
              {editingIndex === index ? (
                // Edit mode
                <div className="flex flex-col w-full gap-2">
                  <div className="flex gap-5 w-full">
                    <div className="flex flex-col flex-1 space-y-2">
                      <Label className="text-xs text-muted-foreground ">Правильное употребление</Label>
                      <Input
                        value={editingWord.correct}
                        onChange={handleEditChange}
                        placeholder="Введите слово"
                        autoFocus
                      />
                    </div>
                    <div className="flex flex-col flex-1 space-y-2">
                      <Label className="text-xs text-muted-foreground">Слово с пропуском</Label>
                      <Input value={editingWord.withGaps} disabled placeholder="Автоматически сгенерировано" />
                    </div>
                  </div>
                  <div className="flex justify-between gap-2">
                    <Button variant="outline" size="sm" onClick={cancelEditing}>
                      <X className="h-4 w-4 mr-1" /> Отмена
                    </Button>
                    <Button variant="default" size="sm" onClick={() => saveEdit(index)}>
                      <Save className="h-4 w-4 mr-1" /> Сохранить
                    </Button>
                  </div>
                </div>
              ) : (
                // View mode
                <>
                  <div className="flex gap-5">
                    <div className="flex flex-col">
                      <p className="text-xs text-muted-foreground">Правильное употребление</p>
                      <span>{item.correct}</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs text-muted-foreground">Слово с пропуском</p>
                      <span>{item.withGaps}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => startEditing(index)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteWord(index)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="all">
        <div className="space-y-2">
          <Label htmlFor="bulk-words">Добавить несколько слов</Label>
          <Textarea id="bulk-words" placeholder="Введите слова, разделяя их новой строкой" className="min-h-[150px]" />
          <p className="text-xs text-muted-foreground">
            Используйте заглавные буквы для обозначения ошибок. Каждое слово с новой строки.
          </p>
          <Button>Добавить все слова</Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}

