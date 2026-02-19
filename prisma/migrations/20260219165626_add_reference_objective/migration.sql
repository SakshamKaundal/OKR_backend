/*
  Warnings:

  - The primary key for the `OkrEmbedding` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[objectiveId]` on the table `OkrEmbedding` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `objectiveId` to the `OkrEmbedding` table without a default value. This is not possible if the table is not empty.
  - Made the column `embedding` on table `OkrEmbedding` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OkrEmbedding" DROP CONSTRAINT "OkrEmbedding_pkey",
ADD COLUMN     "objectiveId" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "embedding" SET NOT NULL,
ADD CONSTRAINT "OkrEmbedding_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "OkrEmbedding_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "OkrEmbedding_objectiveId_key" ON "OkrEmbedding"("objectiveId");

-- AddForeignKey
ALTER TABLE "OkrEmbedding" ADD CONSTRAINT "OkrEmbedding_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "Objective"("id") ON DELETE CASCADE ON UPDATE CASCADE;
