-- CreateTable
CREATE TABLE "ReadingProgress" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "hoursRead" INTEGER NOT NULL,

    CONSTRAINT "ReadingProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReadingProgress_id_key" ON "ReadingProgress"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingProgress_bookId_month_key" ON "ReadingProgress"("bookId", "month");

-- AddForeignKey
ALTER TABLE "ReadingProgress" ADD CONSTRAINT "ReadingProgress_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
