/*
  Warnings:

  - The values [APPROVED] on the enum `cost_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [APPROVED] on the enum `cost_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `cost` MODIFY `status` ENUM('PENDING', 'FINISHED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `work` MODIFY `status` ENUM('PENDING', 'FINISHED') NOT NULL DEFAULT 'PENDING';
