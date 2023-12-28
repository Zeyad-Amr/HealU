-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `gender` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `ssn` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `insurancePersentage` DOUBLE NULL,
    `emergencyContact` VARCHAR(191) NULL,
    `specialization` VARCHAR(191) NULL,
    `clinicId` INTEGER NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_ssn_key`(`ssn`),
    UNIQUE INDEX `User_userName_key`(`userName`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE User MODIFY COLUMN userName  VARCHAR(191) CHARACTER SET utf8 COLLATE utf8_bin;
ALTER TABLE User MODIFY COLUMN password  VARCHAR(191) CHARACTER SET utf8 COLLATE utf8_bin;