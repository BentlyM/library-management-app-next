/*
  Warnings:

  - You are about to drop the `BookPermission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookPermission" DROP CONSTRAINT "BookPermission_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BookPermission" DROP CONSTRAINT "BookPermission_userId_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "BookPermission";
