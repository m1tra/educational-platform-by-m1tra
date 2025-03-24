import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { CheckInputProps } from './test-interface'


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
  correctAnswer
}: AnswerFeedbackProps) {
  return (
    <div className="mt-6 text-center space-y-4">
      <CheckInput userInput={userInput} setUserInput={setUserInput} isCorrect={isCorrect} checkAnswer={checkAnswer} />

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
                <span>Неправильно. {currentTaskAttempts >= 2 ? "Последняя попытка!" : "Попробуйте еще раз."}</span>
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
    </div>
  )
}


const CheckInput = ({userInput,setUserInput,isCorrect,checkAnswer}: CheckInputProps) => {
  return (
    <div className="flex gap-2">
        <Input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.toLowerCase())}
          placeholder="Введите ответ"
          className={`text-center text-lg  ${
            isCorrect === true
              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
              : isCorrect === false
              ? "border-red-500 bg-red-50 dark:bg-red-900/20"
              : ""
          }`}
          autoFocus
        />
        <Button onClick={checkAnswer} disabled={userInput === ""}>
          Проверить
        </Button>
  </div>
  )
}