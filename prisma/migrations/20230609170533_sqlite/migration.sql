/*
  Warnings:

  - You are about to alter the column `startLocations` on the `account` table. The data in that column could be lost. The data in that column will be cast from `String` to `Unsupported("JSON")`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "plan" TEXT NOT NULL DEFAULT 'FREE',
    "startLocations" JSON,
    "maxDriver" INTEGER NOT NULL DEFAULT 7,
    "maxFleet" INTEGER NOT NULL DEFAULT 1,
    "maxVehicle" INTEGER NOT NULL DEFAULT 7,
    "refreshToken" TEXT,
    "refreshTokenExpiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_account" ("createdAt", "email", "id", "maxDriver", "maxFleet", "maxVehicle", "name", "password", "plan", "refreshToken", "refreshTokenExpiresAt", "startLocations", "updatedAt") SELECT "createdAt", "email", "id", "maxDriver", "maxFleet", "maxVehicle", "name", "password", "plan", "refreshToken", "refreshTokenExpiresAt", "startLocations", "updatedAt" FROM "account";
DROP TABLE "account";
ALTER TABLE "new_account" RENAME TO "account";
CREATE UNIQUE INDEX "account_email_key" ON "account"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
