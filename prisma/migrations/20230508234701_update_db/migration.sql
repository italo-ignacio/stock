/*
  Warnings:

  - Made the column `driverId` on table `cost` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vehicleFleetId` on table `vehicleFleetDriver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `driverId` on table `vehicleFleetDriver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `driverId` on table `work` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `cost` DROP FOREIGN KEY `cost_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `vehicleFleetDriver` DROP FOREIGN KEY `vehicleFleetDriver_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `vehicleFleetDriver` DROP FOREIGN KEY `vehicleFleetDriver_vehicleFleetId_fkey`;

-- DropForeignKey
ALTER TABLE `work` DROP FOREIGN KEY `work_driverId_fkey`;

-- AlterTable
ALTER TABLE `cost` MODIFY `driverId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `vehicleFleetDriver` MODIFY `vehicleFleetId` VARCHAR(191) NOT NULL,
    MODIFY `driverId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `work` MODIFY `driverId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `vehicleFleetDriver` ADD CONSTRAINT `vehicleFleetDriver_vehicleFleetId_fkey` FOREIGN KEY (`vehicleFleetId`) REFERENCES `vehicleFleet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicleFleetDriver` ADD CONSTRAINT `vehicleFleetDriver_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work` ADD CONSTRAINT `work_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cost` ADD CONSTRAINT `cost_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
