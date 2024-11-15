/*
  Warnings:

  - You are about to drop the `_BookPermissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookPermissions" DROP CONSTRAINT "_BookPermissions_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookPermissions" DROP CONSTRAINT "_BookPermissions_B_fkey";

-- DropTable
DROP TABLE "_BookPermissions";
