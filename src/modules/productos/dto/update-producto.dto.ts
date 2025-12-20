import { IsString, IsOptional, IsBoolean, IsInt, Min, IsObject } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductoDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  campos_personalizados?: Record<string, any>;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  requiere_lote?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  requiere_serie?: boolean;

  @ApiPropertyOptional()
  @IsInt()
  @Min(1)
  @IsOptional()
  dias_vencimiento?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  permite_stock_negativo?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}