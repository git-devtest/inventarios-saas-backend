import { Injectable, NotFoundException, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { UpdateAlmacenDto } from './dto/update-almacen.dto';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';

@Injectable()
export class AlmacenesService {
  private readonly logger = new Logger(AlmacenesService.name);

  constructor(private prisma: PrismaService) {}

  // ==========================================
  // ALMACENES
  // ==========================================

  /**
   * @description Obtener todos los almacenes de una empresa
   * @param empresa_id ID de la empresa
   * @returns Lista de almacenes
   */
  async findAllAlmacenes(empresa_id: string) {
    this.logger.log(`Obteniendo almacenes de empresa: ${empresa_id}`);

    return this.prisma.almacen.findMany({
      where: {
        empresa_id,
        activo: true,
      },
      include: {
        _count: {
          select: {
            ubicaciones: true,
            movimientos_origen: true,
            movimientos_destino: true,
          },
        },
      },
      orderBy: {
        fecha_creacion: 'desc',
      },
    });
  }

  /**
   * @description Obtener un almacén por ID
   * @param id ID del almacén
   * @param empresa_id ID de la empresa
   * @returns Almacén
   */
  async findOneAlmacen(id: string, empresa_id: string) {
    this.logger.log(`Buscando almacén: ${id}`);

    const almacen = await this.prisma.almacen.findFirst({
      where: {
        id,
        empresa_id,
      },
      include: {
        ubicaciones: {
          where: { ubicacion_padre_id: null }, // Solo raíces
          orderBy: { codigo: 'asc' },
        },
        empresa: {
          select: {
            id: true,
            nombre: true,
          },
        },
        _count: {
          select: {
            ubicaciones: true,
            producto_almacenes: true,
          },
        },
      },
    });

    if (!almacen) {
      throw new NotFoundException(`Almacén con ID ${id} no encontrado`);
    }

    return almacen;
  }

  /**
   * Crear un almacén
   */
  async createAlmacen(createDto: CreateAlmacenDto, empresa_id: string) {
    this.logger.log(`Creando almacén: ${createDto.codigo}`);

    // Verificar si el código ya existe en la empresa
    const existing = await this.prisma.almacen.findFirst({
      where: {
        empresa_id,
        codigo: createDto.codigo,
      },
    });

    if (existing) {
      throw new ConflictException(
        `El código de almacén ${createDto.codigo} ya existe`,
      );
    }

    const almacen = await this.prisma.almacen.create({
      data: {
        ...createDto,
        empresa_id,
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

    this.logger.log(`Almacén creado: ${almacen.id}`);

    return {
      mensaje: 'Almacén creado exitosamente',
      almacen: almacen.nombre,
      codigo: almacen.codigo,
      detalles: almacen,
    };
  }

  /**
   * Actualizar un almacén
   */
  async updateAlmacen(
    id: string,
    updateDto: UpdateAlmacenDto,
    empresa_id: string,
  ) {
    this.logger.log(`Actualizando almacén: ${id}`);

    const almacen = await this.prisma.almacen.findFirst({
      where: { id, empresa_id },
    });

    if (!almacen) {
      throw new NotFoundException(`Almacén con ID ${id} no encontrado`);
    }

    const actualizado = await this.prisma.almacen.update({
      where: { id },
      data: updateDto,
    });

    this.logger.log(`Almacén actualizado: ${id}`);

    return {
      mensaje: 'Almacén actualizado exitosamente',
      detalles: actualizado,
    };
  }

  /**
   * Eliminar almacén (soft delete)
   */
  async removeAlmacen(id: string, empresa_id: string) {
    this.logger.log(`Desactivando almacén: ${id}`);

    const almacen = await this.prisma.almacen.findFirst({
      where: { id, empresa_id },
      include: {
        _count: {
          select: {
            ubicaciones: true,
            producto_almacenes: true,
          },
        },
      },
    });

    if (!almacen) {
      throw new NotFoundException(`Almacén con ID ${id} no encontrado`);
    }

    if (!almacen.activo) {
      throw new BadRequestException('El almacén ya está inactivo');
    }

    // Verificar que no tenga ubicaciones activas
    if (almacen._count.ubicaciones > 0) {
      throw new BadRequestException(
        'No se puede desactivar un almacén con ubicaciones. Elimine las ubicaciones primero.',
      );
    }

    await this.prisma.almacen.update({
      where: { id },
      data: { activo: false },
    });

    this.logger.log(`Almacén desactivado: ${id}`);

    return {
      mensaje: 'Almacén desactivado correctamente',
      id,
    };
  }

  /**
   * Reactivar un almacén
   */
  async activateAlmacen(id: string, empresa_id: string) {
    this.logger.log(`Reactivando almacén: ${id}`);

    const almacen = await this.prisma.almacen.findFirst({
      where: { id, empresa_id },
    });

    if (!almacen) {
      throw new NotFoundException(`Almacén con ID ${id} no encontrado`);
    }

    if (almacen.activo) {
      throw new BadRequestException('El almacén ya está activo');
    }

    await this.prisma.almacen.update({
      where: { id },
      data: { activo: true },
    });

    this.logger.log(`Almacén reactivado: ${id}`);

    return {
      mensaje: 'Almacén reactivado correctamente',
      id,
    };
  }

  // ==========================================
  // UBICACIONES
  // ==========================================

  /**
   * Obtener todas las ubicaciones de un almacén
   */
  async findAllUbicaciones(almacen_id: string, empresa_id: string) {
    this.logger.log(`Obteniendo ubicaciones del almacén: ${almacen_id}`);

    // Verificar que el almacén pertenece a la empresa
    const almacen = await this.prisma.almacen.findFirst({
      where: { id: almacen_id, empresa_id },
    });

    if (!almacen) {
      throw new NotFoundException('Almacén no encontrado');
    }

    return this.prisma.ubicacion.findMany({
      where: { almacen_id },
      include: {
        ubicacion_padre: {
          select: {
            id: true,
            nombre: true,
            codigo: true,
          },
        },
        _count: {
          select: {
            ubicaciones_hijas: true,
          },
        },
      },
      orderBy: [{ nivel: 'asc' }, { codigo: 'asc' }],
    });
  }

  /**
   * Obtener jerarquía completa de ubicaciones
   */
  async getJerarquia(almacen_id: string, empresa_id: string) {
    this.logger.log(`Obteniendo jerarquía del almacén: ${almacen_id}`);

    // Verificar almacén
    const almacen = await this.prisma.almacen.findFirst({
      where: { id: almacen_id, empresa_id },
    });

    if (!almacen) {
      throw new NotFoundException('Almacén no encontrado');
    }

    // Obtener todas las ubicaciones
    const ubicaciones = await this.prisma.ubicacion.findMany({
      where: { almacen_id },
      orderBy: [{ nivel: 'asc' }, { codigo: 'asc' }],
    });

    // Construir árbol jerárquico
    const buildTree = (parent_id: string | null) => {
      return ubicaciones
        .filter((u) => u.ubicacion_padre_id === parent_id)
        .map((u) => ({
          ...u,
          hijos: buildTree(u.id),
        }));
    };

    return {
      almacen: {
        id: almacen.id,
        nombre: almacen.nombre,
        codigo: almacen.codigo,
      },
      ubicaciones: buildTree(null),
    };
  }

  /**
   * Obtener una ubicación específica
   */
  async findOneUbicacion(
    id: string,
    almacen_id: string,
    empresa_id: string,
  ) {
    this.logger.log(`Buscando ubicación: ${id}`);

    // Verificar almacén
    const almacen = await this.prisma.almacen.findFirst({
      where: { id: almacen_id, empresa_id },
    });

    if (!almacen) {
      throw new NotFoundException('Almacén no encontrado');
    }

    const ubicacion = await this.prisma.ubicacion.findFirst({
      where: {
        id,
        almacen_id,
      },
      include: {
        ubicacion_padre: true,
        ubicaciones_hijas: true,
        almacen: {
          select: {
            id: true,
            nombre: true,
            codigo: true,
          },
        },
      },
    });

    if (!ubicacion) {
      throw new NotFoundException(`Ubicación con ID ${id} no encontrada`);
    }

    return ubicacion;
  }

  /**
   * Crear una ubicación
   */
  async createUbicacion(
    almacen_id: string,
    createDto: CreateUbicacionDto,
    empresa_id: string,
  ) {
    this.logger.log(`Creando ubicación en almacén: ${almacen_id}`);

    // Verificar almacén
    const almacen = await this.prisma.almacen.findFirst({
      where: { id: almacen_id, empresa_id },
    });

    if (!almacen) {
      throw new NotFoundException('Almacén no encontrado');
    }

    // Verificar código único en el almacén
    const existing = await this.prisma.ubicacion.findFirst({
      where: {
        almacen_id,
        codigo: createDto.codigo,
      },
    });

    if (existing) {
      throw new ConflictException(
        `El código de ubicación ${createDto.codigo} ya existe en este almacén`,
      );
    }

    // Si tiene padre, verificar que existe y pertenece al mismo almacén
    if (createDto.ubicacion_padre_id) {
      const padre = await this.prisma.ubicacion.findFirst({
        where: {
          id: createDto.ubicacion_padre_id,
          almacen_id,
        },
      });

      if (!padre) {
        throw new NotFoundException('Ubicación padre no encontrada en este almacén');
      }
    }

    const ubicacion = await this.prisma.ubicacion.create({
      data: {
        ...createDto,
        almacen_id,
      },
      include: {
        ubicacion_padre: {
          select: {
            id: true,
            nombre: true,
            codigo: true,
          },
        },
        almacen: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });

    this.logger.log(`Ubicación creada: ${ubicacion.id}`);

    return {
      mensaje: 'Ubicación creada exitosamente',
      ubicacion: ubicacion.nombre,
      codigo: ubicacion.codigo,
      nivel: ubicacion.nivel,
      ruta: ubicacion.ruta_completa,
      detalles: ubicacion,
    };
  }

  /**
   * Actualizar una ubicación
   */
  async updateUbicacion(
    id: string,
    almacen_id: string,
    updateDto: UpdateUbicacionDto,
    empresa_id: string,
  ) {
    this.logger.log(`Actualizando ubicación: ${id}`);

    // Verificar almacén y ubicación
    const almacen = await this.prisma.almacen.findFirst({
      where: { id: almacen_id, empresa_id },
    });

    if (!almacen) {
      throw new NotFoundException('Almacén no encontrado');
    }

    const ubicacion = await this.prisma.ubicacion.findFirst({
      where: { id, almacen_id },
    });

    if (!ubicacion) {
      throw new NotFoundException('Ubicación no encontrada');
    }

    // Si se cambia el código, verificar que no exista
    if (updateDto.codigo && updateDto.codigo !== ubicacion.codigo) {
      const existing = await this.prisma.ubicacion.findFirst({
        where: {
          almacen_id,
          codigo: updateDto.codigo,
        },
      });

      if (existing) {
        throw new ConflictException('El código de ubicación ya existe');
      }
    }

    const actualizada = await this.prisma.ubicacion.update({
      where: { id },
      data: updateDto,
    });

    this.logger.log(`Ubicación actualizada: ${id}`);

    return {
      mensaje: 'Ubicación actualizada exitosamente',
      detalles: actualizada,
    };
  }

  /**
   * Eliminar una ubicación (soft delete)
   */
  async removeUbicacion(
    id: string,
    almacen_id: string,
    empresa_id: string,
  ) {
    this.logger.log(`Eliminando ubicación: ${id}`);

    // Verificar almacén
    const almacen = await this.prisma.almacen.findFirst({
      where: { id: almacen_id, empresa_id },
    });

    if (!almacen) {
      throw new NotFoundException('Almacén no encontrado');
    }

    const ubicacion = await this.prisma.ubicacion.findFirst({
      where: { id, almacen_id },
      include: {
        _count: {
          select: {
            ubicaciones_hijas: true,
          },
        },
      },
    });

    if (!ubicacion) {
      throw new NotFoundException('Ubicación no encontrada');
    }

    if (!ubicacion.activo) {
      throw new BadRequestException('La ubicación ya está inactiva');
    }

    // Verificar que no tenga ubicaciones hijas activas
    const hijasActivas = await this.prisma.ubicacion.count({
      where: {
        ubicacion_padre_id: id,
        activo: true,
      },
    });

    if (hijasActivas > 0) {
      throw new BadRequestException(
        'No se puede eliminar una ubicación con sub-ubicaciones activas. Elimine las sub-ubicaciones primero.',
      );
    }

    await this.prisma.ubicacion.update({
      where: { id },
      data: { activo: false },
    });

    this.logger.log(`Ubicación desactivada: ${id}`);

    return {
      mensaje: 'Ubicación desactivada correctamente',
      id,
    };
  }

  /**
   * Reactivar una ubicación
   */
  async activateUbicacion(
    id: string,
    almacen_id: string,
    empresa_id: string,
  ) {
    this.logger.log(`Reactivando ubicación: ${id}`);

    const almacen = await this.prisma.almacen.findFirst({
      where: { id: almacen_id, empresa_id },
    });

    if (!almacen) {
      throw new NotFoundException('Almacén no encontrado');
    }

    const ubicacion = await this.prisma.ubicacion.findFirst({
      where: { id, almacen_id },
    });

    if (!ubicacion) {
      throw new NotFoundException('Ubicación no encontrada');
    }

    if (ubicacion.activo) {
      throw new BadRequestException('La ubicación ya está activa');
    }

    await this.prisma.ubicacion.update({
      where: { id },
      data: { activo: true },
    });

    this.logger.log(`Ubicación reactivada: ${id}`);

    return {
      mensaje: 'Ubicación reactivada correctamente',
      id,
    };
  }

}