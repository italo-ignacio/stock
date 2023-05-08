/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CostByMonth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CostByYear` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Driver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VehicleControl` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VehicleControlDriver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VehicleDriver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Work` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Cost` DROP FOREIGN KEY `Cost_costByMonthId_fkey`;

-- DropForeignKey
ALTER TABLE `Cost` DROP FOREIGN KEY `Cost_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `CostByMonth` DROP FOREIGN KEY `CostByMonth_costByYearId_fkey`;

-- DropForeignKey
ALTER TABLE `CostByYear` DROP FOREIGN KEY `CostByYear_vehicleId_fkey`;

-- DropForeignKey
ALTER TABLE `Driver` DROP FOREIGN KEY `Driver_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `Vehicle` DROP FOREIGN KEY `Vehicle_vehicleControlId_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleControl` DROP FOREIGN KEY `VehicleControl_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleControlDriver` DROP FOREIGN KEY `VehicleControlDriver_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleControlDriver` DROP FOREIGN KEY `VehicleControlDriver_vehicleControlId_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleDriver` DROP FOREIGN KEY `VehicleDriver_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `VehicleDriver` DROP FOREIGN KEY `VehicleDriver_vehicleId_fkey`;

-- DropForeignKey
ALTER TABLE `Work` DROP FOREIGN KEY `Work_driverId_fkey`;

-- DropForeignKey
ALTER TABLE `Work` DROP FOREIGN KEY `Work_vehicleId_fkey`;

-- DropTable
DROP TABLE `Account`;

-- DropTable
DROP TABLE `Cost`;

-- DropTable
DROP TABLE `CostByMonth`;

-- DropTable
DROP TABLE `CostByYear`;

-- DropTable
DROP TABLE `Driver`;

-- DropTable
DROP TABLE `Vehicle`;

-- DropTable
DROP TABLE `VehicleControl`;

-- DropTable
DROP TABLE `VehicleControlDriver`;

-- DropTable
DROP TABLE `VehicleDriver`;

-- DropTable
DROP TABLE `Work`;

-- CreateTable
CREATE TABLE `account` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `plan` ENUM('FREE', 'BASIC', 'ADVANCED') NOT NULL DEFAULT 'FREE',
    `refreshToken` VARCHAR(191) NULL,
    `refreshTokenExpiresAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `account_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicleFleet` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `autoApproveWork` BOOLEAN NOT NULL DEFAULT false,
    `autoApproveCost` BOOLEAN NOT NULL DEFAULT false,
    `accountId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `driver` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `isDisable` BOOLEAN NOT NULL DEFAULT false,
    `accountId` VARCHAR(191) NOT NULL,
    `refreshToken` VARCHAR(191) NULL,
    `refreshTokenExpiresAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicleFleetDriver` (
    `id` VARCHAR(191) NOT NULL,
    `vehicleFleetId` VARCHAR(191) NULL,
    `driverId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicle` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `licensePlate` VARCHAR(12) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `autoApproveWork` BOOLEAN NOT NULL DEFAULT false,
    `autoApproveCost` BOOLEAN NOT NULL DEFAULT false,
    `vehicleFleetId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicleDriver` (
    `id` VARCHAR(191) NOT NULL,
    `driverId` VARCHAR(191) NOT NULL,
    `vehicleId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `work` (
    `id` VARCHAR(191) NOT NULL,
    `match` VARCHAR(191) NOT NULL,
    `destiny` VARCHAR(191) NOT NULL,
    `distance` DOUBLE NOT NULL,
    `driverId` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'APPROVED') NOT NULL DEFAULT 'PENDING',
    `vehicleId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `costByYear` (
    `id` VARCHAR(191) NOT NULL,
    `year` VARCHAR(4) NOT NULL,
    `vehicleId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `costByMonth` (
    `id` VARCHAR(191) NOT NULL,
    `month` ENUM('JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER') NOT NULL,
    `costByYearId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cost` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `value` DOUBLE NOT NULL,
    `decription` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `driverId` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'APPROVED') NOT NULL DEFAULT 'PENDING',
    `costByMonthId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vehicleFleet` ADD CONSTRAINT `vehicleFleet_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `driver` ADD CONSTRAINT `driver_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicleFleetDriver` ADD CONSTRAINT `vehicleFleetDriver_vehicleFleetId_fkey` FOREIGN KEY (`vehicleFleetId`) REFERENCES `vehicleFleet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicleFleetDriver` ADD CONSTRAINT `vehicleFleetDriver_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicle` ADD CONSTRAINT `vehicle_vehicleFleetId_fkey` FOREIGN KEY (`vehicleFleetId`) REFERENCES `vehicleFleet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicleDriver` ADD CONSTRAINT `vehicleDriver_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicleDriver` ADD CONSTRAINT `vehicleDriver_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work` ADD CONSTRAINT `work_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work` ADD CONSTRAINT `work_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `costByYear` ADD CONSTRAINT `costByYear_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `costByMonth` ADD CONSTRAINT `costByMonth_costByYearId_fkey` FOREIGN KEY (`costByYearId`) REFERENCES `costByYear`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cost` ADD CONSTRAINT `cost_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cost` ADD CONSTRAINT `cost_costByMonthId_fkey` FOREIGN KEY (`costByMonthId`) REFERENCES `costByMonth`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
