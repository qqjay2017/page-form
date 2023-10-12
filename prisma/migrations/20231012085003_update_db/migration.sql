/*
  Warnings:

  - You are about to drop the column `submited` on the `Form` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "submited",
ADD COLUMN     "submissions" INTEGER NOT NULL DEFAULT 0;
