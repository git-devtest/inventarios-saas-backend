import { Controller, Post, Get, Patch, Body, Param, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { InventariosService } from './inventarios.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { AddDetalleDto } from './dto/add-detalle.dto';
import { FiltroStockDto } from './dto/filtro-stock.dto';
import { FiltroKardexDto } from './dto/filtro-kardex.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { InventariosDocs } from './docs/inventarios.doc';

@ApiTags('Inventarios')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('inventarios')
export class InventariosController {
  constructor(private readonly inventariosService: InventariosService) {}

  // ==========================================
  // MOVIMIENTOS - ESPECÍFICOS
  // ==========================================

  /**
   * Crear nuevo movimiento de inventario
   * @endpoint POST /inventarios/movimientos
   */
  @Post('movimientos')
  @Roles('Administrador', 'Operador')
  @InventariosDocs.createMovimiento()
  async createMovimiento( @Body() createDto: CreateMovimientoDto, @CurrentUser() user: any ) {
    return this.inventariosService.createMovimiento( createDto, user.empresa_id, user.id, );
  }

  /**
   * Agregar productos a un movimiento
   * @endpoint POST /inventarios/movimientos/:id/detalles
   */
  @Post('movimientos/:id/detalles')
  @Roles('Administrador', 'Operador')
  @InventariosDocs.agregarProductoAlMovimiento()
  async addDetalle( @Param('id') movimiento_id: string, @Body() addDetalleDto: AddDetalleDto, @CurrentUser() user: any ) {
    return this.inventariosService.addDetalle( movimiento_id, addDetalleDto, user.empresa_id, user.id );
  }

  /**
   * Confirmar movimiento (afecta stock)
   * @endpoint PATCH /inventarios/movimientos/:id/confirmar
   */
  @Patch('movimientos/:id/confirmar')
  @Roles('Administrador', 'Operador')
  @InventariosDocs.confirmarMovimiento()
  async confirmarMovimiento( @Param('id') movimiento_id: string, @CurrentUser() user: any ) {
    return this.inventariosService.confirmarMovimiento(
      movimiento_id,
      user.empresa_id,
      user.id,
    );
  }

  /**
   * Anular movimiento confirmado
   * @endpoint PATCH /inventarios/movimientos/:id/anular
   */
  @Patch('movimientos/:id/anular')
  @Roles('Administrador')
  @InventariosDocs.anularMovimiento()
  async anularMovimiento( @Param('id') movimiento_id: string, @Body() body: { motivo: string }, @CurrentUser() user: any ) {
    if (!body.motivo) {
      throw new BadRequestException('El motivo de anulación es requerido');
    }
    return this.inventariosService.anularMovimiento( movimiento_id, body.motivo, user.empresa_id );
  }

  // ==========================================
  // MOVIMIENTOS - GENÉRICOS
  // ==========================================

  /**
   * Listar todos los movimientos
   * @endpoint GET /inventarios/movimientos
   */
  @Get('movimientos')
  @Roles('Administrador', 'Operador', 'Consulta')
  @InventariosDocs.listarMovimientos()
  async findAllMovimientos(@CurrentUser() user: any) {
    return this.inventariosService.findAllMovimientos(user.empresa_id);
  }

  /**
   * Obtener detalle de un movimiento
   * @endpoint GET /inventarios/movimientos/:id
   */
  @Get('movimientos/:id')
  @Roles('Administrador', 'Operador', 'Consulta')
  @InventariosDocs.obtenerDetalleMovimiento()
  async findOneMovimiento( @Param('id') movimiento_id: string, @CurrentUser() user: any ) {
    return this.inventariosService.findOneMovimiento(
      movimiento_id,
      user.empresa_id,
    );
  }

  // ==========================================
  // CONSULTAS
  // ==========================================

  /**
   * Consultar stock actual
   * @endpoint GET /inventarios/stock
   */
  @Get('stock')
  @Roles('Administrador', 'Operador', 'Consulta')
  @InventariosDocs.consultarStock()
  async getStock( @Query() filtros: FiltroStockDto, @CurrentUser() user: any ) {
    return this.inventariosService.getStock(filtros, user.empresa_id);
  }

  /**
   * Consultar kardex de un producto
   * @endpoint GET /inventarios/kardex
   */
  @Get('kardex')
  @Roles('Administrador', 'Operador', 'Consulta')
  @InventariosDocs.consultarKardex()
  async getKardex( @Query() filtros: FiltroKardexDto, @CurrentUser() user: any ) {
    return this.inventariosService.getKardex(filtros, user.empresa_id);
  }
}
