/*
  Warnings:

  - Changed the type of `month` on the `ReadingProgress` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ReadingProgress" DROP COLUMN "month",
ADD COLUMN     "month" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ReadingProgress_bookId_month_key" ON "ReadingProgress"("bookId", "month");
