import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { AddUnidadMedidaDto } from './dto/add-unidad-medida.dto';
import { ConfigStockDto } from './dto/config-stock.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import * as currentUserDecorator from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { ProductosDocs } from './docs/productos.docs';

@Controller('productos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  /**
   * GET /api/productos/unidades-medida
   * Obtener catálogo de unidades de medida disponibles
   */
  @Get('unidades-medida')
  @Roles('Administrador', 'Operador')
  @ProductosDocs.getUnidadesMedida()
  getUnidadesMedida() {
    return this.productosService.getUnidadesMedida();
  }

  /**
   * GET /api/productos/search
   * Buscar productos por código o nombre
   */
  @Get('search')
  @Roles('Administrador', 'Operador')
  @ProductosDocs.search()
  search(
    @Query('q') query: string,
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload,
  ) {
    return this.productosService.search(user.empresaId, query);
  }

  /**
   * GET /api/productos
   * Listar todos los productos de la empresa
   */
  @Get()
  @Roles('Administrador')
  @ProductosDocs.findAll()
  findAll(@currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload) {
    return this.productosService.findAll(user.empresaId);
  }

  /**
   * GET /api/productos/:id
   * Obtener un producto específico
   */
  @Get(':id')
  @Roles('Administrador', 'Operador')
  @ProductosDocs.findOne()
  findOne(
    @Param('id') id: string,
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload,
  ) {
    return this.productosService.findOne(id, user.empresaId);
  }

  /**
   * POST /api/productos
   * Crear un nuevo producto
   */
  @Post()
  @Roles('Administrador', 'Operador')
  @ProductosDocs.create()
  create(
    @Body() createProductoDto: CreateProductoDto,
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload,
  ) {
    return this.productosService.create(createProductoDto, user.empresaId);
  }

  /**
   * PATCH /api/productos/:id
   * Actualizar un producto
   */
  @Patch(':id')
  @Roles('Administrador', 'Operador')
  @ProductosDocs.update()
  update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload,
  ) {
    return this.productosService.update(id, updateProductoDto, user.empresaId);
  }

  /**
   * DELETE /api/productos/:id
   * Desactivar un producto (soft delete)
   */
  @Delete(':id')
  @Roles('Administrador', 'Operador')
  @ProductosDocs.remove()
  remove(
    @Param('id') id: string,
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload,
  ) {
    return this.productosService.remove(id, user.empresaId);
  }

  /**
   * POST /api/productos/:id/unidades
   * Agregar unidad de medida a un producto
   */
  @Post(':id/unidades')
  @Roles('Administrador', 'Operador')
  @ProductosDocs.addUnidadMedida()
  addUnidadMedida(
    @Param('id') id: string,
    @Body() addUnidadDto: AddUnidadMedidaDto,
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload,
  ) {
    return this.productosService.addUnidadMedida(id, addUnidadDto, user.empresaId);
  }

  /**
   * POST /api/productos/:id/stock-config
   * Configurar stock mínimo/máximo para un producto en un almacén
   */
  @Post(':id/stock-config')
  @Roles('Administrador', 'Operador')
  @ProductosDocs.configStock()
  configStock(
    @Param('id') id: string,
    @Body() configDto: ConfigStockDto,
    @currentUserDecorator.CurrentUser() user: currentUserDecorator.UserPayload,
  ) {
    return this.productosService.configStock(id, configDto, user.empresaId);
  }
}