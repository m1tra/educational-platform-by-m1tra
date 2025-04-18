"use client"

import { Check, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/src/shared/components/ui/button"
import { useMemo } from "react"

interface RadioSelectProps {
  options: string[]
  selectedOption: string
  setSelectedOption: (option: string) => void
  checkAnswer: () => void
  isCorrect: boolean | null
  correctAnswer: string
  currentTaskAttempts: number
  showCorrectAnswer: boolean
}

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function RadioSelect({
  checkAnswer,
  currentTaskAttempts,
  isCorrect,
  correctAnswer,
  options,
  showCorrectAnswer,
  selectedOption,
  setSelectedOption,
}: RadioSelectProps) {
  const shuffledOptions = useMemo(() => shuffleArray(options), [options])

  return (
    <AnimatePresence>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {shuffledOptions.map((option) => (
            <motion.div
              key={option}
              className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedOption === option
                  ? "border-2 border-primary bg-primary/5 shadow-sm"
                  : "border border-border hover:border-primary/30 hover:bg-primary/5"
              }`}
              onClick={() => setSelectedOption(option)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                  selectedOption === option ? "border-primary" : "border-muted-foreground"
                }`}
              >
                {selectedOption === option && <div className="w-3 h-3 rounded-full bg-primary" />}
              </div>
              <span className="md:text-lg text-base">{option}</span>
            </motion.div>
          ))}
        </div>

        {isCorrect !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-4 flex items-center justify-center gap-2 p-3 rounded-md ${
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
            className="mt-2 p-3 bg-blue-50 text-blue-600 rounded-md dark:bg-blue-900/20 dark:text-blue-400"
          >
            <p>
              Правильный ответ: <span className="font-medium">{correctAnswer}</span>
            </p>
          </motion.div>
        )}

        <Button
          onClick={checkAnswer}
          disabled={selectedOption === "" || currentTaskAttempts === 3 || isCorrect === true}
          className="w-full text-lg font-medium"
          size="lg"
        >
          Ответить
        </Button>
      </div>
    </AnimatePresence>
  )
}
