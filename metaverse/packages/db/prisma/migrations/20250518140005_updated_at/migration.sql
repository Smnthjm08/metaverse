/*
  Warnings:

  - Added the required column `updatedAt` to the `Sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sessions" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
