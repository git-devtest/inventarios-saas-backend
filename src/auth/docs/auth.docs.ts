import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export const AuthDocs = {
    loginDocs: () => {
        return applyDecorators(
            ApiTags('Auth'),
            ApiOperation({ summary: 'Iniciar sesión',
                description: 'Inicia sesión con un usuario existente.'
            }),
            ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.',
                example: {
                    "success": true,
                    "data": {
                        "access_token": "[Generate]",
                        "user": {
                            "id": "63fcef8d-3da3-4ad0-a48e-da63191c2271",
                            "email": "jeimy@techstore.com",
                            "nombre": "Jeimy Rodriguez"
                        }
                    },
                    "timestamp": "2025-12-19T17:27:08.038Z"
                } 
            }),
            ApiResponse({ status: 400, description: 'Bad Request.',
                example: {
                    "success": false,
                    "statusCode": 400,
                    "message": [
                        "El email es requerido",
                        "Email inválido",
                        "La contraseña debe tener al menos 6 caracteres",
                        "La contraseña es requerida",
                        "La contraseña debe ser un texto"
                    ],
                    "errors": null,
                    "timestamp": "[Generated]",
                    "path": "/api/auth/login"
                }
            }),
        );
    },
    registerDocs: () => {
        return applyDecorators(
            ApiTags('Auth'),
            ApiOperation({ summary: 'Registra un nuevo usuario',
                description: 'Registra un nuevo usuario.' }),
            ApiResponse({ status: 200, description: 'Usuario registrado exitosamente.',
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
            ApiResponse({ status: 400, description: 'Bad Request',
                example: {
                    "success": false,
                    "statusCode": 400,
                    "message": [
                        "El email es requerido",
                        "Email inválido",
                        "La contraseña debe tener al menos 6 caracteres",
                        "La contraseña es requerida",
                        "La contraseña debe ser un texto"
                    ],
                    "errors": null,
                    "timestamp": "[Generated]",
                    "path": "/api/auth/login"
                }
            }),
        );
    }
};