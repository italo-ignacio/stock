/*
  Warnings:

  - Added the required column `refreshToken` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshTokenExpiresAt` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshTokenExpiresAt` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Account` ADD COLUMN `refreshToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `refreshTokenExpiresAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Driver` ADD COLUMN `refreshToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `refreshTokenExpiresAt` DATETIME(3) NOT NULL;
