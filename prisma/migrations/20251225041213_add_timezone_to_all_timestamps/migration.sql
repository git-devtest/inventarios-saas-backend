-- AlterTable
ALTER TABLE "almacenes" ALTER COLUMN "fecha_creacion" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "fecha_actualizacion" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "detalles_movimiento" ALTER COLUMN "fecha_creacion" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "empresas" ALTER COLUMN "fecha_creacion" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "fecha_actualizacion" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "lotes" ALTER COLUMN "fecha_fabricacion" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "fecha_vencimiento" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "fecha_creacion" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "movimientos_inventario" ALTER COLUMN "fecha_movimiento" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "fecha_movimiento" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "fecha_confirmacion" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "fecha_creacion" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "fecha_actualizacion" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "producto_almacen" ALTER COLUMN "fecha_creacion" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "fecha_actualizacion" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "producto_unidad_medida" ALTER COLUMN "fecha_creacion" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "productos" ALTER COLUMN "fecha_creacion" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "fecha_actualizacion" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "fecha_creacion" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "tipos_movimiento" ALTER COLUMN "fecha_creacion" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "ubicaciones" ALTER COLUMN "fecha_creacion" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "fecha_actualizacion" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "unidades_medida" ALTER COLUMN "fecha_creacion" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "fecha_creacion" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "fecha_actualizacion" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "ultimo_acceso" SET DATA TYPE TIMESTAMPTZ;
