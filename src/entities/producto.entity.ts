import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Categoria } from './categoria.entity';
import { DetalleOrden } from './detalle-orden.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn({ name: 'id_productos' })
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  precio: number;

  @Column()
  stock: number;

  @Column({ type: 'text' })
  imagen_url: string;

  @Column({ type: 'timestamp' })
  fecha_creacion: Date;

  @Column({ name: 'id_categorias' })
  categoriaId: number;

  @ManyToOne(() => Categoria, categoria => categoria.productos)
  @JoinColumn({ name: 'id_categorias' })
  categoria: Categoria;

  @OneToMany(() => DetalleOrden, detalleOrden => detalleOrden.producto)
  detallesOrden: DetalleOrden[];
}
