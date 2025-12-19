import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: HttpStatus.CREATED, 
        description: 'User registered successfully', 
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
    })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST,
        description: 'Bad Request',
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
    })
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login a user' })
    @ApiResponse({ status: HttpStatus.OK, 
        description: 'User logged in successfully', 
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
    })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
        example: {
            "success": false,
            "statusCode": 401,
            "message": "Credenciales inválidas",
            "errors": null,
            "timestamp": "[Generated]",
            "path": "/api/auth/login"
        }
    })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST,
        description: 'Bad Request',
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
    })
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
