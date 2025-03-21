import { TestType } from "../wrapper";

export interface ProgrammingTask {
  type: TestType.CODE;
  title: string
  description: string
  initialCode: string
  expectedOutput: string
  generateScript?: string
  answerScript?: string
}

export interface CodePanelProps {
  handleTakeValue?: (task: ProgrammingTask[]) => void
  initialTasks?: ProgrammingTask[]
}

export interface CreateTabProps {
    tasks: ProgrammingTask[]
    handleTakeValue: (tasks: ProgrammingTask[]) => void
  }
  
export interface TaskEditFormProps {
  task: ProgrammingTask | null
  mode: "create" | "edit"
  index?: number
  onSave?: (task: ProgrammingTask, index: number) => void
  onChange: (field: string, value: string) => void
}

export interface TestTabProps {
  tasks: ProgrammingTask[]
}

export interface cardPythonInterpreterProps {
  code:string
  setCode:(v:string) => void
  output:string
  setOutput:(v:string) => void
}