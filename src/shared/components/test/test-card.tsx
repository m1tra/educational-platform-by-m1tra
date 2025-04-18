"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/src/shared/components/ui/card"
import { Button } from "@/src/shared/components/ui/button"
import { Progress } from "@/src/shared/components/ui/progress"
import type { TestCardProps } from "./test-interface"
import type { ProgrammingTask } from "../courses/custom-tasks/code-panel/code-panel-interface"
import type { Word } from "./tests"
import { correctAnswerOfWords, pairOfWords } from "@/src/shared/lib/words"
import { CardPythonInterpreter } from "../courses/custom-tasks/code-panel/compiler"
import { AnswerFeedback } from "./check-input"
import type { ExamTicketProps } from "../courses/custom-tasks/word-answer-panel/exam-ticket-interface"
import { RadioSelect } from "./radio-select"
import Image from "next/image"
import { Clock, Pause, Play } from "lucide-react"

const getTaskTitle = (task: ProgrammingTask | Word | ExamTicketProps) => {
  if ("title" in task) return task.title
  if ("question" in task) return task.question
  if ("expectedOutput" in task) return pairOfWords(task.expectedOutput)
  return "Неизвестное задание"
}

export function TestCard({
  tasks,
  currentTaskIndex,
  taskId,
  setAnswerList,
  setCurrentTaskIndex,
  correctTasksCount,
  setCorrectTasksCount,
  totalAttempts,
  setTotalAttempts,
  handleFinish,
}: TestCardProps) {
  const [task, setTask] = useState<ProgrammingTask | Word | ExamTicketProps>(tasks[currentTaskIndex])
  const [userInput, setUserInput] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false)
  const [currentTaskAttempts, setCurrentTaskAttempts] = useState<number>(0)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(false)

  // Интерпретатор
  const [code, setCode] = useState<string>("")
  const [output, setOutput] = useState<string>("")

  // Радио
  const [selectedOption, setSelectedOption] = useState<string>("")

  useEffect(() => {
    setCurrentTaskAttempts(0)
    setIsCorrect(null)
    setUserInput("")
    setTask(tasks[currentTaskIndex])
    setShowCorrectAnswer(false)
    setSelectedOption("")

    if (tasks[currentTaskIndex].type === "words") {
      setCorrectAnswer(correctAnswerOfWords(tasks[currentTaskIndex].expectedOutput) || "")
    } else if (tasks[currentTaskIndex].type === "examTicket") {
      setCorrectAnswer(tasks[currentTaskIndex].expectedOutput || "")
    } else {
      setCorrectAnswer(tasks[currentTaskIndex].expectedOutput.toLowerCase())
      setCode((tasks[currentTaskIndex] as ProgrammingTask).initialCode || "")
    }
  }, [currentTaskIndex, tasks])

  // таймер
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (!isPaused) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPaused])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const checkAnswer = () => {
    const s = {
      id: taskId,
      correctAnswer: correctAnswer,
      userAnswer: selectedOption !== "" ? selectedOption : userInput,
      task: getTaskTitle(task),
    }
    setAnswerList((prev) => [...prev, s])

    if (!("expectedOutput" in task)) return
    const isRadioTask = "options" in task && task.options && task.options?.length > 0
    const isCorrectAnswer = isRadioTask
      ? selectedOption === correctAnswer
      : correctAnswer.toLowerCase() === userInput.toLowerCase()

    if (currentTaskIndex === tasks.length - 1 && (currentTaskAttempts === 2 || isCorrectAnswer)) {
      setTimeout(() => {
        handleFinish()
      }, 1500)
    }

    if (currentTaskAttempts === 2) {
      setShowCorrectAnswer(true)
      setTimeout(() => {
        setCurrentTaskIndex(currentTaskIndex + 1)
      }, 1500)
    }

    if (isCorrectAnswer) {
      setIsCorrect(true)
      setTimeout(() => {
        setCurrentTaskIndex(currentTaskIndex + 1)
      }, 1500)
      setCorrectTasksCount(correctTasksCount + 1)
    } else {
      setCurrentTaskAttempts(currentTaskAttempts + 1)
      setIsCorrect(false)
    }
    setTotalAttempts(totalAttempts + 1)
  }

  const progressPercentage = tasks.length ? (currentTaskIndex / tasks.length) * 100 : 0
  const hasImage = "image" in task && task.image

  return (
    <motion.div
      key={`quiz-${currentTaskIndex}-${task.type}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="md:shadow-lg shadow-none h-full md:border border-0">
        {/* Timer and controls section */}
        <div className="border-b p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Время</div>
                <div className="text-xl font-bold">{formatTime(elapsedTime)}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => setIsPaused(!isPaused)}>
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="border-b p-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-sm text-muted-foreground">Пройдено</span>
              <div className="font-bold">{Math.round(progressPercentage)}%</div>
            </div>
            <div className="text-right">
              <span className="text-sm text-muted-foreground">Выполнено</span>
              <div className="font-bold">
                {correctTasksCount} из {tasks.length}
              </div>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="text-lg font-bold">Задача #{taskId}</div>
              <div className="text-sm text-muted-foreground">Решена: {isCorrect === true ? "Да" : "Нет"}</div>
            </div>

            {task.type === "code" ? (
              <div className="space-y-6 flex flex-col">
                <div className="p-4 bg-muted rounded-md border">
                  <h4 className="text-lg font-semibold">{task.title}</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{task.description}</p>
                </div>
                <CardPythonInterpreter code={code} setCode={setCode} output={output} setOutput={setOutput} />
                <AnswerFeedback
                  userInput={userInput}
                  setUserInput={setUserInput}
                  isCorrect={isCorrect}
                  checkAnswer={checkAnswer}
                  currentTaskAttempts={currentTaskAttempts}
                  showCorrectAnswer={showCorrectAnswer}
                  correctAnswer={correctAnswer}
                  isPaused={isPaused}
                />
              </div>
            ) : (
              <div className="mt-6 space-y-6">
                {hasImage && (
                  <div className="flex justify-center">
                    <Image
                      src={task.image || "/placeholder.svg"}
                      alt="Task image"
                      width={700}
                      height={200}
                      className="rounded-md object-contain max-h-[300px]"
                    />
                  </div>
                )}

                <div className="text-center">
                  {task.type === "words" ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xl md:text-2xl font-medium"
                    >
                      {pairOfWords((task as Word).expectedOutput)}
                    </motion.p>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xl md:text-2xl font-medium"
                    >
                      {pairOfWords((task as ExamTicketProps).question.toLowerCase())}
                    </motion.p>
                  )}
                </div>

                <div className="mt-4">
                  {task.type === "examTicket" && task.options && task.options.length > 0 ? (
                    <>
                      <div className="font-medium mb-3">Выберите ответ:</div>
                      <RadioSelect
                        isCorrect={isCorrect}
                        correctAnswer={correctAnswer}
                        options={task.options}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        checkAnswer={checkAnswer}
                        currentTaskAttempts={currentTaskAttempts}
                        showCorrectAnswer={showCorrectAnswer}
                        isPaused={isPaused}
                      />
                    </>
                  ) : (
                    <AnswerFeedback
                      userInput={userInput}
                      setUserInput={setUserInput}
                      isCorrect={isCorrect}
                      checkAnswer={checkAnswer}
                      currentTaskAttempts={currentTaskAttempts}
                      showCorrectAnswer={showCorrectAnswer}
                      correctAnswer={correctAnswer}
                      isPaused={isPaused}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="border-t mt-4 p-4">
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              disabled={currentTaskIndex === 0}
              onClick={() => setCurrentTaskIndex(Math.max(0, currentTaskIndex - 1))}
            >
              Предыдущий
            </Button>
            <Button onClick={handleFinish}>Завершить</Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
