/*
  Warnings:

  - You are about to drop the column `vehicleControlId` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `VehicleDriver` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `VehicleDriver` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Driver` DROP FOREIGN KEY `Driver_vehicleControlId_fkey`;

-- DropIndex
DROP INDEX `Driver_email_key` ON `Driver`;

-- AlterTable
ALTER TABLE `Driver` DROP COLUMN `vehicleControlId`,
    ADD COLUMN `isDisable` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `VehicleDriver` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- CreateTable
CREATE TABLE `VehicleControlDriver` (
    `id` VARCHAR(191) NOT NULL,
    `vehicleControlId` VARCHAR(191) NULL,
    `driverId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VehicleControlDriver` ADD CONSTRAINT `VehicleControlDriver_vehicleControlId_fkey` FOREIGN KEY (`vehicleControlId`) REFERENCES `VehicleControl`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleControlDriver` ADD CONSTRAINT `VehicleControlDriver_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
