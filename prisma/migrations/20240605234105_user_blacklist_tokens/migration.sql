-- AlterTable
ALTER TABLE "users" ADD COLUMN     "blacklistTokens" TEXT[] DEFAULT ARRAY[]::TEXT[];
