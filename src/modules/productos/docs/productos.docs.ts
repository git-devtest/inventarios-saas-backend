import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CreateProductoDto } from '../dto/create-producto.dto';
import { UpdateProductoDto } from '../dto/update-producto.dto';

export const ProductosDocs = {
    findAll: () => {
        return applyDecorators(
            ApiBearerAuth(),
            ApiTags('Productos'),
            ApiOperation({summary: 'Listar todos los productos',
                description: 'Listar todos los productos de la empresa.',
            }),
            ApiResponse({ status: 200, description: 'Productos encontrados',
                example: {
                    "success": true,
                    "data": [
                        {
                            "id": "1c8d7ba2-5d57-4561-ae42-df46aedcf400",
                            "empresa_id": "7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                            "codigo": "PROD-003",
                            "nombre": "Cemento Argos x 50kg",
                            "descripcion": "Cemento portland tipo I",
                            "campos_personalizados": null,
                            "requiere_lote": false,
                            "requiere_serie": false,
                            "dias_vencimiento": null,
                            "permite_stock_negativo": false,
                            "activo": true,
                            "fecha_creacion": "2025-12-19T03:10:22.342Z",
                            "fecha_actualizacion": "2025-12-19T03:10:22.342Z",
                            "unidades_medida": [
                                {
                                    "id": "2fcab914-6cc1-447b-9516-ae6b7220c349",
                                    "producto_id": "1c8d7ba2-5d57-4561-ae42-df46aedcf400",
                                    "unidad_medida_id": "db3988a6-e49b-4a4e-bf21-f42382010799",
                                    "factor_conversion": "1",
                                    "es_principal": true,
                                    "fecha_creacion": "2025-12-19T03:10:22.355Z",
                                    "unidad_medida": {
                                        "id": "db3988a6-e49b-4a4e-bf21-f42382010799",
                                        "nombre": "Kilogramo",
                                        "abreviatura": "KG",
                                        "tipo": "peso",
                                        "fecha_creacion": "2025-12-19T03:10:21.860Z"
                                    }
                                },
                                {
                                    "id": "06060850-4f90-4839-8dfe-9b8256fb3373",
                                    "producto_id": "1c8d7ba2-5d57-4561-ae42-df46aedcf400",
                                    "unidad_medida_id": "c13d842b-967b-4bcf-9658-c1fe4f1f353b",
                                    "factor_conversion": "50",
                                    "es_principal": false,
                                    "fecha_creacion": "2025-12-19T03:10:22.358Z",
                                    "unidad_medida": {
                                        "id": "c13d842b-967b-4bcf-9658-c1fe4f1f353b",
                                        "nombre": "Caja",
                                        "abreviatura": "CJA",
                                        "tipo": "unidad",
                                        "fecha_creacion": "2025-12-19T03:10:21.867Z"
                                    }
                                }
                            ],
                            "_count": {
                                "producto_almacenes": 0,
                                "detalles_movimiento": 0
                            }
                        },
                        {
                            "id": "07c8cc22-e4d9-44e9-b531-94e5c81701f8",
                            "empresa_id": "7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                            "codigo": "PROD-002",
                            "nombre": "Aceite de Oliva Extra Virgen",
                            "descripcion": "Aceite de oliva importado de España",
                            "campos_personalizados": null,
                            "requiere_lote": true,
                            "requiere_serie": false,
                            "dias_vencimiento": 730,
                            "permite_stock_negativo": false,
                            "activo": true,
                            "fecha_creacion": "2025-12-19T03:10:22.339Z",
                            "fecha_actualizacion": "2025-12-19T03:10:22.339Z",
                            "unidades_medida": [
                                {
                                    "id": "cfe5a4c7-eb1d-455a-8e76-d66357550ca1",
                                    "producto_id": "07c8cc22-e4d9-44e9-b531-94e5c81701f8",
                                    "unidad_medida_id": "a6e2b6b2-2c3d-43ce-ab8a-c400efd74e02",
                                    "factor_conversion": "1",
                                    "es_principal": true,
                                    "fecha_creacion": "2025-12-19T03:10:22.353Z",
                                    "unidad_medida": {
                                        "id": "a6e2b6b2-2c3d-43ce-ab8a-c400efd74e02",
                                        "nombre": "Litro",
                                        "abreviatura": "L",
                                        "tipo": "volumen",
                                        "fecha_creacion": "2025-12-19T03:10:21.863Z"
                                    }
                                }
                            ],
                            "_count": {
                                "producto_almacenes": 1,
                                "detalles_movimiento": 1
                            }
                        },
                        {
                            "id": "ee0226a8-999a-4823-8a7a-c75f0ef05ff7",
                            "empresa_id": "7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                            "codigo": "PROD-001",
                            "nombre": "Laptop Dell Inspiron 15",
                            "descripcion": "Laptop empresarial con procesador Intel Core i5",
                            "campos_personalizados": {
                                "marca": "Dell",
                                "modelo": "Inspiron 15 3000",
                                "garantia_meses": 12
                            },
                            "requiere_lote": false,
                            "requiere_serie": false,
                            "dias_vencimiento": null,
                            "permite_stock_negativo": false,
                            "activo": true,
                            "fecha_creacion": "2025-12-19T03:10:22.334Z",
                            "fecha_actualizacion": "2025-12-19T03:10:22.334Z",
                            "unidades_medida": [
                                {
                                    "id": "5dbd1c87-9c58-482a-9686-939b31a925de",
                                    "producto_id": "ee0226a8-999a-4823-8a7a-c75f0ef05ff7",
                                    "unidad_medida_id": "b4f3f238-b7e0-44d6-83bf-1c7a52da91e0",
                                    "factor_conversion": "1",
                                    "es_principal": true,
                                    "fecha_creacion": "2025-12-19T03:10:22.346Z",
                                    "unidad_medida": {
                                        "id": "b4f3f238-b7e0-44d6-83bf-1c7a52da91e0",
                                        "nombre": "Unidad",
                                        "abreviatura": "UN",
                                        "tipo": "unidad",
                                        "fecha_creacion": "2025-12-19T03:10:21.859Z"
                                    }
                                }
                            ],
                            "_count": {
                                "producto_almacenes": 1,
                                "detalles_movimiento": 1
                            }
                        }
                    ],
                    "timestamp": "2025-12-19T23:25:24.046Z"
                }
            }),
            ApiResponse({ status: 400, description: 'Error en la solicitud',
                example: {
                    "success": false,
                    "statusCode": 400,
                    "message": "Error en la solicitud.",
                    "errors": null,
                    "timestamp": "2025-12-19T23:23:03.488Z",
                    "path": "/api/productos"
                    }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success": false,
                    "statusCode": 401,
                    "message": "No autenticado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-19T23:23:03.488Z",
                    "path": "/api/productos"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success": false,
                    "statusCode": 403,
                    "message": "No autorizado. Token inválido o expirado.",
                    "errors": null,
                    "timestamp": "2025-12-19T23:23:03.488Z",
                    "path": "/api/productos"
                }
            })
        )
    },

    findOne: () => {
        return applyDecorators(
            ApiBearerAuth(),
            ApiTags('Productos'),
            ApiParam({ name: 'id', description: 'ID del producto', required: true }),
            ApiOperation({ summary: 'Obtener un producto por ID',
                description: 'Obtener un producto por ID'
            }),
            ApiResponse({ status: 200, description: 'Producto encontrado exitosamente',
                example: {
                    "success": true,
                    "data": {
                        "message": "Producto encontrado exitosamente",
                        "producto": {
                            "id": "1c8d7ba2-5d57-4561-ae42-df46aedcf400",
                            "empresa_id": "7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                            "codigo": "PROD-003",
                            "nombre": "Cemento Argos x 50kg",
                            "descripcion": "Cemento portland tipo I",
                            "campos_personalizados": null,
                            "requiere_lote": false,
                            "requiere_serie": false,
                            "dias_vencimiento": null,
                            "permite_stock_negativo": false,
                            "activo": true,
                            "fecha_creacion": "2025-12-19T03:10:22.342Z",
                            "fecha_actualizacion": "2025-12-19T03:10:22.342Z",
                            "unidades_medida": [
                                {
                                    "id": "2fcab914-6cc1-447b-9516-ae6b7220c349",
                                    "producto_id": "1c8d7ba2-5d57-4561-ae42-df46aedcf400",
                                    "unidad_medida_id": "db3988a6-e49b-4a4e-bf21-f42382010799",
                                    "factor_conversion": "1",
                                    "es_principal": true,
                                    "fecha_creacion": "2025-12-19T03:10:22.355Z",
                                    "unidad_medida": {
                                        "id": "db3988a6-e49b-4a4e-bf21-f42382010799",
                                        "nombre": "Kilogramo",
                                        "abreviatura": "KG",
                                        "tipo": "peso",
                                        "fecha_creacion": "2025-12-19T03:10:21.860Z"
                                    }
                                },
                                {
                                    "id": "06060850-4f90-4839-8dfe-9b8256fb3373",
                                    "producto_id": "1c8d7ba2-5d57-4561-ae42-df46aedcf400",
                                    "unidad_medida_id": "c13d842b-967b-4bcf-9658-c1fe4f1f353b",
                                    "factor_conversion": "50",
                                    "es_principal": false,
                                    "fecha_creacion": "2025-12-19T03:10:22.358Z",
                                    "unidad_medida": {
                                        "id": "c13d842b-967b-4bcf-9658-c1fe4f1f353b",
                                        "nombre": "Caja",
                                        "abreviatura": "CJA",
                                        "tipo": "unidad",
                                        "fecha_creacion": "2025-12-19T03:10:21.867Z"
                                    }
                                }
                            ],
                            "producto_almacenes": [],
                            "empresa": {
                                "id": "7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                                "nombre": "Distribuidora El Éxito SAS"
                            }
                        }
                    },
                    "timestamp": "2025-12-20T23:11:05.420Z"
                }
            }),
            ApiResponse({ status: 400, description: 'Error en la solicitud',
                example: {
                    "success":false,
                    "statusCode":400,
                    "message":"Error en la solicitud.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos/1c8d7ba2-5d57-4561-ae42-df46aedcf400"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success":false,
                    "statusCode":401,
                    "message":"No autenticado. Token inválido o expirado.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos/1c8d7ba2-5d57-4561-ae42-df46aedcf400"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success":false,
                    "statusCode":403,
                    "message":"No autorizado. Token inválido o expirado.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos/1c8d7ba2-5d57-4561-ae42-df46aedcf400"
                }
            }),
            ApiResponse({ status: 404, description: 'Producto no encontrado',
                example: {
                    "success":false,
                    "statusCode":404,
                    "message":"Producto no encontrado",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos/1c8d7ba2-5d57-4561-ae42-df46aedcf400"
                }
            })
        )
    },

    search: () => {
        return applyDecorators(
            ApiBearerAuth(),
            ApiTags('Productos'),
            ApiOperation({ summary: 'Buscar productos por código o nombre',
                description: 'Buscar productos por código o nombre'
             }),
            ApiQuery({ name: 'q', required: true, description: 'Término de búsqueda' }),
            ApiResponse({ status: 200, description: 'Productos encontrados',
                example: {
                    "success": true,
                    "data": [
                        {
                            "id": "ee0226a8-999a-4823-8a7a-c75f0ef05ff7",
                            "empresa_id": "7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                            "codigo": "PROD-001",
                            "nombre": "Laptop Dell Inspiron 15",
                            "descripcion": "Laptop empresarial con procesador Intel Core i5",
                            "campos_personalizados": {
                                "marca": "Dell",
                                "modelo": "Inspiron 15 3000",
                                "garantia_meses": 12
                            },
                            "requiere_lote": false,
                            "requiere_serie": false,
                            "dias_vencimiento": null,
                            "permite_stock_negativo": false,
                            "activo": true,
                            "fecha_creacion": "2025-12-19T03:10:22.334Z",
                            "fecha_actualizacion": "2025-12-19T03:10:22.334Z",
                            "unidades_medida": [
                                {
                                    "id": "5dbd1c87-9c58-482a-9686-939b31a925de",
                                    "producto_id": "ee0226a8-999a-4823-8a7a-c75f0ef05ff7",
                                    "unidad_medida_id": "b4f3f238-b7e0-44d6-83bf-1c7a52da91e0",
                                    "factor_conversion": "1",
                                    "es_principal": true,
                                    "fecha_creacion": "2025-12-19T03:10:22.346Z",
                                    "unidad_medida": {
                                        "id": "b4f3f238-b7e0-44d6-83bf-1c7a52da91e0",
                                        "nombre": "Unidad",
                                        "abreviatura": "UN",
                                        "tipo": "unidad",
                                        "fecha_creacion": "2025-12-19T03:10:21.859Z"
                                    }
                                }
                            ]
                        }
                    ],
                    "timestamp": "2025-12-20T00:47:24.216Z"
                }
            }),
            ApiResponse({ status: 400, description: 'Error en la solicitud',
                example: {
                    "success":false,
                    "statusCode":400,
                    "message":"Error en la solicitud.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos/search?q="
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success":false,
                    "statusCode":401,
                    "message":"No autenticado. Token inválido o expirado.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos/search?q="
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success":false,
                    "statusCode":403,
                    "message":"No autorizado. Token inválido o expirado.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos/search?q="
                }
            }),
            ApiResponse({ status: 404, description: 'Producto no encontrado',
                example: {
                    "success":false,
                    "statusCode":404,
                    "message":"Producto no encontrado",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos/search?q="
                }
            })
        )
    },

    create: () => {
        return applyDecorators(
            ApiBearerAuth(),
            ApiTags('Productos'),
            ApiOperation({ summary: 'Crear un nuevo producto',
                description: 'Crear un nuevo producto'
            }),
            ApiBody({
                type: CreateProductoDto,
                required: true,
                description: 'Datos del producto'
            }),
            ApiResponse({ status: 201, description: 'Producto creado exitosamente',
                example: {
                    "success":true,
                    "data":{
                        "id":"68414fd6-d298-424d-aecf-83295a68f3c7",
                        "empresa_id":"7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                        "codigo":"TECH-002",
                        "nombre":"PlayStation 5 Pro",
                        "descripcion":"Consola Videojuegos PlayStation 5 Pro",
                        "campos_personalizados":{
                            "color":"blanca",
                            "marca":"Sony",
                            "garantía":"12 meses",
                            "lectorDvd":false
                        },
                        "requiere_lote":false,
                        "requiere_serie":true,
                        "dias_vencimiento":30,
                        "permite_stock_negativo":false,
                        "activo":true,
                        "fecha_creacion":"2025-12-20T01:30:08.646Z",
                        "fecha_actualizacion":"2025-12-20T01:30:08.646Z",
                        "empresa":{
                            "id":"7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                            "nombre":"Distribuidora El Éxito SAS"
                        }
                    },
                    "timestamp":"2025-12-20T01:30:08.687Z"
                }
            }),
            ApiResponse({ status: 400, description: 'Error en la solicitud',
                example: {
                    "success":false,
                    "statusCode":400,
                    "message":"Error en la solicitud.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success":false,
                    "statusCode":401,
                    "message":"No autenticado. Token inválido o expirado.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success":false,
                    "statusCode":403,
                    "message":"No autorizado. Token inválido o expirado.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos"
                }
            }),
            ApiResponse({ status: 409, description: 'El código de producto ya existe',
                example: {
                    "success":false,
                    "statusCode":409,
                    "message":"El código de producto ya existe.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos"
                }
            })
        )
    },

    update: () => {
          return applyDecorators(
            ApiBearerAuth(),
            ApiTags('Productos'),
            ApiOperation({ summary: 'Actualizar un producto existente',
                description: 'Actualizar un producto existente'
            }),
            ApiBody({
                type: UpdateProductoDto,
                required: true,
                description: 'Datos del producto'
            }),
            ApiResponse({ status: 200, description: 'Producto actualizado',
                example: {
                    "success":true,
                    "data":{
                        "id":"ee0226a8-999a-4823-8a7a-c75f0ef05ff7",
                        "empresa_id":"7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                        "codigo":"PROD-001",
                        "nombre":"Laptop Dell Inspiron 20",
                        "descripcion":"Laptop empresarial con procesador Intel Core i5",
                        "campos_personalizados":{
                            "marca":"Dell",
                            "modelo":"Inspiron 20 7000",
                            "garantia_meses":12
                        },
                        "requiere_lote":false,
                        "requiere_serie":false,
                        "dias_vencimiento":60,
                        "permite_stock_negativo":false,
                        "activo":true,
                        "fecha_creacion":"2025-12-19T03:10:22.334Z",
                        "fecha_actualizacion":"2025-12-20T01:51:55.207Z",
                        "unidades_medida":[
                            {
                                "id":"5dbd1c87-9c58-482a-9686-939b31a925de",
                                "producto_id":"ee0226a8-999a-4823-8a7a-c75f0ef05ff7",
                                "unidad_medida_id":"b4f3f238-b7e0-44d6-83bf-1c7a52da91e0",
                                "factor_conversion":"1","es_principal":true,
                                "fecha_creacion":"2025-12-19T03:10:22.346Z",
                                "unidad_medida":{
                                    "id":"b4f3f238-b7e0-44d6-83bf-1c7a52da91e0",
                                    "nombre":"Unidad",
                                    "abreviatura":"UN",
                                    "tipo":"unidad",
                                    "fecha_creacion":"2025-12-19T03:10:21.859Z"
                                }
                            }
                        ]
                    },
                    "timestamp":"2025-12-20T01:51:55.316Z"
                }
            }),
            ApiResponse({ status: 400, description: 'Error en la solicitud',
                example: {
                    "success":false,
                    "statusCode":400,
                    "message":"Error en la solicitud.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success":false,
                    "statusCode":401,
                    "message":"No autenticado. Token inválido o expirado.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success":false,
                    "statusCode":403,
                    "message":"No autorizado. Token inválido o expirado.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos"
                }
            }),
            ApiResponse({ status: 404, description: 'Producto no encontrado',
                example: {
                    "success":false,
                    "statusCode":404,
                    "message":"Producto no encontrado.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos"
                }
            })
          )
    },

    remove: () => {
        return applyDecorators(
            ApiBearerAuth(),
            ApiTags('Productos'),
            ApiOperation({ summary: 'Desactivar un producto (soft delete)',
                description: 'Desactivar un producto (soft delete)'
            }),
            ApiParam({ name: 'id', description: 'ID del producto', required: true }),
            ApiBody({
                type: UpdateProductoDto,
                required: true,
                description: 'Datos del producto'
            }),
            ApiResponse({ status: 200, description: 'Producto desactivado',
                example: {
                    "success":true,
                    "data":{
                        "id":"ee0226a8-999a-4823-8a7a-c75f0ef05ff7",
                        "empresa_id":"7143462f-9cfd-4201-91ab-a38bb3fc50c7",
                        "codigo":"PROD-001",
                        "nombre":"Laptop Dell Inspiron 20",
                        "descripcion":"Laptop empresarial con procesador Intel Core i5",
                        "campos_personalizados":{
                            "marca":"Dell",
                            "modelo":"Inspiron 20 7000",
                            "garantia_meses":12
                        },
                        "requiere_lote":false,
                        "requiere_serie":false,
                        "dias_vencimiento":60,
                        "permite_stock_negativo":false,
                        "activo":false,
                        "fecha_creacion":"2025-12-19T03:10:22.334Z",
                        "fecha_actualizacion":"2025-12-20T01:51:55.207Z",
                        "unidades_medida":[
                            {
                                "id":"5dbd1c87-9c58-482a-9686-939b31a925de",
                                "producto_id":"ee0226a8-999a-4823-8a7a-c75f0ef05ff7",
                                "unidad_medida_id":"b4f3f238-b7e0-44d6-83bf-1c7a52da91e0",
                                "factor_conversion":"1",
                                "es_principal":true,
                                "fecha_creacion":"2025-12-19T03:10:22.346Z",
                                "unidad_medida":{
                                    "id":"b4f3f238-b7e0-44d6-83bf-1c7a52da91e0",
                                    "nombre":"Unidad",
                                    "abreviatura":"UN",
                                    "tipo":"unidad",
                                    "fecha_creacion":"2025-12-19T03:10:21.859Z"
                                }
                            }
                        ]
                    },
                    "timestamp":"2025-12-20T02:03:51.064Z"
                }
            }),
            ApiResponse({ status: 400, description: 'Error en la solicitud',
                example: {
                    "success":false,
                    "statusCode":400,
                    "message":"Error en la solicitud.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success":false,
                    "statusCode":401,
                    "message":"No autenticado. Token inválido o expirado.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success":false,
                    "statusCode":403,
                    "message":"No autorizado. Token inválido o expirado.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos"
                }
            }),
            ApiResponse({ status: 404, description: 'Producto no encontrado',
                example: {
                    "success":false,
                    "statusCode":404,
                    "message":"Producto no encontrado.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos"
                }
            })
        )
    },

    getUnidadesMedida: () => {
        return applyDecorators(
            ApiTags('Productos'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Obtener unidades de medida disponibles',
                description: 'Obtener unidades de medida disponibles'
            }),
            ApiResponse({ status: 200, description: 'Catálogo de unidades de medida',
                example: {
                    "success": true,
                    "data": [
                        {
                            "id": "14e6ae5f-221b-45bb-80eb-88d09d1fc0db",
                            "nombre": "Bulto",
                            "abreviatura": "BLT",
                            "tipo": "unidad",
                            "fecha_creacion": "2025-12-19T03:10:21.869Z"
                        },
                        {
                            "id": "c13d842b-967b-4bcf-9658-c1fe4f1f353b",
                            "nombre": "Caja",
                            "abreviatura": "CJA",
                            "tipo": "unidad",
                            "fecha_creacion": "2025-12-19T03:10:21.867Z"
                        },
                        {
                            "id": "3e8dbbbc-74e2-4522-a7cb-03fb6e9d57cc",
                            "nombre": "Centímetro",
                            "abreviatura": "CM",
                            "tipo": "longitud",
                            "fecha_creacion": "2025-12-19T03:10:21.866Z"
                        },
                        {
                            "id": "ab6a62a8-d55f-4beb-a11d-531a05a0df73",
                            "nombre": "Docena",
                            "abreviatura": "DOC",
                            "tipo": "unidad",
                            "fecha_creacion": "2025-12-19T03:10:21.868Z"
                        },
                        {
                            "id": "f1712fca-901c-4942-a44f-a369459bfe12",
                            "nombre": "Galón",
                            "abreviatura": "GAL",
                            "tipo": "volumen",
                            "fecha_creacion": "2025-12-19T03:10:21.865Z"
                        },
                        {
                            "id": "b99cf26f-afa1-4e46-9e00-db9f2e7b6398",
                            "nombre": "Gramo",
                            "abreviatura": "G",
                            "tipo": "peso",
                            "fecha_creacion": "2025-12-19T03:10:21.860Z"
                        },
                        {
                            "id": "db3988a6-e49b-4a4e-bf21-f42382010799",
                            "nombre": "Kilogramo",
                            "abreviatura": "KG",
                            "tipo": "peso",
                            "fecha_creacion": "2025-12-19T03:10:21.860Z"
                        },
                        {
                            "id": "172c8823-47a3-4350-bc0b-a330e7369038",
                            "nombre": "Libra",
                            "abreviatura": "LB",
                            "tipo": "peso",
                            "fecha_creacion": "2025-12-19T03:10:21.862Z"
                        },
                        {
                            "id": "a6e2b6b2-2c3d-43ce-ab8a-c400efd74e02",
                            "nombre": "Litro",
                            "abreviatura": "L",
                            "tipo": "volumen",
                            "fecha_creacion": "2025-12-19T03:10:21.863Z"
                        },
                        {
                            "id": "517d101c-a8cb-4c59-938b-ab3fb68a8b41",
                            "nombre": "Metro",
                            "abreviatura": "M",
                            "tipo": "longitud",
                            "fecha_creacion": "2025-12-19T03:10:21.865Z"
                        },
                        {
                            "id": "5f474d04-b5df-4fb2-be05-6aee9def514b",
                            "nombre": "Metro cúbico",
                            "abreviatura": "M3",
                            "tipo": "volumen",
                            "fecha_creacion": "2025-12-19T03:10:21.866Z"
                        },
                        {
                            "id": "829e63d4-df28-4420-98cd-aca684205d69",
                            "nombre": "Mililitro",
                            "abreviatura": "ML",
                            "tipo": "volumen",
                            "fecha_creacion": "2025-12-19T03:10:21.864Z"
                        },
                        {
                            "id": "7f3911b4-8489-417d-a6d6-87bf368e1940",
                            "nombre": "Paquete",
                            "abreviatura": "PQT",
                            "tipo": "unidad",
                            "fecha_creacion": "2025-12-19T03:10:21.868Z"
                        },
                        {
                            "id": "afbe7fe7-9e98-4fb0-8957-7917ec2e5958",
                            "nombre": "Tonelada",
                            "abreviatura": "TON",
                            "tipo": "peso",
                            "fecha_creacion": "2025-12-19T03:10:21.861Z"
                        },
                        {
                            "id": "b4f3f238-b7e0-44d6-83bf-1c7a52da91e0",
                            "nombre": "Unidad",
                            "abreviatura": "UN",
                            "tipo": "unidad",
                            "fecha_creacion": "2025-12-19T03:10:21.859Z"
                        }
                    ],
                    "timestamp": "2025-12-20T02:24:20.303Z"
                }
            }),
            ApiResponse({ status: 400, description: 'Error en la solicitud',
                example: {
                    "success":false,
                    "statusCode":400,
                    "message":"Error en la solicitud.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos/unidades-medida"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success":false,
                    "statusCode":401,
                    "message":"No autenticado. Token inválido o expirado.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos/unidades-medida"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success":false,
                    "statusCode":403,
                    "message":"No autorizado. Token inválido o expirado.",
                    "errors":null,
                    "timestamp":"2025-12-19T23:55:44.742Z",
                    "path":"/api/productos/unidades-medida"
                }
            })
        )
    },

    configStock: () => {
        return applyDecorators(
            ApiTags('Productos'),
            ApiBearerAuth(),
            ApiOperation({ 
                summary: 'Configurar stock mínimo/máximo para un producto en un almacén',
                description: 'Define los límites de stock y punto de reorden para un producto en un almacén específico'
            }),
            ApiResponse({ status: 201, description: 'Configuración de stock creada/actualizada',
                example: {
                    "success": true,
                    "data": {
                        "id": "99929711-cc03-4c6e-812e-152d6aef65a0",
                        "producto_id": "68414fd6-d298-424d-aecf-83295a68f3c7",
                        "almacen_id": "b76fdf6a-4144-43df-b425-4ec1d0485ba8",
                        "ubicacion_id": "276db649-c687-45f3-8a20-c7c0438bcec6",
                        "stock_minimo": "10",
                        "stock_maximo": "30",
                        "punto_reorden": "11",
                        "activo": true,
                        "fecha_creacion": "2025-12-20T21:37:36.134Z",
                        "fecha_actualizacion": "2025-12-20T21:37:36.134Z",
                        "producto": {
                            "id": "68414fd6-d298-424d-aecf-83295a68f3c7",
                            "codigo": "TECH-002",
                            "nombre": "PlayStation 5 Pro"
                        },
                        "almacen": {
                            "id": "b76fdf6a-4144-43df-b425-4ec1d0485ba8",
                            "nombre": "Almacén Principal"
                        },
                        "ubicacion": {
                            "id": "276db649-c687-45f3-8a20-c7c0438bcec6",
                            "nombre": "Estante 1A"
                        }
                    },
                    "timestamp": "2025-12-20T21:37:36.279Z"
                }
            }),
            ApiResponse({ status: 400, description: 'Error en la solicitud',
                example: {
                    "success":false,
                    "statusCode":400,
                    "message":[
                        "almacen_id must be a UUID",
                        "stock_minimo must not be less than 0",
                        "stock_minimo must be a number conforming to the specified constraints"
                    ],
                    "errors":null,
                    "timestamp":"2025-12-20T19:52:01.877Z",
                    "path":"/api/productos/68414fd6-d298-424d-aecf-83295a68f3c7/stock-config"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success":false,
                    "statusCode":401,"message":"No autorizado. Token inválido o expirado.",
                    "errors":null,
                    "timestamp":"2025-12-20T21:23:10.779Z",
                    "path":"/api/productos/68414fd6-d298-424d-aecf-83295a68f3c7/stock-config"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success":false,
                    "statusCode":403,
                    "message":"No autorizado. Token inválido o expirado.",
                    "errors":null,
                    "timestamp":"2025-12-20T19:52:01.877Z",
                    "path":"/api/productos/68414fd6-d298-424d-aecf-83295a68f3c7/stock-config"
                }
            }),
            ApiResponse({ status: 404, description: 'Producto o almacén no encontrado',
                example: {
                    "success":false,
                    "statusCode":404,
                    "message":"Cannot POST /api/productos/68414fd6-d298-424d-aecf-83295a68f3c7/stock-config",
                    "errors":null,
                    "timestamp":"2025-12-20T19:52:01.877Z",
                    "path":"/api/productos/68414fd6-d298-424d-aecf-83295a68f3c7/stock-config"
                }
            }),
        )
    },

    addUnidadMedida: () => {
        return applyDecorators(
            ApiTags('Productos'),
            ApiBearerAuth(),
            ApiOperation({ 
                summary: 'Agregar unidad de medida a un producto',
                description: 'Agregar una unidad de medida a un producto'
            }),
            ApiResponse({ status: 201, description: 'Unidad de medida agregada',
                example: {
                    "success":true,
                    "data":{
                        "id":"cffc6385-9564-4487-8131-7b2814013136",
                        "producto_id":"68414fd6-d298-424d-aecf-83295a68f3c7",
                        "unidad_medida_id":"c13d842b-967b-4bcf-9658-c1fe4f1f353b",
                        "factor_conversion":"1",
                        "es_principal":true,
                        "fecha_creacion":"2025-12-20T22:52:29.595Z",
                        "unidad_medida":{
                            "id":"c13d842b-967b-4bcf-9658-c1fe4f1f353b",
                            "nombre":"Caja",
                            "abreviatura":"CJA",
                            "tipo":"unidad",
                            "fecha_creacion":"2025-12-19T03:10:21.867Z"
                        },
                        "producto":{
                            "id":"68414fd6-d298-424d-aecf-83295a68f3c7",
                            "codigo":"TECH-002",
                            "nombre":"PlayStation 5 Pro"
                        }
                    },
                    "timestamp":"2025-12-20T22:52:29.602Z"
                }
            }),
            ApiResponse({ status: 400, description: 'Error en la solicitud',
                example: {
                    "success":false,
                    "statusCode":400,
                    "message":[
                        "unidad_medida_id must be a UUID",
                        "factor_conversion must not be less than 0.0001",
                        "factor_conversion must be a number conforming to the specified constraints"
                    ],
                    "errors":null,
                    "timestamp":"2025-12-20T22:35:58.708Z",
                    "path":"/api/productos/68414fd6-d298-424d-aecf-83295a68f3c7/unidades"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success":false,
                    "statusCode":401,
                    "message":"No autorizado. Token inválido o expirado.",
                    "errors":null,
                    "timestamp":"2025-12-20T21:37:36.279Z",
                    "path":"/api/productos/68414fd6-d298-424d-aecf-83295a68f3c7/unidades"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success":false,
                    "statusCode":403,
                    "message":"No autorizado. Token inválido o expirado.",
                    "errors":null,
                    "timestamp":"2025-12-20T21:37:36.279Z",
                    "path":"/api/productos/68414fd6-d298-424d-aecf-83295a68f3c7/unidades"
                }
            }),
            ApiResponse({ status: 404, description: 'Producto no encontrado',
                example: {
                    "success":false,
                    "statusCode":404,
                    "message":"Cannot POST /api/productos/68414fd6-d298-424d-aecf-83295a68f3c7/unidades",
                    "errors":null,
                    "timestamp":"2025-12-20T21:37:36.279Z",
                    "path":"/api/productos/68414fd6-d298-424d-aecf-83295a68f3c7/unidades"
                }
            }),
            ApiResponse({ status: 409, description: 'Esta unidad de medida ya está asociada al producto',
                example: {
                    "success":false,
                    "statusCode":409,
                    "message":"Esta unidad de medida ya está asociada al producto.",
                    "errors":null,
                    "timestamp":"2025-12-20T21:37:36.279Z",
                    "path":"/api/productos/68414fd6-d298-424d-aecf-83295a68f3c7/unidades"
                }
            })
        )
    },

    activateProducto: () => {
        return applyDecorators(
            ApiTags('Productos'),
            ApiBearerAuth(),
            ApiOperation({ 
                summary: 'Reactivar un producto',
                description: 'Reactivar un producto'
            }),
            ApiResponse({ status: 200, description: 'Producto reactivado',
                example: {
                    "success": true,
                    "data": {
                        "message": "Producto reactivado correctamente",
                        "id": "ee0226a8-999a-4823-8a7a-c75f0ef05ff7"
                    },
                    "timestamp": "2025-12-21T20:17:35.164Z"
                }
            }),
            ApiResponse({ status: 400, description: 'Error en la solicitud',
                example: {
                    "success":false,
                    "statusCode":400,
                    "message":"El producto ya está activo.",
                    "errors":null,
                    "timestamp":"2025-12-20T22:35:58.708Z",
                    "path":"/api/productos/68414fd6-d298-424d-aecf-83295a68f3c7/activate"
                }
            }),
            ApiResponse({ status: 401, description: 'No autenticado',
                example: {
                    "success":false,
                    "statusCode":401,
                    "message":"No autorizado. Token inválido o expirado.",
                    "errors":null,
                    "timestamp":"2025-12-20T21:37:36.279Z",
                    "path":"/api/productos/68414fd6-d298-424d-aecf-83295a68f3c7/activate"
                }
            }),
            ApiResponse({ status: 403, description: 'No autorizado',
                example: {
                    "success":false,
                    "statusCode":403,
                    "message":"No autorizado. Token inválido o expirado.",
                    "errors":null,
                    "timestamp":"2025-12-20T21:37:36.279Z",
                    "path":"/api/productos/68414fd6-d298-424d-aecf-83295a68f3c7/activate"
                }
            }),
            ApiResponse({ status: 404, description: 'Producto no encontrado',
                example: {
                    "success":false,
                    "statusCode":404,
                    "message":"Cannot POST /api/productos/68414fd6-d298-424d-aecf-83295a68f3c7/activate",
                    "errors":null,
                    "timestamp":"2025-12-20T21:37:36.279Z",
                    "path":"/api/productos/68414fd6-d298-424d-aecf-83295a68f3c7/activate"
                }
            })
        )
    },

}
  