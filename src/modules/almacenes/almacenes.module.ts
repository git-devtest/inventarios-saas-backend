import { Module } from '@nestjs/common';
import { AlmacenesService } from './almacenes.service';
import { AlmacenesController } from './almacenes.controller';

@Module({
  controllers: [AlmacenesController],
  providers: [AlmacenesService],
  exports: [AlmacenesService],
})
export class AlmacenesModule {}