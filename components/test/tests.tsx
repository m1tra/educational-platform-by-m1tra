"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { TestConfig } from "./test-config"
import { TestResults } from "./test-result"
import { TestCard } from "./test-card"
import { ProgrammingTask } from "../custom-tasks/code-panel/code-panel-interface"


export interface tasks{
  tasks: (Word | ProgrammingTask)[]
}

export interface Word {
  withGaps: string
  correct: string
}

export interface WordLearningTestProps extends tasks {
  title?: string
  description?: string
}

export function WordLearningTest({
  tasks,
  title = "Учим правописание слов",
  description = "Заполните пропущенные буквы в словах",
}: WordLearningTestProps) {
  //состояние карточки
  const [shuffledTasks, setShuffledTasks] = useState<(Word | ProgrammingTask)[]>([]);
  const [taskCount, setTaskCount] = useState<number>(Math.min(5, tasks.length))
  const [testStarted,setTestStarted] = useState<boolean>(false)
  const [activeTasks, setActiveTasks] = useState<(Word | ProgrammingTask)[]>([])
  const [completed, setCompleted] = useState(false)
  const [currentTaskIndex,setCurrentTaskIndex] = useState<number>(0)
  //cocтояние ответов
  const [correctTasksCount,setCorrectTasksCount] = useState<number>(0)
  const [totalAttempts,setTotalAttempts] = useState<number>(0)

  useEffect(() => {
    const shuffled = [...tasks].sort(() => Math.random() - 0.5);
    setShuffledTasks(shuffled);
  }, [tasks]);
  
  const onStart = () => {
    const selectedTask = shuffledTasks.slice(0,taskCount)
    setActiveTasks(selectedTask)
    setTestStarted(true)
  }

  const onFinish = () => {
    setCompleted(true)
  }

  const onRestart = () => {

  }

  console.log(activeTasks)

  if (!testStarted && !completed) {
    return (
      <TestConfig tasks={tasks} taskCount={taskCount} setTaskCount={setTaskCount} onStart={onStart} title={title} description={description}/>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!completed ? (
          <TestCard 
            title={title}
            description={description}
            tasks={activeTasks}
            currentTaskIndex={currentTaskIndex}
            setCurrentTaskIndex={setCurrentTaskIndex}
            correctTasksCount={correctTasksCount}
            setCorrectTasksCount={setCorrectTasksCount}
            totalAttempts={totalAttempts}
            setTotalAttempts={setTotalAttempts}
            handleFinish={onFinish}        
          />
        ) : (
          <TestResults 
            totalTasks={activeTasks.length} 
            correctCount={correctTasksCount} 
            totalAttempts={totalAttempts} 
            onRestart={onRestart} />
        )}
      </AnimatePresence>
    </div>
  )
}

