import { useState, useEffect } from "react"
import { Edit, Trash } from "lucide-react"
import { TestType } from "../wrapper"
import { RadioGroupManager } from "./_ui/radio-group-manager"
import { ExamTicketProps, RadioOutput, TestPanelProps } from "./exam-ticket-interface"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu"
import { Button } from "../../ui/button"
import { Textarea } from "../../ui/textarea"
import { AskImageQuestionForm } from "@/src/feature/ask-image-question/AskImageQuestionForm"
import { ImageUpload } from "./_ui/image-uploader"
import { EditTask } from "./_ui/edit-task"





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
    image:"",
    question: "",
    expectedOutput: "",
  })

  const [bulkTests, setBulkTests] = useState<string>("")
  const [answer, setAnswer] = useState<string>("input")

  //img
  const [selectedImage, setSelectedImage] = useState<string >("");

  
  //radio
  const [radioOptions, setRadioOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const addTest = () => {
    if (currentTest.question.length > 0) {
      const newTest: ExamTicketProps = { 
        ...currentTest, 
        type: TestType.EXAM_TICKET,
        image: selectedImage?selectedImage:"",
        expectedOutput: answer === 'radio' ? selectedOption || '' : currentTest.expectedOutput,
        options: answer === 'radio' ? radioOptions : [], // Сохраняем варианты ответов
      }
      const updatedList = [...testList, newTest]
      setTestList(updatedList)
      handleTakeValue(updatedList)
      setCurrentTest({ type: TestType.EXAM_TICKET, question: "", expectedOutput: "", options: [] })
      
      setSelectedImage("")
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




  const saveEdit = (index: number) => {
    if (editingTest.question.length > 0 && editingTest.expectedOutput.length > 0) {
      console.log(editingTest.image)
      const updatedList = [...testList]
      updatedList[index] = { ...editingTest, type: TestType.EXAM_TICKET }
      setTestList(updatedList)
      handleTakeValue(updatedList)
      setEditingIndex(null)
    }
  }

  const addBulkTests = () => {
    const testsArray: ExamTicketProps[] = bulkTests
      .split(";")
      .map((line) => {
        line = line.trim();
        if (!line) return null;
  
        if (line.includes("|")) {
          const index = line.indexOf(":");
          if (index === -1) return null;
  
          const question = line.slice(0, index).trim();
          const optionsString = line.slice(index + 1).trim();
          if (!optionsString) return null;
  
          const options = optionsString
            .split("|")
            .map((opt) => opt.trim());
  
          const correctAnswers = options.filter((opt) => opt.startsWith("!"));
          if (correctAnswers.length !== 1) return null;
  
          const correctAnswer = correctAnswers[0];
  
          return {
            type: TestType.EXAM_TICKET,
            question,
            expectedOutput: correctAnswer.replace(/^!/, "").trim(),
            options: options.map((opt) => opt.replace(/^!/, "").trim()),
          };
        } else {
          const [question, expectedOutput] = line
            .split("-")
            .map((item) => item.trim());
  
          if (!question || !expectedOutput) return null;
  
          return {
            type: TestType.EXAM_TICKET,
            question,
            expectedOutput,
          };
        }
      })
      .filter(Boolean) as ExamTicketProps[];
  
    if (testsArray.length > 0) {
      const updatedList = [...testList, ...testsArray];
      setTestList(updatedList);
      handleTakeValue(updatedList);
      setBulkTests("");
    }
  };
  
  

  return (
    <Tabs defaultValue="one" className="mt-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="one">Добавить по одному</TabsTrigger>
        <TabsTrigger value="all">Добавить всё</TabsTrigger>
      </TabsList>
      <TabsContent value="one">
      <ImageUpload setSelectedImage={(base64) => {
        setSelectedImage(base64)
        setEditingTest(prev => ({ ...prev, image: base64 }))
        }}/>
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
          <AskImageQuestionForm result={bulkTests} setResult={setBulkTests}/>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              Введите тесты через ; 
              <ul className="list-disc list-inside">
                <li>Текстовые — <code>вопрос - ответ;</code></li>
                <li>Выбор вырианта — <code>вопрос: вариант 1 | !вариант 2</code>, где ! - правильный ответ</li>
              </ul>
              <div className="mt-1 text-xs text-muted-foreground">
                Пример: Сколько будет 2+2 - 4<br />
                Столица Германии: !Берлин | Мюнхен 
              </div>
            </div>
          </div>
          <Textarea
            placeholder="Введите тесты в формате: вопрос - ответ или вопрос: вар1 | !вар2"
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
              <EditTask 
                selectedImage={selectedImage} 
                setSelectedImage={setSelectedImage}
                item={item} 
                editingTest={editingTest} 
                setEditingTest={setEditingTest}
                newOption={newOption} 
                setNewOption={setNewOption} 
                saveEdit={saveEdit} 
                index={index} 
                setEditingIndex={setEditingIndex}/>
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
    <div className="flex items-center justify-start gap-5">
      <span>{item.question} - {item.expectedOutput}</span>
    </div>
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
