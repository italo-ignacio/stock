-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "plan" TEXT NOT NULL DEFAULT 'FREE',
    "startLocations" TEXT,
    "maxDriver" INTEGER NOT NULL DEFAULT 7,
    "maxFleet" INTEGER NOT NULL DEFAULT 1,
    "maxVehicle" INTEGER NOT NULL DEFAULT 7,
    "refreshToken" TEXT,
    "refreshTokenExpiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cnpj" TEXT,
    "locations" TEXT,
    "accountId" TEXT NOT NULL,
    "isDisable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "client_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "fleet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "fleet_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "driver" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isDisable" BOOLEAN NOT NULL DEFAULT false,
    "accountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "refreshTokenExpiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "driver_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "fleetDriver" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fleetId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    CONSTRAINT "fleetDriver_fleetId_fkey" FOREIGN KEY ("fleetId") REFERENCES "fleet" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "fleetDriver_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "driver" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT,
    "fleetId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "vehicle_fleetId_fkey" FOREIGN KEY ("fleetId") REFERENCES "fleet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "vehicleDriver" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "driverId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    CONSTRAINT "vehicleDriver_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "driver" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "vehicleDriver_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "work" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "match" TEXT,
    "destiny" TEXT,
    "distance" REAL NOT NULL,
    "profit" REAL NOT NULL,
    "extra" REAL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "driverId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "work_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "driver" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "work_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "work_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "driverId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "cost_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "driver" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cost_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "account_email_key" ON "account"("email");
