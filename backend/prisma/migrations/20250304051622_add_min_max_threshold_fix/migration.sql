/*
  Warnings:

  - You are about to drop the column `threshold` on the `Sensor` table. All the data in the column will be lost.
  - Added the required column `maxThreshold` to the `Sensor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minThreshold` to the `Sensor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Sensor` DROP COLUMN `threshold`,
    ADD COLUMN `maxThreshold` DOUBLE NOT NULL,
    ADD COLUMN `minThreshold` DOUBLE NOT NULL;
