import { Check,  X } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem  } from "../ui/radio-group";
import { motion, AnimatePresence } from "framer-motion"

interface RadioSelectProps {
  options: string[]
  selectedOption: string
  setSelectedOption: (option: string) => void   
  checkAnswer: () => void
  isCorrect: boolean | null
  correctAnswer: string
  currentTaskAttempts: number
}

export function RadioSelect({checkAnswer, currentTaskAttempts, isCorrect, options,selectedOption,setSelectedOption}:RadioSelectProps) {
  return (
    <AnimatePresence>
        <div className="space-y-4">
            <RadioGroup> 
                {options.map((option) => (
                    <div key={option} className="flex items-center space-x-5">  
                        <RadioGroupItem
                            className="w-4 h-4 "
                            id ={option}
                            key={option} 
                            value={option}
                            checked={selectedOption === option}
                            onClick={() => setSelectedOption(option)}
                         /> 
                        <Label htmlFor={option} className={`text-xl`}>{option}</Label>     
                    </div>
                ))}
            </RadioGroup>
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
            <Button onClick={checkAnswer} disabled={selectedOption === ""} className="w-full">
              Проверить
            </Button>
        </div>
    </AnimatePresence>
  )
}
