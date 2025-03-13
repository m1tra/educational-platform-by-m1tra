"use client"

import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Progress } from "../ui/progress"
import { TestCardProps } from "./test-interface"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { ProgrammingTask } from "../custom-tasks/code-panel/code-panel-interface"
import { Word } from "./tests"
import { correctAnswerOfWords, pairOfWords } from "@/lib/words"
import { Check, X } from "lucide-react"

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
    const [task,setTask] = useState<ProgrammingTask | Word>(tasks[currentTaskIndex])
    const [userInput,setUserInput] = useState("")
    const [correctAnswer,setCorrectAnswer] = useState(correctAnswerOfWords(tasks[currentTaskIndex]?.correct))
    const [isCorrect,setIsCorrect] = useState<boolean | null>(null)
    const [showCorrectAnswer,setShowCorrectAnswer] = useState<boolean >(false)
    const [currentTaskAttempts,setCurrentTaskAttempts] = useState<number>(0)
    useEffect(()=>{
        setCurrentTaskAttempts(0)
        setIsCorrect(null)
        setUserInput("")
        setTask(tasks[currentTaskIndex])
        setShowCorrectAnswer(false)
        setCorrectAnswer(correctAnswerOfWords(tasks[currentTaskIndex]?.correct))
    },[currentTaskIndex])

    const checkAnswer = () => {
        if (currentTaskIndex===tasks.length - 1 && (currentTaskAttempts===2 || correctAnswer!.toLowerCase() == userInput)){
            setTimeout(() => {
                handleFinish()
              }, 1500)
        }
        if ((currentTaskAttempts) === 2){
            setShowCorrectAnswer(true)
            setTimeout(() => {
                setCurrentTaskIndex(currentTaskIndex+1)
              }, 1500)
        }
        if (correctAnswer.toLowerCase() == userInput){
            setIsCorrect(true)
            setTimeout(() => {
                setCurrentTaskIndex(currentTaskIndex+1)
              }, 1500)
            setCorrectTasksCount(correctTasksCount+1)
        }
        else{
            setCurrentTaskAttempts(currentTaskAttempts+1)
            setIsCorrect(false)
    
        }
        setTotalAttempts(totalAttempts+1)
    }
    const progressPercentage = tasks.length ? (currentTaskIndex / tasks.length) * 100 : 0
    
    return (
        <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
        >
            <Card className="shadow-lg border-2">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-center">{title}</CardTitle>
                <CardDescription className="text-center">{description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Слово {currentTaskIndex + 1} из {tasks.length}
                    </span>
                    <span className="text-sm font-medium">Правильно: {correctTasksCount}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="mt-6 text-center space-y-4">
                    <motion.p
                      // key={currentWordIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-3xl font-medium mb-4"
                    >
                      {pairOfWords(task?.correct)}
                    </motion.p>

                    <div className="flex gap-2">
                      <Input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value.toLowerCase())}
                      //   onKeyDown={handleKeyDown}
                        placeholder="Введите пропущенные буквы"
                        className={`text-center text-lg ${
                          isCorrect === true
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : isCorrect === false
                              ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                              : ""
                        }`}
                      //   maxLength={(currentWord?.withGaps.match(/\_\_\_/g) || []).length}
                      //   ref={setInputRef}
                        autoFocus
                      />
                      <Button onClick={checkAnswer}>Проверить</Button>
        
                    </div>
                    <AnimatePresence>
                        {isCorrect !== null && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`mt-4 flex items-center justify-center gap-2 p-2 rounded-md ${
                              isCorrect
                                ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                            }`}
                          >
                            {isCorrect ? (
                              <>
                                <Check size={20} />
                                <span>Правильно!</span>
                              </>
                            ) : (
                              <>
                                <X size={20} />
                                <span>
                                  Неправильно. {currentTaskAttempts >= 2 ? "Последняя попытка!" : "Попробуйте еще раз."}
                                </span>
                              </>
                            )}
                          </motion.div>
                        )}
    
                        {showCorrectAnswer && !isCorrect && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 p-2 bg-blue-50 text-blue-600 rounded-md dark:bg-blue-900/20 dark:text-blue-400"
                          >
                            <p>Правильный ответ: {correctAnswer}</p>
                          </motion.div>
                        )}
                  </AnimatePresence>                                
                    {/* <div className="text-xs text-muted-foreground">Попытка {isCorrect===true ? currentWordAttempts : currentWordAttempts <= 2 ? currentWordAttempts + 1 : 3} из 3</div> */}
                  </div>
   
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

