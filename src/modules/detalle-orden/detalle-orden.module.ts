import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleOrden } from '../../entities/detalle-orden.entity';
import { DetalleOrdenController } from './detalle-orden.controller';
import { DetalleOrdenService } from './detalle-orden.service';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleOrden])],
  controllers: [DetalleOrdenController],
  providers: [DetalleOrdenService],
  exports: [DetalleOrdenService],
})
export class DetalleOrdenModule {}
