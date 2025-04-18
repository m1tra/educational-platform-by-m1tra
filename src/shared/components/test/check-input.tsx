"use client"

import type React from "react"
import { Input } from "@/src/shared/components/ui/input"
import { Button } from "@/src/shared/components/ui/button"
import type { CheckInputProps } from "./test-interface"
import { Check, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AnswerFeedbackProps {
  userInput: string
  setUserInput: React.Dispatch<React.SetStateAction<string>>
  isCorrect: boolean | null
  checkAnswer: () => void
  currentTaskAttempts: number
  showCorrectAnswer: boolean
  correctAnswer: string
}

export function AnswerFeedback({
  userInput,
  setUserInput,
  isCorrect,
  checkAnswer,
  currentTaskAttempts,
  showCorrectAnswer,
  correctAnswer,
}: AnswerFeedbackProps) {
  return (
    <div className="space-y-4">
      <CheckInput
        userInput={userInput}
        setUserInput={setUserInput}
        isCorrect={isCorrect}
        checkAnswer={checkAnswer}
        currentTaskAttempts={currentTaskAttempts}
      />

      <AnimatePresence>
        {isCorrect !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center gap-2 p-3 rounded-md ${
              isCorrect
                ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
            }`}
          >
            {isCorrect ? (
              <>
                <Check size={20} className="flex-shrink-0" />
                <span className="font-medium">Правильно!</span>
              </>
            ) : (
              <>
                <X size={20} className="flex-shrink-0" />
                <span className="font-medium">
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
            className="p-3 bg-blue-50 text-blue-600 rounded-md dark:bg-blue-900/20 dark:text-blue-400"
          >
            <p>
              Правильный ответ: <span className="font-medium">{correctAnswer}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const CheckInput = ({ userInput, setUserInput, isCorrect, checkAnswer, currentTaskAttempts }: CheckInputProps) => {
  return (
    <div className="flex gap-2">
      <Input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value.toLowerCase())}
        placeholder="Введите ответ"
        className={`text-center text-lg ${
          isCorrect === true
            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
            : isCorrect === false
              ? "border-red-500 bg-red-50 dark:bg-red-900/20"
              : ""
        }`}
        autoFocus
      />
      <Button
        onClick={checkAnswer}
        disabled={userInput === "" || currentTaskAttempts === 3 || isCorrect === true}
        size="lg"
      >
        Ответить
      </Button>
    </div>
  )
}
