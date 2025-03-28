import { TestType } from "../shared/components/custom-tasks/wrapper"

interface   Test {
    type: TestType
    id: string
    title: string
    description: string
    icon: string
    difficulty: string
    questionsCount: number
    comingSoon?: boolean
}

export type { Test }
