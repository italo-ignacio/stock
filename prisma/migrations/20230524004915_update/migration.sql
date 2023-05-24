/*
  Warnings:

  - Added the required column `profit` to the `work` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cost` DROP FOREIGN KEY `cost_costByMonthId_fkey`;

-- DropForeignKey
ALTER TABLE `cost` DROP FOREIGN KEY `cost_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `costByMonth` DROP FOREIGN KEY `costByMonth_costByYearId_fkey`;

-- DropForeignKey
ALTER TABLE `costByYear` DROP FOREIGN KEY `costByYear_vehicleId_fkey`;

-- DropForeignKey
ALTER TABLE `driver` DROP FOREIGN KEY `driver_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `vehicle` DROP FOREIGN KEY `vehicle_vehicleFleetId_fkey`;

-- DropForeignKey
ALTER TABLE `vehicleDriver` DROP FOREIGN KEY `vehicleDriver_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `vehicleDriver` DROP FOREIGN KEY `vehicleDriver_vehicleId_fkey`;

-- DropForeignKey
ALTER TABLE `vehicleFleet` DROP FOREIGN KEY `vehicleFleet_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `vehicleFleetDriver` DROP FOREIGN KEY `vehicleFleetDriver_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `vehicleFleetDriver` DROP FOREIGN KEY `vehicleFleetDriver_vehicleFleetId_fkey`;

-- DropForeignKey
ALTER TABLE `work` DROP FOREIGN KEY `work_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `work` DROP FOREIGN KEY `work_vehicleId_fkey`;

-- AlterTable
ALTER TABLE `work` ADD COLUMN `extra` DOUBLE NULL,
    ADD COLUMN `profit` DOUBLE NOT NULL;

-- AddForeignKey
ALTER TABLE `vehicleFleet` ADD CONSTRAINT `vehicleFleet_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `driver` ADD CONSTRAINT `driver_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicleFleetDriver` ADD CONSTRAINT `vehicleFleetDriver_vehicleFleetId_fkey` FOREIGN KEY (`vehicleFleetId`) REFERENCES `vehicleFleet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicleFleetDriver` ADD CONSTRAINT `vehicleFleetDriver_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicle` ADD CONSTRAINT `vehicle_vehicleFleetId_fkey` FOREIGN KEY (`vehicleFleetId`) REFERENCES `vehicleFleet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicleDriver` ADD CONSTRAINT `vehicleDriver_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicleDriver` ADD CONSTRAINT `vehicleDriver_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work` ADD CONSTRAINT `work_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work` ADD CONSTRAINT `work_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `costByYear` ADD CONSTRAINT `costByYear_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `costByMonth` ADD CONSTRAINT `costByMonth_costByYearId_fkey` FOREIGN KEY (`costByYearId`) REFERENCES `costByYear`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cost` ADD CONSTRAINT `cost_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cost` ADD CONSTRAINT `cost_costByMonthId_fkey` FOREIGN KEY (`costByMonthId`) REFERENCES `costByMonth`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
