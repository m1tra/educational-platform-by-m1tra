"use client"

import { Combobox, ITasks } from "@/components/combobox"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Word, WordLearningTest } from "@/components/word-learning"
import { cn } from "@/lib/utils"
import { pairOfWords } from "@/lib/words"
import { ArrowLeft, Edit, Trash } from "lucide-react"

import { useState } from "react"



export default function WordLearningPage() {
  const [title,setTitle] = useState("Мой тест")
  const [description,setDescription] = useState("Заполните пропущенные буквы")
  const [words,setWords] = useState<Word>({ withGaps: "", correct: "" })
  const [wordsList,setWordsList] = useState<Word[]>([])
  const [showTest, setShowTest] = useState(false)
  const [selectedValue, setSelectedValue] = useState("words")
  // const [selectedLabel, setSelectedLabel] = useState("")  
  const handleSelect = (option:ITasks) => {
    setSelectedValue(option.value)
    // setSelectedLabel(option.label)
  }
  const handleChangeWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    const correct = e.target.value
    const withGaps = pairOfWords(e.target.value)
    setWords({withGaps:withGaps!,correct:correct})
  }
  const addWord = () => {
    if (words.correct.length > 0) {
      setWordsList([...wordsList, words]);
      setWords({ withGaps: "", correct: "" });
    }
  }
  const deleteWord = (index:number) => {
    const filteredNumbers = wordsList.filter((_,i) => i!=index)
    setWordsList([...filteredNumbers])
  } 
  const startTest = () => {
    if (wordsList.length > 0) {
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

        <WordLearningTest words={wordsList} title={title} description={description} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
      <div className="md:w-3xl w-full mx-auto space-y-6">
        <Combobox onSelect={handleSelect}/>
        {selectedValue=="words"?(
          <Card className="">
            <CardHeader>
              <CardTitle >Создайте свой тест</CardTitle>
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
                <div className="col-span-2">
                  <Tabs defaultValue="one">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="one">
                        Добавить по одному
                      </TabsTrigger>
                      <TabsTrigger value="all">
                        Добавить всё
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="one">
                      <div className="space-y-2 relative">

                        <Label htmlFor="words">Слова</Label>
                        <Input 
                          id="words"
                          value={words.correct}
                          onChange={(e) => handleChangeWord(e)}
                          placeholder="Введите слово"
                          />
                        <p className="text-xs text-muted-foreground">Используйте заглавные буквы для обозначения ошибок. <br/>Например: бЮллЕтень, кОрабль и тд...</p>
                        <Button size={"sm"} className={cn("")} onClick={addWord}>Добавить слово</Button>
                      </div>
                      <div className="mt-7 space-y-2">
                        {wordsList.map((item:Word,index)=>(
                        
                          <div key={index} className="flex w-full justify-between">
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
                              <Button variant={"ghost"}>
                                <Edit/>
                              </Button>
                              <Button variant={"ghost"} onClick={()=>deleteWord(index)}>
                                <Trash/>
                              </Button>
                            </div>
                          </div>

                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="all">
                      <Textarea/>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant={"outline"} disabled={wordsList.length === 0} onClick={()=>setWordsList([])}>
                очистить всё
              </Button>
              <Button variant={"default"} disabled={wordsList.length === 0} onClick={startTest}>
                начать тест
              </Button>
            </CardFooter>
          </Card>
        ):
        null}
      </div>
    </div>
  )
}

