-- CreateTable
CREATE TABLE `equipments` (
    `EquipmentID` INTEGER NOT NULL,
    `EquipmentName` VARCHAR(255) NOT NULL,
    `ServiceProvider` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `equipments_EquipmentID_key`(`EquipmentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
