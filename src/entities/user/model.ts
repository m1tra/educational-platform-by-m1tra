import { dbClient } from '@/src/shared/lib/db'
import {  User } from '@prisma/client'


const prisma = dbClient
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UserSubset = Pick<User, 'id'> & { role: any };

export class UserModel {

  static async getById(id: string) {
    return await prisma.user.findUnique({
      where: { id }
    })
  }

  static async getAll() {
    return await prisma.user.findMany()
  }

  static async updateById({id, role}:UserSubset) {
    console.log("Updating user with ID:", id, "Role:", role);
    const normalizedRole = role.toUpperCase();
    try {
        return await prisma.user.update({
            where: { id },
            data: { role:normalizedRole },
        });
    } catch (error) {
        console.error("Error updating role:", error);
        throw new Error('Ошибка при обновлении роли');
    }
}


  static async delete(name: string) {
    const category = await prisma.user.findFirst({
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