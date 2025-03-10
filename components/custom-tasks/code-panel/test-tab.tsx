import React from 'react'
import { ProgrammingTask } from './create-tab'

interface ITestProps{
    tasks:ProgrammingTask[]
}

export const TestTab = ({tasks}:ITestProps) => {
  return (
    <div>
        {tasks.map((item:ProgrammingTask,index)=>(
            <div key={index}>{item.title}</div>
        ))}
    </div>
  )
}