import { IsUUID, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FiltroKardexDto {
  @ApiProperty({ example: 'uuid-producto' })
  @IsUUID()
  @IsNotEmpty()
  producto_id: string;

  @ApiProperty({ example: 'uuid-almacen' })
  @IsUUID()
  @IsNotEmpty()
  almacen_id: string;

  @ApiPropertyOptional({ example: '2024-01-01T00:00:00Z' })
  @IsDateString()
  @IsOptional()
  fecha_inicio?: string;

  @ApiPropertyOptional({ example: '2024-12-31T23:59:59Z' })
  @IsDateString()
  @IsOptional()
  fecha_fin?: string;
}
