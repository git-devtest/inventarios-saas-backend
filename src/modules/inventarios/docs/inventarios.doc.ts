import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiBearerAuth, ApiBody, ApiResponse } from "@nestjs/swagger";
import { CreateMovimientoDto } from '../dto/create-movimiento.dto';
import { AddDetalleDto } from "../dto/add-detalle.dto";

export const InventariosDocs = {
	createMovimiento: () => {
		return applyDecorators(
			ApiOperation({ summary: 'Crear movimiento de inventario',
				description:
					'Crea un movimiento de inventario en estado borrador. ' +
					'El movimiento no afecta el stock hasta que sea confirmado.',
			}),
			ApiBody({ description: 'Datos necesarios para crear el movimiento de inventario',
				type: CreateMovimientoDto,
			}),
			ApiResponse({ status: 201, description: 'Movimiento creado exitosamente en estado borrador' }),
			ApiResponse({ status: 400, description: 'Datos inválidos o reglas de negocio incumplidas' }),
			ApiResponse({ status: 401, description: 'Token de autenticación inválido o ausente' }),
			ApiResponse({ status: 403, description: 'El usuario no tiene permisos para agregar productos al movimiento' }),
			ApiResponse({ status: 404, description: 'Movimiento o producto no encontrado' }),
		);
	},

	agregarProductoAlMovimiento: () => {
		return applyDecorators(
			ApiOperation({ summary: 'Agregar producto al movimiento',
				description:
					'Agrega un producto con cantidad al movimiento (solo en estado borrador)',
			}),
			ApiBody({ description: 'Datos necesarios para agregar un producto al movimiento',
				type: AddDetalleDto,
			}),
			ApiResponse({ status: 201, description: 'Producto agregado exitosamente' }),
			ApiResponse({ status: 400, description: 'Datos inválidos o reglas de negocio incumplidas' }),
			ApiResponse({ status: 401, description: 'Token de autenticación inválido o ausente' }),
			ApiResponse({ status: 403, description: 'El usuario no tiene permisos para agregar productos al movimiento' }),
			ApiResponse({ status: 404, description: 'Movimiento o producto no encontrado' }),
		);
	},

	confirmarMovimiento: () => {
		return applyDecorators(
			ApiOperation({ summary: 'Confirmar movimiento de inventario',
				description:
					'Confirma un movimiento en borrador y aplica los cambios de stock',
			}),
			ApiResponse({ status: 200, description: 'Movimiento confirmado exitosamente' }),
			ApiResponse({ status: 400, description: 'Datos inválidos o reglas de negocio incumplidas' }),
			ApiResponse({ status: 401, description: 'Token de autenticación inválido o ausente' }),
			ApiResponse({ status: 403, description: 'El usuario no tiene permisos para confirmar movimientos' }),
			ApiResponse({ status: 404, description: 'Movimiento o producto no encontrado' }),
		);
	},

	anularMovimiento: () => {
		return applyDecorators(
			ApiOperation({ summary: 'Anular movimiento de inventario',
				description:
					'Anula un movimiento confirmado (no revierte el stock, solo marca como anulado)',
			}),
			ApiResponse({ status: 200, description: 'Movimiento anulado correctamente', }),
			ApiResponse({ status: 400, description: 'Datos inválidos o reglas de negocio incumplidas' }),
			ApiResponse({ status: 401, description: 'Token de autenticación inválido o ausente' }),
			ApiResponse({ status: 403, description: 'El usuario no tiene permisos para anular movimientos' }),
			ApiResponse({ status: 404, description: 'Movimiento o producto no encontrado' }),
		);
	},

	listarMovimientos: () => {
		return applyDecorators(
			ApiOperation({ summary: 'Listar movimientos de inventario',
				description: 'Obtiene los últimos 100 movimientos ordenados por fecha',
			}),
			ApiResponse({ status: 200, description: 'Lista de movimientos obtenida exitosamente' }),
			ApiResponse({ status: 401, description: 'Token de autenticación inválido o ausente' }),
			ApiResponse({ status: 403, description: 'El usuario no tiene permisos para consultar movimientos' }),
		);
	},

	obtenerDetalleMovimiento: () => {
		return applyDecorators(
			ApiOperation({ summary: 'Obtener detalle de un movimiento',
				description:
					'Obtiene todos los detalles y productos de un movimiento específico',
			}),
			ApiResponse({ status: 200, description: 'Detalle del movimiento obtenido' }),
			ApiResponse({ status: 401, description: 'Token de autenticación inválido o ausente' }),
			ApiResponse({ status: 403, description: 'El usuario no tiene permisos para consultar detalles de movimientos' }),
		);
	},

	consultarStock: () => {
		return applyDecorators(
			ApiOperation({ summary: 'Consultar stock actual',
				description:
					'Obtiene el stock disponible filtrado por producto y/o almacén',
			}),
			ApiResponse({ status: 200, description: 'Stock consultado exitosamente' }),
			ApiResponse({ status: 401, description: 'Token de autenticación inválido o ausente' }),
			ApiResponse({ status: 403, description: 'El usuario no tiene permisos para consultar el stock' }),
		);
	},

	consultarKardex: () => {
		return applyDecorators(
			ApiOperation({ summary: 'Consultar kardex de un producto',
				description:
					'Obtiene el histórico de movimientos de un producto con saldo acumulado',
			}),
			ApiResponse({ status: 200, description: 'Kardex consultado exitosamente' }),
			ApiResponse({ status: 400, description: 'Error al consultar Kardex o Reglas del negocio incumplidas' }),
			ApiResponse({ status: 401, description: 'Token de autenticación inválido o ausente' }),
			ApiResponse({ status: 403, description: 'El usuario no tiene permisos para consultar el kardex' }),
		);
	}
}