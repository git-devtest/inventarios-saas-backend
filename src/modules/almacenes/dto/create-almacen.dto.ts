import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAlmacenDto {
  @ApiProperty({ example: 'ALM-001', description: 'Código único del almacén' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Almacén Principal', description: 'Nombre del almacén' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiPropertyOptional({ 
    example: 'Calle 123 #45-67, Bogotá',
    description: 'Dirección física del almacén'
  })
  @IsString()
  @IsOptional()
  direccion?: string;
}