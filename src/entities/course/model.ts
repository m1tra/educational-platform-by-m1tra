import type { Course, Module, Lesson, Comment } from "./types"

export interface LessonProgress {
  completedSteps: number
  totalSteps: number
  earnedPoints: number
  totalPoints: number
}

export const courseData: Course = {
  id: 1,
  title: "Стереометрия с ЕГЭ",
  description:
    "Полный курс стереометрии для подготовки к ЕГЭ. Изучите все необходимые темы с нуля и научитесь решать сложные задачи.",
  status: "published",
  studentsCount: 1250,
  isPinned: true,
  thumbnail: "/placeholder.svg",
  createdAt: "2023-09-15T10:00:00Z",
  updatedAt: "2024-03-20T14:30:00Z",
  modules: [
    {
      id: 1,
      title: "Классический метод. Теория.",
      description: "Основы стереометрии и классические методы решения задач",
      isPublished: true,
      lessons: [
        {
          id: 101,
          title: "Аксиомы стереометрии",
          content: "Содержание урока об аксиомах стереометрии",
          hasTest: true,
          testId: 1001,
          duration: 25,
          isCompleted: true,
        },
        {
          id: 102,
          title: "Параллельность двух прямых; прямой и плоскости",
          content: "Содержание урока о параллельности",
          hasTest: true,
          testId: 1002,
          duration: 35,
          isCompleted: true,
        },
        {
          id: 103,
          title: "Взаимное расположение прямых. Угол между прямыми",
          content: "Содержание урока о взаимном расположении прямых",
          hasTest: true,
          testId: 1003,
          duration: 20,
          isCompleted: true,
        },
        {
          id: 104,
          title: "Параллельность плоскостей",
          content: "Содержание урока о параллельности плоскостей",
          hasTest: true,
          testId: 1004,
          duration: 30,
          isCompleted: false,
        },
        {
          id: 105,
          title: "Перпендикулярность прямой и плоскости. Угол между ними",
          content: "Содержание урока о перпендикулярности",
          hasTest: true,
          testId: 1005,
          duration: 40,
          isCompleted: true,
        },
        {
          id: 106,
          title: "Двугранный угол. Перпендикулярные плоскости",
          content: "Содержание урока о двугранном угле",
          hasTest: false,
          testId: null,
          duration: 15,
          isCompleted: true,
        },
      ],
    },
    {
      id: 2,
      title: "Сечения.",
      description: "Построение сечений многогранников",
      isPublished: true,
      lessons: [
        {
          id: 201,
          title: "Изображение фигур. Простейшие сечения",
          content: "Содержание урока об изображении фигур",
          hasTest: true,
          testId: 2001,
          duration: 45,
          isCompleted: true,
        },
        {
          id: 202,
          title: "Метод следов",
          content: "Содержание урока о методе следов",
          hasTest: true,
          testId: 2002,
          duration: 30,
          isCompleted: true,
        },
        {
          id: 203,
          title: "Площадь ортогональной проекции",
          content: "Содержание урока о площади ортогональной проекции",
          hasTest: true,
          testId: 2003,
          duration: 25,
          isCompleted: true,
        },
      ],
    },
    {
      id: 3,
      title: "Расстояния.",
      description: "Вычисление расстояний в пространстве",
      isPublished: true,
      lessons: [
        {
          id: 301,
          title: "Расстояние от точки до прямой",
          content: "Содержание урока о расстоянии от точки до прямой",
          hasTest: true,
          testId: 3001,
          duration: 20,
          isCompleted: true,
        },
        {
          id: 302,
          title: "Расстояние от точки до плоскости",
          content: "Содержание урока о расстоянии от точки до плоскости",
          hasTest: true,
          testId: 3002,
          duration: 25,
          isCompleted: true,
        },
        {
          id: 303,
          title: "Расстояния между прямыми и плоскостями",
          content: "Содержание урока о расстояниях между прямыми и плоскостями",
          hasTest: true,
          testId: 3003,
          duration: 40,
          isCompleted: false,
        },
      ],
    },
  ],
}

export const getLessonById = (lessonId: number): Lesson | undefined => {
  for (const courseModule of courseData.modules) {
    const lesson = courseModule.lessons.find((lesson) => lesson.id === lessonId)
    if (lesson) return lesson
  }
  return undefined
}

export const getModuleForLesson = (lessonId: number): Module | undefined => {
  return courseData.modules.find((courseModule) =>
    courseModule.lessons.some((lesson) => lesson.id === lessonId)
  )
}

export const getActiveLesson = (): Lesson | undefined => {
  for (const courseModule of courseData.modules) {
    for (const lesson of courseModule.lessons) {
      if (!lesson.isCompleted) {
        return lesson
      }
    }
  }
  return courseData.modules[0].lessons[0]
}

export const getCourseProgress = (): number => {
  let totalLessons = 0
  let completedLessons = 0

  courseData.modules.forEach((courseModule) => {
    courseModule.lessons.forEach((lesson) => {
      totalLessons++
      if (lesson.isCompleted) {
        completedLessons++
      }
    })
  })

  return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
}

export const getTotalPoints = (): number => {
  let points = 0
  courseData.modules.forEach((courseModule) => {
    courseModule.lessons.forEach((lesson) => {
      if (lesson.hasTest) {
        points += 10 
      }
    })
  })
  return points
}

export const getEarnedPoints = (): number => {
  let points = 0
  courseData.modules.forEach((courseModule) => {
    courseModule.lessons.forEach((lesson) => {
      if (lesson.hasTest && lesson.isCompleted) {
        points += 10 
      }
    })
  })
  return points
}

export const getComments = (): Comment[] => {
  return [
    {
      id: "1",
      author: "Студент",
      text: "Спасибо за объяснение! Теперь я понимаю, как находить расстояние между скрещивающимися прямыми.",
    },
  ]
}

export const getLessonProgress = (): LessonProgress => {
  return {
    completedSteps: 15,
    totalSteps: 16,
    earnedPoints: 6,
    totalPoints: 7,
  }
}
