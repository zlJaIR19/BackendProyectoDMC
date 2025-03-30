import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Post()
  async create(@Body() createOrdenDto: CreateOrdenDto) {
    console.log('Recibiendo orden:', createOrdenDto);
    
    // Verificar si tenemos detallesOrden
    if (createOrdenDto.detallesOrden && createOrdenDto.detallesOrden.length > 0) {
      // Guardar los detalles para procesarlos después
      const detallesOrden = [...createOrdenDto.detallesOrden];
      
      // Crear la orden primero (sin los detalles)
      delete createOrdenDto.detallesOrden;
      const orden = await this.ordenesService.create({
        ...createOrdenDto,
        estado: 'Pendiente'
      });
      
      // Ahora crear los detalles asociados a esta orden
      for (const detalle of detallesOrden) {
        // Incluimos el subtotal ya que es un campo obligatorio en la entidad
        await this.ordenesService.createDetalleOrden({
          ...detalle,
          ordenId: orden.id
        });
      }
      
      // Devolver la orden completa
      return this.ordenesService.findOne(orden.id);
    } else {
      // Si no hay detalles, crear la orden simple
      return this.ordenesService.create({
        ...createOrdenDto,
        estado: 'Pendiente'
      });
    }
  }

  @Get()
  findAll(@Query('usuarioId') usuarioId?: string) {
    return this.ordenesService.findAll(usuarioId ? +usuarioId : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordenesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdenDto: UpdateOrdenDto) {
    return this.ordenesService.update(+id, updateOrdenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordenesService.remove(+id);
  }
}
