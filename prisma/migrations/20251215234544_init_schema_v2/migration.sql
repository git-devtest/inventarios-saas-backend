/*
  Warnings:

  - You are about to drop the column `estado` on the `empresas` table. All the data in the column will be lost.
  - You are about to drop the column `nit` on the `empresas` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_actualizacion` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `apellido` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `usuarios` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identificacion_fiscal]` on the table `empresas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identificacion_fiscal` to the `empresas` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "empresas_nit_key";

-- AlterTable
ALTER TABLE "empresas" DROP COLUMN "estado",
DROP COLUMN "nit",
ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "identificacion_fiscal" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "estado",
DROP COLUMN "fecha_actualizacion";

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "apellido",
DROP COLUMN "estado",
ADD COLUMN     "activo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "ultimo_acceso" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "almacenes" (
    "id" TEXT NOT NULL,
    "empresa_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "direccion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3),

    CONSTRAINT "almacenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ubicaciones" (
    "id" TEXT NOT NULL,
    "almacen_id" TEXT NOT NULL,
    "ubicacion_padre_id" TEXT,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL DEFAULT 1,
    "ruta_completa" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3),

    CONSTRAINT "ubicaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidades_medida" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "abreviatura" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "unidades_medida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos" (
    "id" TEXT NOT NULL,
    "empresa_id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "campos_personalizados" JSONB,
    "requiere_lote" BOOLEAN NOT NULL DEFAULT false,
    "requiere_serie" BOOLEAN NOT NULL DEFAULT false,
    "dias_vencimiento" INTEGER,
    "permite_stock_negativo" BOOLEAN NOT NULL DEFAULT false,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3),

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producto_unidad_medida" (
    "id" TEXT NOT NULL,
    "producto_id" TEXT NOT NULL,
    "unidad_medida_id" TEXT NOT NULL,
    "factor_conversion" DECIMAL(12,4) NOT NULL,
    "es_principal" BOOLEAN NOT NULL DEFAULT false,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "producto_unidad_medida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producto_almacen" (
    "id" TEXT NOT NULL,
    "producto_id" TEXT NOT NULL,
    "almacen_id" TEXT NOT NULL,
    "ubicacion_id" TEXT,
    "stock_minimo" DECIMAL(14,4) NOT NULL DEFAULT 0,
    "stock_maximo" DECIMAL(14,4),
    "punto_reorden" DECIMAL(14,4),
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3),

    CONSTRAINT "producto_almacen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lotes" (
    "id" TEXT NOT NULL,
    "producto_id" TEXT NOT NULL,
    "codigo_lote" TEXT NOT NULL,
    "fecha_fabricacion" TIMESTAMP(3),
    "fecha_vencimiento" TIMESTAMP(3),
    "proveedor" TEXT,
    "observaciones" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos_movimiento" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "afecta_stock" INTEGER NOT NULL,
    "requiere_destino" BOOLEAN NOT NULL DEFAULT false,
    "empresa_id" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "es_sistema" BOOLEAN NOT NULL DEFAULT false,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tipos_movimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movimientos_inventario" (
    "id" TEXT NOT NULL,
    "empresa_id" TEXT NOT NULL,
    "tipo_movimiento_id" TEXT NOT NULL,
    "almacen_origen_id" TEXT NOT NULL,
    "ubicacion_origen_id" TEXT,
    "almacen_destino_id" TEXT,
    "ubicacion_destino_id" TEXT,
    "fecha_movimiento" TIMESTAMP(3) NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'borrador',
    "fecha_confirmacion" TIMESTAMP(3),
    "usuario_confirmacion_id" TEXT,
    "observacion" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3),

    CONSTRAINT "movimientos_inventario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalles_movimiento" (
    "id" TEXT NOT NULL,
    "movimiento_id" TEXT NOT NULL,
    "producto_id" TEXT NOT NULL,
    "producto_unidad_medida_id" TEXT NOT NULL,
    "cantidad" DECIMAL(14,4) NOT NULL,
    "lote" TEXT,
    "serie" TEXT,
    "observacion_detalle" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "detalles_movimiento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "almacenes_empresa_id_codigo_key" ON "almacenes"("empresa_id", "codigo");

-- CreateIndex
CREATE UNIQUE INDEX "ubicaciones_almacen_id_codigo_key" ON "ubicaciones"("almacen_id", "codigo");

-- CreateIndex
CREATE UNIQUE INDEX "unidades_medida_nombre_key" ON "unidades_medida"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "unidades_medida_abreviatura_key" ON "unidades_medida"("abreviatura");

-- CreateIndex
CREATE UNIQUE INDEX "productos_empresa_id_codigo_key" ON "productos"("empresa_id", "codigo");

-- CreateIndex
CREATE UNIQUE INDEX "producto_unidad_medida_producto_id_unidad_medida_id_key" ON "producto_unidad_medida"("producto_id", "unidad_medida_id");

-- CreateIndex
CREATE UNIQUE INDEX "producto_almacen_producto_id_almacen_id_ubicacion_id_key" ON "producto_almacen"("producto_id", "almacen_id", "ubicacion_id");

-- CreateIndex
CREATE UNIQUE INDEX "lotes_producto_id_codigo_lote_key" ON "lotes"("producto_id", "codigo_lote");

-- CreateIndex
CREATE UNIQUE INDEX "tipos_movimiento_codigo_empresa_id_key" ON "tipos_movimiento"("codigo", "empresa_id");

-- CreateIndex
CREATE UNIQUE INDEX "empresas_identificacion_fiscal_key" ON "empresas"("identificacion_fiscal");

-- AddForeignKey
ALTER TABLE "almacenes" ADD CONSTRAINT "almacenes_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ubicaciones" ADD CONSTRAINT "ubicaciones_almacen_id_fkey" FOREIGN KEY ("almacen_id") REFERENCES "almacenes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ubicaciones" ADD CONSTRAINT "ubicaciones_ubicacion_padre_id_fkey" FOREIGN KEY ("ubicacion_padre_id") REFERENCES "ubicaciones"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto_unidad_medida" ADD CONSTRAINT "producto_unidad_medida_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto_unidad_medida" ADD CONSTRAINT "producto_unidad_medida_unidad_medida_id_fkey" FOREIGN KEY ("unidad_medida_id") REFERENCES "unidades_medida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto_almacen" ADD CONSTRAINT "producto_almacen_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto_almacen" ADD CONSTRAINT "producto_almacen_almacen_id_fkey" FOREIGN KEY ("almacen_id") REFERENCES "almacenes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto_almacen" ADD CONSTRAINT "producto_almacen_ubicacion_id_fkey" FOREIGN KEY ("ubicacion_id") REFERENCES "ubicaciones"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lotes" ADD CONSTRAINT "lotes_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tipos_movimiento" ADD CONSTRAINT "tipos_movimiento_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimientos_inventario" ADD CONSTRAINT "movimientos_inventario_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimientos_inventario" ADD CONSTRAINT "movimientos_inventario_tipo_movimiento_id_fkey" FOREIGN KEY ("tipo_movimiento_id") REFERENCES "tipos_movimiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimientos_inventario" ADD CONSTRAINT "movimientos_inventario_almacen_origen_id_fkey" FOREIGN KEY ("almacen_origen_id") REFERENCES "almacenes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimientos_inventario" ADD CONSTRAINT "movimientos_inventario_ubicacion_origen_id_fkey" FOREIGN KEY ("ubicacion_origen_id") REFERENCES "ubicaciones"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimientos_inventario" ADD CONSTRAINT "movimientos_inventario_almacen_destino_id_fkey" FOREIGN KEY ("almacen_destino_id") REFERENCES "almacenes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimientos_inventario" ADD CONSTRAINT "movimientos_inventario_ubicacion_destino_id_fkey" FOREIGN KEY ("ubicacion_destino_id") REFERENCES "ubicaciones"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimientos_inventario" ADD CONSTRAINT "movimientos_inventario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimientos_inventario" ADD CONSTRAINT "movimientos_inventario_usuario_confirmacion_id_fkey" FOREIGN KEY ("usuario_confirmacion_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalles_movimiento" ADD CONSTRAINT "detalles_movimiento_movimiento_id_fkey" FOREIGN KEY ("movimiento_id") REFERENCES "movimientos_inventario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalles_movimiento" ADD CONSTRAINT "detalles_movimiento_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalles_movimiento" ADD CONSTRAINT "detalles_movimiento_producto_unidad_medida_id_fkey" FOREIGN KEY ("producto_unidad_medida_id") REFERENCES "producto_unidad_medida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
