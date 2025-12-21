import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUbicacionDto {
  @ApiProperty({ example: 'Zona A', description: 'Nombre de la ubicación' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'A', description: 'Código de la ubicación' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiPropertyOptional({ 
    example: 'uuid-ubicacion-padre',
    description: 'ID de la ubicación padre (para jerarquía)'
  })
  @IsUUID()
  @IsOptional()
  ubicacion_padre_id?: string;
}