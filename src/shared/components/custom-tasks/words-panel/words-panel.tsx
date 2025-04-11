"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Edit, Trash, Save, X } from "lucide-react"


import { TestType } from "../wrapper"
import { Word } from "../../test/tests"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { Textarea } from "../../ui/textarea"

interface WordsPanelProps {
  handleTakeValue: (words: Word[]) => void
  words: Word[]
}

export const WordsPanel = ({ handleTakeValue, words }: WordsPanelProps) => {
  const [currentWord, setCurrentWord] = useState<Word>({ type: TestType.WORD, expectedOutput: "" })
  const [wordsList, setWordsList] = useState<Word[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingWord, setEditingWord] = useState<Word>({ type: TestType.WORD,expectedOutput: "" })
  const [bulkWords, setBulkWords] = useState<string>("")

  useEffect(() => {
    setWordsList(words)
  }, [words])

  const handleChangeWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentWord({ type: TestType.WORD,expectedOutput: e.target.value })
  }

  const addWord = () => {
    if (currentWord.expectedOutput.length > 0) {
      const updatedList = [...wordsList, currentWord]
      setWordsList(updatedList)
      handleTakeValue(updatedList)
      setCurrentWord({ type: TestType.WORD, expectedOutput: "" })
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
    setEditingWord({ type: TestType.WORD, expectedOutput: e.target.value })
  }

  const saveEdit = (index: number) => {
    if (editingWord.expectedOutput.length > 0) {
      const updatedList = [...wordsList]
      updatedList[index] = editingWord
      setWordsList(updatedList)
      handleTakeValue(updatedList)
      setEditingIndex(null)
    }
  }

  const addBulkWords = () => {
    const wordsArray = bulkWords
      .split(/[\n,]+/) 
      .map((word) => word.trim())
      .filter((word) => word.length > 0) 
  
    if (wordsArray.length > 0) {
      const newWords: Word[] = wordsArray.map((word) => ({ type: TestType.WORD, expectedOutput: word }));
      const updatedList = [...wordsList, ...newWords];
      setWordsList(updatedList);
      handleTakeValue(updatedList);
      setBulkWords("");
    }
  }
  

  return (
    <Tabs defaultValue="one" className="mt-6 ">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="one">Добавить по одному</TabsTrigger>
        <TabsTrigger value="all">Добавить всё</TabsTrigger>
      </TabsList>
      <TabsContent value="one">
        <div className="space-y-2 relative">
          <Label htmlFor="words">Слова</Label>
          <Input id="words" value={currentWord.expectedOutput} onChange={handleChangeWord} placeholder="Введите слово" />
          <p className="text-xs text-muted-foreground">
            Используйте заглавные буквы для обозначения ошибок. <br />
            Например: бЮллЕтень, кОрабль и тд...
          </p>
          <Button size="sm" onClick={addWord}>
            Добавить слово
          </Button>
        </div>

      </TabsContent>
      <TabsContent value="all">
        <div className="space-y-2">
          <Label htmlFor="bulk-words">Добавить несколько слов</Label>
          <Textarea
            id="bulk-words"
            placeholder="Введите слова через запятую или с новой строки"
            className="min-h-[150px]"
            value={bulkWords}
            onChange={(e) => setBulkWords(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Вводите слова через запятую или с новой строки. Например: <br />
            <code>прЕзирать, прИвилегия</code>
          </p>
          <Button onClick={addBulkWords}>Добавить все слова</Button>
        </div>
      </TabsContent>
      <div className="mt-7 space-y-2">
          {wordsList.map((item: Word, index) => (
            <div key={index} className="flex w-full justify-between border p-3 rounded-md">
              {editingIndex === index ? (
                // Edit mode
                <div className="flex flex-col w-full gap-2">
                  <div className="flex flex-col flex-1 space-y-2">
                    <Label className="text-xs text-muted-foreground">Слово</Label>
                    <Input
                      value={editingWord.expectedOutput}
                      onChange={handleEditChange}
                      placeholder="Введите слово"
                      autoFocus
                    />
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
                <div className="flex w-full justify-between">
                  <span>{item.expectedOutput}</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => startEditing(index)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteWord(index)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
    </Tabs>
  )
}
