import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InventariosService } from './inventarios.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { AddDetalleDto } from './dto/add-detalle.dto';
import { FiltroStockDto } from './dto/filtro-stock.dto';
import { FiltroKardexDto } from './dto/filtro-kardex.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

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
  @Roles('Administrador', 'Operador Almacén')
  @ApiOperation({
    summary: 'Crear movimiento de inventario',
    description: 'Crea un nuevo movimiento en estado borrador',
  })
  @ApiResponse({
    status: 201,
    description: 'Movimiento creado exitosamente',
    schema: {
      example: {
        mensaje: 'Movimiento creado en estado borrador',
        tipo: 'ENTRADA',
        almacen_origen: 'Almacén Principal',
        almacen_destino: null,
        detalles: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          empresa_id: 'empresa-123',
          tipo_movimiento_id: 'tipo-001',
          almacen_origen_id: 'almacen-001',
          almacen_destino_id: null,
          estado: 'borrador',
          fecha_movimiento: '2024-12-21T12:00:00Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o tipo de movimiento no encontrado',
  })
  async createMovimiento(
    @Body() createDto: CreateMovimientoDto,
    @CurrentUser() user: any,
  ) {
    return this.inventariosService.createMovimiento(
      createDto,
      user.empresa_id,
      user.id,
    );
  }

  /**
   * Agregar productos a un movimiento
   * @endpoint POST /inventarios/movimientos/:id/detalles
   */
  @Post('movimientos/:id/detalles')
  @Roles('Administrador', 'Operador Almacén')
  @ApiOperation({
    summary: 'Agregar producto al movimiento',
    description:
      'Agrega un producto con cantidad al movimiento (solo en estado borrador)',
  })
  @ApiResponse({
    status: 201,
    description: 'Producto agregado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Movimiento o producto no encontrado',
  })
  async addDetalle(
    @Param('id') movimiento_id: string,
    @Body() addDetalleDto: AddDetalleDto,
    @CurrentUser() user: any,
  ) {
    return this.inventariosService.addDetalle(
      movimiento_id,
      addDetalleDto,
      user.empresa_id,
      user.id,
    );
  }

  /**
   * Confirmar movimiento (afecta stock)
   * @endpoint PATCH /inventarios/movimientos/:id/confirmar
   */
  @Patch('movimientos/:id/confirmar')
  @Roles('Administrador', 'Operador Almacén')
  @ApiOperation({
    summary: 'Confirmar movimiento de inventario',
    description:
      'Confirma un movimiento en borrador y aplica los cambios de stock',
  })
  @ApiResponse({
    status: 200,
    description: 'Movimiento confirmado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Movimiento no encontrado',
  })
  @ApiResponse({
    status: 400,
    description:
      'Movimiento no está en borrador o no tiene productos o stock insuficiente',
  })
  async confirmarMovimiento(
    @Param('id') movimiento_id: string,
    @CurrentUser() user: any,
  ) {
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
  @ApiOperation({
    summary: 'Anular movimiento de inventario',
    description:
      'Anula un movimiento confirmado (no revierte el stock, solo marca como anulado)',
  })
  @ApiResponse({
    status: 200,
    description: 'Movimiento anulado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Movimiento no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Movimiento no está en estado confirmado',
  })
  async anularMovimiento(
    @Param('id') movimiento_id: string,
    @Body() body: { motivo: string },
    @CurrentUser() user: any,
  ) {
    if (!body.motivo) {
      throw new BadRequestException('El motivo de anulación es requerido');
    }
    return this.inventariosService.anularMovimiento(
      movimiento_id,
      body.motivo,
      user.empresa_id,
    );
  }

  // ==========================================
  // MOVIMIENTOS - GENÉRICOS
  // ==========================================

  /**
   * Listar todos los movimientos
   * @endpoint GET /inventarios/movimientos
   */
  @Get('movimientos')
  @Roles('Administrador', 'Operador Almacén', 'Consulta')
  @ApiOperation({
    summary: 'Listar movimientos de inventario',
    description: 'Obtiene los últimos 100 movimientos ordenados por fecha',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de movimientos obtenida',
    schema: {
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          empresa_id: 'empresa-123',
          tipo_movimiento_id: 'tipo-001',
          estado: 'confirmado',
          fecha_movimiento: '2024-12-21T12:00:00Z',
          tipo_movimiento: {
            nombre: 'ENTRADA',
          },
          almacen_origen: {
            nombre: 'Almacén Principal',
          },
          _count: {
            detalles: 5,
          },
        },
      ],
    },
  })
  async findAllMovimientos(@CurrentUser() user: any) {
    return this.inventariosService.findAllMovimientos(user.empresa_id);
  }

  /**
   * Obtener detalle de un movimiento
   * @endpoint GET /inventarios/movimientos/:id
   */
  @Get('movimientos/:id')
  @Roles('Administrador', 'Operador Almacén', 'Consulta')
  @ApiOperation({
    summary: 'Obtener detalle de un movimiento',
    description:
      'Obtiene todos los detalles y productos de un movimiento específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalle del movimiento obtenido',
  })
  @ApiResponse({
    status: 404,
    description: 'Movimiento no encontrado',
  })
  async findOneMovimiento(
    @Param('id') movimiento_id: string,
    @CurrentUser() user: any,
  ) {
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
  @Roles('Administrador', 'Operador Almacén', 'Consulta')
  @ApiOperation({
    summary: 'Consultar stock actual',
    description:
      'Obtiene el stock disponible filtrado por producto y/o almacén',
  })
  @ApiResponse({
    status: 200,
    description: 'Stock consultado exitosamente',
    schema: {
      example: [
        {
          producto: {
            id: 'prod-001',
            nombre: 'Laptop Dell',
            codigo: 'LAP-001',
          },
          almacen_id: 'almacen-001',
          almacen: {
            nombre: 'Almacén Principal',
          },
          stock: 25.5,
          unidad: {
            nombre: 'Unidad',
            abreviatura: 'Un',
          },
        },
      ],
    },
  })
  async getStock(
    @Body() filtros: FiltroStockDto,
    @CurrentUser() user: any,
  ) {
    return this.inventariosService.getStock(filtros, user.empresa_id);
  }

  /**
   * Consultar kardex de un producto
   * @endpoint GET /inventarios/kardex
   */
  @Get('kardex')
  @Roles('Administrador', 'Operador Almacén', 'Consulta')
  @ApiOperation({
    summary: 'Consultar kardex de un producto',
    description:
      'Obtiene el histórico de movimientos de un producto con saldo acumulado',
  })
  @ApiResponse({
    status: 200,
    description: 'Kardex generado exitosamente',
    schema: {
      example: {
        producto: {
          id: 'prod-001',
          nombre: 'Laptop Dell',
          codigo: 'LAP-001',
        },
        movimientos: [
          {
            fecha: '2024-01-01T10:00:00Z',
            tipo: 'ENTRADA',
            entrada: 10,
            salida: 0,
            saldo: 10,
            usuario: 'Juan Pérez',
          },
          {
            fecha: '2024-01-15T14:00:00Z',
            tipo: 'SALIDA',
            entrada: 0,
            salida: 3,
            saldo: 7,
            usuario: 'María García',
          },
        ],
        saldo_final: 7,
      },
    },
  })
  async getKardex(
    @Body() filtros: FiltroKardexDto,
    @CurrentUser() user: any,
  ) {
    return this.inventariosService.getKardex(filtros, user.empresa_id);
  }
}
