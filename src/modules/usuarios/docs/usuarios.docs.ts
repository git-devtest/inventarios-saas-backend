import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';

export const UsuariosDocs = {
    findAll: () => {
        return applyDecorators(
            ApiBearerAuth(),
            ApiTags('Usuarios'),
            ApiOperation({summary: 'Obtener todos los usuarios',
                description: 'Obtiene una lista de todos los usuarios activos de la empresa.'
            }),
            ApiResponse({ status: 200, description: 'Lista obtenida correctamente.', 
                example: {
                    "success": true,
                    "data": [
                        {
                            "id": "63fcef8d-3da3-4ad0-a48e-da63191c2271",
                            "nombre": "Jeimy Rodriguez",
                            "email": "jeimy@techstore.com",
                            "activo": true,
                            "empresa_id": "9a855f21-e5e2-4ce5-b389-bb4069ed18d9",
                            "rol_id": "f5d0ab98-86ca-438a-9a8d-ad45165f6089",
                            "fecha_creacion": "2025-12-19T17:27:07.895Z",
                            "fecha_actualizacion": "2025-12-19T17:27:07.895Z",
                            "ultimo_acceso": null,
                            "rol": {
                                "id": "f5d0ab98-86ca-438a-9a8d-ad45165f6089",
                                "nombre": "Operador"
                            },
                            "empresa": {
                                "id": "9a855f21-e5e2-4ce5-b389-bb4069ed18d9",
                                "nombre": "TechStore Colombia LTDA"
                            }
                        },
                        {
                            "id": "9f5f21e9-c586-4e32-a14c-73b5121301eb",
                            "nombre": "Ana Martínez",
                            "email": "admin@techstore.com",
                            "activo": true,
                            "empresa_id": "9a855f21-e5e2-4ce5-b389-bb4069ed18d9",
                            "rol_id": "95842922-20dd-4be0-8cee-cf6d9a829e60",
                            "fecha_creacion": "2025-12-19T03:10:22.453Z",
                            "fecha_actualizacion": "2025-12-19T03:10:22.453Z",
                            "ultimo_acceso": null,
                            "rol": {
                                "id": "95842922-20dd-4be0-8cee-cf6d9a829e60",
                                "nombre": "Administrador"
                            },
                            "empresa": {
                                "id": "9a855f21-e5e2-4ce5-b389-bb4069ed18d9",
                                "nombre": "TechStore Colombia LTDA"
                            }
                        },
                        {
                            "id": "1fd53c6b-9499-44b6-adf2-a49dee2e7378",
                            "nombre": "Carlos Gómez",
                            "email": "consulta@elexito.com",
                            "activo": true,
                            "empresa_id": "7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                            "rol_id": "0f6ad045-1b5d-4795-8201-388776bd7a7d",
                            "fecha_creacion": "2025-12-19T03:10:22.310Z",
                            "fecha_actualizacion": "2025-12-19T03:10:22.310Z",
                            "ultimo_acceso": null,
                            "rol": {
                                "id": "0f6ad045-1b5d-4795-8201-388776bd7a7d",
                                "nombre": "Consulta"
                            },
                            "empresa": {
                                "id": "7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                                "nombre": "Distribuidora El Éxito SAS"
                            }
                        },
                        {
                            "id": "d36d1d3e-7296-4fd4-9f9d-ac30d23f5813",
                            "nombre": "María López",
                            "email": "operador@elexito.com",
                            "activo": true,
                            "empresa_id": "7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                            "rol_id": "f5d0ab98-86ca-438a-9a8d-ad45165f6089",
                            "fecha_creacion": "2025-12-19T03:10:22.227Z",
                            "fecha_actualizacion": "2025-12-19T03:10:22.227Z",
                            "ultimo_acceso": null,
                            "rol": {
                                "id": "f5d0ab98-86ca-438a-9a8d-ad45165f6089",
                                "nombre": "Operador"
                            },
                            "empresa": {
                                "id": "7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                                "nombre": "Distribuidora El Éxito SAS"
                            }
                        },
                        {
                            "id": "05c43077-b18f-4702-9802-7c42720d9d8b",
                            "nombre": "Juan Pérez",
                            "email": "admin@elexito.com",
                            "activo": true,
                            "empresa_id": "7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                            "rol_id": "95842922-20dd-4be0-8cee-cf6d9a829e60",
                            "fecha_creacion": "2025-12-19T03:10:22.139Z",
                            "fecha_actualizacion": "2025-12-19T03:10:22.139Z",
                            "ultimo_acceso": null,
                            "rol": {
                                "id": "95842922-20dd-4be0-8cee-cf6d9a829e60",
                                "nombre": "Administrador"
                            },
                            "empresa": {
                                "id": "7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                                "nombre": "Distribuidora El Éxito SAS"
                            }
                        }
                    ],
                    "timestamp": "2025-12-19T18:57:11.370Z"
                }
            }),
            ApiResponse({ status: 400, description: 'Error en la solicitud.',
                example: { 
                    "success": false,
                    "statusCode": 400,
                    "message": "Error en la solicitud.",
                    "errors": null,
                    "timestamp": "2025-12-19T19:04:17.320Z",
                    "path": "/api/usuarios" 
                } 
            }),
            ApiResponse({ status: 401, description: 'No autorizado.',
                example: { 
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-19T19:04:17.320Z",
                    "path": "/api/usuarios" 
                } 
            }),
            ApiResponse({ status: 403, description: 'Acceso denegado.',
                example: { 
                    "success": false,
                    "statusCode": 403,
                    "message": "Acceso denegado. Se requiere uno de los siguientes roles: Administrador",
                    "errors": null,
                    "timestamp": "2025-12-19T19:04:17.320Z",
                    "path": "/api/usuarios" 
                } 
            }),
        );
    },

    findOne: () => {
        return applyDecorators(
            ApiBearerAuth(),
            ApiTags('Usuarios'),
            ApiOperation({ summary: 'Obtener un usuario por ID',
                description: 'Obtiene un usuario por ID'
            }),
            ApiParam({ name: 'id', description: 'ID único del usuario' }),
            ApiResponse({ status: 200, description: 'Usuario encontrado.',
                example: {
                    "success": true,
                    "data": {
                        "id": "63fcef8d-3da3-4ad0-a48e-da63191c2271",
                        "nombre": "Jeimy Rodriguez",
                        "email": "jeimy@techstore.com",
                        "activo": true,
                        "empresa_id": "9a855f21-e5e2-4ce5-b389-bb4069ed18d9",
                        "rol_id": "f5d0ab98-86ca-438a-9a8d-ad45165f6089",
                        "fecha_creacion": "2025-12-19T17:27:07.895Z",
                        "fecha_actualizacion": "2025-12-19T17:27:07.895Z",
                        "ultimo_acceso": null,
                        "rol": {
                            "id": "f5d0ab98-86ca-438a-9a8d-ad45165f6089",
                            "nombre": "Operador",
                            "descripcion": "Puede registrar y consultar movimientos de inventario"
                        },
                        "empresa": {
                            "id": "9a855f21-e5e2-4ce5-b389-bb4069ed18d9",
                            "nombre": "TechStore Colombia LTDA"
                        }
                    },
                    "timestamp": "2025-12-19T19:08:08.285Z"
                }
            }),
            ApiResponse({ status: 400, description: 'Error en la solicitud.', 
                example: { 
                    "success": false,
                    "statusCode": 400,
                    "message": "Error en la solicitud.",
                    "errors": null,
                    "timestamp": "2025-12-19T19:08:08.285Z",
                    "path": "/api/usuarios/63fcef8d-3da3-4ad0-a48e-da63191c2271"
                } 
            }),
            ApiResponse({ status: 401, description: 'No autorizado.', 
                example: { 
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-19T19:04:17.320Z",
                    "path": "/api/usuarios/63fcef8d-3da3-4ad0-a48e-da63191c2271"
                } 
            }),
            ApiResponse({ status: 403, description: 'Acceso denegado.', 
                example: { 
                    "success": false,
                    "statusCode": 403,
                    "message": "Acceso denegado. Se requiere uno de los siguientes roles: Administrador",
                    "errors": null,
                    "timestamp": "2025-12-19T19:04:17.320Z",
                    "path": "/api/usuarios/63fcef8d-3da3-4ad0-a48e-da63191c2271"
                } 
            }),
            ApiResponse({ status: 404, description: 'Usuario no encontrado.', 
                example: { 
                    "success": false,
                    "statusCode": 404,
                    "message": "Usuario con ID 63fcef8d-3da3-4ad0-a48e-da63191c2275 no encontrado",
                    "errors": null,
                    "timestamp": "2025-12-19T19:09:22.847Z",
                    "path": "/api/usuarios/63fcef8d-3da3-4ad0-a48e-da63191c2275" 
                } 
            }),
        );
    },

    create: () => {
        return applyDecorators(
            ApiBearerAuth(),
            ApiTags('Usuarios'),
            ApiOperation({ summary: 'Crear un nuevo usuario',
                description: 'Crea un nuevo usuario'
            }),
            ApiBody({ type: CreateUsuarioDto }),
            ApiResponse({ status: 201, 
                description: 'Usuario creado correctamente.',
                example: {
                    "success": true,
                    "data": {
                        "id": "63fcef8d-3da3-4ad0-a48e-da63191c2271",
                        "empresa_id": "9a855f21-e5e2-4ce5-b389-bb4069ed18d9",
                        "rol_id": "f5d0ab98-86ca-438a-9a8d-ad45165f6089",
                        "nombre": "Jeimy Rodriguez",
                        "email": "jeimy@techstore.com",
                        "activo": true,
                        "ultimo_acceso": null,
                        "fecha_creacion": "2025-12-19T17:27:07.895Z",
                        "fecha_actualizacion": "2025-12-19T17:27:07.895Z"
                    },
                    "timestamp": "2025-12-19T17:27:08.038Z"
                }
            }),
            ApiResponse({ status: 400, 
                description: 'Error al crear el usuario.',
                example: {
                    "success": false,
                    "statusCode": 400,
                    "message": ["rol_id should not be empty","El ID del rol es requerido"],
                    "errors": null,
                    "timestamp":"2025-12-19T19:22:54.321Z",
                    "path":"/api/auth/register"
                }
            }),
            ApiResponse({ status: 401, 
                description: 'No autorizado.',
                example: { 
                    "success": false,
                    "statusCode": 401,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-19T19:04:17.320Z",
                    "path": "/api/usuarios" 
                } 
            }),
            ApiResponse({ status: 403, 
                description: 'No autorizado.',
                example: { 
                    "success": false,
                    "statusCode": 403,
                    "message": "Acceso denegado. Se requiere uno de los siguientes roles: Administrador",
                    "errors": null,
                    "timestamp": "2025-12-19T19:04:17.320Z",
                    "path": "/api/usuarios" 
                } 
            }),
        );
    },

    update: () => {
        return applyDecorators(
            ApiBearerAuth(),
            ApiTags('Usuarios'),
            ApiOperation({ summary: 'Actualizar un usuario',
                description: 'Actualiza un usuario por ID'
             }),
            ApiParam({ name: 'id', description: 'ID único del usuario' }),
            ApiBody({ type: UpdateUsuarioDto }),
            ApiResponse({ status: 200, description: 'Usuario actualizado correctamente.',
                example: {
                    "success": true,
                    "data": {
                        "id":"1fd53c6b-9499-44b6-adf2-a49dee2e7378",
                        "nombre":"Carlos Gómez",
                        "email":"consulta@elexito.com",
                        "activo":false,
                        "empresa_id":"7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                        "rol_id":"0f6ad045-1b5d-4795-8201-388776bd7a7d",
                        "fecha_creacion":"2025-12-19T03:10:22.310Z",
                        "fecha_actualizacion":"2025-12-19T20:13:37.699Z",
                        "rol":{
                            "id":"0f6ad045-1b5d-4795-8201-388776bd7a7d",
                            "nombre":"Consulta"
                        }
                    },
                    "timestamp":"2025-12-19T20:13:37.761Z"
                }
            }),
            ApiResponse({ status: 400, description: 'Error al actualizar el usuario.',
                example: {
                    "success": false,
                    "statusCode": 400,
                    "message": [
                        "activo must be a boolean value"
                    ],
                    "errors": null,
                    "timestamp": "2025-12-19T20:07:31.543Z",
                    "path": "/api/usuarios/0f6ad045-1b5d-4795-8201-388776bd7a7d"
                }
            }),
            ApiResponse({ status: 401, description: 'No autorizado.',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message":"No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp":"2025-12-19T19:31:49.983Z",
                    "path":"/api/usuarios/0f6ad045-1b5d-4795-8201-388776bd7a7d"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado.',
                example: {
                    "success": false,
                    "statusCode": 403,
                    "message": "Acceso denegado. Se requiere uno de los siguientes roles: Administrador",
                    "errors": null,
                    "timestamp": "2025-12-19T19:59:13.822Z",
                    "path": "/api/usuarios/0f6ad045-1b5d-4795-8201-388776bd7a7d"
                }
            }),
            ApiResponse({ status: 404, description: 'Usuario no encontrado.',
                example: {
                    "success": false,
                    "statusCode": 404,
                    "message": "Usuario con ID 0f6ad045-1b5d-4795-8201-388776bd7a7d no encontrado",
                    "errors": null,
                    "timestamp": "2025-12-19T20:08:52.857Z",
                    "path": "/api/usuarios/0f6ad045-1b5d-4795-8201-388776bd7a7d"
                }
            }),
        );
    },

    remove: () => {
        return applyDecorators(
            ApiBearerAuth(),
            ApiTags('Usuarios'),
            ApiOperation({ summary: 'Eliminar un usuario (Soft Delete)',
                description: 'Elimina un usuario por ID (Soft Delete)' }),
            ApiParam({ name: 'id', description: 'ID único del usuario' }),
            ApiResponse({ status: 200, description: 'Usuario eliminado correctamente.',
                example: {
                    "success": true,
                    "data": {
                        "message": "Usuario desactivado correctamente",
                        "id": "1fd53c6b-9499-44b6-adf2-a49dee2e7378"
                    },
                    "timestamp": "2025-12-21T20:24:51.607Z"
                }
            }),
            ApiResponse({ status: 400, description: 'Error en la solicitud.',
                example: {
                    "success": false,
                    "statusCode": 400,
                    "message":"Error en la solicitud.",
                    "errors": null,
                    "timestamp":"2025-12-19T22:03:09.664Z",
                    "path":"/api/usuarios/0f6ad045-1b5d-4795-8201-388776bd7a7d"
                }
            }),
            ApiResponse({ status: 401, description: 'No autorizado.',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message":"No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp":"2025-12-19T22:03:09.664Z",
                    "path":"/api/usuarios/0f6ad045-1b5d-4795-8201-388776bd7a7d"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado.',
                example: {
                    "success": false,
                    "statusCode": 403,
                    "message":"Acceso denegado. Se requiere uno de los siguientes roles: Administrador",
                    "errors": null,
                    "timestamp":"2025-12-19T19:31:49.983Z",
                    "path":"/api/usuarios/0f6ad045-1b5d-4795-8201-388776bd7a7d"
                } 
            }),
            ApiResponse({ status: 404, description: 'Usuario no encontrado.',
                example: {
                    "success": false,
                    "statusCode": 404,
                    "message": "Usuario con ID 0f6ad045-1b5d-4795-8201-388776bd7a7d no encontrado",
                    "errors": null,
                    "timestamp": "2025-12-19T20:08:52.857Z",
                    "path": "/api/usuarios/0f6ad045-1b5d-4795-8201-388776bd7a7d"
                }
            }),
        );
    },

    activate: () => {
        return applyDecorators(
            ApiBearerAuth(),
            ApiTags('Usuarios'),
            ApiOperation({ summary: 'Activar un usuario',
                description: 'Activa un usuario por ID' }),
            ApiParam({ name: 'id', description: 'ID único del usuario' }),
            ApiResponse({ status: 200, description: 'Usuario reactivado correctamente.',
                example: {
                    "success":true,
                    "data":{
                        "message":"Usuario reactivado correctamente",
                        "id":"d36d1d3e-7296-4fd4-9f9d-ac30d23f5813"
                    },
                    "timestamp":"2025-12-19T22:11:41.209Z"
                }
            }),
            ApiResponse({ status: 400, description: 'Error en la solicitud.',
                example: {
                    "success": false,
                    "statusCode": 400,
                    "message":"Error en la solicitud.",
                    "errors": null,
                    "timestamp":"2025-12-19T22:11:41.209Z",
                    "path":"/api/usuarios/0f6ad045-1b5d-4795-8201-388776bd7a7d/activate"
                }
            }),
            ApiResponse({ status: 401, description: 'No autorizado.',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message":"No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp":"2025-12-19T19:31:49.983Z",
                    "path":"/api/usuarios/0f6ad045-1b5d-4795-8201-388776bd7a7d/activate"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado.',
                example: {
                    "success": false,
                    "statusCode": 403,
                    "message":"Acceso denegado. Se requiere uno de los siguientes roles: Administrador",
                    "errors": null,
                    "timestamp":"2025-12-19T19:31:49.983Z",
                    "path":"/api/usuarios/0f6ad045-1b5d-4795-8201-388776bd7a7d"
                } 
            }),
            ApiResponse({ status: 404, description: 'Usuario no encontrado.',
                example: {
                    "success": false,
                    "statusCode": 404,
                    "message": "Usuario con ID 0f6ad045-1b5d-4795-8201-388776bd7a7d no encontrado",
                    "errors": null,
                    "timestamp": "2025-12-19T20:08:52.857Z",
                    "path": "/api/usuarios/0f6ad045-1b5d-4795-8201-388776bd7a7d/activate"
                }
            }),
        );
    },
};