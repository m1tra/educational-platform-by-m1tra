"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Loader2} from "lucide-react"

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

import { useSearchParams } from 'next/navigation'
import { Category } from "@prisma/client"
import { z, ZodFormattedError } from "zod"

export enum TestType {
  WORD = "words",
  EXAM_TICKET = "examTicket",
  CODE = "code",
}

export const schemaWrapper = z.object({
  title: z.string().min(1, "Название обязательно"),
  description: z.string().min(1, "Описание обязательно"),
  difficulty: z.string().min(1, "Сложность обязательна"),
  tags:z.array(z.string().min(1, "Тег не может быть пустым")).min(1, "Нужен хотя бы один тег"),
  questions: z.array(z.any()).min(1, "Нужен хотя бы один тест"),

})

export const Wrapper = () => {
  const { isAdmin,isModerator } = useUserRole()

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [title, setTitle] = useState("Мой тест")
  const [description, setDescription] = useState("Заполните пропущенные буквы")
  const [difficulty, setDifficulty] = useState("Средний")
  const [showTest, setShowTest] = useState(false)
  const [selectedValue, setSelectedValue] = useState("words")
  const [testData, setTestData] = useState<Array<Word | ProgrammingTask | ExamTicketProps>>([])
  const session = useAppSession()
  const [tags, setTags] = useState<string[]>([])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await fetch(`/api/categories?id=${id}`);
        if (!response.ok) {
          throw new Error('Не удалось загрузить данные');
        }
        const test = await response.json();
        if (test) {
          const { title, description, difficulty, questions, type, categories } = test;
          const tagName = categories.map((c: Category) => c.name);
          setTitle(title);
          setDescription(description);
          setDifficulty(difficulty);
          setSelectedValue(type);
          setTestData(JSON.parse(questions));
          setTags(tagName);
        }
      } catch (error) {
        console.error('Ошибка при загрузке теста:', error);
        toast.error('Ошибка при загрузке данных');
      }
    };
  
    if (id) {
      fetchTestData();
    }
  }, [id]);
  

  const handleTakeValue = (value: Array<Word | ProgrammingTask | ExamTicketProps>) => {
    setTestData(value)
  }  
  const handleDeleteAll = () => {
    setTestData([])
  }

  const handleCreateTest = async () => {
    setLoading(true)
    try {
      if (!isAdmin || !isModerator) {
        toast.error("Необходимо авторизоваться")
        return
      }
      // const testPayload = {
      //   title,
      //   description,
      //   difficulty,
      //   tags,
      //   type: selectedValue,
      //   questions: testData,
      //   authorId: session.data?.user?.id
      // }
      const questions = testData

      const validation = schemaWrapper.safeParse({
        title,
        description,
        difficulty,
        tags,
        questions,
      })
      if (!validation.success) {
        const errors: ZodFormattedError<unknown> = validation.error.format();
        for (const field in errors) {
          const error = errors[field as keyof typeof errors];
          if (
            error &&
            typeof error === "object" &&
            "_errors" in error &&
            Array.isArray(error._errors)
          ) {
            error._errors.forEach((msg: string) => {
              toast.error(msg);
            });
          }
        }
      
        return;
      }

      const testPayload = {
        ...validation.data,
        authorId: session.data?.user?.id,
        type: selectedValue,
      }

      if(id){
        const response = await fetch(`/api/tests?id=${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(testPayload)
        })


        if (!response.ok) {
          throw new Error('Ошибка при создании теста')
        }


        toast.success('Тест успешно обновлен')


        setTitle("Мой тест")
        setDescription("Заполните пропущенные буквы")
        setTestData([])
      }
      else{
        const response = await fetch('/api/tests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(testPayload)
        })


        if (!response.ok) {
          throw new Error('Ошибка при создании теста')
        }


        toast.success('Тест успешно создан')


        setTitle("Мой тест")
        setDescription("Заполните пропущенные буквы")
        setTestData([])
    }
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
  

  return (
    <div className="grid gap-6">
      <BaseSettings title={title} setTitle={setTitle} description={description} setDescription={setDescription}/>
      <TestProperties difficulty={difficulty} setDifficulty={setDifficulty} tags={tags} setTags={setTags}/>
      <TestTypeSelector setSelectedValue={setSelectedValue}/>
        <Card className="md:shadow-lg shadow-none md:border-2 border-0">
          <CardHeader className=" flex flex-row justify-between md:px-6 px-2">
            <CardTitle>Создайте свой тест</CardTitle>
              <Button variant="outline" disabled={testData.length === 0 || loading} onClick={handleCreateTest}>
                {id ? (loading ? <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Обновление...</> : 'Обновить') : (loading ? <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Создание...</> : 'Создать')}
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

