/*
  Warnings:

  - You are about to drop the column `canRead` on the `BookPermission` table. All the data in the column will be lost.
  - You are about to drop the column `canWrite` on the `BookPermission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookPermission" DROP COLUMN "canRead",
DROP COLUMN "canWrite";
