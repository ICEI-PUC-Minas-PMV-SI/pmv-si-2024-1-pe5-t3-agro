/*
  Warnings:

  - Made the column `branchId` on table `animals` required. This step will fail if there are existing NULL values in that column.
  - Made the column `branchId` on table `rations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `branchId` on table `workers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "animals" DROP CONSTRAINT "animals_branchId_fkey";

-- DropForeignKey
ALTER TABLE "rations" DROP CONSTRAINT "rations_branchId_fkey";

-- DropForeignKey
ALTER TABLE "workers" DROP CONSTRAINT "workers_branchId_fkey";

-- AlterTable
ALTER TABLE "animals" ALTER COLUMN "branchId" SET NOT NULL;

-- AlterTable
ALTER TABLE "rations" ALTER COLUMN "branchId" SET NOT NULL;

-- AlterTable
ALTER TABLE "workers" ALTER COLUMN "branchId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "workers" ADD CONSTRAINT "workers_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animals" ADD CONSTRAINT "animals_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rations" ADD CONSTRAINT "rations_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
