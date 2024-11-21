-- CreateTable
CREATE TABLE "BookPermission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "canRead" BOOLEAN NOT NULL DEFAULT false,
    "canWrite" BOOLEAN NOT NULL DEFAULT false,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BookPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookPermissions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BookPermission_id_key" ON "BookPermission"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BookPermission_userId_bookId_key" ON "BookPermission"("userId", "bookId");

-- CreateIndex
CREATE UNIQUE INDEX "_BookPermissions_AB_unique" ON "_BookPermissions"("A", "B");

-- CreateIndex
CREATE INDEX "_BookPermissions_B_index" ON "_BookPermissions"("B");

-- AddForeignKey
ALTER TABLE "BookPermission" ADD CONSTRAINT "BookPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookPermission" ADD CONSTRAINT "BookPermission_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookPermissions" ADD CONSTRAINT "_BookPermissions_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookPermissions" ADD CONSTRAINT "_BookPermissions_B_fkey" FOREIGN KEY ("B") REFERENCES "BookPermission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
