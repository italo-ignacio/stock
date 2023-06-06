/*
  Warnings:

  - You are about to drop the column `maxVehicleFleet` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleFleetId` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the `vehicleFleet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehicleFleetDriver` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fleetId` to the `vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `vehicle` DROP FOREIGN KEY `vehicle_vehicleFleetId_fkey`;

-- DropForeignKey
ALTER TABLE `vehicleFleet` DROP FOREIGN KEY `vehicleFleet_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `vehicleFleetDriver` DROP FOREIGN KEY `vehicleFleetDriver_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `vehicleFleetDriver` DROP FOREIGN KEY `vehicleFleetDriver_vehicleFleetId_fkey`;

-- AlterTable
ALTER TABLE `account` DROP COLUMN `maxVehicleFleet`,
    ADD COLUMN `maxFleet` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `vehicle` DROP COLUMN `vehicleFleetId`,
    ADD COLUMN `fleetId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `vehicleFleet`;

-- DropTable
DROP TABLE `vehicleFleetDriver`;

-- CreateTable
CREATE TABLE `fleet` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `accountId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fleetDriver` (
    `id` VARCHAR(191) NOT NULL,
    `fleetId` VARCHAR(191) NOT NULL,
    `driverId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `fleet` ADD CONSTRAINT `fleet_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fleetDriver` ADD CONSTRAINT `fleetDriver_fleetId_fkey` FOREIGN KEY (`fleetId`) REFERENCES `fleet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fleetDriver` ADD CONSTRAINT `fleetDriver_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicle` ADD CONSTRAINT `vehicle_fleetId_fkey` FOREIGN KEY (`fleetId`) REFERENCES `fleet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
