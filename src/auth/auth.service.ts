import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { logger } from '../../winston_logs/logger';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    /**
     * Método para registrar un nuevo usuario
     * @param registerDto Datos del usuario para registrar
     * @returns Datos del usuario registrado
     */
    async register(registerDto: RegisterDto) {
        const { email, nombre, password, empresa_id, rol_id } = registerDto;

        // Verificar si el usuario ya existe
        const existingUser = await this.prisma.usuario.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictException('El usuario con este email ya existe');
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario
        const user = await this.prisma.usuario.create({
            data: {
                email,
                nombre,
                password_hash: hashedPassword,
                empresa_id,
                rol_id,
            },
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password_hash, ...result } = user;
        console.log(`Usuario: [${email}] registrado exitosamente`);
        logger.info(`Usuario: [${email}] registrado exitosamente`);
        return result;
    }

    /**
     * Método para iniciar sesión
     * @param loginDto Datos del usuario para iniciar sesión
     * @returns JWT y datos del usuario
     */
    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // Buscar el usuario
        const user = await this.prisma.usuario.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // Generar JWT
        const payload = {
            sub: user.id,
            email: user.email,
            empresa_id: user.empresa_id,
            rol_id: user.rol_id
        };

        console.log(`Usuario: [${user.email}] logueado exitosamente`);
        logger.info(`Usuario: [${user.email}] logueado exitosamente`);
        
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                email: user.email,
                nombre: user.nombre,
            },
        };
    }
}
