import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import * as currentUserDecorator from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { UsuariosDocs } from './docs/usuarios.docs';

/**
 * Controlador de Usuarios
 * 
 * Rutas base: /api/usuarios
 * 
 * Todos los endpoints requieren autenticación JWT
 * Algunos endpoints requieren rol de Administrador
 */
@Controller('usuarios')
@UseGuards(JwtAuthGuard, RolesGuard) // Proteger todos los endpoints
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  /**
   * GET /api/usuarios
   * @summary Obtener todos los usuarios de la empresa del usuario autenticado
   * @description Obtener todos los usuarios de la empresa del usuario autenticado
   * @roles Administrador, Operador, Consulta
   * @param user - El usuario autenticado
   * @returns Un array de usuarios
   */
  @Get()
  @UsuariosDocs.findAll()
  findAll( @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload ) {
    return this.usuariosService.findAll(user.empresaId);
  }

  /**
   * GET /api/usuarios/:id
   * @summary Obtener un usuario específico por ID
   * @description Obtener un usuario específico por ID
   * @param id - El ID del usuario
   * @param user - El usuario autenticado
   * @returns Un usuario
   * @roles Administrador, Operador, Consulta
   */
  @Get(':id')
  @UsuariosDocs.findOne()
  findOne(id: string, @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload) {
    return this.usuariosService.findOne(id, user.empresaId);
  }

  /**
   * POST /api/usuarios
   * @summary Crear un nuevo usuario
   * @description Crear un nuevo usuario
   * @param createUsuarioDto - El DTO para crear un usuario
   * @param user - El usuario autenticado
   * @returns Un usuario
   * @roles Solo Administrador
   */
  @Post()
  @Roles('Administrador') // Solo administradores pueden crear usuarios
  @UsuariosDocs.create()
  create(
    createUsuarioDto: CreateUsuarioDto,
    @currentUserDecorator.CurrentUser() 
    user: currentUserDecorator.UserPayload
  ) {
    return this.usuariosService.create(createUsuarioDto, user.id);
  }

  /**
   * PATCH /api/usuarios/:id
   * @summary Actualizar un usuario existente
   * @description Actualizar un usuario existente
   * @param id - El ID del usuario
   * @param updateUsuarioDto - El DTO para actualizar un usuario
   * @param user - El usuario autenticado
   * @returns Un usuario
   * @roles Solo Administrador
   */
  @Patch(':id')
  @Roles('Administrador')
  @UsuariosDocs.update()
  update(
    id: string,
    updateUsuarioDto: UpdateUsuarioDto,
    @currentUserDecorator.CurrentUser() 
    user: currentUserDecorator.UserPayload
  ) {
    return this.usuariosService.update(id, updateUsuarioDto, user.empresaId);
  }

  /**
   * DELETE /api/usuarios/:id
   * @summary Desactivar un usuario (soft delete)
   * @description Desactivar un usuario (soft delete)
   * @param id - El ID del usuario
   * @param user - El usuario autenticado
   * @returns Un usuario
   * @roles Solo Administrador
   */
  @Delete(':id')
  @Roles('Administrador')
  @UsuariosDocs.remove()
  remove(
    @Param('id') id: string,
    @currentUserDecorator.CurrentUser() 
    user: currentUserDecorator.UserPayload
  ) {
    return this.usuariosService.remove(id, user.empresaId);
  }

  /**
   * PATCH /api/usuarios/:id/activate
   * @summary Reactivar un usuario desactivado
   * @description Reactivar un usuario desactivado
   * @param id - El ID del usuario
   * @param user - El usuario autenticado
   * @returns Un usuario
   * @roles Solo Administrador
   */
  @Patch(':id/activate')
  @Roles('Administrador')
  @UsuariosDocs.activate()
  activate(
    @Param('id') id: string,
    @currentUserDecorator.CurrentUser() 
    user: currentUserDecorator.UserPayload
  ) {
    return this.usuariosService.activate(id, user.empresaId);
  }
}