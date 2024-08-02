/*
  Warnings:

  - You are about to drop the column `userId` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `AuctionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `BidList` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Watchlist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userEmail,productId]` on the table `Watchlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `AuctionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `BidList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Watchlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Auction" DROP CONSTRAINT "Auction_userId_fkey";

-- DropForeignKey
ALTER TABLE "AuctionHistory" DROP CONSTRAINT "AuctionHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "BidList" DROP CONSTRAINT "BidList_userId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Watchlist" DROP CONSTRAINT "Watchlist_userId_fkey";

-- DropIndex
DROP INDEX "Auction_userId_idx";

-- DropIndex
DROP INDEX "AuctionHistory_userId_idx";

-- DropIndex
DROP INDEX "BidList_userId_idx";

-- DropIndex
DROP INDEX "Profile_userId_key";

-- DropIndex
DROP INDEX "Watchlist_userId_productId_key";

-- AlterTable
ALTER TABLE "Auction" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AuctionHistory" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BidList" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Watchlist" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Auction_userEmail_idx" ON "Auction"("userEmail");

-- CreateIndex
CREATE INDEX "AuctionHistory_userEmail_idx" ON "AuctionHistory"("userEmail");

-- CreateIndex
CREATE INDEX "BidList_userEmail_idx" ON "BidList"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userEmail_key" ON "Profile"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist_userEmail_productId_key" ON "Watchlist"("userEmail", "productId");

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionHistory" ADD CONSTRAINT "AuctionHistory_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BidList" ADD CONSTRAINT "BidList_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
