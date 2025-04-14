export interface course {
    id: number
    title: string
    description: string
    modules: module[]
    status?: "published" | "draft"
    studentsCount?: number
    isPinned?: boolean
    thumbnail?: string
    createdAt?: string
    updatedAt?: string
  }
  
  export interface module {
    id: number
    title: string
    lessons: lesson[]
    description?: string
    isPublished?: boolean
  }
  
  export type lesson = {
    id: number
    title: string
    content: string
    hasTest: boolean
    testId: number | null
    duration?: number
    isCompleted?: boolean
  }
  