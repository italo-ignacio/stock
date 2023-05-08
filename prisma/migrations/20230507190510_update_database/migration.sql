/*
  Warnings:

  - You are about to drop the column `total` on the `CostByMonth` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `CostByMonth` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `Driver` table. All the data in the column will be lost.
  - Added the required column `vehicleControlId` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Driver` DROP FOREIGN KEY `Driver_accountId_fkey`;

-- AlterTable
ALTER TABLE `Cost` ADD COLUMN `driverId` VARCHAR(191) NULL,
    ADD COLUMN `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `CostByMonth` DROP COLUMN `total`,
    DROP COLUMN `type`;

-- AlterTable
ALTER TABLE `Driver` DROP COLUMN `accountId`,
    ADD COLUMN `vehicleControlId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Work` ADD COLUMN `driverId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Driver` ADD CONSTRAINT `Driver_vehicleControlId_fkey` FOREIGN KEY (`vehicleControlId`) REFERENCES `VehicleControl`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work` ADD CONSTRAINT `Work_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cost` ADD CONSTRAINT `Cost_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
