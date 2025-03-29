
import { Word } from '@/src/shared/components/test/tests'
import { dbClient } from '@/src/shared/lib/db'

const prisma = dbClient

export class TestModel {
  // Создание нового теста
  static async create(data: {
    title: string
    description?: string
    type: string
    questions: Word[] // JSON с вопросами
    authorId: string
  }) {


    return prisma.test.create({
      data: {
        ...data,
        published: false,
        questions: JSON.stringify(data.questions)
      }
    })
  }

  // Получение теста по ID
  static async getById(id: string) {
    return prisma.test.findUnique({
      where: { id }
    })
  }

  // Получение всех тестов
  static async getAll() {
    return prisma.test.findMany({
      orderBy: { createdAt: 'desc' }
    })
  }

  // Получение тестов по типу
  static async getByType(type: string) {
    return prisma.test.findMany({
      where: { type },
      orderBy: { createdAt: 'desc' }
    })
  }

  // Получение тестов конкретного автора
  static async getByAuthor(authorId: string) {
    return prisma.test.findMany({
      where: { authorId },
      orderBy: { createdAt: 'desc' }
    })
  }

  // Обновление теста
  static async update(id: string, data: {
    title?: string
    description?: string
    questions?: Word[]
    published?: boolean
  }) {
    return prisma.test.update({
      where: { id },
      data: {
        ...data,
        questions: JSON.stringify(data.questions)
      }
    })
  }

  // Удаление теста
  static async delete(id: string) {
    return prisma.test.delete({
      where: { id }
    })
  }

  // Публикация теста
  static async publish(id: string) {
    return prisma.test.update({
      where: { id },
      data: { published: true }
    })
  }

  // Получение опубликованных тестов
  static async getPublished() {
    return prisma.test.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' }
    })
  }
}