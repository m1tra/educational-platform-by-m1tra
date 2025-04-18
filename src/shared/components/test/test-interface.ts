"use client"

import type React from "react"

import type { ProgrammingTask } from "../courses/custom-tasks/code-panel/code-panel-interface"
import type { ExamTicketProps } from "../courses/custom-tasks/word-answer-panel/exam-ticket-interface"
import type { Word } from "./tests"

export interface TestConfigProps {
  tasks: (ProgrammingTask | Word | ExamTicketProps)[]
  setTaskCount: (taskCount: number) => void
  taskCount: number
  onStart: (taskCount: number) => void
  title?: string
  description?: string
}

export interface TestResultsProps {
  totalTasks: number
  correctCount: number
  totalAttempts: number
  onRestart: () => void
}

export interface TestCardProps {
  tasks: (ProgrammingTask | Word | ExamTicketProps)[]
  title: string
  description: string
  currentTaskIndex: number
  taskId: number
  answerList: answerListProps[]
  setAnswerList: React.Dispatch<React.SetStateAction<answerListProps[]>>
  setCurrentTaskIndex: (currentTaskIndex: number) => void
  correctTasksCount: number
  setCorrectTasksCount: (currentTaskIndex: number) => void
  totalAttempts: number
  setTotalAttempts: (currentTaskIndex: number) => void
  handleFinish: () => void
}

export type CheckInputProps = {
  isPaused:boolean
  userInput: string
  currentTaskAttempts: number
  setUserInput: (e: string) => void
  isCorrect: boolean | null
  checkAnswer: () => void
}

export type answerListProps = {
  id: number
  task: string
  correctAnswer: string
  userAnswer: string
}
