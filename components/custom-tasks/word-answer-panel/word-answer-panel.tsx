import { useState, useEffect } from "react"
import { Edit, Trash, Save, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { TestType } from "../wrapper"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { RadioGroupManager } from "./radio-group-manager"

export interface ExamTicketProps {
  type: TestType.EXAM_TICKET;
  question: string;
  expectedOutput: string ;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface RadioOutput{
  radioOptions:string[]
  selectedOption:string
}

interface TestPanelProps {
  handleTakeValue: (tests: ExamTicketProps[]) => void;
  tests: ExamTicketProps[];
}

export const WordAnswerPanel = ({ handleTakeValue, tests }: TestPanelProps) => {
  console.log(tests)
  const [currentTest, setCurrentTest] = useState<ExamTicketProps>({
    type: TestType.EXAM_TICKET,
    question: "",
    expectedOutput: "",
  })

  const [testList, setTestList] = useState<ExamTicketProps[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingTest, setEditingTest] = useState<ExamTicketProps>({
    type: TestType.EXAM_TICKET,
    question: "",
    expectedOutput: "",
  })

  const [bulkTests, setBulkTests] = useState<string>("")
  const [answer, setAnswer] = useState<string>("input")

  //radio
  const [radioOptions, setRadioOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    setTestList(tests)
  }, [tests])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: "question" | "expectedOutput") => {
    setCurrentTest((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const addTest = () => {
    if (currentTest.question.length > 0 && currentTest.expectedOutput.length > 0) {
      const newTest: ExamTicketProps = { ...currentTest, type: TestType.EXAM_TICKET }
      const updatedList = [...testList, newTest]
      setTestList(updatedList)
      handleTakeValue(updatedList)
      setCurrentTest({ type: TestType.EXAM_TICKET, question: "", expectedOutput: "" })
    }
  }

  const deleteTest = (index: number) => {
    const updatedList = testList.filter((_, i) => i !== index)
    setTestList(updatedList)
    handleTakeValue(updatedList)
  }

  const startEditing = (index: number) => {
    setEditingIndex(index)
    setEditingTest({ ...testList[index] })
  }

  const cancelEditing = () => {
    setEditingIndex(null)
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>, field: "question" | "expectedOutput") => {
    setEditingTest((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const saveEdit = (index: number) => {
    if (editingTest.question.length > 0 && editingTest.expectedOutput.length > 0) {
      const updatedList = [...testList]
      updatedList[index] = { ...editingTest, type: TestType.EXAM_TICKET }
      setTestList(updatedList)
      handleTakeValue(updatedList)
      setEditingIndex(null)
    }
  }

  const addBulkTests = () => {
    const testsArray: ExamTicketProps[] = bulkTests
      .split(/\n+/)
      .map((line) => line.split("-").map((item) => item.trim()))
      .filter(([question, expectedOutput]) => question && expectedOutput)
      .map(([question, expectedOutput]) => ({ type: TestType.EXAM_TICKET, question, expectedOutput }))

    if (testsArray.length > 0) {
      const updatedList = [...testList, ...testsArray]
      setTestList(updatedList)
      handleTakeValue(updatedList)
      setBulkTests("")
    }
  }
  console.log(radioOptions,selectedOption)
  return (
    <Tabs defaultValue="one" className="mt-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="one">Добавить по одному</TabsTrigger>
        <TabsTrigger value="all">Добавить всё</TabsTrigger>
      </TabsList>
      <TabsContent value="one">
        <div className="space-y-2 relative">
          <Label>Вопрос</Label>
          <Input value={currentTest.question} onChange={(e) => handleChange(e, "question")} placeholder="Введите вопрос" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" >
                тип ответа
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={()=>setAnswer('input')}>ввод</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>setAnswer('radio')}>выбор ответов</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {answer==="input"&&(
            <>
              <Label>Ответ</Label>
              <Input value={currentTest.expectedOutput} onChange={(e) => handleChange(e, "expectedOutput")} placeholder="Введите ответ" />
            </>
          )}
          {answer==="radio"&&(
            <RadioGroupManager 
              radioOptions={radioOptions} 
              newOption={newOption} 
              setRadioOptions={setRadioOptions} 
              setNewOption={setNewOption} 
              selectedOption={selectedOption} 
              setSelectedOption={setSelectedOption}/>
          )}
          <Button size="sm" onClick={addTest}>Добавить тест</Button>
        </div>
      </TabsContent>
      <TabsContent value="all">
        <div className="space-y-2">
          <Label>Добавить несколько тестов</Label>
          <Textarea
            placeholder="Введите тесты в формате вопрос-ответ через дефис и с новой строки"
            className="min-h-[150px]"
            value={bulkTests}
            onChange={(e) => setBulkTests(e.target.value)}
          />
          <Button onClick={addBulkTests}>Добавить все тесты</Button>
        </div>
      </TabsContent>
      <div className="mt-7 space-y-2">
        {testList.map((item: ExamTicketProps, index) => (
          <div key={index} className="flex w-full justify-between border p-3 rounded-md">
            {editingIndex === index ? (
              <div className="flex flex-col w-full gap-2">
                <Label>Вопрос</Label>
                <Input value={editingTest.question} onChange={(e) => handleEditChange(e, "question")} />
                <Label>Ответ</Label>
                <Input value={editingTest.expectedOutput} onChange={(e) => handleEditChange(e, "expectedOutput")} />
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
              <div className="flex w-full justify-between">
                <span>{item.question} - {item.expectedOutput}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => startEditing(index)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteTest(index)}>
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
