import { dbClient } from '@/src/shared/lib/db'

const prisma = dbClient

export class CategoryModel {

  // Получение теста по ID
  static async getById(id: string) {
    return await prisma.category.findUnique({
      where: { id }
    })
  }

  static async getAll() {
    return await prisma.category.findMany()
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