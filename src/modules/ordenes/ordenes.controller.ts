import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Post()
  async create(@Body() createOrdenDto: CreateOrdenDto) {
    console.log('Recibiendo orden:', JSON.stringify(createOrdenDto, null, 2));
    
    // Verificar si tenemos detallesOrden
    if (createOrdenDto.detallesOrden && createOrdenDto.detallesOrden.length > 0) {
      // Guardar los detalles para procesarlos después
      const detallesOrden = [...createOrdenDto.detallesOrden];
      console.log('Detalles de orden recibidos:', JSON.stringify(detallesOrden, null, 2));
      
      // Crear la orden primero (sin los detalles)
      delete createOrdenDto.detallesOrden;
      const orden = await this.ordenesService.create({
        ...createOrdenDto,
        estado: 'Pendiente'
      });
      console.log('Orden creada:', JSON.stringify(orden, null, 2));
      
      // Ahora crear los detalles asociados a esta orden
      for (const detalle of detallesOrden) {
        // Incluimos el subtotal ya que es un campo obligatorio en la entidad
        console.log('Creando detalle:', JSON.stringify({...detalle, ordenId: orden.id}, null, 2));
        try {
          const detalleCreado = await this.ordenesService.createDetalleOrden({
            ...detalle,
            ordenId: orden.id
          });
          console.log('Detalle creado:', JSON.stringify(detalleCreado, null, 2));
        } catch (error) {
          console.error('Error al crear detalle:', error.message);
          console.error('Stack:', error.stack);
          throw error;
        }
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
