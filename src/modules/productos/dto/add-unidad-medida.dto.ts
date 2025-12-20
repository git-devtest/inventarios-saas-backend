import { IsUUID, IsNumber, IsBoolean, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddUnidadMedidaDto {
  @ApiProperty({ 
    example: 'uuid-de-unidad-medida',
    description: 'ID de la unidad de medida existente'
  })
  @IsUUID()
  unidad_medida_id: string;

  @ApiProperty({ 
    example: 1.0,
    description: 'Factor de conversión respecto a la unidad principal'
  })
  @IsNumber()
  @Min(0.0001)
  factor_conversion: number;

  @ApiPropertyOptional({ 
    example: false,
    description: 'Si es la unidad principal del producto'
  })
  @IsBoolean()
  @IsOptional()
  es_principal?: boolean;
}