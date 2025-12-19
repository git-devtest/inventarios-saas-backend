import { Injectable, NotFoundException, ConflictException, BadRequestException, } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { logger } from 'winston_logs/logger';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  /**
   * @summary Obtener todos los usuarios de una empresa
   * @description Obtener todos los usuarios de una empresa
   * @param empresaId - El ID de la empresa
   * @returns Un array de usuarios
   */
  async findAll(empresaId: string) {
    return this.prisma.usuario.findMany({
      where: {
        empresa_id: empresaId,
        activo: true, // Solo usuarios activos
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        activo: true,
        empresa_id: true,
        rol_id: true,
        fecha_creacion: true,
        fecha_actualizacion: true,
        ultimo_acceso: true,
        rol: {
          select: {
            id: true,
            nombre: true,
          },
        },
        empresa: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
      orderBy: {
        fecha_creacion: 'desc',
      },
    });
  }

  /** 
   * @summary Obtener un usuario por ID
   * @description Obtener un usuario por ID
   * @param id - El ID del usuario
   * @param empresaId - El ID de la empresa
   * @returns Un usuario
   */
  async findOne(id: string, empresaId: string) {
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        id,
        empresa_id: empresaId,
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        activo: true,
        empresa_id: true,
        rol_id: true,
        fecha_creacion: true,
        fecha_actualizacion: true,
        ultimo_acceso: true,
        rol: {
          select: {
            id: true,
            nombre: true,
            descripcion: true,
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

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID [${id}] no encontrado`);
    }

    return usuario;
  }

  /**
   * @summary Crear un nuevo usuario
   * @description Crear un nuevo usuario
   * @param createUsuarioDto - El DTO para crear un usuario
   * @param creadorId - El ID del usuario que crea el usuario
   * @returns Un usuario
   */
  async create(createUsuarioDto: CreateUsuarioDto, creadorId: string) {
    // Verificar si el email ya existe
    const existingUser = await this.prisma.usuario.findUnique({
      where: { email: createUsuarioDto.email },
    });

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Verificar que la empresa existe
    const empresa = await this.prisma.empresa.findUnique({
      where: { id: createUsuarioDto.empresaId },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa no encontrada');
    }

    // Verificar que el rol existe
    const rol = await this.prisma.rol.findUnique({
      where: { id: createUsuarioDto.rolId },
    });

    if (!rol) {
      throw new NotFoundException('Rol no encontrado');
    }

    // Encriptar password
    const passwordHash = await bcrypt.hash(createUsuarioDto.password, 10);

    // Crear usuario
    const usuario = await this.prisma.usuario.create({
      data: {
        nombre: createUsuarioDto.nombre,
        email: createUsuarioDto.email,
        password_hash: passwordHash,
        empresa_id: createUsuarioDto.empresaId,
        rol_id: createUsuarioDto.rolId,
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        activo: true,
        empresa_id: true,
        rol_id: true,
        fecha_creacion: true,
        rol: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });
    logger.info(`Usuario: [${usuario.id}] creado exitosamente`);
    return usuario;
  }

  /**
   * @summary Actualizar un usuario
   * @description Actualizar un usuario
   * @param id - El ID del usuario
   * @param updateUsuarioDto - El DTO para actualizar un usuario
   * @param empresaId - El ID de la empresa
   * @returns Un usuario
   */
  async update(id: string, updateUsuarioDto: UpdateUsuarioDto, empresaId: string) {
    // Verificar que el usuario existe y pertenece a la empresa
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        id,
        empresa_id: empresaId,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // Si se está actualizando el email, verificar que no exista
    if (updateUsuarioDto.email && updateUsuarioDto.email !== usuario.email) {
      const existingUser = await this.prisma.usuario.findUnique({
        where: { email: updateUsuarioDto.email },
      });

      if (existingUser) {
        throw new ConflictException('El email ya está registrado');
      }
    }

    // Si se está actualizando el rol, verificar que existe
    if (updateUsuarioDto.rolId) {
      const rol = await this.prisma.rol.findUnique({
        where: { id: updateUsuarioDto.rolId },
      });

      if (!rol) {
        throw new NotFoundException('Rol no encontrado');
      }
    }

    // Actualizar usuario
    const usuarioActualizado = await this.prisma.usuario.update({
      where: { id },
      data: updateUsuarioDto,
      select: {
        id: true,
        nombre: true,
        email: true,
        activo: true,
        empresa_id: true,
        rol_id: true,
        fecha_creacion: true,
        fecha_actualizacion: true,
        rol: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });
    logger.info(`Usuario: [${id}] actualizado exitosamente`);
    return usuarioActualizado;
  }

  /**
   * @summary Eliminar usuario (soft delete)
   * @description Eliminar usuario (soft delete)
   * @param id - El ID del usuario
   * @param empresaId - El ID de la empresa
   * @returns Un usuario
   */
  async remove(id: string, empresaId: string) {
    // Verificar que el usuario existe y pertenece a la empresa
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        id,
        empresa_id: empresaId,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    if (!usuario.activo) {
      throw new BadRequestException('El usuario ya está inactivo');
    }

    // Soft delete (marcar como inactivo)
    await this.prisma.usuario.update({
      where: { id },
      data: { activo: false },
    });
    logger.info(`Usuario: [${id}] desactivado exitosamente`);
    return {
      message: 'Usuario desactivado correctamente',
      id,
    };
  }

  /**
   * @summary Reactivar un usuario
   * @description Reactivar un usuario
   * @param id - El ID del usuario
   * @param empresaId - El ID de la empresa
   * @returns Un usuario
   */
  async activate(id: string, empresaId: string) {
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        id,
        empresa_id: empresaId,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    if (usuario.activo) {
      throw new BadRequestException('El usuario ya está activo');
    }

    await this.prisma.usuario.update({
      where: { id },
      data: { activo: true },
    });
    logger.info(`Usuario: [${id}] reactivado exitosamente`);
    return {
      message: 'Usuario reactivado correctamente',
      id,
    };
  }
}