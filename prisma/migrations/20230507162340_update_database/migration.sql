/*
  Warnings:

  - You are about to drop the column `driverId` on the `CostByMonth` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `CostByMonth` table. All the data in the column will be lost.
  - You are about to drop the column `driverId` on the `Work` table. All the data in the column will be lost.
  - You are about to alter the column `distance` on the `Work` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `licensePlate` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CostByMonth` DROP FOREIGN KEY `CostByMonth_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `Work` DROP FOREIGN KEY `Work_driverId_fkey`;

-- AlterTable
ALTER TABLE `CostByMonth` DROP COLUMN `driverId`,
    DROP COLUMN `value`;

-- AlterTable
ALTER TABLE `Vehicle` ADD COLUMN `licensePlate` VARCHAR(12) NOT NULL;

-- AlterTable
ALTER TABLE `VehicleControl` ADD COLUMN `autoApproveCost` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `autoApproveWork` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Work` DROP COLUMN `driverId`,
    ADD COLUMN `status` ENUM('PENDING', 'APPROVED') NOT NULL DEFAULT 'PENDING',
    MODIFY `distance` DOUBLE NOT NULL;

-- CreateTable
CREATE TABLE `VehicleDriver` (
    `id` VARCHAR(191) NOT NULL,
    `driverId` VARCHAR(191) NOT NULL,
    `vehicleId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cost` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `value` DOUBLE NOT NULL,
    `decription` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'APPROVED') NOT NULL DEFAULT 'PENDING',
    `costByMonthId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VehicleDriver` ADD CONSTRAINT `VehicleDriver_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleDriver` ADD CONSTRAINT `VehicleDriver_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cost` ADD CONSTRAINT `Cost_costByMonthId_fkey` FOREIGN KEY (`costByMonthId`) REFERENCES `CostByMonth`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
