import { IsUUID, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMovimientoDto {
  @ApiProperty({ example: 'uuid-tipo-movimiento' })
  @IsUUID()
  @IsNotEmpty()
  tipo_movimiento_id: string;

  @ApiProperty({ example: 'uuid-almacen-origen' })
  @IsUUID()
  @IsNotEmpty()
  almacen_origen_id: string;

  @ApiPropertyOptional({ example: 'uuid-ubicacion-origen' })
  @IsUUID()
  @IsOptional()
  ubicacion_origen_id?: string;

  @ApiPropertyOptional({ 
    example: 'uuid-almacen-destino',
    description: 'Requerido solo para transferencias'
  })
  @IsUUID()
  @IsOptional()
  almacen_destino_id?: string;

  @ApiPropertyOptional({ example: 'uuid-ubicacion-destino' })
  @IsUUID()
  @IsOptional()
  ubicacion_destino_id?: string;

  @ApiPropertyOptional({ 
    example: '2024-12-21T10:00:00Z',
    description: 'Fecha del movimiento (default: ahora)'
  })
  @IsDateString()
  @IsOptional()
  fecha_movimiento?: string;

  @ApiPropertyOptional({ example: 'Entrada por compra a proveedor XYZ' })
  @IsString()
  @IsOptional()
  observacion?: string;
}
