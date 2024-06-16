/*
  Warnings:

  - Added the required column `amount` to the `rations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "animals" ADD COLUMN     "minRationAmount" DOUBLE PRECISION NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "rations" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;
