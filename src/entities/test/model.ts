
import { Word } from '@/src/shared/components/test/tests'
import { dbClient } from '@/src/shared/lib/db'

const prisma = dbClient

export class TestModel {
  // Создание нового теста
  static async create(data: {
    title: string
    description?: string
    tags: string[]
    difficulty:string
    type: string
    image?:string
    questions: Word[] // JSON с вопросами
    authorId: string
  }) {
    const validateTags = data.tags.filter(c => c.length > 2);
    if (validateTags.length !== data.tags.length) {
      return null; 
    }
    const existingCategories = await prisma.category.findMany({
      where: {
        name: { in: data.tags }
      },
    });
    const existingCategoryNames = existingCategories.map(cat => cat.name);
    const newTags = data.tags.filter(tag => !existingCategoryNames.includes(tag));
    const newCategories = await Promise.all(
      newTags.map(tag =>
        prisma.category.create({
          data: { name: tag }
        })
      )
    );
    const allCategories = [...existingCategories, ...newCategories];
    try {
      const test = await prisma.test.create({
        data: {
          title: data.title,
          description: data.description,
          type: data.type,
          difficulty: data.difficulty,
          image:data.image,
          questions: JSON.stringify(data.questions),
          authorId: data.authorId,
          categories: {
            connect: allCategories.map(cat => ({ id: cat.id }))
          }
        }
      });
      return test;
    } catch (error) {
      console.error('Error creating test or categories:', error);
      return null;
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

    if (!categoryIds.length) {
        return []; 
    }

    const categories = await prisma.category.findMany({
      where: { name: { in: categoryIds } },
  });

    const tests = await prisma.test.findMany({
        where: {
            categories: {
                some: { id: { in: categories.map(c => c.id) } } 
            }
        },
        orderBy: { createdAt: 'desc' }
    });
    console.log(tests)
    return tests;
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