import { Injectable, NotFoundException, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { AddUnidadMedidaDto } from './dto/add-unidad-medida.dto';
import { ConfigStockDto } from './dto/config-stock.dto';
import { logger } from 'winston_logs/logger';

@Injectable()
export class ProductosService {
  private readonly logger = new Logger(ProductosService.name);

  constructor(private prisma: PrismaService) { }

  /**
   * @description Obtener todos los productos de una empresa
   * @summary Listar productos
   * @param empresaId ID de la empresa
   * @returns Lista de productos
   */
  async findAll(empresaId: string) {
    return this.prisma.producto.findMany({
      where: {
        empresa_id: empresaId,
        activo: true,
      },
      include: {
        unidades_medida: {
          include: {
            unidad_medida: true,
          },
        },
        _count: {
          select: {
            producto_almacenes: true,
            detalles_movimiento: true,
          },
        },
      },
      orderBy: {
        fecha_creacion: 'desc',
      },
    });
  }

  /**
   * @description Obtener un producto por ID
   * @summary Buscar producto
   * @param id ID del producto
   * @param empresaId ID de la empresa
   * @returns Producto
   */
  async findOne(id: string, empresaId: string) {
    const producto = await this.prisma.producto.findFirst({
      where: {
        id,
        empresa_id: empresaId,
      },
      include: {
        unidades_medida: {
          include: {
            unidad_medida: true,
          },
        },
        producto_almacenes: {
          include: {
            almacen: true,
            ubicacion: true,
          },
        },
        empresa: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    logger.info(`Producto encontrado: [${producto.id}]`);
    return {
      message: 'Producto encontrado exitosamente',
      producto,
    };
  }

  /**
   * @description Buscar productos por código o nombre
   * @summary Buscar productos
   * @param empresaId ID de la empresa
   * @param query Codigo o nombre del producto
   * @returns Lista de productos
   */
  async search(empresaId: string, query: string) {
    return this.prisma.producto.findMany({
      where: {
        empresa_id: empresaId,
        activo: true,
        OR: [
          { codigo: { contains: query, mode: 'insensitive' } },
          { nombre: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        unidades_medida: {
          where: { es_principal: true },
          include: {
            unidad_medida: true,
          },
        },
      },
      take: 20,
    });
  }

  /**
   * @description Crear un nuevo producto
   * @summary Crear producto
   * @param createProductoDto Datos del producto
   * @param empresaId ID de la empresa
   * @returns Producto creado
   */
  async create(createProductoDto: CreateProductoDto, empresaId: string) {

    // Verificar si el código ya existe en la empresa
    const existingProducto = await this.prisma.producto.findFirst({
      where: {
        empresa_id: empresaId,
        codigo: createProductoDto.codigo,
      },
    });

    if (existingProducto) {
      throw new ConflictException(
        `El código de producto ${createProductoDto.codigo} ya existe`,
      );
    }

    // Validación: no puede requerir lote Y serie al mismo tiempo
    if (createProductoDto.requiere_lote && createProductoDto.requiere_serie) {
      throw new BadRequestException(
        'Un producto no puede requerir lote y serie simultáneamente',
      );
    }

    const producto = await this.prisma.producto.create({
      data: {
        ...createProductoDto,
        empresa_id: empresaId,
      },
      include: {
        empresa: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });

    logger.info(`Producto con id [${producto.id}] creado exitosamente`);
    return producto;
  }

  /**
   * @description Actualizar un producto
   * @summary Actualizar producto
   * @param id ID del producto
   * @param updateProductoDto Datos del producto
   * @param empresaId ID de la empresa
   * @returns Producto actualizado
   */
  async update(id: string, updateProductoDto: UpdateProductoDto, empresaId: string) {
    // Verificar que el producto existe y pertenece a la empresa
    const producto = await this.prisma.producto.findFirst({
      where: { id, empresa_id: empresaId },
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    // Validación: no puede requerir lote Y serie
    if (updateProductoDto.requiere_lote && updateProductoDto.requiere_serie) {
      throw new BadRequestException(
        'Un producto no puede requerir lote y serie simultáneamente',
      );
    }

    const productoActualizado = await this.prisma.producto.update({
      where: { id },
      data: updateProductoDto,
      include: {
        unidades_medida: {
          include: {
            unidad_medida: true,
          },
        },
      },
    });

    this.logger.log(`Producto con ID [${id}] actualizado exitosamente`);
    return productoActualizado;
  }

  /**
   * @description Eliminar producto (soft delete)
   * @summary Desactivar producto
   * @param id ID del producto
   * @param empresaId ID de la empresa
   * @returns Producto desactivado
   */
  async remove(id: string, empresaId: string) {
    const producto = await this.prisma.producto.findFirst({
      where: { id, empresa_id: empresaId },
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    if (!producto.activo) {
      throw new BadRequestException('El producto ya está inactivo');
    }

    await this.prisma.producto.update({
      where: { id },
      data: { activo: false },
    });

    this.logger.log(`Producto con ID [${id}] desactivado correctamente`);
    return {
      message: 'Producto desactivado correctamente',
      id,
    };
  }

  /**
   * @description Agregar unidad de medida a un producto
   * @summary Agregar unidad de medida
   * @param productoId ID del producto
   * @param addUnidadDto Datos de la unidad de medida
   * @param empresaId ID de la empresa
   * @returns Unidad de medida agregada
   */
  async addUnidadMedida(productoId: string, addUnidadDto: AddUnidadMedidaDto, empresaId: string) {
    // Verificar que el producto existe
    const producto = await this.prisma.producto.findFirst({
      where: { id: productoId, empresa_id: empresaId },
    });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    // Verificar que la unidad de medida existe
    const unidadMedida = await this.prisma.unidadMedida.findUnique({
      where: { id: addUnidadDto.unidad_medida_id },
    });

    if (!unidadMedida) {
      throw new NotFoundException('Unidad de medida no encontrada');
    }

    // Verificar que no exista ya esa combinación
    const existing = await this.prisma.productoUnidadMedida.findFirst({
      where: {
        producto_id: productoId,
        unidad_medida_id: addUnidadDto.unidad_medida_id,
      },
    });

    if (existing) {
      throw new ConflictException('Esta unidad de medida ya está asociada al producto');
    }

    // Si se marca como principal, desmarcar las demás
    if (addUnidadDto.es_principal) {
      await this.prisma.productoUnidadMedida.updateMany({
        where: { producto_id: productoId },
        data: { es_principal: false },
      });
    }

    // Si es la primera unidad, marcarla como principal automáticamente
    const count = await this.prisma.productoUnidadMedida.count({
      where: { producto_id: productoId },
    });

    const es_principal = count === 0 ? true : addUnidadDto.es_principal || false;

    const productoUnidad = await this.prisma.productoUnidadMedida.create({
      data: {
        producto_id: productoId,
        unidad_medida_id: addUnidadDto.unidad_medida_id,
        factor_conversion: addUnidadDto.factor_conversion,
        es_principal: es_principal,
      },
      include: {
        unidad_medida: true,
        producto: {
          select: {
            id: true,
            codigo: true,
            nombre: true,
          },
        },
      },
    });
    return productoUnidad;
  }

  /**
   * @description Configurar stock mínimo/máximo para un producto en un almacén
   * @summary Configurar stock
   * @param productoId ID del producto
   * @param configDto Datos de la configuración
   * @param empresaId ID de la empresa
   * @returns Stock configurado
   */
  async configStock(productoId: string, configDto: ConfigStockDto, empresaId: string) {
    // Verificar producto
    const producto = await this.prisma.producto.findFirst({
      where: { id: productoId, empresa_id: empresaId },
    });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    // Verificar almacén
    const almacen = await this.prisma.almacen.findFirst({
      where: { id: configDto.almacen_id, empresa_id: empresaId },
    });

    if (!almacen) {
      throw new NotFoundException('Almacén no encontrado');
    }

    // Verificar ubicación si se especificó
    if (configDto.ubicacion_id) {
      const ubicacion = await this.prisma.ubicacion.findFirst({
        where: {
          id: configDto.ubicacion_id,
          almacen_id: configDto.almacen_id,
        },
      });

      if (!ubicacion) {
        throw new NotFoundException('Ubicación no encontrada');
      }
    }

    // Validar que stock máximo >= stock mínimo
    if (
      configDto.stock_maximo &&
      configDto.stock_maximo < configDto.stock_minimo
    ) {
      throw new BadRequestException(
        'El stock máximo debe ser mayor o igual al stock mínimo',
      );
    }

    // Buscar configuración existente
    const existing = await this.prisma.productoAlmacen.findFirst({
      where: {
        producto_id: productoId,
        almacen_id: configDto.almacen_id,
        ubicacion_id: configDto.ubicacion_id || null,
      },
    });

    let config;

    if (existing) {
      // Actualizar
      config = await this.prisma.productoAlmacen.update({
        where: { id: existing.id },
        data: {
          stock_minimo: configDto.stock_minimo,
          stock_maximo: configDto.stock_maximo,
          punto_reorden: configDto.punto_reorden,
        },
        include: {
          producto: {
            select: {
              id: true,
              codigo: true,
              nombre: true,
            },
          },
          almacen: {
            select: {
              id: true,
              nombre: true,
            },
          },
          ubicacion: {
            select: {
              id: true,
              nombre: true,
            },
          },
        },
      });
    } else {
      // Crear
      config = await this.prisma.productoAlmacen.create({
        data: {
          producto_id: productoId,
          almacen_id: configDto.almacen_id,
          ubicacion_id: configDto.ubicacion_id,
          stock_minimo: configDto.stock_minimo,
          stock_maximo: configDto.stock_maximo,
          punto_reorden: configDto.punto_reorden,
        },
        include: {
          producto: {
            select: {
              id: true,
              codigo: true,
              nombre: true,
            },
          },
          almacen: {
            select: {
              id: true,
              nombre: true,
            },
          },
          ubicacion: {
            select: {
              id: true,
              nombre: true,
            },
          },
        },
      });
    }
    return config;
  }

  /**
   * @description Obtener unidades de medida disponibles
   * @summary Obtener unidades de medida
   * @returns Lista de unidades de medida
   */
  async getUnidadesMedida() {
    return this.prisma.unidadMedida.findMany({
      orderBy: {
        nombre: 'asc',
      },
    });
  }
}