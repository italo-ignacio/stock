/*
  Warnings:

  - Added the required column `accountId` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Driver` ADD COLUMN `accountId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Driver` ADD CONSTRAINT `Driver_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
