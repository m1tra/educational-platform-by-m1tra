"use client"

import { useState } from "react"
import { ArrowLeft} from "lucide-react"

import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { type Word, Test } from "../test/tests"
import { WordsPanel } from "./words-panel/words-panel"
import { CodePanel } from "./code-panel/code-panel"
import { ProgrammingTask } from "./code-panel/code-panel-interface"
import { WordAnswerPanel } from "./word-answer-panel/word-answer-panel"
import { ExamTicketProps } from "./word-answer-panel/exam-ticket-interface"
import { useAppSession } from "@/src/entities/session/use-app-session"
import { toast } from "sonner"
import { useUserRole } from "@/src/entities/session/use-user-role"
import { BaseSettings } from "./_ui/base-settings"
import { TestProperties } from "./_ui/test-properties"
import { TestTypeSelector } from "./_ui/test-type"
import { AdvancedSetting } from "./_ui/advanced-settting"

// const getTestPayload = (selectedValue: string) => {
//   const basePayload = {
//     title,
//     description,
//     expectedOutput ,
//     authorId: session.data?.user?.id,
//   }

//   const payloadByType = {
//     "words": {
//       ...basePayload,
//       type: "words",
//       category: "ege",
//       difficulty: "Лёгкий",
//       icon: "📝",
//     },
//     "examTicket": {
//       ...basePayload,
//       type: "language",
//       category: "language",
//       difficulty: "Средний",
//       icon: "🗣️",
//     },
//     "code": {
//       ...basePayload,
//       type: "math",
//       category: "math",
//       difficulty: "Сложный",
//       icon: "🔢",
//     }
//   }

//   return payloadByType[selectedValue as keyof typeof payloadByType]
// }

export enum TestType {
  WORD = "words",
  EXAM_TICKET = "examTicket",
  CODE = "code",
}

export const Wrapper = () => {
  const { isAdmin } = useUserRole()

  const [title, setTitle] = useState("Мой тест")
  const [description, setDescription] = useState("Заполните пропущенные буквы")
  const [difficulty, setDifficulty] = useState("Средний")
  const [showTest, setShowTest] = useState(false)
  const [selectedValue, setSelectedValue] = useState("words")
  const [testData, setTestData] = useState<Array<Word | ProgrammingTask | ExamTicketProps>>([])
  const session = useAppSession()
  const [tags, setTags] = useState<string[]>([])

  const [loading, setLoading] = useState(false)

  const handleTakeValue = (value: Array<Word | ProgrammingTask | ExamTicketProps>) => {
    setTestData(value)
  }  
  const handleDeleteAll = () => {
    setTestData([])
  }


  const handleCreateTest = async () => {
    setLoading(true)
    try {
      if (!isAdmin) {
        console.error("Необходимо авторизоваться")
        return
      }
      if (testData.length === 0) {
        toast.error('Необходимо добавить задания')
        return
      }

      const testPayload = {
        title,
        description,
        difficulty,
        tags,
        type: selectedValue,
        questions: testData,
        authorId: session.data?.user?.id
      }

      const response = await fetch('/api/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testPayload)
      })
      console.log(response)
      if (!response.ok) {
        throw new Error('Ошибка при создании теста')
      }
      console.log(response)
     
      toast.success('Тест успешно создан')
      

      setTitle("Мой тест")
      setDescription("Заполните пропущенные буквы")
      setTestData([])

    } catch (error) {
      console.error('Ошибка при создании теста:', error)
    }
    finally {
      setLoading(false)
    }
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
      </div>
    )
  }
  
  console.log(selectedValue)
  return (
    <div className="grid gap-6">
      <BaseSettings title={title} setTitle={setTitle} description={description} setDescription={setDescription}/>
      <TestProperties difficulty={difficulty} setDifficulty={setDifficulty} tags={tags} setTags={setTags}/>
      <TestTypeSelector setSelectedValue={setSelectedValue}/>
        <Card className="md:shadow-lg shadow-none md:border-2 border-0">
          <CardHeader className=" flex flex-row justify-between md:px-6 px-2">
            <CardTitle>Создайте свой тест</CardTitle>
            <Button variant="outline" disabled={testData.length === 0 || loading}  onClick={handleCreateTest} >
                Создать
              </Button>
          </CardHeader>
          <CardContent className="md:px-6 px-2">
            <div className="grid md:grid-cols-2 gap-5">

            </div>
            {selectedValue === TestType.WORD && (
              <WordsPanel
                handleTakeValue={handleTakeValue}
                words={testData.filter((item): item is Word => item.type === TestType.WORD)}
              />
            )}

            {selectedValue === TestType.EXAM_TICKET && (
              <WordAnswerPanel
                handleTakeValue={handleTakeValue}
                tests={testData.filter((item): item is ExamTicketProps => item.type === TestType.EXAM_TICKET)}
              />
            )}

            {selectedValue === TestType.CODE && (
              <CodePanel
                handleTakeValue={handleTakeValue}
                initialTasks={testData.filter((item): item is ProgrammingTask => item.type === TestType.CODE)}
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" disabled={isClearDisabled} onClick={handleDeleteAll}>
              Очистить всё
            </Button>
            <div>

              <Button variant="default" disabled={isStartDisabled} onClick={startTest}>
                Начать тест
              </Button>
            </div>
          </CardFooter>
        </Card>
      <AdvancedSetting/>
    </div>
  )
}

