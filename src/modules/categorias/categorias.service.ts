import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../../entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: any): Promise<Categoria> {
    const categoria = this.categoriasRepository.create({
      ...createCategoriaDto,
      fecha_creacion: new Date(),
    });
    return this.categoriasRepository.save(categoria) as unknown as Promise<Categoria>;
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriasRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findOne({ where: { id } });
    if (!categoria) {
      throw new NotFoundException(`Categoria with ID ${id} not found`);
    }
    return categoria;
  }

  async update(id: number, updateCategoriaDto: any): Promise<Categoria> {
    const categoria = await this.findOne(id);
    const updatedCategoria = this.categoriasRepository.merge(categoria, updateCategoriaDto);
    return this.categoriasRepository.save(updatedCategoria) as unknown as Promise<Categoria>;
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.findOne(id);
    await this.categoriasRepository.remove(categoria);
  }
}
