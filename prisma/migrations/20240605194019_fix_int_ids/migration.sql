-- AlterTable
CREATE SEQUENCE disciplines_id_seq;
ALTER TABLE "disciplines" ALTER COLUMN "id" SET DEFAULT nextval('disciplines_id_seq');
ALTER SEQUENCE disciplines_id_seq OWNED BY "disciplines"."id";

-- AlterTable
CREATE SEQUENCE lab_schedule_id_seq;
ALTER TABLE "lab_schedule" ALTER COLUMN "id" SET DEFAULT nextval('lab_schedule_id_seq');
ALTER SEQUENCE lab_schedule_id_seq OWNED BY "lab_schedule"."id";

-- AlterTable
CREATE SEQUENCE post_id_seq;
ALTER TABLE "post" ALTER COLUMN "id" SET DEFAULT nextval('post_id_seq');
ALTER SEQUENCE post_id_seq OWNED BY "post"."id";
