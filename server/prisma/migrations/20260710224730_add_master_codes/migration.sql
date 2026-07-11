/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `subcategories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `subcategories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "code" VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE "subcategories" ADD COLUMN     "code" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_code_key" ON "categories"("code");

-- CreateIndex
CREATE UNIQUE INDEX "subcategories_code_key" ON "subcategories"("code");
