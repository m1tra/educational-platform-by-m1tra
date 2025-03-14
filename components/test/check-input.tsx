import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { CheckInputProps } from './test-interface'


export const CheckInput = ({userInput,setUserInput,isCorrect,checkAnswer}: CheckInputProps) => {
  return (
    <div className="flex gap-2">
        <Input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.toLowerCase())}
          placeholder="Введите пропущенные буквы"
          className={`text-center text-lg ${
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