import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orden } from '../../entities/orden.entity';
import { DetalleOrden } from '../../entities/detalle-orden.entity';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { DetalleOrdenDto } from './dto/detalle-orden.dto';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(Orden)
    private ordenesRepository: Repository<Orden>,
    @InjectRepository(DetalleOrden)
    private detalleOrdenRepository: Repository<DetalleOrden>,
  ) {}

  async create(createOrdenDto: CreateOrdenDto): Promise<Orden> {
    const orden = this.ordenesRepository.create({
      ...createOrdenDto,
      fecha_pedido: new Date(),
    });
    return this.ordenesRepository.save(orden);
  }

  async findAll(usuarioId?: number): Promise<Orden[]> {
    if (usuarioId) {
      return this.ordenesRepository.find({
        where: { usuarioId },
        relations: ['usuario', 'detallesOrden', 'detallesOrden.producto'],
      });
    }
    return this.ordenesRepository.find({ 
      relations: ['usuario', 'detallesOrden', 'detallesOrden.producto'] 
    });
  }

  async findOne(id: number): Promise<Orden> {
    const orden = await this.ordenesRepository.findOne({
      where: { id },
      relations: ['usuario', 'detallesOrden', 'detallesOrden.producto'],
    });
    
    if (!orden) {
      throw new NotFoundException(`Orden with ID ${id} not found`);
    }
    
    return orden;
  }

  async update(id: number, updateOrdenDto: UpdateOrdenDto): Promise<Orden> {
    const orden = await this.findOne(id);
    this.ordenesRepository.merge(orden, updateOrdenDto);
    return this.ordenesRepository.save(orden);
  }

  async remove(id: number): Promise<void> {
    const orden = await this.findOne(id);
    await this.ordenesRepository.remove(orden);
  }

  async createDetalleOrden(createDetalleOrdenDto: DetalleOrdenDto): Promise<DetalleOrden> {
    console.log('Servicio - Creando detalle de orden:', JSON.stringify(createDetalleOrdenDto, null, 2));
    
    // Verificar que todos los campos necesarios estén presentes
    if (!createDetalleOrdenDto.cantidad) {
      throw new BadRequestException('El campo cantidad es obligatorio');
    }
    
    if (!createDetalleOrdenDto.precio_unitario) {
      throw new BadRequestException('El campo precio_unitario es obligatorio');
    }
    
    if (!createDetalleOrdenDto.ordenId) {
      throw new BadRequestException('El campo ordenId es obligatorio');
    }
    
    if (!createDetalleOrdenDto.productoId) {
      throw new BadRequestException('El campo productoId es obligatorio');
    }
    
    // Si no se proporcionó subtotal, calcularlo
    if (!createDetalleOrdenDto.subtotal) {
      createDetalleOrdenDto.subtotal = createDetalleOrdenDto.cantidad * createDetalleOrdenDto.precio_unitario;
    }
    
    try {
      const detalleOrden = this.detalleOrdenRepository.create(createDetalleOrdenDto);
      console.log('Servicio - Detalle de orden creado:', JSON.stringify(detalleOrden, null, 2));
      const resultado = await this.detalleOrdenRepository.save(detalleOrden);
      console.log('Servicio - Detalle de orden guardado:', JSON.stringify(resultado, null, 2));
      return resultado;
    } catch (error) {
      console.error('Servicio - Error al guardar detalle de orden:', error.message);
      console.error('Stack:', error.stack);
      throw new BadRequestException(`Error al crear detalle de orden: ${error.message}`);
    }
  }
}
