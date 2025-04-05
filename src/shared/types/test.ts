import { TestType } from "../components/custom-tasks/wrapper"


interface   Test {
    type: TestType
    id: string
    title: string
    description: string
    icon: string
    
    difficulty: string
    questions:string
    comingSoon?: boolean
}

export type { Test }
export enum Role {
    USER,
    MODERATOR,
    ADMIN,
}