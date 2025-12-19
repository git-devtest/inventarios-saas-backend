import { IsString, IsEmail, IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsuarioDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsOptional()
  rolId?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}