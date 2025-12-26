import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AlmacenesService } from './almacenes.service';
import { CreateAlmacenDto } from './dto/create-almacen.dto';
import { UpdateAlmacenDto } from './dto/update-almacen.dto';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import * as currentUserDecorator from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { AlmacenesDocs } from './docs/almacenes.docs';


@Controller('almacenes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AlmacenesController {
  constructor(private readonly almacenesService: AlmacenesService) {}

  // ==========================================
  // ENDPOINTS RUTAS ESPECÍFICAS
  // ==========================================

  /**
   * PATCH /api/almacenes/:id/activate
   * Reactivar un almacén desactivado
   */
  @Patch(':id/activate')
  @Roles('Administrador')
  @AlmacenesDocs.activateAlmacen()
  activate( id: string, @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload) {
    return this.almacenesService.activateAlmacen(id, user.empresa_id);
  }

  /**
   * GET /api/almacenes/:almacen_id/ubicaciones
   * Listar ubicaciones de un almacén
   */
  @Get(':almacen_id/ubicaciones')
  @Roles('Administrador', 'Operador')
  @AlmacenesDocs.findAllUbicaciones()
  findAllUbicaciones(
    @Param('almacen_id') almacen_id: string,
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload,
  ) {
    return this.almacenesService.findAllUbicaciones(
      almacen_id,
      user.empresa_id,
    );
  }

  /**
   * GET /api/almacenes
   * Listar todos los almacenes de la empresa
   */
  @Get()
  @Roles('Administrador', 'Operador')
  @AlmacenesDocs.findAllAlmacenes()
  findAll(
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload) {
    return this.almacenesService.findAllAlmacenes(user.empresa_id);
  }

  /**
   * GET /api/almacenes/:id
   * Obtener un almacén específico
   */
  @Get(':id')
  @Roles('Administrador', 'Operador')
  @AlmacenesDocs.findAlmacenId()
  findOne(
    @Param('id') id: string, 
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload) {
    return this.almacenesService.findOneAlmacen(id, user.empresa_id);
  }

  /**
   * POST /api/almacenes
   * Crear un nuevo almacén
   */
  @Post()
  @Roles('Administrador', 'Operador')
  @AlmacenesDocs.createAlmacen()
  create(
    @Body() createAlmacenDto: CreateAlmacenDto,
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload,
  ) {
    return this.almacenesService.createAlmacen(
      createAlmacenDto,
      user.empresa_id,
    );
  }

  /**
   * PATCH /api/almacenes/:id
   * Actualizar un almacén
   */
  @Patch(':id')
  @Roles('Administrador', 'Operador')
  @AlmacenesDocs.updateAlmacen()
  update(
    @Param('id') id: string,
    @Body() updateAlmacenDto: UpdateAlmacenDto,
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload,
  ) {
    return this.almacenesService.updateAlmacen(
      id,
      updateAlmacenDto,
      user.empresa_id,
    );
  }

  /**
   * DELETE /api/almacenes/:id
   * Desactivar un almacén (soft delete)
   */
  @Delete(':id')
  @Roles('Administrador')
  @AlmacenesDocs.removeAlmacen()
  remove(
    @Param('id') id: string, 
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload) {
    return this.almacenesService.removeAlmacen(id, user.empresa_id);
  }

  // ==========================================
  // ENDPOINTS DE UBICACIONES (ALMACENES)
  // ==========================================

  /**
   * GET /api/almacenes/:almacen_id/ubicaciones/jerarquia
   * Obtener jerarquía completa de ubicaciones
   */
  @Get(':almacen_id/ubicaciones/jerarquia')
  @Roles('Administrador', 'Operador')
  @AlmacenesDocs.obtenerJerarquiaAlmacen()
  getJerarquia(
    @Param('almacen_id') almacen_id: string,
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload,
  ) {
    return this.almacenesService.getJerarquia(almacen_id, user.empresa_id);
  }

  /**
   * GET /api/almacenes/:almacen_id/ubicaciones/:id
   * Obtener una ubicación específica
   */
  @Get(':almacen_id/ubicaciones/:id')
  @Roles('Administrador', 'Operador')
  @AlmacenesDocs.findUbicacionId()
  findOneUbicacion(
    @Param('almacen_id') almacen_id: string,
    @Param('id') id: string,
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload,
  ) {
    return this.almacenesService.findOneUbicacion(
      id,
      almacen_id,
      user.empresa_id,
    );
  }

  /**
   * POST /api/almacenes/:almacen_id/ubicaciones
   * Crear una ubicación en un almacén
   */
  @Post(':almacen_id/ubicaciones')
  @Roles('Administrador', 'Operador')
  @AlmacenesDocs.createUbicacion()
  createUbicacion(
    @Param('almacen_id') almacen_id: string,
    @Body() createUbicacionDto: CreateUbicacionDto,
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload,
  ) {
    return this.almacenesService.createUbicacion(
      almacen_id,
      createUbicacionDto,
      user.empresa_id,
    );
  }

  /**
   * PATCH /api/almacenes/:almacen_id/ubicaciones/:id
   * Actualizar una ubicación
   */
  @Patch(':almacen_id/ubicaciones/:id')
  @Roles('Administrador', 'Operador')
  @AlmacenesDocs.updateUbicacion()
  updateUbicacion(
    @Param('almacen_id') almacen_id: string,
    @Param('id') id: string,
    @Body() updateUbicacionDto: UpdateUbicacionDto,
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload,
  ) {
    return this.almacenesService.updateUbicacion(
      id,
      almacen_id,
      updateUbicacionDto,
      user.empresa_id,
    );
  }

  /**
   * DELETE /api/almacenes/:almacen_id/ubicaciones/:id
   * Eliminar una ubicación (soft delete)
   */
  @Delete(':almacen_id/ubicaciones/:id')
  @Roles('Administrador')
  @AlmacenesDocs.removeUbicacion()
  removeUbicacion(
    @Param('almacen_id') almacen_id: string,
    @Param('id') id: string,
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload,
  ) {
    return this.almacenesService.removeUbicacion(
      id,
      almacen_id,
      user.empresa_id,
    );
  }

  /**
   * PATCH /api/almacenes/:almacen_id/ubicaciones/:id/activate
   * Reactivar una ubicación desactivada
   */
  @Patch(':almacen_id/ubicaciones/:id/activate')
  @Roles('Administrador')
  @AlmacenesDocs.activateUbicacion()
  activateUbicacion(
    @Param('almacen_id') almacen_id: string,
    @Param('id') id: string,
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload,
  ) {
    return this.almacenesService.activateUbicacion(
      id,
      almacen_id,
      user.empresa_id,
    );
  }
}