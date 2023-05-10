/*
  Warnings:

  - You are about to drop the column `decription` on the `cost` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `work` DROP FOREIGN KEY `work_driverId_fkey`;

-- AlterTable
ALTER TABLE `cost` DROP COLUMN `decription`,
    ADD COLUMN `description` TEXT NULL;

-- AlterTable
ALTER TABLE `work` MODIFY `driverId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `work` ADD CONSTRAINT `work_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
