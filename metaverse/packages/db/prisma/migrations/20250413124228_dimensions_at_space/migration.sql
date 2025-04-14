/*
  Warnings:

  - You are about to drop the column `height` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Space` table. All the data in the column will be lost.
  - Added the required column `dimesions` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Space" DROP COLUMN "height",
DROP COLUMN "width",
ADD COLUMN     "dimesions" TEXT NOT NULL;
