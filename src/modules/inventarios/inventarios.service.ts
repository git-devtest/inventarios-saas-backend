import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { AddDetalleDto } from './dto/add-detalle.dto';
import { FiltroStockDto } from './dto/filtro-stock.dto';
import { FiltroKardexDto } from './dto/filtro-kardex.dto';

@Injectable()
export class InventariosService {
  private readonly logger = new Logger(InventariosService.name);

  constructor(private prisma: PrismaService) {}

  // ==========================================
  // MOVIMIENTOS
  // ==========================================

  /**
   * Crear un movimiento de inventario (en estado borrador)
   */
  async createMovimiento(
    createDto: CreateMovimientoDto,
    empresa_id: string,
    usuario_id: string,
  ) {
    this.logger.log('Creando movimiento de inventario');

    // Verificar tipo de movimiento
    const tipoMovimiento = await this.prisma.tipoMovimiento.findFirst({
      where: {
        id: createDto.tipo_movimiento_id,
        OR: [{ empresa_id }, { es_sistema: true }],
      },
    });

    if (!tipoMovimiento) {
      throw new NotFoundException('Tipo de movimiento no encontrado');
    }

    // Verificar almacén origen
    const almacenOrigen = await this.prisma.almacen.findFirst({
      where: { id: createDto.almacen_origen_id, empresa_id },
    });

    if (!almacenOrigen) {
      throw new NotFoundException('Almacén de origen no encontrado');
    }

    // Si requiere destino, verificarlo
    if (tipoMovimiento.requiere_destino) {
      if (!createDto.almacen_destino_id) {
        throw new BadRequestException(
          'Este tipo de movimiento requiere almacén de destino',
        );
      }

      const almacenDestino = await this.prisma.almacen.findFirst({
        where: { id: createDto.almacen_destino_id, empresa_id },
      });

      if (!almacenDestino) {
        throw new NotFoundException('Almacén de destino no encontrado');
      }

      if (createDto.almacen_origen_id === createDto.almacen_destino_id) {
        throw new BadRequestException(
          'El almacén de origen y destino no pueden ser el mismo',
        );
      }
    }

    const movimiento = await this.prisma.movimientoInventario.create({
      data: {
        empresa_id,
        tipo_movimiento_id: createDto.tipo_movimiento_id,
        almacen_origen_id: createDto.almacen_origen_id,
        ubicacion_origen_id: createDto.ubicacion_origen_id,
        almacen_destino_id: createDto.almacen_destino_id,
        ubicacion_destino_id: createDto.ubicacion_destino_id,
        fecha_movimiento: createDto.fecha_movimiento
          ? new Date(createDto.fecha_movimiento)
          : new Date(),
        usuario_id,
        observacion: createDto.observacion,
      },
      include: {
        tipo_movimiento: true,
        almacen_origen: true,
        almacen_destino: true,
      },
    });

    this.logger.log(`Movimiento creado: ${movimiento.id}`);

    return {
      mensaje: 'Movimiento creado en estado borrador',
      tipo: tipoMovimiento.nombre,
      almacen_origen: almacenOrigen.nombre,
      almacen_destino: movimiento.almacen_destino?.nombre,
      detalles: movimiento,
    };
  }

  /**
   * Agregar productos al movimiento (solo si está en borrador)
   */
  async addDetalle(
    movimiento_id: string,
    addDetalleDto: AddDetalleDto,
    empresa_id: string,
    usuario_id: string,
  ) {
    this.logger.log(`Agregando detalle al movimiento: ${movimiento_id}`);

    // Verificar movimiento
    const movimiento = await this.prisma.movimientoInventario.findFirst({
      where: { id: movimiento_id, empresa_id },
    });

    if (!movimiento) {
      throw new NotFoundException('Movimiento no encontrado');
    }

    if (movimiento.estado !== 'borrador') {
      throw new BadRequestException(
        'Solo se pueden agregar productos a movimientos en estado borrador',
      );
    }

    // Verificar producto
    const producto = await this.prisma.producto.findFirst({
      where: { id: addDetalleDto.producto_id, empresa_id },
    });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    // Verificar unidad de medida
    const productoUnidad = await this.prisma.productoUnidadMedida.findFirst({
      where: {
        id: addDetalleDto.producto_unidad_medida_id,
        producto_id: addDetalleDto.producto_id,
      },
    });

    if (!productoUnidad) {
      throw new NotFoundException(
        'Unidad de medida no válida para este producto',
      );
    }

    // Validar lote/serie si el producto lo requiere
    if (producto.requiere_lote && !addDetalleDto.lote) {
      throw new BadRequestException('Este producto requiere número de lote');
    }

    if (producto.requiere_serie && !addDetalleDto.serie) {
      throw new BadRequestException('Este producto requiere número de serie');
    }

    const detalle = await this.prisma.detalleMovimiento.create({
      data: {
        movimiento_id,
        producto_id: addDetalleDto.producto_id,
        producto_unidad_medida_id: addDetalleDto.producto_unidad_medida_id,
        cantidad: addDetalleDto.cantidad,
        lote: addDetalleDto.lote,
        serie: addDetalleDto.serie,
        observacion_detalle: addDetalleDto.observacion_detalle,
      },
      include: {
        producto: true,
        producto_unidad_medida: {
          include: {
            unidad_medida: true,
          },
        },
      },
    });

    this.logger.log(`Detalle agregado: ${detalle.id}`);

    return {
      mensaje: 'Producto agregado al movimiento',
      producto: producto.nombre,
      cantidad: detalle.cantidad,
      unidad: detalle.producto_unidad_medida.unidad_medida.abreviatura,
      detalles: detalle,
    };
  }

  /**
   * Confirmar movimiento (afecta el stock)
   */
  async confirmarMovimiento(
    movimiento_id: string,
    empresa_id: string,
    usuario_id: string,
  ) {
    this.logger.log(`Confirmando movimiento: ${movimiento_id}`);

    const movimiento = await this.prisma.movimientoInventario.findFirst({
      where: { id: movimiento_id, empresa_id },
      include: {
        detalles: {
          include: {
            producto: true,
            producto_unidad_medida: {
              include: {
                unidad_medida: true,
              },
            },
          },
        },
        tipo_movimiento: true,
        almacen_origen: true,
        almacen_destino: true,
      },
    });

    if (!movimiento) {
      throw new NotFoundException('Movimiento no encontrado');
    }

    if (movimiento.estado !== 'borrador') {
      throw new BadRequestException(
        `El movimiento ya está en estado: ${movimiento.estado}`,
      );
    }

    if (movimiento.detalles.length === 0) {
      throw new BadRequestException(
        'No se puede confirmar un movimiento sin productos',
      );
    }

    // Validar stock disponible si es salida o transferencia
    if (
      movimiento.tipo_movimiento.afecta_stock === -1 ||
      movimiento.tipo_movimiento.requiere_destino
    ) {
      await this.validarStockDisponible(movimiento);
    }

    // Confirmar el movimiento
    const confirmado = await this.prisma.movimientoInventario.update({
      where: { id: movimiento_id },
      data: {
        estado: 'confirmado',
        fecha_confirmacion: new Date(),
        usuario_confirmacion_id: usuario_id,
      },
      include: {
        detalles: {
          include: {
            producto: true,
          },
        },
      },
    });

    this.logger.log(`Movimiento confirmado: ${movimiento_id}`);

    return {
      mensaje: 'Movimiento confirmado exitosamente',
      tipo: movimiento.tipo_movimiento.nombre,
      productos: confirmado.detalles.length,
      fecha_confirmacion: confirmado.fecha_confirmacion,
      detalles: confirmado,
    };
  }

  /**
   * Anular un movimiento confirmado
   */
  async anularMovimiento(
    movimiento_id: string,
    motivo: string,
    empresa_id: string,
  ) {
    this.logger.log(`Anulando movimiento: ${movimiento_id}`);

    const movimiento = await this.prisma.movimientoInventario.findFirst({
      where: { id: movimiento_id, empresa_id },
    });

    if (!movimiento) {
      throw new NotFoundException('Movimiento no encontrado');
    }

    if (movimiento.estado !== 'confirmado') {
      throw new BadRequestException(
        'Solo se pueden anular movimientos confirmados',
      );
    }

    const anulado = await this.prisma.movimientoInventario.update({
      where: { id: movimiento_id },
      data: {
        estado: 'anulado',
        observacion: `${movimiento.observacion || ''}\n[ANULADO] Motivo: ${motivo}`,
      },
    });

    this.logger.log(`Movimiento anulado: ${movimiento_id}`);

    return {
      mensaje: 'Movimiento anulado correctamente',
      id: movimiento_id,
      motivo,
      detalles: anulado,
    };
  }

  /**
   * Listar movimientos
   */
  async findAllMovimientos(empresa_id: string) {
    return this.prisma.movimientoInventario.findMany({
      where: { empresa_id },
      include: {
        tipo_movimiento: true,
        almacen_origen: true,
        almacen_destino: true,
        usuario: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
        _count: {
          select: {
            detalles: true,
          },
        },
      },
      orderBy: {
        fecha_movimiento: 'desc',
      },
      take: 100,
    });
  }

  /**
   * Obtener un movimiento con sus detalles
   */
  async findOneMovimiento(movimiento_id: string, empresa_id: string) {
    const movimiento = await this.prisma.movimientoInventario.findFirst({
      where: { id: movimiento_id, empresa_id },
      include: {
        tipo_movimiento: true,
        almacen_origen: true,
        ubicacion_origen: true,
        almacen_destino: true,
        ubicacion_destino: true,
        usuario: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
        usuario_confirmacion: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
        detalles: {
          include: {
            producto: true,
            producto_unidad_medida: {
              include: {
                unidad_medida: true,
              },
            },
          },
        },
      },
    });

    if (!movimiento) {
      throw new NotFoundException('Movimiento no encontrado');
    }

    return movimiento;
  }

  // ==========================================
  // CONSULTAS DE STOCK
  // ==========================================

  /**
   * Obtener stock actual con filtros opcionales
   */
  async getStock(filtros: FiltroStockDto, empresa_id: string) {
    this.logger.log('Consultando stock actual');

    const whereClause: any = {
      movimiento: {
        empresa_id,
        estado: 'confirmado',
      },
    };

    if (filtros.producto_id) {
      whereClause.producto_id = filtros.producto_id;
    }

    if (filtros.almacen_id) {
      whereClause.movimiento = {
        ...whereClause.movimiento,
        OR: [
          { almacen_origen_id: filtros.almacen_id },
          { almacen_destino_id: filtros.almacen_id },
        ],
      };
    }

    const movimientos = await this.prisma.detalleMovimiento.findMany({
      where: whereClause,
      include: {
        producto: true,
        producto_unidad_medida: {
          include: {
            unidad_medida: true,
          },
        },
        movimiento: {
          include: {
            tipo_movimiento: true,
            almacen_origen: true,
            almacen_destino: true,
          },
        },
      },
    });

    const stockMap = new Map();

    for (const detalle of movimientos) {
      const key = `${detalle.producto_id}-${detalle.movimiento.almacen_origen_id}`;
      const tipo = detalle.movimiento.tipo_movimiento;

      if (!stockMap.has(key)) {
        stockMap.set(key, {
          producto: detalle.producto,
          almacen_id: detalle.movimiento.almacen_origen_id,
          almacen: detalle.movimiento.almacen_origen,
          stock: 0,
          unidad: detalle.producto_unidad_medida.unidad_medida,
        });
      }

      const current = stockMap.get(key);
      const cantidadBase = Number(detalle.cantidad) * Number(detalle.producto_unidad_medida.factor_conversion);

      if (tipo.requiere_destino) {
        current.stock -= cantidadBase;
      } else {
        current.stock += cantidadBase * tipo.afecta_stock;
      }
    }

    for (const detalle of movimientos) {
      if (detalle.movimiento.tipo_movimiento.requiere_destino && detalle.movimiento.almacen_destino_id) {
        const key = `${detalle.producto_id}-${detalle.movimiento.almacen_destino_id}`;
        
        if (!stockMap.has(key)) {
          stockMap.set(key, {
            producto: detalle.producto,
            almacen_id: detalle.movimiento.almacen_destino_id,
            almacen: detalle.movimiento.almacen_destino,
            stock: 0,
            unidad: detalle.producto_unidad_medida.unidad_medida,
          });
        }

        const current = stockMap.get(key);
        const cantidadBase = Number(detalle.cantidad) * Number(detalle.producto_unidad_medida.factor_conversion);
        current.stock += cantidadBase;
      }
    }

    return Array.from(stockMap.values());
  }

  /**
   * Obtener kardex de un producto
   */
  async getKardex(filtros: FiltroKardexDto, empresa_id: string) {
    this.logger.log(`Generando kardex de producto: ${filtros.producto_id}`);

    const whereClause: any = {
      producto_id: filtros.producto_id,
      movimiento: {
        empresa_id,
        estado: 'confirmado',
        almacen_origen_id: filtros.almacen_id,
      },
    };

    if (filtros.fecha_inicio) {
      whereClause.movimiento.fecha_movimiento = {
        gte: new Date(filtros.fecha_inicio),
      };
    }

    if (filtros.fecha_fin) {
      whereClause.movimiento.fecha_movimiento = {
        ...whereClause.movimiento.fecha_movimiento,
        lte: new Date(filtros.fecha_fin),
      };
    }

    const detalles = await this.prisma.detalleMovimiento.findMany({
      where: whereClause,
      include: {
        producto: true,
        producto_unidad_medida: {
          include: {
            unidad_medida: true,
          },
        },
        movimiento: {
          include: {
            tipo_movimiento: true,
            usuario: {
              select: {
                nombre: true,
              },
            },
          },
        },
      },
      orderBy: {
        movimiento: {
          fecha_movimiento: 'asc',
        },
      },
    });

    let saldo = 0;
    const kardex = detalles.map((detalle) => {
      const cantidad = Number(detalle.cantidad) * Number(detalle.producto_unidad_medida.factor_conversion);
      const tipo = detalle.movimiento.tipo_movimiento;
      
      let entrada = 0;
      let salida = 0;

      if (tipo.requiere_destino) {
        salida = cantidad;
      } else if (tipo.afecta_stock === 1) {
        entrada = cantidad;
      } else if (tipo.afecta_stock === -1) {
        salida = cantidad;
      }

      saldo += entrada - salida;

      return {
        fecha: detalle.movimiento.fecha_movimiento,
        tipo: tipo.nombre,
        entrada,
        salida,
        saldo,
        lote: detalle.lote,
        serie: detalle.serie,
        usuario: detalle.movimiento.usuario.nombre,
        observacion: detalle.movimiento.observacion,
      };
    });

    return {
      producto: detalles[0]?.producto,
      movimientos: kardex,
      saldo_final: saldo,
    };
  }

  // ==========================================
  // MÉTODOS PRIVADOS
  // ==========================================

  private async validarStockDisponible(movimiento: any) {
    for (const detalle of movimiento.detalles) {
      const stockActual = await this.getStockProducto(
        detalle.producto_id,
        movimiento.almacen_origen_id,
      );

      const cantidadRequerida = detalle.cantidad * detalle.producto_unidad_medida.factor_conversion;

      if (stockActual < cantidadRequerida && !detalle.producto.permite_stock_negativo) {
        throw new BadRequestException(
          `Stock insuficiente para ${detalle.producto.nombre}. Disponible: ${stockActual}, Requerido: ${cantidadRequerida}`,
        );
      }
    }
  }

  private async getStockProducto(producto_id: string, almacen_id: string): Promise<number> {
    const movimientos = await this.prisma.detalleMovimiento.findMany({
      where: {
        producto_id,
        movimiento: {
          estado: 'confirmado',
          almacen_origen_id: almacen_id,
        },
      },
      include: {
        producto_unidad_medida: true,
        movimiento: {
          include: {
            tipo_movimiento: true,
          },
        },
      },
    });

    let stock = 0;
    for (const detalle of movimientos) {
      const cantidadBase = Number(detalle.cantidad) * Number(detalle.producto_unidad_medida.factor_conversion);
      const tipo = detalle.movimiento.tipo_movimiento;

      if (tipo.requiere_destino) {
        stock -= cantidadBase;
      } else {
        stock += cantidadBase * tipo.afecta_stock;
      }
    }

    return stock;
  }
}
