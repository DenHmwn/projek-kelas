-- CreateTable
CREATE TABLE "public"."tb_barang" (
    "id" SERIAL NOT NULL,
    "kode" VARCHAR(10) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "harga" INTEGER NOT NULL,

    CONSTRAINT "tb_barang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_barang_kode_key" ON "public"."tb_barang"("kode");
