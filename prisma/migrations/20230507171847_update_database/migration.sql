-- AlterTable
ALTER TABLE `Vehicle` ADD COLUMN `autoApproveCost` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `autoApproveWork` BOOLEAN NOT NULL DEFAULT false;
