export interface Course {
  id: number
  title: string
  description: string
  modules: Module[]
  status?: "published" | "draft"
  studentsCount?: number
  isPinned?: boolean
  thumbnail?: string
  createdAt?: string
  updatedAt?: string
}

export interface Module {
  id: number
  title: string
  lessons: Lesson[]
  description?: string
  isPublished?: boolean
}

export type Lesson = {
  id: number
  title: string
  content: string
  hasTest: boolean
  testId: number | null
  duration?: number
  isCompleted?: boolean
}

export interface LessonProgress {
  completedSteps: number
  totalSteps: number
  earnedPoints: number
  totalPoints: number
}

export interface Comment {
  id: string
  author: string
  text: string
}
