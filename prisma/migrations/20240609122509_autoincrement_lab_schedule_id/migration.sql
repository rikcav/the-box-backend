-- AlterTable
CREATE SEQUENCE lab_schedule_id_seq;
ALTER TABLE "lab_schedule" ALTER COLUMN "id" SET DEFAULT nextval('lab_schedule_id_seq');
ALTER SEQUENCE lab_schedule_id_seq OWNED BY "lab_schedule"."id";
