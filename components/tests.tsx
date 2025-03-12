"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Check, X, Trophy, Settings, Info } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { cn } from "@/lib/utils"

// Word data structure
export interface Word {
  withGaps: string
  correct: string
}

interface WordLearningTestProps {
  words: Word[]
  title?: string
  description?: string
}

export function WordLearningTest({
  words,
  title = "Учим правописание слов",
  description = "Заполните пропущенные буквы в словах",
}: WordLearningTestProps) {
  const [shuffledWords, setShuffledWords] = useState<Word[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [completed, setCompleted] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [currentWordAttempts, setCurrentWordAttempts] = useState(0)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null)
  const [wordCount, setWordCount] = useState(10)
  const [testStarted, setTestStarted] = useState(false)
  const [activeWords, setActiveWords] = useState<Word[]>([])
  const [skippedWords, setSkippedWords] = useState(0)

  // Initialize words on component mount
  useEffect(() => {
    const shuffled = [...words].sort(() => Math.random() - 0.5)
    setShuffledWords(shuffled)
  }, [words])

  // Start the test with selected number of words
  const startTest = () => {
    // Take only the selected number of words
    const selectedWords = shuffledWords.slice(0, wordCount)
    setActiveWords(selectedWords)
    setTestStarted(true)
    setTimeout(() => {
      inputRef?.focus()
    }, 100)
  }

  const currentWord = activeWords[currentWordIndex] || words[0]

  // Move to the next word
  const moveToNextWord = () => {
    if (currentWordIndex < activeWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
      setUserInput("")
      setIsCorrect(null)
      setShowCorrectAnswer(false)
      setCurrentWordAttempts(0)
      inputRef?.focus()
    } else {
      setCompleted(true)
    }
  }

  // Function to check if the user's input matches the correct word
  const checkAnswer = () => {
    if (!userInput.trim()) return

    setTotalAttempts(totalAttempts + 1)
    setCurrentWordAttempts(currentWordAttempts + 1)

    // Get the correct letters that should be filled in
    const correctLetters = getCorrectLetters()
    
    // Check if user provided the right number of letters
    if (userInput.length !== correctLetters.length) {
      setIsCorrect(false)
      handleIncorrectAnswer()
      return
    }

    // Compare each letter of user input with correct letters
    let isAnswerCorrect = true
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i].toLowerCase() !== correctLetters[i].toLowerCase()) {
        isAnswerCorrect = false
        break
      }
    }

    setIsCorrect(isAnswerCorrect)

    if (isAnswerCorrect) {
      // Only count as correct if user hasn't made too many attempts
      if (currentWordAttempts < 2) {
        setCorrectCount(correctCount + 1)
      } else {
        // If they've already made too many attempts, count as skipped
        setSkippedWords(skippedWords + 1)
      }

      // Move to the next word after a short delay
      setTimeout(() => {
        moveToNextWord()
      }, 1500)
    } else {
      handleIncorrectAnswer()
    }
  }

  // Handle incorrect answer
  const handleIncorrectAnswer = () => {
    setIncorrectCount(incorrectCount + 1)

    // Show correct answer after 2 incorrect attempts on this word
    if (currentWordAttempts + 1 >= 3) {
      setShowCorrectAnswer(true)

      // Move to next word after showing the answer for a moment
      if (currentWordAttempts + 1 >= 3) {
        setTimeout(() => {
          setSkippedWords(skippedWords + 1)
          moveToNextWord()
        }, 2000)
      }
    }
  }

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkAnswer()
    }
  }

  // Function to finish the exercise
  const handleFinish = () => {
    setCompleted(true)
  }

  // Function to restart the exercise
  const handleRestart = () => {
    setCurrentWordIndex(0)
    setUserInput("")
    setIsCorrect(null)
    setCompleted(false)
    setCorrectCount(0)
    setIncorrectCount(0)
    setTotalAttempts(0)
    setCurrentWordAttempts(0)
    setShowCorrectAnswer(false)
    setTestStarted(false)
    setSkippedWords(0)

    // Reshuffle words
    const shuffled = [...words].sort(() => Math.random() - 0.5)
    setShuffledWords(shuffled)
  }

  // Format the word with gaps for display
  const formatWordForDisplay = (word: string) => {
    return word.replace(/\.\./g, "___")
  }

  // Calculate progress percentage
  const progressPercentage = activeWords.length ? (currentWordIndex / activeWords.length) * 100 : 0

  // Get the correct letters that should be filled in
  const getCorrectLetters = () => {
    if (!currentWord) return []

    const correctLetters: string[] = []

    // Find uppercase letters in the correct word
    for (let i = 0; i < currentWord.correct.length; i++) {
      const char = currentWord.correct[i]
      // Check if the character is an uppercase Russian letter
      if (char === char.toUpperCase() && /[А-ЯЁ]/.test(char)) {
        correctLetters.push(char)
      }
    }

    return correctLetters
  }

  // Calculate score percentage
  const scorePercentage1 = totalAttempts > 0 ? Math.round((correctCount / (correctCount + skippedWords)) * 100) : 0
  const scorePercentage2 = totalAttempts > 0 ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) : 0

  // Configuration screen
  if (!testStarted && !completed) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card className="shadow-lg border-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-center">{title}</CardTitle>
            <CardDescription className="text-center">{description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Количество слов</h3>
                <span className="text-2xl font-bold">{wordCount}</span>
              </div>

              <Slider
                value={[wordCount]}
                min={5}
                max={Math.min(words.length)}
                step={1}
                onValueChange={(value) => setWordCount(value[0])}
                className="py-4"
              />

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>5</span>
                <span>Всего доступно: {words.length}</span>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2 relative ">
              <div className="flex items-start gap-2">
                <Settings className="absolute right-3 h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">Как это работает</h4>
                  <p className="text-sm text-muted-foreground">
                    Вам будет предложено {wordCount} слов с пропущенными буквами. Введите пропущенные буквы и проверьте
                    свои знания.
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    После 2 неправильных попыток вам будет показан правильный ответ. После 3 попыток система перейдет к
                    следующему слову.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button onClick={startTest} className="w-full">
              Начать тест
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!completed ? (
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
                    Слово {currentWordIndex + 1} из {activeWords.length}
                  </span>
                  <span className="text-sm font-medium">Правильно: {correctCount}</span>
                </div>

                <Progress value={progressPercentage} className="h-2" />

                <div className="mt-6 text-center space-y-4">
                  <motion.p
                    key={currentWordIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-3xl font-medium mb-4"
                  >
                    {formatWordForDisplay(currentWord?.withGaps || "")}
                  </motion.p>

                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value.toLowerCase())}
                      onKeyDown={handleKeyDown}
                      placeholder="Введите пропущенные буквы"
                      className={`text-center text-lg ${
                        isCorrect === true
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : isCorrect === false
                            ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                            : ""
                      }`}
                      maxLength={(currentWord?.withGaps.match(/\_\_\_/g) || []).length}
                      ref={setInputRef}
                      autoFocus
                    />
                    {currentWordAttempts<=2&&(isCorrect==null||isCorrect==false)?
                        <Button onClick={checkAnswer}>Проверить</Button>
                        :
                        <Button disabled>Проверить</Button>
                    }
                    
                  </div>

                  <div className="text-xs text-muted-foreground">Попытка {isCorrect===true ? currentWordAttempts : currentWordAttempts <= 2 ? currentWordAttempts + 1 : 3} из 3</div>

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
                              Неправильно. {currentWordAttempts >= 2 ? "Последняя попытка!" : "Попробуйте еще раз."}
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
                        <p>Правильный ответ: {getCorrectLetters().join("")}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>

              <CardFooter>
                <Button variant="outline" onClick={handleFinish} className="w-full">
                  Завершить
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <Card className="shadow-lg border-2">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-2">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Trophy className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center">Результаты</CardTitle>
                <CardDescription className="text-center">Вы завершили тест</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 py-6">
                <div className="flex justify-evenly w-full">
                    <div className="relative flex justify-center w-full">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size={"sm"} className={cn("absolute hover:none top-0 right-0 z-10")}><Info /></Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Отношение правильных к неправильным ответам</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="relative h-32 w-32">
                        <svg className="h-full w-full" viewBox="0 0 100 100">
                          <circle
                            className="stroke-muted-foreground/20"
                            strokeWidth="10"
                            fill="none"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                          <circle
                            className="stroke-primary transition-all duration-1000 ease-in-out"
                            strokeWidth="10"
                            strokeLinecap="round"
                            fill="none"
                            r="40"
                            cx="50"
                            cy="50"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - scorePercentage1 / 100)}`}
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold">{scorePercentage1}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-center w-full">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size={"sm"} className={cn("absolute hover:none top-0 right-0 z-10")}><Info /></Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Отношение количества ответов к количеству слов</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="relative h-32 w-32">
                        <svg className="h-full w-full" viewBox="0 0 100 100">
                          <circle
                            className="stroke-muted-foreground/20"
                            strokeWidth="10"
                            fill="none"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                          <circle
                            className="stroke-primary transition-all duration-1000 ease-in-out"
                            strokeWidth="10"
                            strokeLinecap="round"
                            fill="none"
                            r="40"
                            cx="50"
                            cy="50"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - scorePercentage2 / 100)}`}
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold">{scorePercentage2}%</span>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{correctCount}</div>
                      <div className="text-sm text-muted-foreground">Правильно</div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">{skippedWords}</div>
                      <div className="text-sm text-muted-foreground">Неправильно</div>
                    </div>
                  </div>
                    
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Всего слов:</span>
                      <span className="text-sm font-medium">{activeWords.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Всего попыток:</span>
                      <span className="text-sm font-medium">{totalAttempts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Неправильных ответов:</span>
                      <span className="text-sm font-medium">{skippedWords}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Соотношение правильных/неправильных:</span>
                      <span className="text-sm font-medium">
                        {incorrectCount > 0 ? (correctCount / incorrectCount).toFixed(1) : correctCount > 0 ? "∞" : "0"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 space-y-4">
                  <Button onClick={handleRestart} className="w-full">
                    Начать заново
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/">Вернуться к списку тестов</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

