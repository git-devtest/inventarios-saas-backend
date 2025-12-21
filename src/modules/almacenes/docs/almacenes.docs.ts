import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CreateAlmacenDto } from '../dto/create-almacen.dto';
import { UpdateAlmacenDto } from '../dto/update-almacen.dto';

export const AlmacenesDocs = {
    findAllAlmacenes: () => {
        return applyDecorators(
            ApiTags('Almacenes'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Listar todos los almacenes de la empresa',
                description: 'Lista todos los almacenes de la empresa'
            }),
            ApiResponse({ status: 200, description: 'Lista de almacenes',
                example: {
                    "success": true,
                    "data": [
                        {
                            "id": "6942e7ae-73b1-4571-abb5-485462ee7566",
                            "empresa_id": "7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                            "nombre": "Almacén Secundario",
                            "codigo": "ALM-002",
                            "direccion": "Carrera 50 #30-20, Medellín",
                            "activo": true,
                            "fecha_creacion": "2025-12-19T03:10:22.317Z",
                            "fecha_actualizacion": "2025-12-19T03:10:22.317Z",
                            "_count": {
                                "ubicaciones": 0,
                                "movimientos_origen": 0,
                                "movimientos_destino": 0
                            }
                        },
                        {
                            "id": "b76fdf6a-4144-43df-b425-4ec1d0485ba8",
                            "empresa_id": "7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                            "nombre": "Almacén Principal",
                            "codigo": "ALM-001",
                            "direccion": "Calle 123 #45-67, Bogotá",
                            "activo": true,
                            "fecha_creacion": "2025-12-19T03:10:22.313Z",
                            "fecha_actualizacion": "2025-12-19T03:10:22.313Z",
                            "_count": {
                                "ubicaciones": 3,
                                "movimientos_origen": 1,
                                "movimientos_destino": 0
                            }
                        }
                    ],
                    "timestamp": "2025-12-20T23:52:02.580Z"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-20T23:53:01.842Z",
                    "path": "/api/almacenes"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success": false,
                    "statusCode": 403,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-20T23:53:01.842Z",
                    "path": "/api/almacenes"
                }
            }),
            ApiResponse({ status: 404, description: 'Almacenes no encontrados',
                example: {
                    "success": false,
                    "statusCode": 404,
                    "message": "Cannot GET /api/almacenes",
                    "errors": null,
                    "timestamp": "2025-12-20T23:50:24.096Z",
                    "path": "/api/almacenes"
                }
            }),
            ApiResponse({ status: 500, description: 'Error interno del servidor' }),
        );
    },

    findAlmacenId: () => {
        return applyDecorators(
            ApiTags('Almacenes'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Obtener un almacén por ID',
                description: 'Obtiene un almacén por ID'
            }),
            ApiParam({ name: 'id', description: 'ID del almacén', required: true }),
            ApiResponse({ status: 200, description: 'Almacén encontrado',
                example: {
                    "success": true,
                    "data": {
                        "id": "b76fdf6a-4144-43df-b425-4ec1d0485ba8",
                        "empresa_id": "7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                        "nombre": "Almacén Principal",
                        "codigo": "ALM-001",
                        "direccion": "Calle 123 #45-67, Bogotá",
                        "activo": true,
                        "fecha_creacion": "2025-12-19T03:10:22.313Z",
                        "fecha_actualizacion": "2025-12-19T03:10:22.313Z",
                        "ubicaciones": [
                            {
                                "id": "3b0cb868-1729-4037-925d-4167883e5dc4",
                                "almacen_id": "b76fdf6a-4144-43df-b425-4ec1d0485ba8",
                                "ubicacion_padre_id": null,
                                "nombre": "Zona A",
                                "codigo": "A",
                                "nivel": 1,
                                "ruta_completa": null,
                                "fecha_creacion": "2025-12-19T03:10:22.320Z",
                                "fecha_actualizacion": "2025-12-19T03:10:22.320Z"
                            }
                        ],
                        "empresa": {
                            "id": "7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                            "nombre": "Distribuidora El Éxito SAS"
                        },
                        "_count": {
                            "ubicaciones": 3,
                            "producto_almacenes": 3
                        }
                    },
                    "timestamp": "2025-12-21T00:01:25.333Z"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-20T23:53:01.842Z",
                    "path": "/api/almacenes"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success": false,
                    "statusCode": 403,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-20T23:53:01.842Z",
                    "path": "/api/almacenes"
                }
            }),
            ApiResponse({ status: 404, description: 'Almacén no encontrado',
                example: {
                    "success": false,
                    "statusCode": 404,
                    "message": "Almacén no encontrado",
                    "errors": null,
                    "timestamp": "2025-12-20T23:50:24.096Z",
                    "path": "/api/almacenes"
                }
            })
        );
    },

    createAlmacen: () => {
        return applyDecorators(
            ApiTags('Almacenes'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Crear un almacén',
                description: 'Crea un almacén'
            }),
            ApiBody({ type: CreateAlmacenDto }),
            ApiResponse({ status: 201, description: 'Almacén creado exitosamente',
                example: {
                    "success":true,
                    "data":{
                        "mensaje":"Almacén creado exitosamente",
                        "almacen":"Almacén Secundario",
                        "codigo":"ALM-003",
                        "detalles":{
                            "id":"9b3bdf67-8ebd-462b-9e17-8bf66b51bca6",
                            "empresa_id":"7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                            "nombre":"Almacén Secundario",
                            "codigo":"ALM-003",
                            "direccion":"Carrera 87A # 127-59, Bogotá",
                            "activo":true,
                            "fecha_creacion":"2025-12-21T01:16:42.551Z",
                            "fecha_actualizacion":"2025-12-21T01:16:42.551Z",
                            "empresa":{
                                "id":"7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                                "nombre":"Distribuidora El Éxito SAS"
                            }
                        }
                    },
                    "timestamp":"2025-12-21T01:16:42.569Z"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T00:39:43.908Z",
                    "path": "/api/almacenes"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T00:39:43.908Z",
                    "path": "/api/almacenes"
                }
            }),
            ApiResponse({ status: 409, description: 'El código de almacén ya existe',
                example: {
                    "success": false,
                    "statusCode": 409,
                    "message": "El código de almacén ALM-001 ya existe",
                    "errors": null,
                    "timestamp": "2025-12-21T00:37:34.748Z",
                    "path": "/api/almacenes"
                }
            }),
        );
    },

    updateAlmacen: () => {
        return applyDecorators(
            ApiTags('Almacenes'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Actualizar un almacén',
                description: 'Actualiza un almacén'
            }), 
            ApiBody({ type: UpdateAlmacenDto }),
            ApiResponse({ status: 200, description: 'Almacén actualizado exitosamente',
                example: {
                    "success":true,
                    "data":{
                        "mensaje":"Almacén actualizado exitosamente",
                        "detalles":{
                            "id":"9b3bdf67-8ebd-462b-9e17-8bf66b51bca6",
                            "empresa_id":"7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                            "nombre":"Almacén Secundario Actualizado",
                            "codigo":"ALM-003",
                            "direccion":"Calle 7A # 1A-85, Jamundí",
                            "activo":false,
                            "fecha_creacion":"2025-12-21T01:16:42.551Z",
                            "fecha_actualizacion":"2025-12-21T01:40:49.618Z"
                        }
                    },
                    "timestamp":"2025-12-21T01:40:49.645Z"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T00:39:43.908Z",
                    "path": "/api/almacenes"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T00:39:43.908Z",
                    "path": "/api/almacenes"
                }
            }),
            ApiResponse({ status: 404, description: 'Almacén no encontrado',
                example: {
                    "success":false,
                    "statusCode":404,
                    "message":"Almacén con ID 9b3bdf67-8ebd-462b-9e17-8bf66b51bca5 no encontrado",
                    "errors":null,
                    "timestamp":"2025-12-21T01:38:30.783Z",
                    "path":"/api/almacenes/9b3bdf67-8ebd-462b-9e17-8bf66b51bca5"
                }
            })
        );
    },

    removeAlmacen: () => {
        return applyDecorators(
            ApiTags('Almacenes'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Eliminar un almacén (soft delete)',
                description: 'Elimina un almacén (soft delete)'
            }),
            ApiParam({ name: 'id', description: 'ID del almacén', required: true }),
            ApiResponse({ status: 200, description: 'Almacén eliminado exitosamente',
                example: {
                    "success":true,
                    "data":{
                        "mensaje":"Almacén desactivado correctamente",
                        "id":"9b3bdf67-8ebd-462b-9e17-8bf66b51bca6"
                    },
                    "timestamp":"2025-12-21T19:45:30.733Z"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T00:39:43.908Z",
                    "path": "/api/almacenes"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T00:39:43.908Z",
                    "path": "/api/almacenes"
                }
            }),
            ApiResponse({ status: 404, description: 'Almacén no encontrado',
                example: {
                    "success":false,
                    "statusCode":404,
                    "message":"Almacén con ID 9b3bdf67-8ebd-462b-9e17-8bf66b51bca5 no encontrado",
                    "errors":null,
                    "timestamp":"2025-12-21T01:38:30.783Z",
                    "path":"/api/almacenes/9b3bdf67-8ebd-462b-9e17-8bf66b51bca5"
                }
            })
        );
    },

    activateAlmacen: () => {
        return applyDecorators(
            ApiTags('Almacenes'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Reactivar un almacén desactivado',
                description: 'Reactiva un almacén desactivado.'
            }),
            ApiParam({ name: 'almacen_id', description: 'ID del almacén', required: true }),
            ApiResponse({ status: 200, description: 'Almacén reactivado',
                example: {
                    "success":true,
                    "data":{
                        "mensaje":"Almacén reactivado correctamente",
                        "id":"9b3bdf67-8ebd-462b-9e17-8bf66b51bca6"
                    },
                    "timestamp":"2025-12-21T20:07:20.526Z"
                }
            }),
            ApiResponse({ status: 404, description: 'Almacén no encontrado',
                example: {
                    "success":false,
                    "statusCode":404,
                    "message":"Almacén con ID 9b3bdf67-8ebd-462b-9e17-8bf66b51bca5 no encontrado",
                    "errors":null,
                    "timestamp":"2025-12-21T01:38:30.783Z",
                    "path":"/api/almacenes/9b3bdf67-8ebd-462b-9e17-8bf66b51bca5"
                }
            })
        );
    },

    findAllUbicaciones: () => {
        return applyDecorators(
            ApiTags('Almacenes'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Listar ubicaciones de un almacén',
                description: 'Lista las ubicaciones de un almacén'
            }),
            ApiResponse({ status: 200, description: 'Lista de ubicaciones',
                example: {
                    "success": true,
                    "data": [
                        {
                            "id": "3b0cb868-1729-4037-925d-4167883e5dc4",
                            "almacen_id": "b76fdf6a-4144-43df-b425-4ec1d0485ba8",
                            "ubicacion_padre_id": null,
                            "nombre": "Zona A",
                            "codigo": "A",
                            "nivel": 1,
                            "ruta_completa": null,
                            "fecha_creacion": "2025-12-19T03:10:22.320Z",
                            "fecha_actualizacion": "2025-12-19T03:10:22.320Z",
                            "ubicacion_padre": null,
                            "_count": {
                                "ubicaciones_hijas": 1
                            }
                        },
                        {
                            "id": "d615482d-8b7e-494c-9505-e73cc8efb7fe",
                            "almacen_id": "b76fdf6a-4144-43df-b425-4ec1d0485ba8",
                            "ubicacion_padre_id": "3b0cb868-1729-4037-925d-4167883e5dc4",
                            "nombre": "Pasillo 1",
                            "codigo": "A-P1",
                            "nivel": 2,
                            "ruta_completa": null,
                            "fecha_creacion": "2025-12-19T03:10:22.324Z",
                            "fecha_actualizacion": "2025-12-19T03:10:22.324Z",
                            "ubicacion_padre": {
                                "id": "3b0cb868-1729-4037-925d-4167883e5dc4",
                                "nombre": "Zona A",
                                "codigo": "A"
                            },
                            "_count": {
                                "ubicaciones_hijas": 1
                            }
                        },
                        {
                            "id": "276db649-c687-45f3-8a20-c7c0438bcec6",
                            "almacen_id": "b76fdf6a-4144-43df-b425-4ec1d0485ba8",
                            "ubicacion_padre_id": "d615482d-8b7e-494c-9505-e73cc8efb7fe",
                            "nombre": "Estante 1A",
                            "codigo": "A-P1-E1",
                            "nivel": 3,
                            "ruta_completa": null,
                            "fecha_creacion": "2025-12-19T03:10:22.329Z",
                            "fecha_actualizacion": "2025-12-19T03:10:22.329Z",
                            "ubicacion_padre": {
                                "id": "d615482d-8b7e-494c-9505-e73cc8efb7fe",
                                "nombre": "Pasillo 1",
                                "codigo": "A-P1"
                            },
                            "_count": {
                                "ubicaciones_hijas": 0
                            }
                        }
                    ],
                    "timestamp": "2025-12-21T02:21:07.815Z"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T00:39:43.908Z",
                    "path": "/api/almacenes"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T00:39:43.908Z",
                    "path": "/api/almacenes"
                }
            }),
            ApiResponse({ status: 404, description: 'Almacén no encontrado',
                example: {
                    "success":false,
                    "statusCode":404,
                    "message":"Almacén con ID 9b3bdf67-8ebd-462b-9e17-8bf66b51bca5 no encontrado",
                    "errors":null,
                    "timestamp":"2025-12-21T01:38:30.783Z",
                    "path":"/api/almacenes/9b3bdf67-8ebd-462b-9e17-8bf66b51bca5"
                }
            })
        );
    },

    obtenerJerarquiaAlmacen: () => {
        return applyDecorators(
            ApiTags('Almacenes'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Obtener jerarquía completa de ubicaciones en formato árbol',
                description: 'Obtiene la jerarquía completa de ubicaciones en formato árbol'
            }),
            ApiResponse({ status: 200, description: 'Jerarquía de ubicaciones',
                example: {
                    "success":true,
                    "data":{
                        "almacen":{
                            "id":"b76fdf6a-4144-43df-b425-4ec1d0485ba8",
                            "nombre":"Almacén Principal",
                            "codigo":"ALM-001"
                        },
                        "ubicaciones":[
                            {
                                "id":"3b0cb868-1729-4037-925d-4167883e5dc4",
                                "almacen_id":"b76fdf6a-4144-43df-b425-4ec1d0485ba8",
                                "ubicacion_padre_id":null,
                                "nombre":"Zona A",
                                "codigo":"A",
                                "nivel":1,
                                "ruta_completa":null,
                                "fecha_creacion":"2025-12-19T03:10:22.320Z",
                                "fecha_actualizacion":"2025-12-19T03:10:22.320Z",
                                "hijos":[
                                    {
                                        "id":"d615482d-8b7e-494c-9505-e73cc8efb7fe",
                                        "almacen_id":"b76fdf6a-4144-43df-b425-4ec1d0485ba8",
                                        "ubicacion_padre_id":"3b0cb868-1729-4037-925d-4167883e5dc4",
                                        "nombre":"Pasillo 1",
                                        "codigo":"A-P1",
                                        "nivel":2,
                                        "ruta_completa":null,
                                        "fecha_creacion":"2025-12-19T03:10:22.324Z",
                                        "fecha_actualizacion":"2025-12-19T03:10:22.324Z",
                                        "hijos":[
                                            {
                                                "id":"276db649-c687-45f3-8a20-c7c0438bcec6",
                                                "almacen_id":"b76fdf6a-4144-43df-b425-4ec1d0485ba8",
                                                "ubicacion_padre_id":"d615482d-8b7e-494c-9505-e73cc8efb7fe",
                                                "nombre":"Estante 1A",
                                                "codigo":"A-P1-E1",
                                                "nivel":3,
                                                "ruta_completa":null,
                                                "fecha_creacion":"2025-12-19T03:10:22.329Z",
                                                "fecha_actualizacion":"2025-12-19T03:10:22.329Z",
                                                "hijos":[]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    "timestamp":"2025-12-21T02:41:07.702Z"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T00:39:43.908Z",
                    "path": "/api/almacenes"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T00:39:43.908Z",
                    "path": "/api/almacenes"
                }
            }),
            ApiResponse({ status: 404, description: 'Almacén no encontrado',
                example: {
                    "success":false,
                    "statusCode":404,
                    "message":"Almacén con ID 9b3bdf67-8ebd-462b-9e17-8bf66b51bca5 no encontrado",
                    "errors":null,
                    "timestamp":"2025-12-21T01:38:30.783Z",
                    "path":"/api/almacenes/9b3bdf67-8ebd-462b-9e17-8bf66b51bca5"
                }
            })
        );
    },

    findUbicacionId: () => {
        return applyDecorators(
            ApiTags('Almacenes'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Obtener una ubicación específica' }),
            ApiResponse({ status: 200, description: 'Ubicación encontrada',
                example: {
                    "success":true,
                    "data":{
                        "id":"276db649-c687-45f3-8a20-c7c0438bcec6",
                        "almacen_id":"b76fdf6a-4144-43df-b425-4ec1d0485ba8",
                        "ubicacion_padre_id":"d615482d-8b7e-494c-9505-e73cc8efb7fe",
                        "nombre":"Estante 1A",
                        "codigo":"A-P1-E1",
                        "nivel":3,
                        "ruta_completa":null,
                        "fecha_creacion":"2025-12-19T03:10:22.329Z",
                        "fecha_actualizacion":"2025-12-19T03:10:22.329Z",
                        "ubicacion_padre":{
                            "id":"d615482d-8b7e-494c-9505-e73cc8efb7fe",
                            "almacen_id":"b76fdf6a-4144-43df-b425-4ec1d0485ba8",
                            "ubicacion_padre_id":"3b0cb868-1729-4037-925d-4167883e5dc4",
                            "nombre":"Pasillo 1",
                            "codigo":"A-P1",
                            "nivel":2,
                            "ruta_completa":null,
                            "fecha_creacion":"2025-12-19T03:10:22.324Z",
                            "fecha_actualizacion":"2025-12-19T03:10:22.324Z"
                        },
                        "ubicaciones_hijas":[],
                        "almacen":{
                            "id":"b76fdf6a-4144-43df-b425-4ec1d0485ba8",
                            "nombre":"Almacén Principal",
                            "codigo":"ALM-001"
                        }
                    },
                    "timestamp":"2025-12-21T02:58:31.546Z"
                }
            }),
            ApiResponse({ status: 400, description: 'Error al buscar la ubicación',
                example: {
                    "success":false,
                    "statusCode":400,
                    "message":"Error al buscar la ubicación",
                    "errors":null,
                    "timestamp":"2025-12-21T01:38:30.783Z",
                    "path":"/api/ubicaciones/276db649-c687-45f3-8a20-c7c0438bcec6"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T00:39:43.908Z",
                    "path": "/api/ubicaciones"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T00:39:43.908Z",
                    "path": "/api/ubicaciones"
                }
            }),
            ApiResponse({ status: 404, description: 'Ubicación no encontrada',
                example: {
                    "success":false,
                    "statusCode":404,
                    "message":"Ubicación con ID 276db649-c687-45f3-8a20-c7c0438bcec6 no encontrada",
                    "errors":null,
                    "timestamp":"2025-12-21T02:58:31.546Z",
                    "path":"/api/ubicaciones/276db649-c687-45f3-8a20-c7c0438bcec6"
                }
            })
        );
    },

    createUbicacion: () => {
        return applyDecorators(
            ApiTags('Almacenes'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Crear una nueva ubicación' }),
            ApiResponse({ status: 201, description: 'Ubicación creada exitosamente',
                example: {
                    "success":true,
                    "data":{
                        "mensaje":"Ubicación creada exitosamente",
                        "ubicacion":"Zona B",
                        "codigo":"B",
                        "nivel":1,
                        "ruta":null,
                        "detalles":{
                            "id":"12f9d353-943e-4d27-a95a-5e3158d02951",
                            "almacen_id":"b76fdf6a-4144-43df-b425-4ec1d0485ba8",
                            "ubicacion_padre_id":null,
                            "nombre":"Zona B",
                            "codigo":"B",
                            "nivel":1,
                            "ruta_completa":null,
                            "fecha_creacion":"2025-12-21T03:07:36.586Z",
                            "fecha_actualizacion":"2025-12-21T03:07:36.586Z",
                            "ubicacion_padre":null,
                            "almacen":{
                                "id":"b76fdf6a-4144-43df-b425-4ec1d0485ba8",
                                "nombre":"Almacén Principal"
                            }
                        }
                    },
                    "timestamp":"2025-12-21T03:07:36.597Z"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T00:39:43.908Z",
                    "path": "/api/ubicaciones"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T00:39:43.908Z",
                    "path": "/api/ubicaciones"
                }
            }),
            ApiResponse({ status: 404, description: 'Ubicación no encontrada',
                example: {
                    "success":false,
                    "statusCode":404,
                    "message":"Ubicación con ID 276db649-c687-45f3-8a20-c7c0438bcec6 no encontrada",
                    "errors":null,
                    "timestamp":"2025-12-21T02:58:31.546Z",
                    "path":"/api/ubicaciones/276db649-c687-45f3-8a20-c7c0438bcec6"
                }
            }),
            ApiResponse({ status: 409, description: 'El código de ubicación ya existe',
                example: {
                    "success":false,
                    "statusCode":409,
                    "message":"El código de ubicación B ya existe en este almacén",
                    "errors":null,
                    "timestamp":"2025-12-21T03:09:55.742Z",
                    "path":"/api/almacenes/b76fdf6a-4144-43df-b425-4ec1d0485ba8/ubicaciones"
                }
            }),
        );
    },

    updateUbicacion: () => {
        return applyDecorators(
            ApiTags('Almacenes'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Actualizar una ubicación' }),
            ApiResponse({ status: 200, description: 'Ubicación actualizada exitosamente',
                example: {
                    "success": true,
                    "data": {
                        "mensaje": "Ubicación actualizada exitosamente",
                        "detalles": {
                            "id": "12f9d353-943e-4d27-a95a-5e3158d02951",
                            "almacen_id": "b76fdf6a-4144-43df-b425-4ec1d0485ba8",
                            "ubicacion_padre_id": null,
                            "nombre": "Zona B Renovada",
                            "codigo": "B",
                            "nivel": 1,
                            "ruta_completa": null,
                            "fecha_creacion": "2025-12-21T03:07:36.586Z",
                            "fecha_actualizacion": "2025-12-21T03:26:22.473Z"
                        }
                    },
                    "timestamp": "2025-12-21T03:26:22.478Z"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T03:24:41.817Z",
                    "path": "/api/almacenes/b76fdf6a-4144-43df-b425-4ec1d0485ba8/ubicaciones/12f9d353-943e-4d27-a95a-5e3158d02951"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success": false,
                    "statusCode": 403,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T03:24:41.817Z",
                    "path": "/api/almacenes/b76fdf6a-4144-43df-b425-4ec1d0485ba8/ubicaciones/12f9d353-943e-4d27-a95a-5e3158d02951"
                }
            }),
            ApiResponse({ status: 404, description: 'Ubicación no encontrada',
                example: {
                    "success":false,
                    "statusCode":404,
                    "message":"Ubicación con ID 276db649-c687-45f3-8a20-c7c0438bcec6 no encontrada",
                    "errors":null,
                    "timestamp":"2025-12-21T02:58:31.546Z",
                    "path":"/api/almacenes/b76fdf6a-4144-43df-b425-4ec1d0485ba8/ubicaciones/276db649-c687-45f3-8a20-c7c0438bcec6"
                }
            }),
            ApiResponse({ status: 409, description: 'El código de ubicación ya existe',
                example: {
                    "success":false,
                    "statusCode":409,
                    "message":"El código de ubicación B ya existe en este almacén",
                    "errors":null,
                    "timestamp":"2025-12-21T03:15:50.873Z",
                    "path":"/api/almacenes/b76fdf6a-4144-43df-b425-4ec1d0485ba8/ubicaciones"
                }
            }),
        );
    },

    removeUbicacion: () => {
        return applyDecorators(
            ApiTags('Almacenes'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Eliminar una ubicación (soft delete)' }),
            ApiResponse({ status: 200, description: 'Ubicación desactivada exitosamente',
                example: {
                    "success":true,
                    "data":{
                        "mensaje":"Ubicación desactivada correctamente",
                        "id":"708b1911-ce29-4dd3-939d-b95bc518c2f8"
                    },
                    "timestamp":"2025-12-21T21:18:13.202Z"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T03:24:41.817Z",
                    "path": "/api/almacenes/b76fdf6a-4144-43df-b425-4ec1d0485ba8/ubicaciones/12f9d353-943e-4d27-a95a-5e3158d02951"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success": false,
                    "statusCode": 403,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T03:24:41.817Z",
                    "path": "/api/almacenes/b76fdf6a-4144-43df-b425-4ec1d0485ba8/ubicaciones/12f9d353-943e-4d27-a95a-5e3158d02951"
                }
            }),
            ApiResponse({ status: 404, description: 'Ubicación no encontrada',
                example: {
                    "success":false,
                    "statusCode":404,
                    "message":"Ubicación con ID 276db649-c687-45f3-8a20-c7c0438bcec6 no encontrada",
                    "errors":null,
                    "timestamp":"2025-12-21T02:58:31.546Z",
                    "path":"/api/almacenes/b76fdf6a-4144-43df-b425-4ec1d0485ba8/ubicaciones/276db649-c687-45f3-8a20-c7c0438bcec6"
                }
            }),
        );
    },

    activateUbicacion: () => {
        return applyDecorators(
            ApiTags('Almacenes'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Reactivar una ubicación desactivada' }),
            ApiResponse({ status: 200, description: 'Ubicación reactivada',
                example: {
                    "success":true,
                    "data":{
                        "mensaje":"Ubicación reactivada correctamente",
                        "id":"708b1911-ce29-4dd3-939d-b95bc518c2f8"
                    },
                    "timestamp":"2025-12-21T21:20:57.419Z"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T03:24:41.817Z",
                    "path": "/api/almacenes/b76fdf6a-4144-43df-b425-4ec1d0485ba8/ubicaciones/12f9d353-943e-4d27-a95a-5e3158d02951"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success": false,
                    "statusCode": 403,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-21T03:24:41.817Z",
                    "path": "/api/almacenes/b76fdf6a-4144-43df-b425-4ec1d0485ba8/ubicaciones/12f9d353-943e-4d27-a95a-5e3158d02951"
                }
            }),
            ApiResponse({ status: 404, description: 'Ubicación no encontrada',
                example: {
                    "success":false,
                    "statusCode":404,
                    "message":"Ubicación con ID 276db649-c687-45f3-8a20-c7c0438bcec6 no encontrada",
                    "errors":null,
                    "timestamp":"2025-12-21T02:58:31.546Z",
                    "path":"/api/almacenes/b76fdf6a-4144-43df-b425-4ec1d0485ba8/ubicaciones/276db649-c687-45f3-8a20-c7c0438bcec6"
                }
            }),
        );
    },
}
