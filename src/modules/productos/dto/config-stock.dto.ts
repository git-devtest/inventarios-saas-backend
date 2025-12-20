import { IsUUID, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ConfigStockDto {
  @ApiProperty({ example: 'uuid-del-almacen' })
  @IsUUID()
  almacen_id: string;

  @ApiPropertyOptional({ example: 'uuid-de-ubicacion' })
  @IsUUID()
  @IsOptional()
  ubicacion_id?: string;

  @ApiProperty({ example: 10, description: 'Stock mínimo permitido' })
  @IsNumber()
  @Min(0)
  stock_minimo: number;

  @ApiPropertyOptional({ example: 100, description: 'Stock máximo sugerido' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  stock_maximo?: number;

  @ApiPropertyOptional({ example: 20, description: 'Punto de reorden' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  punto_reorden?: number;
}