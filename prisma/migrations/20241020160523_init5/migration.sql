/*
  Warnings:

  - You are about to drop the column `hoursRead` on the `ReadingProgress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "rating" SET DEFAULT 2;

-- AlterTable
ALTER TABLE "ReadingProgress" DROP COLUMN "hoursRead",
ADD COLUMN     "completionPercentage" INTEGER NOT NULL DEFAULT 0;
