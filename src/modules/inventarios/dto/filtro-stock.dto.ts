import { IsUUID, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FiltroStockDto {
  @ApiPropertyOptional({ example: 'uuid-producto' })
  @IsUUID()
  @IsOptional()
  producto_id?: string;

  @ApiPropertyOptional({ example: 'uuid-almacen' })
  @IsUUID()
  @IsOptional()
  almacen_id?: string;

  @ApiPropertyOptional({ example: 'uuid-ubicacion' })
  @IsUUID()
  @IsOptional()
  ubicacion_id?: string;
}
