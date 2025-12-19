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
    @ApiResponse({ 
        status: HttpStatus.CREATED, 
        description: 'User registered successfully', 
        example: { message: 'User registered successfully' } 
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
                    "id": "[UUID v4 Generated]",
                    "email": "[email]",
                    "nombre": "[nombre]"
                }
            },
            "timestamp": "[Generated]"
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
