import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { InventariosService } from './inventarios.service';
import { InventariosController } from './inventarios.controller';

@Module({
  imports: [PrismaModule],
  providers: [InventariosService],
  controllers: [InventariosController],
  exports: [InventariosService],
})
export class InventariosModule {}
