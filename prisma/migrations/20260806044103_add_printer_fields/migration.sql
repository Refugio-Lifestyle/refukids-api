/*
  Warnings:

  - You are about to drop the column `ip` on the `Impressora` table. All the data in the column will be lost.
  - Added the required column `mac` to the `Impressora` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelo` to the `Impressora` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Impressora` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Impressora" DROP COLUMN "ip",
ADD COLUMN     "mac" TEXT NOT NULL,
ADD COLUMN     "modelo" TEXT NOT NULL,
ADD COLUMN     "tipo" TEXT NOT NULL,
ADD COLUMN     "ultimaConexaoEm" TIMESTAMP(3);
