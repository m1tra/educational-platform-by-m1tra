/*
  Warnings:

  - Added the required column `categoryId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "categoryId" TEXT NOT NULL,
ALTER COLUMN "difficulty" SET DEFAULT 'Легкий';

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
