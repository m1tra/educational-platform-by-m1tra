"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import type { TestCardProps } from "./test-interface"
import type { ProgrammingTask } from "../custom-tasks/code-panel/code-panel-interface"
import type { Word } from "./tests"
import { correctAnswerOfWords, pairOfWords } from "@/src/shared/lib/words"
import { CardPythonInterpreter } from "../custom-tasks/code-panel/compiler"
import { AnswerFeedback } from "./check-input"
import type { ExamTicketProps } from "../custom-tasks/word-answer-panel/exam-ticket-interface"
import { RadioSelect } from "./radio-select"
import Image from "next/image"

export function TestCard({
  title,
  description,
  tasks,
  currentTaskIndex,
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

  // Для интерпретатора
  const [code, setCode] = useState<string>("")
  const [output, setOutput] = useState<string>("")

  //radio
  const [selectedOption, setSelectedOption] = useState<string>("")

  useEffect(() => {
    setCurrentTaskAttempts(0)
    setIsCorrect(null)
    setUserInput("")
    setTask(tasks[currentTaskIndex])
    setShowCorrectAnswer(false)

    if (tasks[currentTaskIndex].type === "words") {
      setCorrectAnswer(correctAnswerOfWords(tasks[currentTaskIndex].expectedOutput) || "")
    } else if (tasks[currentTaskIndex].type === "examTicket") {
      setCorrectAnswer(tasks[currentTaskIndex].expectedOutput || "")
    } else {
      setCorrectAnswer(tasks[currentTaskIndex].expectedOutput.toLowerCase())
      setCode((tasks[currentTaskIndex] as ProgrammingTask).initialCode || "")
    }
  }, [currentTaskIndex])

  const checkAnswer = () => {
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

  // Check if the task has an image
  const hasImage = "image" in task && task.image

  return (
    <motion.div
      key={`quiz-${currentTaskIndex}-${task.type}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl    mx-auto"
    >
      <Card className="md:shadow-lg shadow-none h-full md:border-2 border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-center">{title}</CardTitle>
          <CardDescription className="text-center">{description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 ">
          <div className="flex justify-between items-center ">
            <span className="text-sm font-medium">
              Вопрос {currentTaskIndex + 1} из {tasks.length}
            </span>
            <span className="text-sm font-medium">Правильно: {correctTasksCount}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />

          {task.type === "code" ? (
            <div className="space-y-6 flex flex-col ">
              <div className="p-4 bg-muted rounded-md border">
                <h4 className="text-lg font-semibold">{task.title}</h4>
                <p className="text-sm text-muted-foreground">{task.description}</p>

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
              />
            </div>
          ) : (
            <div className="mt-6 text-center space-y-4">
              {hasImage && (
                <div className="mb-4 flex justify-center">
                  <Image
                    src={task.image || "/placeholder.svg"}
                    alt="Task image"
                    width={700}
                    height={200}
                    className="rounded-md object-contain max-h-[300px]"
                  />
                </div>
              )}

              {task.type === "words" ? (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl md:text-3xl font-medium mb-4">
                  {pairOfWords((task as Word).expectedOutput)}
                </motion.p>
              ) : (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl md:text-3xl font-medium mb-4">
                  {pairOfWords((task as ExamTicketProps).question.toLowerCase())}
                </motion.p>
              )}
              {task.type === "examTicket" && task.options && task.options.length > 0 ? (
                <RadioSelect
                  isCorrect={isCorrect}
                  correctAnswer={correctAnswer}
                  options={task.options}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  checkAnswer={checkAnswer}
                  currentTaskAttempts={currentTaskAttempts}
                />
              ) : (
                <AnswerFeedback
                  userInput={userInput}
                  setUserInput={setUserInput}
                  isCorrect={isCorrect}
                  checkAnswer={checkAnswer}
                  currentTaskAttempts={currentTaskAttempts}
                  showCorrectAnswer={showCorrectAnswer}
                  correctAnswer={correctAnswer}
                />
              )}
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button variant="outline" onClick={handleFinish} className="w-full">
            Завершить
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

