/*
  Warnings:

  - You are about to drop the column `costByMonthId` on the `cost` table. All the data in the column will be lost.
  - You are about to drop the column `autoApproveWork` on the `vehicle` table. All the data in the column will be lost.
  - You are about to alter the column `type` on the `vehicle` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to drop the column `autoApproveWork` on the `vehicleFleet` table. All the data in the column will be lost.
  - You are about to drop the `costByMonth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `costByYear` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `vehicleId` to the `cost` table without a default value. This is not possible if the table is not empty.
  - Made the column `driverId` on table `work` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `cost` DROP FOREIGN KEY `cost_costByMonthId_fkey`;

-- DropForeignKey
ALTER TABLE `costByMonth` DROP FOREIGN KEY `costByMonth_costByYearId_fkey`;

-- DropForeignKey
ALTER TABLE `costByYear` DROP FOREIGN KEY `costByYear_vehicleId_fkey`;

-- DropForeignKey
ALTER TABLE `work` DROP FOREIGN KEY `work_driverId_fkey`;

-- AlterTable
ALTER TABLE `cost` DROP COLUMN `costByMonthId`,
    ADD COLUMN `vehicleId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `vehicle` DROP COLUMN `autoApproveWork`,
    MODIFY `licensePlate` VARCHAR(100) NOT NULL,
    MODIFY `type` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `vehicleFleet` DROP COLUMN `autoApproveWork`;

-- AlterTable
ALTER TABLE `work` MODIFY `driverId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `costByMonth`;

-- DropTable
DROP TABLE `costByYear`;

-- AddForeignKey
ALTER TABLE `work` ADD CONSTRAINT `work_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cost` ADD CONSTRAINT `cost_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
