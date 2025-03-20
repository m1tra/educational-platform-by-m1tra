import { TestType } from "../wrapper"

export interface RadioGroupManagerProps{
    selectedOption:string | null
    radioOptions:string[]
    newOption:string
    setRadioOptions:(value:string[])=>void
    setNewOption:(value:string)=>void
    setSelectedOption:(value:string | null)=>void
}

export interface ExamTicketProps {
  type: TestType.EXAM_TICKET;
  question: string;
  expectedOutput: string ;
}

export interface RadioOutput{
  radioOptions:string[]
  selectedOption:string 
}

export interface TestPanelProps {
  handleTakeValue: (tests: ExamTicketProps[]) => void;
  tests: ExamTicketProps[];
}