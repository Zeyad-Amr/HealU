/*
  Warnings:

  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userName` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `userName` VARCHAR(191) NOT NULL;
