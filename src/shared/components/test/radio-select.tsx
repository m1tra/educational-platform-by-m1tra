
import { Check, X } from 'lucide-react';

import { motion, AnimatePresence } from "framer-motion";
import { Button } from '../ui/button';
import { useMemo } from 'react';


interface RadioSelectProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  checkAnswer: () => void;
  isCorrect: boolean | null;
  correctAnswer: string;
  currentTaskAttempts: number;
}

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function RadioSelect({
  checkAnswer,
  currentTaskAttempts,
  isCorrect,
  options,
  selectedOption,
  setSelectedOption,
}: RadioSelectProps) {
  
  const shuffledOptions = useMemo(() => shuffleArray(options), [options]);
  
  return (
    <AnimatePresence>
      <div className="space-y-4">
        <div className="space-y-2">
          {shuffledOptions.map((option) => (
            <motion.div
              key={option}
              className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedOption === option
                  ? "border border-foreground shadow-sm"
                  : "border border-border hover:border-foreground/30"
              }`}
              onClick={() => setSelectedOption(option)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="md:text-lg text-base text-left">{option}</span>
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

        <Button 
          onClick={checkAnswer} 
          disabled={selectedOption === ""} 
          className="w-full text-lg font-medium"
        >
          Проверить
        </Button>
      </div>
    </AnimatePresence>
  );
}

