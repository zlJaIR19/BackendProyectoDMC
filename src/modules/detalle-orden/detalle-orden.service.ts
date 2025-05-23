import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleOrden } from '../../entities/detalle-orden.entity';
import { CreateDetalleOrdenDto } from './dto/create-detalle-orden.dto';
import { UpdateDetalleOrdenDto } from './dto/update-detalle-orden.dto';

@Injectable()
export class DetalleOrdenService {
  constructor(
    @InjectRepository(DetalleOrden)
    private detalleOrdenRepository: Repository<DetalleOrden>,
  ) {}

  async create(createDetalleOrdenDto: CreateDetalleOrdenDto): Promise<DetalleOrden> {
    const detalleOrden = this.detalleOrdenRepository.create(createDetalleOrdenDto);
    return this.detalleOrdenRepository.save(detalleOrden);
  }

  async findAll(ordenId?: number): Promise<DetalleOrden[]> {
    if (ordenId) {
      return this.detalleOrdenRepository.find({
        where: { ordenId },
        relations: ['producto', 'orden'],
      });
    }
    return this.detalleOrdenRepository.find({ 
      relations: ['producto', 'orden'] 
    });
  }

  async findOne(id: number): Promise<DetalleOrden> {
    const detalleOrden = await this.detalleOrdenRepository.findOne({
      where: { id },
      relations: ['producto', 'orden'],
    });
    
    if (!detalleOrden) {
      throw new NotFoundException(`DetalleOrden with ID ${id} not found`);
    }
    
    return detalleOrden;
  }

  async update(id: number, updateDetalleOrdenDto: UpdateDetalleOrdenDto): Promise<DetalleOrden> {
    const detalleOrden = await this.findOne(id);
    this.detalleOrdenRepository.merge(detalleOrden, updateDetalleOrdenDto);
    return this.detalleOrdenRepository.save(detalleOrden);
  }

  async remove(id: number): Promise<void> {
    const detalleOrden = await this.findOne(id);
    await this.detalleOrdenRepository.remove(detalleOrden);
  }
}
