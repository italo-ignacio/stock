-- AlterTable
ALTER TABLE `Account` MODIFY `refreshToken` VARCHAR(191) NULL,
    MODIFY `refreshTokenExpiresAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Driver` MODIFY `refreshToken` VARCHAR(191) NULL,
    MODIFY `refreshTokenExpiresAt` DATETIME(3) NULL;
