import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Producto } from './producto.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn({ name: 'id_categorias' })
  id: number;

  @Column({ length: 50 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'timestamp' })
  fecha_creacion: Date;

  @OneToMany(() => Producto, producto => producto.categoria)
  productos: Producto[];
}
