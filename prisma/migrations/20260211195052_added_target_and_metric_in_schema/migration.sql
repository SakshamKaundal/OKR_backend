-- AlterTable
ALTER TABLE "KeyResult" ADD COLUMN     "metric" TEXT DEFAULT '%',
ADD COLUMN     "target" INTEGER NOT NULL DEFAULT 100;
