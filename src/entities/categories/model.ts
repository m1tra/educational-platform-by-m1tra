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

  static async delete(id: string) {
    return prisma.test.delete({
      where: { id }
    })
  }
}