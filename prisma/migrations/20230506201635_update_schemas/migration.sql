/*
  Warnings:

  - Made the column `costByYearId` on table `CostByMonth` required. This step will fail if there are existing NULL values in that column.
  - Made the column `driverId` on table `CostByMonth` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vehicleId` on table `CostByYear` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accountId` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vehicleControlId` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accountId` on table `VehicleControl` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vehicleId` on table `Work` required. This step will fail if there are existing NULL values in that column.
  - Made the column `driverId` on table `Work` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `CostByMonth` DROP FOREIGN KEY `CostByMonth_costByYearId_fkey`;

-- DropForeignKey
ALTER TABLE `CostByMonth` DROP FOREIGN KEY `CostByMonth_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `CostByYear` DROP FOREIGN KEY `CostByYear_vehicleId_fkey`;

-- DropForeignKey
ALTER TABLE `Driver` DROP FOREIGN KEY `Driver_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `Vehicle` DROP FOREIGN KEY `Vehicle_vehicleControlId_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleControl` DROP FOREIGN KEY `VehicleControl_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `Work` DROP FOREIGN KEY `Work_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `Work` DROP FOREIGN KEY `Work_vehicleId_fkey`;

-- AlterTable
ALTER TABLE `CostByMonth` MODIFY `costByYearId` VARCHAR(191) NOT NULL,
    MODIFY `driverId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `CostByYear` MODIFY `vehicleId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Driver` MODIFY `accountId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Vehicle` MODIFY `vehicleControlId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `VehicleControl` MODIFY `accountId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Work` MODIFY `vehicleId` VARCHAR(191) NOT NULL,
    MODIFY `driverId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Driver` ADD CONSTRAINT `Driver_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleControl` ADD CONSTRAINT `VehicleControl_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehicle` ADD CONSTRAINT `Vehicle_vehicleControlId_fkey` FOREIGN KEY (`vehicleControlId`) REFERENCES `VehicleControl`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work` ADD CONSTRAINT `Work_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work` ADD CONSTRAINT `Work_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CostByYear` ADD CONSTRAINT `CostByYear_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CostByMonth` ADD CONSTRAINT `CostByMonth_costByYearId_fkey` FOREIGN KEY (`costByYearId`) REFERENCES `CostByYear`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CostByMonth` ADD CONSTRAINT `CostByMonth_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
