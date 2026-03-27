/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `threads` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "threads_title_key" ON "threads"("title");
