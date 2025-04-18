"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { TestConfig } from "./test-config"
import { TestResults } from "./test-result/test-result"
import { TestCard } from "./test-card"
import type { ProgrammingTask } from "../courses/custom-tasks/code-panel/code-panel-interface"
import type { TestType } from "../courses/custom-tasks/wrapper"
import type { ExamTicketProps } from "../courses/custom-tasks/word-answer-panel/exam-ticket-interface"
import type { answerListProps } from "./test-interface"

export interface tasks {
  tasks: (Word | ProgrammingTask | ExamTicketProps)[]
}

export interface Word {
  type: TestType.WORD
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
  const [shuffledTasks, setShuffledTasks] = useState<(Word | ProgrammingTask | ExamTicketProps)[]>([])
  const [taskCount, setTaskCount] = useState<number>(Math.min(5, tasks.length))
  const [testStarted, setTestStarted] = useState<boolean>(false)
  const [activeTasks, setActiveTasks] = useState<(Word | ProgrammingTask | ExamTicketProps)[]>([])
  const [completed, setCompleted] = useState(false)
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0)
  const [correctTasksCount, setCorrectTasksCount] = useState<number>(0)
  const [totalAttempts, setTotalAttempts] = useState<number>(0)
  const [answerList, setAnswerList] = useState<answerListProps[]>([])
  const [taskId, setTaskId] = useState<number>(1)

  // Time tracking
  const [startTime, setStartTime] = useState<number>(0)
  const [taskStartTime, setTaskStartTime] = useState<number>(0)
  const [taskTimes, setTaskTimes] = useState<number[]>([])

  useEffect(() => {
    const shuffled = [...tasks].sort(() => Math.random() - 0.5)
    setShuffledTasks(shuffled)
  }, [tasks, completed])

  const onStart = () => {
    const selectedTask = shuffledTasks.slice(0, taskCount)
    setActiveTasks(selectedTask)
    setTestStarted(true)
    setStartTime(Date.now())
    setTaskStartTime(Date.now())
  }

  const completeCurrentTask = () => {
    setTaskId(taskId + 1)
    const currentTaskTime = (Date.now() - taskStartTime) / 1000
    setTaskTimes((prev) => [...prev, currentTaskTime])
    setTaskStartTime(Date.now())
  }

  const onFinish = () => {
    completeCurrentTask()
    setCompleted(true)
  }

  const onRestart = () => {
    setTestStarted(false)
    setCompleted(false)
    setTotalAttempts(0)
    setCorrectTasksCount(0)
    setCurrentTaskIndex(0)
    setTaskTimes([])
    setAnswerList([])
    setTaskId(1)
  }

  const getStats = () => {
    const totalTime = (Date.now() - startTime) / 1000
    const avg = taskTimes.reduce((a, b) => a + b, 0) / taskTimes.length || 0
    const fastest = Math.min(...taskTimes) || 0
    const slowest = Math.max(...taskTimes) || 0
    return {
      totalTime,
      averageTimePerTask: avg,
      fastestTask: fastest,
      slowestTask: slowest,
    }
  }

  if (!testStarted && !completed) {
    return (
      <TestConfig
        tasks={tasks}
        taskCount={taskCount}
        setTaskCount={setTaskCount}
        onStart={onStart}
        title={title}
        description={description}
      />
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
            setCurrentTaskIndex={(index) => {
              completeCurrentTask()
              setCurrentTaskIndex(index)
            }}
            correctTasksCount={correctTasksCount}
            setCorrectTasksCount={setCorrectTasksCount}
            totalAttempts={totalAttempts}
            setTotalAttempts={setTotalAttempts}
            handleFinish={onFinish}
            taskId={taskId}
            answerList={answerList}
            setAnswerList={setAnswerList}
          />
        ) : (
          <TestResults
            totalTasks={activeTasks.length}
            correctCount={correctTasksCount}
            totalAttempts={totalAttempts}
            onRestart={onRestart}
            answerList={answerList}
            {...getStats()}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
