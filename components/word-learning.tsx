"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Check, X, Trophy } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

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
  const [attempts, setAttempts] = useState(0)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null)

  // Initialize words on component mount
  useEffect(() => {
    setShuffledWords([...words].sort(() => Math.random() - 0.5))
  }, [words])

  const currentWord = shuffledWords[currentWordIndex] || words[0]

  // Function to check if the user's input matches the correct word
  const checkAnswer = () => {
    if (!userInput.trim()) return

    setAttempts(attempts + 1)

    // Get the correct letters that should be filled in
    const correctLetters = getCorrectLetters()

    // Check if user provided the right number of letters
    if (userInput.length !== correctLetters.length) {
      setIsCorrect(false)
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
      setCorrectCount(correctCount + 1)
      // Move to the next word after a short delay
      setTimeout(() => {
        if (currentWordIndex < shuffledWords.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1)
          setUserInput("")
          setIsCorrect(null)
          setShowCorrectAnswer(false)
          inputRef?.focus()
        } else {
          setCompleted(true)
        }
      }, 1500)
    } else {
      // Show correct answer after 3 wrong attempts
      if ((attempts + 1) % 3 === 0) {
        setShowCorrectAnswer(true)
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
    setShuffledWords([...words].sort(() => Math.random() - 0.5))
    setCurrentWordIndex(0)
    setUserInput("")
    setIsCorrect(null)
    setCompleted(false)
    setCorrectCount(0)
    setAttempts(0)
    setShowCorrectAnswer(false)
    setTimeout(() => {
      inputRef?.focus()
    }, 100)
  }

  // Format the word with gaps for display
  const formatWordForDisplay = (word: string) => {
    return word.replace(/\.\./g, "___")
  }

  // Calculate progress percentage
  const progressPercentage = shuffledWords.length ? (currentWordIndex / shuffledWords.length) * 100 : 0

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
  const scorePercentage = attempts > 0 ? Math.round((correctCount / attempts) * 100) : 0

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
                    Слово {currentWordIndex + 1} из {shuffledWords.length}
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
                      maxLength={(currentWord?.withGaps.match(/\.\./g) || []).length}
                      ref={setInputRef}
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
                            <span>Неправильно. Попробуйте еще раз.</span>
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
                <div className="flex justify-center">
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
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - scorePercentage / 100)}`}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">{scorePercentage}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-center">
                  <p className="text-xl font-semibold">
                    {correctCount} / {attempts}
                  </p>
                  <p className="text-muted-foreground">
                    Вы правильно заполнили {correctCount} из {attempts} попыток
                  </p>
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

