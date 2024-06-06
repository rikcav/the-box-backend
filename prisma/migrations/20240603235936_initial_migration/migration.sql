-- CreateEnum
CREATE TYPE "ProfileEnum" AS ENUM ('USER', 'SUPER_USER');

-- CreateEnum
CREATE TYPE "TypeMaterial" AS ENUM ('DIDATICO', 'FORMAL');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile" "ProfileEnum" NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "enrollment" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("enrollment")
);

-- CreateTable
CREATE TABLE "professors" (
    "enrollment" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "professors_pkey" PRIMARY KEY ("enrollment")
);

-- CreateTable
CREATE TABLE "disciplines" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "professor_enrollement" TEXT NOT NULL,

    CONSTRAINT "disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "day_week" TEXT NOT NULL,
    "discipline_id" INTEGER NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materials" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "TypeMaterial" NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lab_schedule" (
    "id" INTEGER NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "lab_id" INTEGER NOT NULL,

    CONSTRAINT "lab_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "labs" (
    "id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "labs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professors" ADD CONSTRAINT "professors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_professor_enrollement_fkey" FOREIGN KEY ("professor_enrollement") REFERENCES "professors"("enrollment") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materials" ADD CONSTRAINT "materials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_schedule" ADD CONSTRAINT "lab_schedule_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lab_schedule" ADD CONSTRAINT "lab_schedule_lab_id_fkey" FOREIGN KEY ("lab_id") REFERENCES "labs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
