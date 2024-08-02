/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `AuctionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `BidList` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Watchlist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userUsername]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userUsername,productId]` on the table `Watchlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userUsername` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userUsername` to the `AuctionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userUsername` to the `BidList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdByUsername` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userUsername` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userUsername` to the `Watchlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Auction" DROP CONSTRAINT "Auction_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "AuctionHistory" DROP CONSTRAINT "AuctionHistory_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "BidList" DROP CONSTRAINT "BidList_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "Watchlist" DROP CONSTRAINT "Watchlist_userEmail_fkey";

-- DropIndex
DROP INDEX "Auction_userEmail_idx";

-- DropIndex
DROP INDEX "AuctionHistory_userEmail_idx";

-- DropIndex
DROP INDEX "BidList_userEmail_idx";

-- DropIndex
DROP INDEX "Profile_userEmail_key";

-- DropIndex
DROP INDEX "Watchlist_userEmail_productId_key";

-- AlterTable
ALTER TABLE "Auction" DROP COLUMN "userEmail",
ADD COLUMN     "userUsername" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AuctionHistory" DROP COLUMN "userEmail",
ADD COLUMN     "userUsername" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BidList" DROP COLUMN "userEmail",
ADD COLUMN     "userUsername" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "createdByUsername" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "userEmail",
ADD COLUMN     "userUsername" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Watchlist" DROP COLUMN "userEmail",
ADD COLUMN     "userUsername" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Auction_userUsername_idx" ON "Auction"("userUsername");

-- CreateIndex
CREATE INDEX "AuctionHistory_userUsername_idx" ON "AuctionHistory"("userUsername");

-- CreateIndex
CREATE INDEX "BidList_userUsername_idx" ON "BidList"("userUsername");

-- CreateIndex
CREATE INDEX "Products_createdByUsername_idx" ON "Products"("createdByUsername");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userUsername_key" ON "Profile"("userUsername");

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist_userUsername_productId_key" ON "Watchlist"("userUsername", "productId");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_createdByUsername_fkey" FOREIGN KEY ("createdByUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_userUsername_fkey" FOREIGN KEY ("userUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userUsername_fkey" FOREIGN KEY ("userUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionHistory" ADD CONSTRAINT "AuctionHistory_userUsername_fkey" FOREIGN KEY ("userUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BidList" ADD CONSTRAINT "BidList_userUsername_fkey" FOREIGN KEY ("userUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_userUsername_fkey" FOREIGN KEY ("userUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
