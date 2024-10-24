-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'SUBSCRIPTION');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'FREE';
