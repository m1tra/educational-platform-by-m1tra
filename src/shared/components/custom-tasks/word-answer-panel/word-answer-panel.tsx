import { useState, useEffect } from "react"
import { Edit, Trash, Save, X } from "lucide-react"
import { TestType } from "../wrapper"
import { RadioGroupManager } from "./radio-group-manager"
import { ExamTicketProps, RadioOutput, TestPanelProps } from "./exam-ticket-interface"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu"
import { Button } from "../../ui/button"
import { Textarea } from "../../ui/textarea"


export const WordAnswerPanel = ({ handleTakeValue, tests }: TestPanelProps) => {
  
  const [currentTest, setCurrentTest] = useState<ExamTicketProps>({
    type: TestType.EXAM_TICKET,
    question: "",
    expectedOutput: "",
    options: [], 
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
  const [radioData,setRadioData] = useState<RadioOutput>({radioOptions:[],selectedOption:""})

  useEffect(() => {
    setTestList(tests)
  }, [tests])

  useEffect(()=>{
    setRadioData({radioOptions:radioOptions,selectedOption:selectedOption!})
  },[radioOptions,selectedOption])  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: "question" | "expectedOutput") => {
    setCurrentTest((prev) => ({ ...prev, [field]: e.target.value }))
  }
  console.log(radioData)
  const addTest = () => {
    if (currentTest.question.length > 0) {
      const newTest: ExamTicketProps = { 
        ...currentTest, 
        type: TestType.EXAM_TICKET,
        expectedOutput: answer === 'radio' ? selectedOption || '' : currentTest.expectedOutput,
        options: answer === 'radio' ? radioOptions : [], // Сохраняем варианты ответов
      }
      const updatedList = [...testList, newTest]
      setTestList(updatedList)
      handleTakeValue(updatedList)
      setCurrentTest({ type: TestType.EXAM_TICKET, question: "", expectedOutput: "", options: [] })

      setRadioOptions([])
      setSelectedOption(null)
      setNewOption("")
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
  console.log(testList)
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
            <div className="">
              <Label>Ответ</Label>
              <Input value={currentTest.expectedOutput} onChange={(e) => handleChange(e, "expectedOutput")} placeholder="Введите ответ" />
            </div>
          )}
          {answer==="radio"&&(
            <div className="">
              <Label>Варианты ответов</Label>
              <RadioGroupManager 
                variant='view'
                radioOptions={radioOptions} 
                newOption={newOption} 
                setRadioOptions={setRadioOptions} 
                setNewOption={setNewOption} 
                selectedOption={selectedOption} 
                setSelectedOption={setSelectedOption}/>
            </div>
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
                {item.options && item.options.length > 0 ? (
                <div className="space-y-2">
                  <Label>Варианты ответов</Label>
                  <RadioGroupManager 
                    variant='edit'
                    radioOptions={editingTest.options || []}
                    newOption={newOption}
                    setRadioOptions={(options) => setEditingTest(prev => ({...prev, options}))}
                    setNewOption={setNewOption}
                    selectedOption={editingTest.expectedOutput}
                    setSelectedOption={(option) => setEditingTest(prev => ({...prev, expectedOutput: option || ''}))}
                  />
                </div>
                ) : (
                  <>
                    <Label>Ответ</Label>
                    <Input value={editingTest.expectedOutput} onChange={(e) => handleEditChange(e, "expectedOutput")} />
                  </>
                )}
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
                {item.options && item.options?.length>0?<RadioEdit item={item}/>:<InputEdit item={item}/>}
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

interface InputEditProps {
  item: ExamTicketProps;
}

interface RadioEditProps {
  item: ExamTicketProps;
}

const InputEdit = ({item}:InputEditProps) => {
  return (
    <span>{item.question} - {item.expectedOutput}</span>
  )
}

const RadioEdit = ({item}:RadioEditProps) => {
  return (
    <div>
      <div>{item.question}</div>
      {item.options && item.options.length > 0 ? (
        <div className="text-sm text-muted-foreground">
          Варианты: {item.options.join(", ")}
          <br />
          Правильный ответ: {item.expectedOutput}
        </div>
      ) : (
        <div>Ответ: {item.expectedOutput}</div>
      )}
  </div>
  )
}
