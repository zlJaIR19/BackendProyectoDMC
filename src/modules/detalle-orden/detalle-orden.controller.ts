import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DetalleOrdenService } from './detalle-orden.service';

@Controller('detalle-orden')
export class DetalleOrdenController {
  constructor(private readonly detalleOrdenService: DetalleOrdenService) {}

  @Post()
  create(@Body() createDetalleOrdenDto: any) {
    return this.detalleOrdenService.create(createDetalleOrdenDto);
  }

  @Get()
  findAll(@Query('ordenId') ordenId?: string) {
    return this.detalleOrdenService.findAll(ordenId ? +ordenId : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleOrdenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleOrdenDto: any) {
    return this.detalleOrdenService.update(+id, updateDetalleOrdenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleOrdenService.remove(+id);
  }
}
