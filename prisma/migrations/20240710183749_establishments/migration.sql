/*
  Warnings:

  - You are about to drop the `Establishment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Establishment";

-- CreateTable
CREATE TABLE "establishments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "phone" TEXT,
    "instagram" TEXT,
    "schedule_days" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "schedule_hours" TEXT NOT NULL,
    "observations" TEXT NOT NULL,

    CONSTRAINT "establishments_pkey" PRIMARY KEY ("id")
);
