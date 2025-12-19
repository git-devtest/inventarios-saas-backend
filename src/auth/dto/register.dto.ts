import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'email@example.com' })
    @IsEmail({}, { message: 'Email inválido' })
    @IsNotEmpty({ message: 'El email es requerido' })
    email: string;

    @ApiProperty({ example: 'Nombre' })
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    nombre: string;

    @ApiProperty({ example: 'Contraseña' })
    @IsString({ message: 'La contraseña debe ser un texto' })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;

    @ApiProperty({ example: 'ID de la empresa' })
    @IsString({ message: 'El ID de la empresa es requerido' })
    @IsNotEmpty()
    empresa_id: string;

    @ApiProperty({ example: 'ID del rol' })
    @IsString({ message: 'El ID del rol es requerido' })
    @IsNotEmpty()
    rol_id: string;
}
