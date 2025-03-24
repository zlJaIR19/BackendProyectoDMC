import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';

@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Post()
  create(@Body() createOrdenDto: any) {
    return this.ordenesService.create(createOrdenDto);
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
  update(@Param('id') id: string, @Body() updateOrdenDto: any) {
    return this.ordenesService.update(+id, updateOrdenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordenesService.remove(+id);
  }
}
