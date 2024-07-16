-- AlterTable
ALTER TABLE "establishments" ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "schedule_days" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "schedule_hours" DROP NOT NULL,
ALTER COLUMN "observations" DROP NOT NULL;
