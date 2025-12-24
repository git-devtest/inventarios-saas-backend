import { IsUUID, IsNumber, Min, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddDetalleDto {
  @ApiProperty({ example: 'uuid-producto' })
  @IsUUID()
  producto_id: string;

  @ApiProperty({ example: 'uuid-producto-unidad-medida' })
  @IsUUID()
  producto_unidad_medida_id: string;

  @ApiProperty({ example: 100, description: 'Cantidad a mover' })
  @IsNumber()
  @Min(0.0001)
  cantidad: number;

  @ApiPropertyOptional({ example: 'LOTE-2024-001' })
  @IsString()
  @IsOptional()
  lote?: string;

  @ApiPropertyOptional({ example: 'SERIE-ABC-123' })
  @IsString()
  @IsOptional()
  serie?: string;

  @ApiPropertyOptional({ example: 'Producto en buen estado' })
  @IsString()
  @IsOptional()
  observacion_detalle?: string;
}
