import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: any): Promise<Usuario> {
    const usuario = this.usuariosRepository.create(createUsuarioDto);
    return this.usuariosRepository.save(usuario) as unknown as Promise<Usuario>;
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${id} not found`);
    }
    return usuario;
  }

  async update(id: number, updateUsuarioDto: any): Promise<Usuario> {
    const usuario = await this.findOne(id);
    this.usuariosRepository.merge(usuario, updateUsuarioDto);
    return this.usuariosRepository.save(usuario) as unknown as Promise<Usuario>;
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuariosRepository.remove(usuario);
  }
}
