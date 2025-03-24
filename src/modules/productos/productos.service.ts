import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../../entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: any): Promise<Producto> {
    const producto = this.productosRepository.create({
      ...createProductoDto,
      fecha_creacion: new Date(),
    });
    return this.productosRepository.save(producto);
  }

  async findAll(categoriaId?: number): Promise<Producto[]> {
    if (categoriaId) {
      return this.productosRepository.find({
        where: { categoriaId },
        relations: ['categoria'],
      });
    }
    return this.productosRepository.find({ relations: ['categoria'] });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productosRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    
    if (!producto) {
      throw new NotFoundException(`Producto with ID ${id} not found`);
    }
    
    return producto;
  }

  async update(id: number, updateProductoDto: any): Promise<Producto> {
    const producto = await this.findOne(id);
    this.productosRepository.merge(producto, updateProductoDto);
    return this.productosRepository.save(producto);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
    await this.productosRepository.remove(producto);
  }
}
