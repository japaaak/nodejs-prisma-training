/*
  Warnings:

  - A unique constraint covering the columns `[id,id_deliveryman]` on the table `deliveries` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "deliveries_id_id_deliveryman_key" ON "deliveries"("id", "id_deliveryman");
