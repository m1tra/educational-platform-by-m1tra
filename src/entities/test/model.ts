
import { Word } from '@/src/shared/components/test/tests'
import { dbClient } from '@/src/shared/lib/db'

const prisma = dbClient

export class TestModel {
  static async create(data: {
    title: string
    description?: string
    tags: string[]
    difficulty:string
    type: string
    image?:string
    questions: Word[] 
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
      console.error('Ошибка создания тестов или категорий', error);
      return null;
    }

  }
  static async update(data: {
    id:string
    title: string
    description?: string
    tags: string[]
    difficulty:string
    type: string
    image?:string
    questions: Word[] 
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
      const test = await prisma.test.update({
        where: { id: data.id },
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
      console.error('Ошибка создания тестов или категорий', error);
      return null;
    }

  }

  static async getById(id: string) {
    return await prisma.test.findUnique({
      where: { id }
    })
  }

  static async getAll() {
    return await prisma.test.findMany({
      orderBy: { createdAt: 'desc' }
    })
  }

  static async getByCategoryId(id: string) {
    const categoryIds = id.split(',');
    if (categoryIds.length==0) {
        
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
    return tests;
}


  
  static async getByAuthor(authorId: string) {
    return prisma.test.findMany({
      where: { authorId },
      orderBy: { createdAt: 'desc' }
    })
  }



  static async delete(id: string) {
    return prisma.test.delete({
      where: { id }
    })
  }

  static async publish(id: string) {
    return prisma.test.update({
      where: { id },
      data: { published: true }
    })
  }

  static async getPublished() {
    return prisma.test.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' }
    })
  }
}