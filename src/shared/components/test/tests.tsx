"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { TestConfig } from "./test-config"
import { TestResults } from "./test-result"
import { TestCard } from "./test-card"
import { ProgrammingTask } from "../custom-tasks/code-panel/code-panel-interface"
import { TestType } from "../custom-tasks/wrapper"
import { ExamTicketProps } from "../custom-tasks/word-answer-panel/exam-ticket-interface"



export interface tasks{
  tasks: (Word | ProgrammingTask | ExamTicketProps)[]
}

export interface Word { 
  type: TestType.WORD;
  expectedOutput: string
}

export interface WordLearningTestProps extends tasks {
  title?: string
  description?: string
}

export function Test({
  tasks,
  title = "Учим правописание слов",
  description = "Заполните пропущенные буквы в словах",
}: WordLearningTestProps) {
  //состояние карточки
  const [shuffledTasks, setShuffledTasks] = useState<(Word | ProgrammingTask | ExamTicketProps)[]>([]);
  const [taskCount, setTaskCount] = useState<number>(Math.min(5, tasks.length))
  const [testStarted,setTestStarted] = useState<boolean>(false)
  const [activeTasks, setActiveTasks] = useState<(Word | ProgrammingTask | ExamTicketProps)[]>([])
  const [completed, setCompleted] = useState(false)
  const [currentTaskIndex,setCurrentTaskIndex] = useState<number>(0)
  //cocтояние ответов
  const [correctTasksCount,setCorrectTasksCount] = useState<number>(0)
  const [totalAttempts,setTotalAttempts] = useState<number>(0)
  useEffect(() => {
    const shuffled = [...tasks].sort(() => Math.random() - 0.5);
    setShuffledTasks(shuffled);
  }, [tasks,completed]);
  
  const onStart = () => {
    const selectedTask = shuffledTasks.slice(0,taskCount)
    setActiveTasks(selectedTask)
    setTestStarted(true)
  }

  const onFinish = () => {
    setCompleted(true)
  }

  const onRestart = () => {
    setTestStarted(false)
    setCompleted(false)
    setTotalAttempts(0)
    setCorrectTasksCount(0)
    setCurrentTaskIndex(0)
  }
  console.log()
  if (!testStarted && !completed) {
    return (
      <TestConfig tasks={tasks} taskCount={taskCount} setTaskCount={setTaskCount} onStart={onStart} title={title} description={description}/>
    )
  }
  
  return (
    <div className="w-full max-w-4xl flex items-center justify-center h-full mx-auto">
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

