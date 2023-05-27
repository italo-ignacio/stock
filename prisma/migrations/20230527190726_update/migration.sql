/*
  Warnings:

  - You are about to drop the column `status` on the `cost` table. All the data in the column will be lost.
  - You are about to drop the column `autoApproveCost` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `autoApproveCost` on the `vehicleFleet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cost` DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `vehicle` DROP COLUMN `autoApproveCost`;

-- AlterTable
ALTER TABLE `vehicleFleet` DROP COLUMN `autoApproveCost`;
