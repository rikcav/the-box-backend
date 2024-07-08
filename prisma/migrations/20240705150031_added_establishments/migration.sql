-- CreateTable
CREATE TABLE "Establishment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "phone" TEXT,
    "instagram" TEXT,
    "schedule_days" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "schedule_hours" TEXT NOT NULL,
    "observations" TEXT NOT NULL,

    CONSTRAINT "Establishment_pkey" PRIMARY KEY ("id")
);
