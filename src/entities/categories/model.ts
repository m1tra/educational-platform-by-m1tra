import { dbClient } from '@/src/shared/lib/db'

const prisma = dbClient

export class CategoryModel {

  static async getTestWithCategories(id: string) {
    return await prisma.test.findUnique({
      where: { id },
      include: {
        categories: true,
      },
    })
  }

  static async getAll() {
    return await prisma.category.findMany({
      include: {
        tests: true,
      },
    }
    )
  }

  static async delete(name: string) {
    console.log(name)
    const category = await prisma.category.findFirst({
      where: { name }
    })

    if (!category) {
      return { error: 'Категория не найдена' }
    }

    return prisma.category.delete({
      where: { id: category.id }
    })
  }
}