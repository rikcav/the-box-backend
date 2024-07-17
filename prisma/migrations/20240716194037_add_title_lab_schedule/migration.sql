/*
  Warnings:

  - Added the required column `title` to the `lab_schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lab_schedule" ADD COLUMN     "title" TEXT NOT NULL;
