import { ProgrammingTask } from "../custom-tasks/code-panel/code-panel-interface";
import { Word } from "./tests";

export interface TestConfigProps{
  tasks:(ProgrammingTask | Word)[]
  setTaskCount: (taskCount: number) => void
  taskCount:number
  onStart: (taskCount: number) => void
  title?:string
  description?:string
}
export interface TestResultsProps {
  totalTasks: number
  correctCount: number
  totalAttempts: number
  onRestart: () => void
  }
  
export interface TestCardProps {
  tasks:(ProgrammingTask | Word)[]
  title: string
  description: string 
  currentTaskIndex:number
  setCurrentTaskIndex: (currentTaskIndex:number)=>void
  correctTasksCount:number
  setCorrectTasksCount: (currentTaskIndex:number)=>void
  totalAttempts:number
  setTotalAttempts: (currentTaskIndex:number)=>void
  handleFinish:() => void
}

export type CheckInputProps = {
  userInput:string
  setUserInput:(e:string)=>void
  isCorrect:boolean | null
  checkAnswer:()=>void
}