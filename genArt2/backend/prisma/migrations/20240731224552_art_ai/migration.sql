/*
  Warnings:

  - You are about to drop the `Art` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Warnsdorff` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ArtPeriod" AS ENUM ('HELLENISTIC', 'RENAISSANCE', 'BAROQUE', 'REALISM', 'VANGUARDISM');

-- DropForeignKey
ALTER TABLE "Art" DROP CONSTRAINT "Art_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Warnsdorff" DROP CONSTRAINT "Warnsdorff_creatorId_fkey";

-- DropTable
DROP TABLE "Art";

-- DropTable
DROP TABLE "Warnsdorff";

-- CreateTable
CREATE TABLE "Painting" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "prompt" TEXT NOT NULL,
    "negativePrompt" TEXT,
    "seed" INTEGER,
    "imageUrl" TEXT NOT NULL,
    "frameTexture" TEXT NOT NULL,
    "frameColor" TEXT,
    "roomId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Painting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "period" "ArtPeriod" NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Painting" ADD CONSTRAINT "Painting_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Painting" ADD CONSTRAINT "Painting_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
