/*
  Warnings:

  - Added the required column `category` to the `materials` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MaterialCategoryEnum" AS ENUM ('BAREMA', 'REQUERIMENTO', 'UNICO', 'EDITAIS', 'EDITAIS_DE_BOLSAS', 'APOIO', 'MANUAL_DOS_CALOUROS');

-- AlterTable
ALTER TABLE "materials" ADD COLUMN     "category" "MaterialCategoryEnum" NOT NULL;
