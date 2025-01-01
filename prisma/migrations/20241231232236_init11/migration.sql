-- AlterTable
ALTER TABLE "User" ADD COLUMN     "picture" TEXT;

-- AlterTable
ALTER TABLE "_UserBooks" ADD CONSTRAINT "_UserBooks_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_UserBooks_AB_unique";
