// prisma/seed.ts
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/client';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed de base de datos...\n');

  // ========================================
  // 1. LIMPIAR DATOS EXISTENTES
  // ========================================
  console.log('🗑️  Limpiando datos existentes...');
  await prisma.detalleMovimiento.deleteMany();
  await prisma.movimientoInventario.deleteMany();
  await prisma.tipoMovimiento.deleteMany();
  await prisma.lote.deleteMany();
  await prisma.productoAlmacen.deleteMany();
  await prisma.productoUnidadMedida.deleteMany();
  await prisma.producto.deleteMany();
  await prisma.unidadMedida.deleteMany();
  await prisma.ubicacion.deleteMany();
  await prisma.almacen.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.empresa.deleteMany();
  await prisma.rol.deleteMany();
  console.log('✅ Datos limpiados\n');

  // ========================================
  // 2. CREAR ROLES DEL SISTEMA
  // ========================================
  console.log('📋 Creando roles del sistema...');
  
  const rolAdmin = await prisma.rol.create({
    data: {
      nombre: 'Administrador',
      descripcion: 'Acceso total al sistema de su empresa',
    },
  });

  const rolOperador = await prisma.rol.create({
    data: {
      nombre: 'Operador',
      descripcion: 'Puede registrar y consultar movimientos de inventario',
    },
  });

  const rolConsulta = await prisma.rol.create({
    data: {
      nombre: 'Consulta',
      descripcion: 'Solo puede consultar información sin realizar cambios',
    },
  });

  console.log('✅ Roles creados: Administrador, Operador, Consulta\n');

  // ========================================
  // 3. CREAR UNIDADES DE MEDIDA DEL SISTEMA
  // ========================================
  console.log('📏 Creando unidades de medida...');
  
  const unidades = await Promise.all([
    prisma.unidadMedida.create({ data: { nombre: 'Unidad', abreviatura: 'UN', tipo: 'unidad' } }),
    prisma.unidadMedida.create({ data: { nombre: 'Kilogramo', abreviatura: 'KG', tipo: 'peso' } }),
    prisma.unidadMedida.create({ data: { nombre: 'Gramo', abreviatura: 'G', tipo: 'peso' } }),
    prisma.unidadMedida.create({ data: { nombre: 'Tonelada', abreviatura: 'TON', tipo: 'peso' } }),
    prisma.unidadMedida.create({ data: { nombre: 'Libra', abreviatura: 'LB', tipo: 'peso' } }),
    prisma.unidadMedida.create({ data: { nombre: 'Litro', abreviatura: 'L', tipo: 'volumen' } }),
    prisma.unidadMedida.create({ data: { nombre: 'Mililitro', abreviatura: 'ML', tipo: 'volumen' } }),
    prisma.unidadMedida.create({ data: { nombre: 'Galón', abreviatura: 'GAL', tipo: 'volumen' } }),
    prisma.unidadMedida.create({ data: { nombre: 'Metro', abreviatura: 'M', tipo: 'longitud' } }),
    prisma.unidadMedida.create({ data: { nombre: 'Centímetro', abreviatura: 'CM', tipo: 'longitud' } }),
    prisma.unidadMedida.create({ data: { nombre: 'Metro cúbico', abreviatura: 'M3', tipo: 'volumen' } }),
    prisma.unidadMedida.create({ data: { nombre: 'Caja', abreviatura: 'CJA', tipo: 'unidad' } }),
    prisma.unidadMedida.create({ data: { nombre: 'Paquete', abreviatura: 'PQT', tipo: 'unidad' } }),
    prisma.unidadMedida.create({ data: { nombre: 'Docena', abreviatura: 'DOC', tipo: 'unidad' } }),
    prisma.unidadMedida.create({ data: { nombre: 'Bulto', abreviatura: 'BLT', tipo: 'unidad' } }),
  ]);

  const unidadUN = unidades[0];
  const unidadKG = unidades[1];
  const unidadL = unidades[5];
  const unidadCJA = unidades[11];

  console.log(`✅ ${unidades.length} unidades de medida creadas\n`);

  // ========================================
  // 4. CREAR TIPOS DE MOVIMIENTO DEL SISTEMA
  // ========================================
  console.log('📦 Creando tipos de movimiento...');
  
  const tipoEntrada = await prisma.tipoMovimiento.create({
    data: {
      codigo: 'ENTRADA',
      nombre: 'Entrada de inventario',
      afecta_stock: 1,
      requiere_destino: false,
      es_sistema: true,
    },
  });

  const tipoSalida = await prisma.tipoMovimiento.create({
    data: {
      codigo: 'SALIDA',
      nombre: 'Salida de inventario',
      afecta_stock: -1,
      requiere_destino: false,
      es_sistema: true,
    },
  });

  await prisma.tipoMovimiento.create({
    data: {
      codigo: 'AJUSTE_POSITIVO',
      nombre: 'Ajuste positivo',
      afecta_stock: 1,
      requiere_destino: false,
      es_sistema: true,
    },
  });

  await prisma.tipoMovimiento.create({
    data: {
      codigo: 'AJUSTE_NEGATIVO',
      nombre: 'Ajuste negativo',
      afecta_stock: -1,
      requiere_destino: false,
      es_sistema: true,
    },
  });

  await prisma.tipoMovimiento.create({
    data: {
      codigo: 'TRANSFERENCIA',
      nombre: 'Transferencia entre almacenes',
      afecta_stock: 0,
      requiere_destino: true,
      es_sistema: true,
    },
  });

  console.log('✅ Tipos de movimiento creados\n');

  // ========================================
  // 5. CREAR EMPRESA DEMO 1
  // ========================================
  console.log('🏢 Creando empresa demo 1...');
  
  const empresa1 = await prisma.empresa.create({
    data: {
      nombre: 'Distribuidora El Éxito SAS',
      identificacion_fiscal: '900123456-7',
      activo: true,
    },
  });

  // Usuarios empresa 1
  const passwordHash = await bcrypt.hash('Admin123!', 10);

  const admin1 = await prisma.usuario.create({
    data: {
      empresa_id: empresa1.id,
      rol_id: rolAdmin.id,
      nombre: 'Juan Pérez',
      email: 'admin@elexito.com',
      password_hash: passwordHash,
      activo: true,
    },
  });

  await prisma.usuario.create({
    data: {
      empresa_id: empresa1.id,
      rol_id: rolOperador.id,
      nombre: 'María López',
      email: 'operador@elexito.com',
      password_hash: await bcrypt.hash('Operador123!', 10),
      activo: true,
    },
  });

  await prisma.usuario.create({
    data: {
      empresa_id: empresa1.id,
      rol_id: rolConsulta.id,
      nombre: 'Carlos Gómez',
      email: 'consulta@elexito.com',
      password_hash: await bcrypt.hash('Consulta123!', 10),
      activo: true,
    },
  });

  // Almacenes empresa 1
  const almacen1 = await prisma.almacen.create({
    data: {
      empresa_id: empresa1.id,
      nombre: 'Almacén Principal',
      codigo: 'ALM-001',
      direccion: 'Calle 123 #45-67, Bogotá',
      activo: true,
    },
  });

  const almacen2 = await prisma.almacen.create({
    data: {
      empresa_id: empresa1.id,
      nombre: 'Almacén Secundario',
      codigo: 'ALM-002',
      direccion: 'Carrera 50 #30-20, Medellín',
      activo: true,
    },
  });

  // Ubicaciones almacén 1
  const zonaA = await prisma.ubicacion.create({
    data: {
      almacen_id: almacen1.id,
      nombre: 'Zona A',
      codigo: 'A',
      nivel: 1,
    },
  });

  const pasillo1 = await prisma.ubicacion.create({
    data: {
      almacen_id: almacen1.id,
      ubicacion_padre_id: zonaA.id,
      nombre: 'Pasillo 1',
      codigo: 'A-P1',
      nivel: 2,
    },
  });

  const estante1A = await prisma.ubicacion.create({
    data: {
      almacen_id: almacen1.id,
      ubicacion_padre_id: pasillo1.id,
      nombre: 'Estante 1A',
      codigo: 'A-P1-E1',
      nivel: 3,
    },
  });

  // Productos empresa 1
  const producto1 = await prisma.producto.create({
    data: {
      empresa_id: empresa1.id,
      codigo: 'PROD-001',
      nombre: 'Laptop Dell Inspiron 15',
      descripcion: 'Laptop empresarial con procesador Intel Core i5',
      campos_personalizados: {
        marca: 'Dell',
        modelo: 'Inspiron 15 3000',
        garantia_meses: 12,
      },
      activo: true,
    },
  });

  const producto2 = await prisma.producto.create({
    data: {
      empresa_id: empresa1.id,
      codigo: 'PROD-002',
      nombre: 'Aceite de Oliva Extra Virgen',
      descripcion: 'Aceite de oliva importado de España',
      requiere_lote: true,
      dias_vencimiento: 730,
      activo: true,
    },
  });

  const producto3 = await prisma.producto.create({
    data: {
      empresa_id: empresa1.id,
      codigo: 'PROD-003',
      nombre: 'Cemento Argos x 50kg',
      descripcion: 'Cemento portland tipo I',
      activo: true,
    },
  });

  // Unidades de medida para productos
  await prisma.productoUnidadMedida.create({
    data: {
      producto_id: producto1.id,
      unidad_medida_id: unidadUN.id,
      factor_conversion: 1,
      es_principal: true,
    },
  });

  await prisma.productoUnidadMedida.create({
    data: {
      producto_id: producto2.id,
      unidad_medida_id: unidadL.id,
      factor_conversion: 1,
      es_principal: true,
    },
  });

  await prisma.productoUnidadMedida.create({
    data: {
      producto_id: producto3.id,
      unidad_medida_id: unidadKG.id,
      factor_conversion: 1,
      es_principal: true,
    },
  });

  await prisma.productoUnidadMedida.create({
    data: {
      producto_id: producto3.id,
      unidad_medida_id: unidadCJA.id,
      factor_conversion: 50, // 1 caja = 50 kg
      es_principal: false,
    },
  });

  // Configuración de stock mínimo/máximo
  await prisma.productoAlmacen.create({
    data: {
      producto_id: producto1.id,
      almacen_id: almacen1.id,
      stock_minimo: 10,
      stock_maximo: 50,
      punto_reorden: 15,
    },
  });

  await prisma.productoAlmacen.create({
    data: {
      producto_id: producto2.id,
      almacen_id: almacen1.id,
      ubicacion_id: estante1A.id,
      stock_minimo: 100,
      stock_maximo: 500,
      punto_reorden: 150,
    },
  });

  console.log(`✅ Empresa 1 creada con almacenes, ubicaciones y productos\n`);

  // ========================================
  // 6. CREAR EMPRESA DEMO 2 (MULTI-TENANT)
  // ========================================
  console.log('🏢 Creando empresa demo 2...');
  
  const empresa2 = await prisma.empresa.create({
    data: {
      nombre: 'TechStore Colombia LTDA',
      identificacion_fiscal: '800987654-3',
      activo: true,
    },
  });

  await prisma.usuario.create({
    data: {
      empresa_id: empresa2.id,
      rol_id: rolAdmin.id,
      nombre: 'Ana Martínez',
      email: 'admin@techstore.com',
      password_hash: await bcrypt.hash('Tech123!', 10),
      activo: true,
    },
  });

  const almacenTech = await prisma.almacen.create({
    data: {
      empresa_id: empresa2.id,
      nombre: 'Bodega Principal',
      codigo: 'TECH-001',
      direccion: 'Avenida 68 #80-50, Bogotá',
      activo: true,
    },
  });

  const productoTech = await prisma.producto.create({
    data: {
      empresa_id: empresa2.id,
      codigo: 'TECH-001',
      nombre: 'iPhone 15 Pro Max',
      descripcion: 'Smartphone Apple última generación',
      requiere_serie: true,
      activo: true,
    },
  });

  await prisma.productoUnidadMedida.create({
    data: {
      producto_id: productoTech.id,
      unidad_medida_id: unidadUN.id,
      factor_conversion: 1,
      es_principal: true,
    },
  });

  console.log('✅ Empresa 2 creada\n');

  // ========================================
  // 7. CREAR MOVIMIENTO DE INVENTARIO DE EJEMPLO
  // ========================================
  console.log('📦 Creando movimiento de inventario de ejemplo...');
  
  const movimiento1 = await prisma.movimientoInventario.create({
    data: {
      empresa_id: empresa1.id,
      tipo_movimiento_id: tipoEntrada.id,
      almacen_origen_id: almacen1.id,
      ubicacion_origen_id: estante1A.id,
      fecha_movimiento: new Date(),
      usuario_id: admin1.id,
      estado: 'confirmado',
      fecha_confirmacion: new Date(),
      usuario_confirmacion_id: admin1.id,
      observacion: 'Entrada inicial de inventario',
    },
  });

  await prisma.detalleMovimiento.create({
    data: {
      movimiento_id: movimiento1.id,
      producto_id: producto1.id,
      producto_unidad_medida_id: (
        await prisma.productoUnidadMedida.findFirst({
          where: { producto_id: producto1.id, es_principal: true },
        })
      )!.id,
      cantidad: 25,
      observacion_detalle: 'Compra lote inicial',
    },
  });

  await prisma.detalleMovimiento.create({
    data: {
      movimiento_id: movimiento1.id,
      producto_id: producto2.id,
      producto_unidad_medida_id: (
        await prisma.productoUnidadMedida.findFirst({
          where: { producto_id: producto2.id, es_principal: true },
        })
      )!.id,
      cantidad: 200,
      lote: 'LOTE-2024-001',
      observacion_detalle: 'Importación España',
    },
  });

  console.log('✅ Movimiento de inventario creado\n');

  // ========================================
  // RESUMEN FINAL
  // ========================================
  console.log('═══════════════════════════════════════════════════');
  console.log('🎉 SEED COMPLETADO EXITOSAMENTE!');
  console.log('═══════════════════════════════════════════════════\n');
  
  console.log('📊 RESUMEN:');
  console.log(`  - Roles: 3`);
  console.log(`  - Unidades de medida: ${unidades.length}`);
  console.log(`  - Tipos de movimiento: 5`);
  console.log(`  - Empresas: 2`);
  console.log(`  - Usuarios: 4`);
  console.log(`  - Almacenes: 3`);
  console.log(`  - Ubicaciones: 3`);
  console.log(`  - Productos: 4`);
  console.log(`  - Movimientos: 1 (confirmado)\n`);
  
  console.log('🔑 CREDENCIALES DE ACCESO:\n');
  console.log('  📧 Empresa 1 - Distribuidora El Éxito:');
  console.log('     Admin: admin@elexito.com / Admin123!');
  console.log('     Operador: operador@elexito.com / Operador123!');
  console.log('     Consulta: consulta@elexito.com / Consulta123!\n');
  console.log('  📧 Empresa 2 - TechStore Colombia:');
  console.log('     Admin: admin@techstore.com / Tech123!\n');
  console.log('═══════════════════════════════════════════════════\n');
}

main()
  .catch((e) => {
    console.error('❌ Error ejecutando seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });