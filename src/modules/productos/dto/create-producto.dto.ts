import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt, Min, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty({ example: 'PROD-001', description: 'Código único del producto' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Laptop Dell Inspiron 15', description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiPropertyOptional({ example: 'Laptop empresarial con procesador i5' })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiPropertyOptional({ 
    example: { marca: 'Dell', modelo: 'Inspiron 15', garantia_meses: 12 },
    description: 'Campos personalizados en formato JSON'
  })
  @IsObject()
  @IsOptional()
  campos_personalizados?: Record<string, any>;

  @ApiPropertyOptional({ example: false, default: false })
  @IsBoolean()
  @IsOptional()
  requiere_lote?: boolean;

  @ApiPropertyOptional({ example: false, default: false })
  @IsBoolean()
  @IsOptional()
  requiere_serie?: boolean;

  @ApiPropertyOptional({ example: 730, description: 'Días de vida útil del producto' })
  @IsInt()
  @Min(1)
  @IsOptional()
  dias_vencimiento?: number;

  @ApiPropertyOptional({ example: false, default: false })
  @IsBoolean()
  @IsOptional()
  permite_stock_negativo?: boolean;
}