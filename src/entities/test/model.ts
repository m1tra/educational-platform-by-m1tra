
import { Word } from '@/src/shared/components/test/tests'
import { dbClient } from '@/src/shared/lib/db'

const prisma = dbClient

export class TestModel {
  // Создание нового теста
  static async create(data: {
    title: string
    description?: string
    category: string
    type: string
    questions: Word[] // JSON с вопросами
    authorId: string
  }) {
    let category = await prisma.category.findFirst({
      where: {
        name: data.category,
      },
    });
  
    if (!category) {
      category = await prisma.category.create({
        data: {
          name: data.category,
        },
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { category: _, ...restData } = data; 
    try {
      const createdTest = await prisma.test.create({
        data: {
          ...restData,
          published: false,
          questions: JSON.stringify(data.questions),
          category: {  
            connect: {
              id: category.id, 
            },
          },
        },
      });
      console.log(createdTest); // You can log the created test
    } catch (error) {
      console.error('Error creating test:', error);
    }
  }

  // Получение теста по ID
  static async getById(id: string) {
    return await prisma.test.findUnique({
      where: { id }
    })
  }

  // Получение всех тестов
  static async getAll() {
    return await prisma.test.findMany({
      orderBy: { createdAt: 'desc' }
    })
  }

  // Получение тестов по типу
  static async getByCategoryId(id: string) {
    const categoryIds = id.split(',');
    const category = await prisma.category.findMany({
      where: { name: { in: categoryIds } },
    })
    console.log(category,categoryIds)
    return prisma.test.findMany({
      where: { categoryId: { in: category.map((category) => category.id) } }, // Проверяет, есть ли пересечения
      orderBy: { createdAt: 'desc' }
    });
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